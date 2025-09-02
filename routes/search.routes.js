import express from 'express';
import Usermodel from "../models/Usermodel.js";
import Authenticate from '../middlewares/Auth.js';
import PostModel from '../models/PostSchema.js';

const router = express.Router();

router.get('/',async(req,res)=>{
    const searchTerm=req.query.searchTerm;
    const posts = await PostModel.find({
        post_disc: { $regex: searchTerm, $options: "i" }
    }).limit(20);
    const users= await Usermodel.find({user_name:{ $regex: searchTerm, $options: "i" }}).limit(20);
    res.json({posts,users})
});


export default router;