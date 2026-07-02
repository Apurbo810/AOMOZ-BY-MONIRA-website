import mongoose from "mongoose";

const getMongoUri = () => {
  return (
    process.env.MONGO_URL ||
    process.env.MONGODB_URI ||
    process.env.MONGODB_URL ||
    process.env.MONGO_URI ||
    process.env.DATABASE_URL
  );
};

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  const mongoUri = getMongoUri();

  if (!mongoUri) {
    throw new Error(
      "MongoDB connection string is missing. Set MONGO_URL (or MONGODB_URI) in your environment."
    );
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
      family: 4,
      dbName: new URL(mongoUri).pathname.replace(/^\//, "") || undefined,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};
