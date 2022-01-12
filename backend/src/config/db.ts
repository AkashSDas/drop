import { connect } from "mongoose";

export const connectMongoDB = async () => {
  try {
    await connect(process.env.MONGODB_CONNECT_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(`Failed to connect to MongoDB Atlas\nError: ${err}`);
    process.exit(1);
  }
};
