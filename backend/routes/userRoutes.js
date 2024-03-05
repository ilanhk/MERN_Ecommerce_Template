import express from "express";
const router = express.Router();
import { 
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
 } from '../controllers/userController.js';
 import { protect, admin } from '../middleware/authMiddleware.js';


router.route('/').post(registerUser).get(protect, admin, getUsers); 
// .post(registerUser).get(getUsers); - you can use different CRUD methods on the same route
// if post on '/' use registerUser if get on '/' use getUsers

router.post('/logout', logoutUser);

router.post('/login', loginUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/:id').delete(protect, admin, deleteUser).get(getUserById).put(protect, admin, updateUser);


export default router;