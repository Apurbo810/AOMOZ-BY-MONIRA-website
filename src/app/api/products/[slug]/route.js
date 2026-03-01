import Product from "@/app/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Connect to MongoDB
async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGO_URL);
}

export async function GET(req, context) {
  await connectDB();

  try {
    // Properly await params
    const { slug } = await context.params;

    const product = await Product.findOne({ slug });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // 1️⃣ Fetch same category products first
    let related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(6);

    // 2️⃣ If less than 6, fetch same gender products (different category)
    if (related.length < 6) {
      const remaining = 6 - related.length;
      const genderRelated = await Product.find({
        gender: product.gender,
        category: { $ne: product.category },
        _id: { $ne: product._id },
      }).limit(remaining);

      related = [...related, ...genderRelated];
    }

    return NextResponse.json({ product, related });
  } catch (err) {
    console.log("ERROR:", err);
    return NextResponse.json(
      { error: "Failed to load product" },
      { status: 500 }
    );
  }
}
