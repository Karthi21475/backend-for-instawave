import express from 'express'
import Usermodel from "../models/Usermodel.js";
import Authenticate from '../middlewares/Auth.js';
import { v4 as uuidv4 } from 'uuid';
import { upload,cloudinary } from '../controllers/Upload.js';


const router =express.Router();


router.route('/').post(Authenticate,upload.single("media"),async(req,res)=>{
    
    const {user_id,post_disc}=req.body;
    const image=req.file
    
    if (!image) res.json({message:"did not upload a file"})
    
    try{
        cloudinary.uploader.upload_stream(
        {resource_type:"auto",folder:"post"},
        async(err,result)=>{
            if (err) return res.json({Error:err.message})

            const details = {post_id:uuidv4(),post_disc:post_disc,image:result.secure_url};
            const user = await Usermodel.findOne({user_id:user_id});
            user.posts.push(details)
            await user.save()

            res.json({message:'Post Added',details});
            console.log("Post Added")

        }).end(image.buffer)
    }catch(err){
        res.json({message:`${err.message}`});
    }
}).get(async(req,res)=>{
    const all= await Usermodel.find({})
    try{
        res.json({all:all.map(user=>({
            id:user.user_id,
            username:user.user_name,
            profilepic:user.profile_pic,
            post:user.posts[0]
        }))})
    }catch(err){
        res.json({message:`${err.message}`});
        console.log(err.message);
    }
})
router.route('/:id').get(Authenticate,async(req,res)=>{
    const {id}=req.body;
    const user= await Usermodel.findOne({user_id:id})
    try{
        res.json({posts:user.posts})
    }catch(err){
        res.json({message:`${err.message}`});
        console.log(err.message);
    }
})
export default router;
