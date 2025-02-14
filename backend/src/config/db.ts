import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(String(process.env.DATABASE_URL));
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
