import Product from "@/app/models/Product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";


/* ================= DATABASE ================= */

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}


/* ================= CREATE PRODUCT ================= */

export async function POST(req) {

  await connectDB();

  try {

    const body = await req.json();

    const {
      name,
      image,
      images,
      price,
      discountPrice,
      discountPercentage,
      gender,
      category,
      color,
      colors,
      description,
      stock,
      hasSizes,
      sizes,
      isFeatured,
      isTopSelling
    } = body;


    if (!name || !image || !category) {

      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    }


    const productData = {

      name: name.trim(),

      image,

      images: images || [],

      category,

      color: color || "",

      colors: colors || [],

      description: description || "",

      hasSizes: hasSizes || false,

      isFeatured: isFeatured || false,

      isTopSelling: isTopSelling || false,

    };


    /* Handle sizes */

    if (hasSizes && sizes && sizes.length > 0) {

      productData.sizes = sizes;

      productData.price = sizes[0].price;

      productData.stock = sizes[0].stock || 0;

      productData.discountPrice =
        sizes[0].discountPrice || 0;

      productData.discountPercentage =
        sizes[0].discountPercentage || 0;

    }

    else {

      let finalDiscountPrice =
        Number(discountPrice) || 0;

      let finalDiscountPercentage =
        Number(discountPercentage) || 0;


      if (
        finalDiscountPercentage > 0 &&
        finalDiscountPrice === 0
      ) {

        finalDiscountPrice =
          Math.round(
            Number(price) *
            (1 - finalDiscountPercentage / 100)
          );

      }


      if (
        finalDiscountPrice >= Number(price) ||
        finalDiscountPrice < 0
      ) {

        finalDiscountPrice = 0;
        finalDiscountPercentage = 0;

      }


      productData.price = Number(price);

      productData.stock = Number(stock) || 0;

      productData.discountPrice =
        finalDiscountPrice;

      productData.discountPercentage =
        finalDiscountPercentage;

      productData.sizes = [];

    }


    const newProduct =
      new Product(productData);

    await newProduct.save();


    const saved =
      await Product.findById(newProduct._id);


    return NextResponse.json({

      ...saved.toObject(),

      displayPrice:
        saved.discountPrice > 0
          ? saved.discountPrice
          : saved.price,

      hasDiscount:
        saved.discountPrice > 0 &&
        saved.discountPrice < saved.price,

      discountPercent:
        saved.discountPercentage,

    }, { status: 201 });


  }

  catch (err) {

    console.error("POST ERROR:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }

}



/* ================= UPDATE PRODUCT ================= */

export async function PUT(req) {

  await connectDB();

  try {

    const body = await req.json();

    const {
      id,
      name,
      image,
      images,
      price,
      discountPrice,
      discountPercentage,
      category,
      color,
      colors,
      description,
      stock,
      hasSizes,
      sizes,
      isFeatured,
      isTopSelling
    } = body;


    if (!id)
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );


    const product =
      await Product.findById(id);


    if (!product)
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );


    if (name) product.name = name;

    if (image) product.image = image;

    if (images) product.images = images;

    if (category) product.category = category;

    if (color) product.color = color;

    if (colors) product.colors = colors;

    if (description !== undefined)
      product.description = description;

    if (isFeatured !== undefined)
      product.isFeatured = isFeatured;

    if (isTopSelling !== undefined)
      product.isTopSelling = isTopSelling;


    product.hasSizes = hasSizes || false;


    if (hasSizes && sizes?.length > 0) {

      product.sizes = sizes;

      product.price = sizes[0].price;

      product.stock = sizes[0].stock || 0;

      product.discountPrice =
        sizes[0].discountPrice || 0;

      product.discountPercentage =
        sizes[0].discountPercentage || 0;

    }

    else {

      let finalDiscountPrice =
        Number(discountPrice) || 0;

      let finalDiscountPercentage =
        Number(discountPercentage) || 0;


      if (
        finalDiscountPercentage > 0 &&
        finalDiscountPrice === 0
      ) {

        finalDiscountPrice =
          Math.round(
            Number(price) *
            (1 - finalDiscountPercentage / 100)
          );

      }


      product.discountPrice =
        finalDiscountPrice;

      product.discountPercentage =
        finalDiscountPercentage;

      if (price)
        product.price = Number(price);

      if (stock !== undefined)
        product.stock = Number(stock);

      product.sizes = [];

    }


    await product.save();


    const saved =
      await Product.findById(product._id);


    return NextResponse.json({

      ...saved.toObject(),

      displayPrice:
        saved.discountPrice > 0
          ? saved.discountPrice
          : saved.price,

      hasDiscount:
        saved.discountPrice > 0 &&
        saved.discountPrice < saved.price,

      discountPercent:
        saved.discountPercentage,

    });

  }

  catch (err) {

    console.error("PUT ERROR:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }

}



/* ================= GET PRODUCTS ================= */

export async function GET(req) {

  await connectDB();

  try {

    const { searchParams } =
      new URL(req.url);

    const id =
      searchParams.get("id");

    const category =
      searchParams.get("category");

    const color =
      searchParams.get("color");

    const featured =
      searchParams.get("featured");

    const sort =
      searchParams.get("sort");

    const minPrice =
      searchParams.get("minPrice");

    const maxPrice =
      searchParams.get("maxPrice");


    if (id) {

      const product =
        await Product.findById(id).lean();

      if (!product)
        return NextResponse.json(
          { error: "Not found" },
          { status: 404 }
        );

      return NextResponse.json(product);

    }


    const query = {};

    if (category)
      query.category = category;

    if (color)
      query.$or = [
        { color },
        { colors: color }
      ];

    if (featured === "true")
      query.isFeatured = true;


    if (minPrice || maxPrice) {

      query.price = {};

      if (minPrice)
        query.price.$gte =
          Number(minPrice);

      if (maxPrice)
        query.price.$lte =
          Number(maxPrice);

    }


    const sortObj = {};

    if (sort === "price-asc")
      sortObj.price = 1;

    else if (sort === "price-desc")
      sortObj.price = -1;

    else if (sort === "top-selling")
      sortObj.soldCount = -1;

    else
      sortObj.createdAt = -1;


    const products =
      await Product
        .find(query)
        .sort(sortObj)
        .lean();


    return NextResponse.json(products);

  }

  catch (err) {

    console.error("GET ERROR:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }

}



/* ================= DELETE ================= */

export async function DELETE(req) {

  await connectDB();

  try {

    const { id } =
      await req.json();

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Deleted"
    });

  }

  catch (err) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );

  }

}