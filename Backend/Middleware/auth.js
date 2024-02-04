import errorHandler from "../Utills/errorHandler.js";
import catchAsyncError from "../Middleware/catchAsyncError.js";
import User from "../Model/user.model.js";
import * as jwt from 'jsonwebtoken';


export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next(new errorHandler("Please Login to access this resource", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();

});


