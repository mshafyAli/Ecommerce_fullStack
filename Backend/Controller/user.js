import express from 'express';
import path from 'path';
import User from '../Model/user.model.js';
import errorHandler from '../Utills/errorHandler.js';
import { upload } from '../multer.js';
import * as fs from 'fs';

const router = express.Router();

router.post('/create-user',upload.single("file"),async(req,res,next)=>{


    try{
        const {name,email,password}=req.body;
    const userEmail = await User.findOne({email});
    if(userEmail){
        const filename = req.file.filename;
        const filePath = `uploads/${filename}`
        fs.unlinkSync(filePath,(err)=>{
            if(err){
                console.log(err);
                res.status(500).json({
                    success:false,
                    message:"Internal server error delete file"
,                
                })
            }else{
                console.log("File deleted successfully");
                res.status(500).json({
                    message:"File deleted successfully",
                })
            }
            
        });
        return next(new errorHandler("Email already exists",400));
    }
    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    

    const user ={
        name,
        email,
        password,
        avatar:fileUrl,
    };
    console.log(user);



    const newUser = await User.create(user);
    res.status(201).json({
        success:true,
        message:"User created successfully",
        newUser
    })

    }catch(err){
        console.log(err);
        return next(new errorHandler("Internal server error",500));

    }
    

})
export default router;
