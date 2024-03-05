import express from "express";
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js';


router.route('/').get(getProducts); // we are linking '/api/products' to this file. So we will change it to '/'
router.route('/:id').get(getProductById);

export default router;