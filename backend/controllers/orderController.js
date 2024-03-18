import asyncHandler from "../middleware/asyncHandler.js";
import Order from '../models/orderModel.js';

// @desc Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const { 
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
     } = req.body;

     if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No Order Items');
     } else {
        const order = new Order({
            orderItems: orderItems.map((o)=>({
                ...o,
                product: o._id,
                _id: undefined //undefined bc no _id 
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createOrder = await order.save(); //saves the order

        res.status(201).json(createOrder);
     };
});


// @desc Get logged in users orders
// @route GET /api/orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});



// @desc Get Order by Id
// @route GET /api/orders/:id
// @access Private/Admin
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    
    if(order){
        res.status(200).json(order);
    } else {
        res.status('404');
        throw new Error('order not found');
    };
});
// .populate('user', 'name email'); this means it will add the users name and email to the object


// @desc Update Order to Paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }; // body from paypal

        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    };


});


// @desc Update Order to Delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    console.log("Order ID:", req.params.id); // Log the order ID
    const order = await Order.findById(req.params.id);


    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } else{
        res.status(404);
        throw new Error('Order not found');
    };
});


// @desc Get All Orders
// @route GET /api/orders
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name'); //get all orders and populate from the user collection the id and name
    res.status(200).json(orders);
});

export{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders
};