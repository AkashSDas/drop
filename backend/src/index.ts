// First loading env variables a
import { config } from "dotenv";
config();

import { connectMongoDB } from "./config/db";
connectMongoDB();

import { app } from "./api";

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () =>
  console.log(`API is available on http://localhost:${port}/api`)
);
