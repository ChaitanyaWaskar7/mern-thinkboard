import mongoose from "mongoose";
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("Database connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}