import { connect, connections } from "mongoose";

export default async function connectDB() {
  if (connections[0].readyState) return;
  await connect(process.env.MONGO_URI);
  console.log("connected...");
}
