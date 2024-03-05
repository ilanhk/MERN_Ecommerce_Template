import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//Protect routes for registered users
const protect = asyncHandler( async (req, res, next) => {
    let token;

    //Read the JWT from the cookie
    token = req.cookies.jwt;

    if(token){
        try {
            const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded_token.userId).select('-password'); 
            // .select('-password') to get the obj without the password attribute
            // req.user - gets user for all our routes

            next(); // for next middleware or to continue
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        };

    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    };
});


const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    };
};

export{
    protect,
    admin,
};