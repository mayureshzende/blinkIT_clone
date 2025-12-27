import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to the DB succesfully.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
