import express from "express";
const router = express.Router();
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct,
    createProductReview 
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').get(getProducts).post(protect, admin, createProduct); // we are linking '/api/products' to this file. So we will change it to '/'
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;