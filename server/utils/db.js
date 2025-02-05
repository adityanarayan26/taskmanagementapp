import mongoose from "mongoose";
import { config } from 'dotenv';
config()

export const Connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(error);

    }
}