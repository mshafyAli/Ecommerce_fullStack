import express from "express";
import path from "path";
import * as fs from "fs";
import Shop from '../Model/shop.model.js'
import jwt from "jsonwebtoken";
import sendMail from "../Utills/sendMail.js";
import {upload} from "../multer.js"
import catchAsyncError from "../Middleware/catchAsyncError.js";
import sendShopToken from "../Utills/shopToken.js";
import errorHandler from "../Utills/errorHandler.js";
import { isSeller } from "../Middleware/auth.js";



const router = express.Router();

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlinkSync(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Internal server error delete file",
          });
        }
      });
      return next(new errorHandler("Email already exists", 400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const seller = {
      name:req.body.name,
      email,
      password:req.body.password,
      avatar: fileUrl,
      address:req.body.address, 
      phoneNumber:req.body.phoneNumber,
      zipCode:req.body.zipCode,

    };


    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(200).json({
        success: true,
        message: `please check your email ${seller.email} to activate your account`,
      });
    } catch (error) {
      return next(new errorHandler(error.message), 500);
    }
  } catch (err) {
    console.log(err);
    return next(new errorHandler(err.message), 400);
  }
});

 // craete activation token
 const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_TOKEN_SECRET, {
      expiresIn: '5m',
  })
}


//activate User
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      if (!newSeller) {
        return next(new errorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar,address,zipCode,phoneNumber } = newSeller;

      let seller = await Shop.findOne({ email });
      if (seller) {
        return next(new errorHandler("User already exists", 400));
      };

      seller = await Shop.create({
        name,
        email,
        password,
        avatar,
        address,
        zipCode,
        phoneNumber,

      });

      // Send congratulatory email
      try {
        await sendMail({
          email: seller.email,
          subject: "Congratulations on activating your shop",
          message: `Hello ${seller.name}, congratulations on successfully activating your shop. You can now start using our platform.`,
        });
      } catch (error) {
        console.error("Error sending congratulatory email:", error);
        // Handle error sending congratulatory email if needed
      }


      sendShopToken(seller, 201, res);
    } catch (err) {
      return next(new errorHandler(err.message), 500);

    }
  })
);

router.post("/login-shop",catchAsyncError(async(req,res,next)=>{

  try{
    const {email, password} = req.body;
    if(!email || !password){
      return next(new errorHandler("Please enter email and password", 400));
    }
    const user = await Shop.findOne({email}).select("+password");
    if(!user){
      return next(new errorHandler("User not found", 400));
    }
    const isPasswordValid = await user.comparePassword(password);
    if(!isPasswordValid){
      return next(new errorHandler("please provide the correct Information", 400));
    }
    
    sendShopToken(user, 200, res);
  }catch(err){

    return next(new errorHandler(err.message), 500);

  }
  


})
);

// load Shop
router.get(
  "/get-seller",
  isSeller,catchAsyncError(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);
      console.log(seller);

      if (!seller) {
        return next(new errorHandler("User doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  })
);

router.get(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new errorHandler(error.message, 500));
    }
  })
);


// get Shop info
router.get('/get-shop-info/:id',catchAsyncError(async(req, res, next)=>{
  try{
    const shop = await Shop.findById(req.params.id);
    res.status(200).json({
      success: true,
      shop,
    })
  }catch(err){
    return next(new errorHandler(err.message), 500);

  }
}))



export default router;