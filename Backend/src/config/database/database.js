import mongoose from 'mongoose';
import config from '../environement.js';

const connectDB = async()=>{
    try {
      await mongoose.connect(config.MONGO_URL, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Database Connected successfully...");
    } catch (error) {
      console.error("Error connecting to DB", error.message);
      process.exit(1);
    }
}


export default connectDB;
