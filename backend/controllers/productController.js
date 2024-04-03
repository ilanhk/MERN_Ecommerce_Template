import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' }} : {};
    // { $regex: req.query.keyword, $options: 'i' } use regular expression instead on matching it directy so if type keyword 'phone' it will give us 'iphone 10', 
    //$options: 'i' means case insensative

    const count = await Product.countDocuments({...keyword}); // countDocuments() is a mongoose method. In this case it will count how much products in the db
    
    //we want to limit the count if there is a keyword same with Product.find({...keyword})

    const products = await Product.find({...keyword}) // {} in find will get all of them
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count / pageSize)}); // Math.ceil is to round up
});
// need to use async because getting data from the DB


// @desc Fetch a product by id
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    
    if (product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    };
});


// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews:0,
        description: 'Sample description',
    });

    const createdProduct = await product.save();
    res.status('201').json(createdProduct); //201 means something was created
});


// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = product.save();
        res.json(updatedProduct);

    } else {
        res.status(404);
        throw new Error('Resource not found');
    };
});


// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
   
    const product = await Product.findById(req.params.id);

    if(product){
        await Product.deleteOne({ _id: product._id });
        res.status(200).json('Product deleted')

    } else {
        res.status(404);
        throw new Error('Product not found');
    };
});


// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
   
    const product = await Product.findById(req.params.id);

    if(product){
        const alreadyReviewed = product.reviews.find(
            (review)=> review.user.toString() === req.user._id.toString()
        );

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product already reviewed by user')
        };

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating = product.reviews.reduce((acc, review)=> acc + review.rating ,0) /
        product.reviews.length;
        //adding all the ratings together and dividing by number of reviews

        await product.save();
        res.status(201).json({message: 'Review added'});

    } else {
        res.status(404);
        throw new Error('Product not found');
    };
});


// @desc Get top rated products
// @route GET /api/products/top
// @access Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3);
    res.status(200).json(products);
});



export { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    createProductReview,
    getTopProducts,
};
