import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
let conn: typeof mongoose;

export const database = async () => {
  if (conn) {
    return conn;
  } else {
    conn = await mongoose.connect(`${process.env.MONGO_URI}`, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000
    });
    console.log("Database connected");
    return conn;
  }
};