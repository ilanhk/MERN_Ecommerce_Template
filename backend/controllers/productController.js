import asyncHandler from "../middleware/asyncHandler.js";
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}); // {} in find will get all of them
    res.json(products);
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
    }
});

export { getProducts, getProductById };
