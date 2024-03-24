import express from 'express';
import Shop from '../Model/shop.model.js';
import { upload } from '../multer.js';
import catchAsyncError from '../Middleware/catchAsyncError.js';
import errorHandler from "../Utills/errorHandler.js";
import Event from '../Model/event.model.js';
import { isSeller } from '../Middleware/auth.js';
import fs from 'fs';


const router = express.Router();

router.post('/create-event', upload.array("images"),catchAsyncError(async(req,res,next) => {
    try{
        const shopId = req.body.shopId;
        const shop = await Shop.findById(shopId);
        if(!shop){
            return next(new errorHandler("Shop Id is invalid!", 400));
        }else{
            const files = req.files;
            const imageUrls = files.map((file)=> `${file.filename}`);
            const productEvent =req.body;
            productEvent.images = imageUrls;
            productEvent.shop = shopId;

            const product = await Event.create(productEvent);
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



//get All Events of a shop

router.get('/get-all-events/:id', catchAsyncError(async(req, res, next) => {
    try{
        const events = await Event.find({shopId:req.params.id});

        res.status(200).json({
            success: true,
            message: "Events fetched successfully!",
            events,
        })

    }catch(err){
        return next(new errorHandler(err, 400));
    }

}));

// delete Products

router.delete('/delete-shop-event/:id',isSeller, catchAsyncError(async(req, res, next) => {

    try{
        const productId = req.params.id;

        const eventData = await Event.findById(productId);
        eventData.images.forEach((imageUrl)=>{
            const filename = imageUrl;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (err)=>{
                if(err){
                    console.log(err);
                }
            })
        })
        const event = await Event.findByIdAndDelete(productId);

        if(!event){
            return next(new errorHandler("Event Id is invalid!", 400));
        }
    
        res.status(200).json({
            success: true,
            message: "Event deleted successfully!",
        })

    }catch(err){
        return next(new errorHandler(err, 400));
    }
    
}))

export default router;