import express from 'express'
import Usermodel from "../models/Usermodel.js";
import Authenticate from '../middlewares/Auth.js';
import { v4 as uuidv4 } from 'uuid';
import { upload,cloudinary } from '../controllers/Upload.js';
import Storymodel from '../models/StorySchema.js';

const router =express.Router();


router.route('/').post(Authenticate,upload.single("media"),async(req,res)=>{
    
    const {user_id}=req.body;
    const vid=req.file
    const userDetails=await Usermodel.findOne({user_id:user_id});

    if (!vid) res.json({message:"did not upload a file"})
    
    try{
        cloudinary.uploader.upload_stream(
        {resource_type:"auto",folder:"post"},
        async(err,result)=>{
            if (err) return res.json({Error:err.message})

            const details = {user_id:userDetails.user_id,user_name:userDetails.user_name,profile_pic:userDetails.profile_pic,story_id:uuidv4(),video:result.secure_url};
            const story = await Storymodel.create(details);
            await story.save()

            res.json({message:'Story Added',details});
            console.log("Story Added")

        }).end(vid.buffer)
    }catch(err){
        res.json({message:`${err.message}`});
    }
}).get(async(req,res)=>{
    const stories= await Storymodel.find({})
    try{
        res.json({stories})
    }catch(err){
        res.json({message:`${err.message}`});
        console.log(err.message);
    }
})
router.route('/:id').get(Authenticate,async(req,res)=>{
    const {id}=req.params;
    const stories= await Storymodel.find({user_id:id})
    try{
        res.json({stories:stories})
    }catch(err){
        res.json({message:`${err.message}`});
        console.log(err.message);
    }
})
export default router;