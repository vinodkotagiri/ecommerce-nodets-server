import mongoose from "mongoose";

export const connectToDatabase = async (MONGO_URL:string) => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};
