import mongoose from "mongoose";
import "dotenv/config";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connesso: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
 export default connectDatabase;