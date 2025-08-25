import mongoose from "mongoose";
import { Schema } from "mongoose";
import mediaItemSchema from "./PostSchema.js";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new Schema({
    user_id: { 
        type: String, 
        default: uuidv4,
        unique: true 
    },
    user_name: { 
        type: String, 
        required: true,
        unique:true,
    },
    password: { 
        type: String, 
        required: true
    },
    
    user_bio: { 
        type: String, 
        default: "Hey there I'm using instaShare" 
    },
    profile_pic: { 
        type: String, 
        default: 'https://assets.ccbp.in/frontend/react-js/male-avatar-img.png' 
    },
    followers_count: { 
        type: Number, 
        default: 0 
    },
    following_count: { 
        type: Number, 
        default: 0 
    },
    posts_count: { 
        type: Number, 
        default: 0 
    },

    posts: { 
        type: [mediaItemSchema], 
        default: [] 
    },
    stories: {
        type: [mediaItemSchema],
        default: [] 
    },

    role: { 
        type: String, 
        default: 'user' 
    }
},{
    timestamps: true,
    versionKey: false
});

const Usermodel=mongoose.model("Users",userSchema);

export default Usermodel;