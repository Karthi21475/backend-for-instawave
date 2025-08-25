import mongoose from "mongoose";
import { Schema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const mediaItemSchema = new Schema({
    story_id: { 
        type: String, 
        required: true,
        default:uuidv4
    },
    video: { 
        type: String, 
        required: true 
    }
}, { _id: false });

export default mediaItemSchema;