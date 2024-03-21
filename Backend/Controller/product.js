import express from 'express';
import Product from '../Model/product.model.js';
import Shop from '../Model/shop.model.js';
import { upload } from '../multer.js';
import catchAsyncError from '../Middleware/catchAsyncError.js';
import errorHandler from "../Utills/errorHandler.js";
import { isSeller } from '../Middleware/auth.js';


const router = express.Router();

router.post('/create-product', upload.array("images"),catchAsyncError(async(req,res,next) => {
    try{
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new errorHandler("Shop Id is invalid!", 400));
        }else{
            const files = req.files;
            const imageUrls = files.map((file)=> `${file.filename}`);
            const productData =req.body;
            productData.images = imageUrls;
            productData.shop = shopId;

            const product = await Product.create(productData);
            res.status(200).json({
                success: true,
                message: "Product created successfully!",
                product,
            })
        }
    }catch(err){
        return next(new errorHandler(err, 400));
    }
}))

//get All products of a shop

router.get('/get-all-products-shop/:id', catchAsyncError(async(req, res, next) => {
    try{
        const products = await Product.find({shopId:req.params.id});

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            products,
        })

    }catch(err){
        return next(new errorHandler(err, 400));
    }

}));

// delete Products

router.delete('/delete-shop-product/:id',isSeller, catchAsyncError(async(req, res, next) => {

    try{
        const productId = req.params.id;

        const product = await Product.findByIdAndDelete(productId);

        if(!product){
            return next(new errorHandler("Product Id is invalid!", 400));
        }
    
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
        })

    }catch(err){
        return next(new errorHandler(err, 400));
    }
    
}))




export default router;