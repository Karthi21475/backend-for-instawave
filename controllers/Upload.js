import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()
const storage = multer.memoryStorage();
export const upload = multer({ storage });
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
export {cloudinary};

