import { createSlice } from "@reduxjs/toolkit"; // import this when doing non async actions
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 
{ cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }; 
//local storage holds it has a string need to convert to a js object



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action)=>{
            const item = action.payload;
            
            const existItem = state.cartItems.find((i)=> i._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((i)=> i._id === existItem._id ? item : i);
            } else {
                state.cartItems = [...state.cartItems, item]
            };

            return updateCart(state);

            
        },
        removeFromCart: (state, action)=>{
            state.cartItems = state.cartItems.filter((i)=> i._id !== action.payload); //returning all cartItems with the ones we dont want to delete
            return updateCart(state);
        },
        saveShippingAddress: (state, action)=> {
            state.shippingAddress = action.payload;
            return updateCart(state);

        },
        savePaymentMethod: (state, action) =>{
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        },
    },
});
// createSlice() takes in a object
//reducers object will have an functions that would have to do with the cart

//any function we create in the reducer still needs to be exported as an action
export const { 
    addToCart, 
    removeFromCart, 
    saveShippingAddress, 
    savePaymentMethod, 
    clearCartItems,
} = cartSlice.actions; //bc we are using createSlice we can export the reducers like this


export default cartSlice.reducer;