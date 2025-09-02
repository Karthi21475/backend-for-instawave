import {Schema} from "mongoose";

export const commentSchema=new Schema({
    user_id:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    profile_pic:{
        type:String,
        required:true
    },
    comment:{
        type:String
    }
}, { _id: false })