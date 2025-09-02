import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const storySchema = new Schema({
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
    },story_id: { 
        type: String, 
        required: true,
        default:uuidv4
    },
    video: { 
        type: String, 
        required: true 
    }
});

const Storymodel=mongoose.model("stories",storySchema);

export default Storymodel;
