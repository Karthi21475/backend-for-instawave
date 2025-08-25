import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const mediaItemSchema = new Schema({
    post_id: { 
        type: String, 
        required: true,
        default:uuidv4
    },
    post_disc:{
        type: String,
    },
    image: { 
        type: String, 
        required: true 
    },
    likes_count:{
        type:Number,
        default:0
    }
}, { _id: false });

export default mediaItemSchema;