import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/User.routes.js";
import PostRoutes from "./routes/post.routes.js";
import StoryRoutes from './routes/story.routes.js';
import SearchRoutes from './routes/search.routes.js'

dotenv.config();

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected")
    app.listen(process.env.PORT,()=>{console.log(`server listening at ${process.env.PORT}`)});
})
.catch(err => console.log(err));
app.use('/api/user',UserRoutes);
app.use('/api/post',PostRoutes);
app.use('/api/story',StoryRoutes);
app.use('/api/search',SearchRoutes);