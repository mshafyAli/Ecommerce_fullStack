import express from 'express';
import Shop from '../Model/shop.model.js';
import catchAsyncError from '../Middleware/catchAsyncError.js';
import errorHandler from "../Utills/errorHandler.js";
import { isSeller } from '../Middleware/auth.js';
import CouponCode from '../Model/couponCode.model.js';

const router = express.Router();


router.post('/create-coupon-code',isSeller,catchAsyncError(async (req, res, next) => {

    try{
        const isCouponCodeExist = await CouponCode.find({
            name:req.body.name,
        })
        if(isCouponCodeExist.length > 0){
            return next(new errorHandler("Coupon Code Already Exist", 400));
        }
        const couponCode = await CouponCode.create(req.body);

        res.status(200).json({
            success:true,
            message:"Coupon Code Created Successfully",
            couponCode,
        })

    }catch(err){
        return next(new errorHandler(err, 400));
        
    }

}))

// get All Coupons Code

router.get(
    "/get-coupon/:id",
    isSeller,
    catchAsyncError(async (req, res, next) => {
      try {
        const couponCodes = await CouponCode.find({ shopId: req.seller.id });
        res.status(201).json({
          success: true,
          couponCodes,
        });
      } catch (error) {
        return next(new errorHandler(error, 400));
      }
    })
  );


  // delete coupoun code of a shop
router.delete(
  "/delete-coupon/:id",
  isSeller,
  catchAsyncError(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new errorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new errorHandler(error, 400));
    }
  })
);





export default router;