import { connect, connection, disconnect } from "mongoose";

export async function dbConnect() {
  await connect(process.env.MONGO_URI!);
}

connection.on("connected", () => {
  console.log("Mongodb is connected");
});
connection.on("error", (err) => {
  console.log(err);
});
