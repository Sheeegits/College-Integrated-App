import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const resourceType = file.mimetype.startsWith("image/") ? "image" : "video"; // Detect Image or Video

    return {
      folder: "college_details",
      resource_type: resourceType, // Supports both images & videos
      allowed_formats: ["jpg", "png", "pdf", "mp4", "avi", "mov"], // ✅ Added video formats
    };
  },
});

const upload = multer({ storage });

export default upload;
