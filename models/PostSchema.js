import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { commentSchema } from "./CommentSchema.js";

const postSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      required: true,
    },
    post_id: {
      type: String,
      required: true,
      default: uuidv4,
    },
    post_disc: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    likes_count: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

postSchema.index({ user_id: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ post_disc: 1 });

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;