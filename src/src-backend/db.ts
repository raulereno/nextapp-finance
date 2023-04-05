import { connect, connection } from "mongoose";
import { config } from "dotenv";
config();

export async function conn() {
  await connect(process.env.MONGO_URI!);
}

connection.on("connected", () => {
  console.log("Database connected");
});
connection.on("error", (err) => {
  console.log(err);
});
// const conn = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);
//     console.log("database connected");
//   } catch (error: any) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

export default conn;
