
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI!;

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(MONGODB_URI);
}