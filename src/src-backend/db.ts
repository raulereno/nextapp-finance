import mongoose from "mongoose";
import { config } from "dotenv";
config();

const conn = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("database connected");
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

export default conn;
