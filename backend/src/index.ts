// First loading env variables a
import { config } from "dotenv";
config();

import { connectMongoDB } from "./config/db";
connectMongoDB();

import cloudinary from "cloudinary";
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

import { app } from "./api";

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`API is available on http://localhost:${port}/api`)
);
