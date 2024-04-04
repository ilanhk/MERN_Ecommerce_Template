import express from "express";
const router = express.Router();
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct,
    deleteProduct,
    createProductReview,
    getTopProducts 
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from "../middleware/checkObjectId.js"; // use it to all routes that have '/:id'


router.route('/').get(getProducts).post(protect, admin, createProduct); // we are linking '/api/products' to this file. So we will change it to '/'
router.route('/top').get(getTopProducts);
router.route('/:id').get( checkObjectId, getProductById).put(protect, admin, checkObjectId, updateProduct).delete(protect, admin, checkObjectId, deleteProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);

export default router;