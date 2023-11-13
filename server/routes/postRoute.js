import express from "express";
import dotenv from "dotenv";
const router = express.Router();


import Post from "../models/Post.js";
import {v2 as cloudinary} from 'cloudinary';
dotenv.config();   
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

//post a photo
router.route('/').post(async (req,res)=>{
    try{
        const {name,prompt,photo} =req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await Post.create({
            name,prompt,photo:photoUrl.url
        })
        res.status(200).json({success:true,data:newPost})            
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error})
    }
});

//get all photos
router.route('/').get(async (req,res)=>{
    try{
        const posts= await Post.find({});
        res.status(200).json({success:true,data:posts});

    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error})
    }
})

export default router;