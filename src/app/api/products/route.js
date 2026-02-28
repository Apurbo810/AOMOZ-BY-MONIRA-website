// app/api/products/route.js
import Product from "@/app/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const {
      name,
      image,
      price,
      discountPrice,
      discountPercentage,
      gender,
      category,
      description,
      stock,
      hasSizes,
      sizes,
    } = body;

    if (!name || !image || !gender || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate if hasSizes but no price and no sizes
    if (!hasSizes && !price) {
      return NextResponse.json({ error: "Price is required" }, { status: 400 });
    }

    if (hasSizes && (!sizes || sizes.length === 0)) {
      return NextResponse.json(
        { error: "At least one size is required" },
        { status: 400 }
      );
    }

    const productData = {
      name: name.trim(),
      image,
      gender,
      category,
      description: description || "",
      hasSizes: hasSizes || false,
    };

    // If product has sizes, store size-specific data
    if (hasSizes && sizes && sizes.length > 0) {
      productData.sizes = sizes;
      // Set base price/stock from first size for backward compatibility
      productData.price = sizes[0].price;
      productData.stock = sizes[0].stock || 0;
      productData.discountPrice = sizes[0].discountPrice || 0;
      productData.discountPercentage = sizes[0].discountPercentage || 0;
    } else {
      // Regular product without sizes
      let finalDiscountPrice = Number(discountPrice) || 0;
      let finalDiscountPercentage = Number(discountPercentage) || 0;

      if (finalDiscountPercentage > 0 && finalDiscountPrice === 0) {
        finalDiscountPrice = Math.round(
          Number(price) * (1 - finalDiscountPercentage / 100)
        );
      }

      if (finalDiscountPrice >= Number(price) || finalDiscountPrice < 0) {
        finalDiscountPrice = 0;
        finalDiscountPercentage = 0;
      }

      productData.price = Number(price);
      productData.stock = Number(stock) || 0;
      productData.discountPrice = finalDiscountPrice;
      productData.discountPercentage = finalDiscountPercentage;
      productData.sizes = [];
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    const saved = await Product.findById(newProduct._id);

    return NextResponse.json(
      {
        ...saved.toObject(),
        displayPrice:
          saved.discountPrice > 0 ? saved.discountPrice : saved.price,
        hasDiscount:
          saved.discountPrice > 0 && saved.discountPrice < saved.price,
        discountPercent: saved.discountPercentage,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ POST ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectDB();
  try {
    const body = await req.json();
    const {
      id,
      name,
      image,
      price,
      discountPrice,
      discountPercentage,
      gender,
      category,
      description,
      stock,
      hasSizes,
      sizes,
    } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update basic fields
    if (name?.trim()) product.name = name.trim();
    if (image) product.image = image;
    if (gender) product.gender = gender;
    if (category) product.category = category;
    if (description !== undefined) product.description = description;

    product.hasSizes = hasSizes || false;

    // Handle sizes
    if (hasSizes && sizes && sizes.length > 0) {
      product.sizes = sizes;
      // Update base fields from first size
      product.price = sizes[0].price;
      product.stock = sizes[0].stock || 0;
      product.discountPrice = sizes[0].discountPrice || 0;
      product.discountPercentage = sizes[0].discountPercentage || 0;
    } else {
      // Regular product update
      let finalDiscountPrice = Number(discountPrice) || 0;
      let finalDiscountPercentage = Number(discountPercentage) || 0;

      if (finalDiscountPercentage > 0 && finalDiscountPrice === 0) {
        finalDiscountPrice = Math.round(
          Number(price) * (1 - finalDiscountPercentage / 100)
        );
      }

      if (finalDiscountPrice >= Number(price) || finalDiscountPrice < 0) {
        finalDiscountPrice = 0;
        finalDiscountPercentage = 0;
      }

      product.discountPrice = finalDiscountPrice;
      product.discountPercentage = finalDiscountPercentage;
      if (price) product.price = Number(price);
      if (stock !== undefined) product.stock = Number(stock);
      product.sizes = [];
    }

    await product.save();

    const saved = await Product.findById(product._id);

    return NextResponse.json({
      ...saved.toObject(),
      displayPrice: saved.discountPrice > 0 ? saved.discountPrice : saved.price,
      hasDiscount: saved.discountPrice > 0 && saved.discountPrice < saved.price,
      discountPercent: saved.discountPercentage,
    });
  } catch (err) {
    console.error("❌ PUT ERROR:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort");

  try {
    if (id) {
      const product = await Product.findById(id);
      if (!product)
        return NextResponse.json({ error: "Not found" }, { status: 404 });

      return NextResponse.json({
        ...product.toObject(),
        displayPrice:
          product.discountPrice > 0 ? product.discountPrice : product.price,
        hasDiscount:
          product.discountPrice > 0 && product.discountPrice < product.price,
        discountPercent: product.discountPercentage,
      });
    }

    const query = {};

    if (gender && gender !== "") {
      query.gender = gender;
    }

    if (category && category !== "") {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice && minPrice !== "") {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice && maxPrice !== "") {
        query.price.$lte = Number(maxPrice);
      }
    }

    const sortObj = {};
    if (sort === "price-asc") sortObj.price = 1;
    else if (sort === "price-desc") sortObj.price = -1;
    else if (sort === "name-asc") sortObj.name = 1;
    else if (sort === "name-desc") sortObj.name = -1;
    else if (sort === "discount-desc") sortObj.discountPercentage = -1;

    const products = await Product.find(query).sort(sortObj);

    const result = products.map((p) => ({
      ...p.toObject(),
      displayPrice: p.discountPrice > 0 ? p.discountPrice : p.price,
      hasDiscount: p.discountPrice > 0 && p.discountPrice < p.price,
      discountPercent: p.discountPercentage,
    }));

    return NextResponse.json(result);
  } catch (err) {
    console.error("GET ERROR:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const { id } = await req.json();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
