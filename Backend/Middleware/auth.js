// import errorHandler from "../Utills/errorHandler.js";
// import catchAsyncError from "../Middleware/catchAsyncError.js";
// import User from "../Model/user.model.js";
// import jwt from 'jsonwebtoken';



// export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
//     const { token } = req.cookies;
//     console.log(token);

//     if(!token){
//         return next(new errorHandler("Please Login to access this resource", 401));
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     req.user = await User.findById(decoded.id);

//     next();

// });


import errorHandler from "../Utills/errorHandler.js";
import catchAsyncError from "../Middleware/catchAsyncError.js";
import User from "../Model/user.model.js";
import Shop from "../Model/shop.model.js";
import jwt from 'jsonwebtoken'; 

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    console.log("user token",token);

    if(!token){
        return next(new errorHandler("Please Login to access this resource", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(new errorHandler("Invalid token", 401));
    }
});


export const isSeller = catchAsyncError(async(req,res,next) => {
    const {seller_token} = req.cookies;
    if(!seller_token){
        return next(new errorHandler("Please login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
});