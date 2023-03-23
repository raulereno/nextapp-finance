import mongoose from "mongoose";
import { config } from "dotenv";
config();

async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);

    console.log("database connect");
  } catch (error) {
    console.log("Connection faild: ", error);
  }
}

export default dbConnect;
