import jwt from "jsonwebtoken";

//storing token in indexedDB > Cookie > Local storage

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn:'30d' // this can also be in miliseconds can be in .env
    }); 
    // creates the token sign(payload, secret, expiry_date)
    
    //Set JWT as HTTP-Only cookie (safer than storing the token in the browser in res.json)
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', //set to true when its deployed not in development
        sameSite: 'strict', //prevent attacks
        maxAge: 30*24*60*60*1000 //bc its in miliseconds we want 30days for now can be in env
    });
};

export default generateToken;

//this is access token - access data on same session
//good to make a refresh token for long periods if program stops the user will be login when access the site again (store in db)