// const cloudinary = require("cloudinary").v2;
// const dotenv = require("dotenv");

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
// const cloudinary = await import("cloudinary").then((mod) => mod.v2);

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Configure default delivery settings
cloudinary.config({
  secure: true,
  secure_distribution: null,
  private_cdn: false,
  cname: null,
});

// module.exports = cloudinary;
export default cloudinary;
