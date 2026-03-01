<<<<<<< HEAD
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};
=======
import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return; // already connected
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
