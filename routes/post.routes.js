import express from 'express'
import Usermodel from "../models/Usermodel.js";
import Authenticate from '../middlewares/Auth.js';
import { v4 as uuidv4 } from 'uuid';
import { upload,cloudinary } from '../controllers/Upload.js';
import PostModel from '../models/PostSchema.js';

const router =express.Router();


router.route('/').post(Authenticate,upload.single("media"),async(req,res)=>{
    
    const {user_id,post_disc}=req.body;
    const image=req.file
    const userDetails=await Usermodel.findOne({user_id:user_id});

    if (!image) res.json({message:"did not upload a file"})
    
    try{
        cloudinary.uploader.upload_stream(
        {resource_type:"auto",folder:"post"},
        async(err,result)=>{
            if (err) return res.json({Error:err.message})

            const details = {user_id:userDetails.user_id,user_name:userDetails.user_name,profile_pic:userDetails.profile_pic,post_id:uuidv4(),post_disc:post_disc,image:result.secure_url};
            const post = await PostModel.create(details);
            await post.save()

            res.json({message:'Post Added',details});
            console.log("Post Added")

        }).end(image.buffer)
    }catch(err){
        res.json({message:`${err.message}`});
    }
}).get(async(req,res)=>{
    const posts= await PostModel.find({})
    try{
        res.json({posts})
    }catch(err){
        res.json({message:`${err.message}`});
        console.log(err.message);
    }
})
router.route('/:id').get(Authenticate,async(req,res)=>{
    const {id}=req.params;
    const posts= await PostModel.find({user_id:id})
    try{
        res.json({posts:posts})
    }catch(err){
        res.json({message:`${err.message}`});
        console.log(err.message);
    }
})
export default router;
