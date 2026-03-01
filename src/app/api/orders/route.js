// app/api/orders/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/app/models/Order";
import Product from "@/app/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch orders", details: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const data = await req.json();

    console.log("📦 Processing order with items:", data.items);

    const stockErrors = [];
    
    for (const item of data.items) {
      const product = await Product.findById(item._id);
      
      if (!product) {
        return NextResponse.json(
          { error: `Product "${item.name}" not found` },
          { status: 404 }
        );
      }

      const requestedQty = item.quantity || 1;
      const availableStock = product.stock || 0;

      if (availableStock < requestedQty) {
        if (availableStock === 0) {
          stockErrors.push(`"${item.name}" is out of stock`);
        } else {
          stockErrors.push(`Only ${availableStock} units available for "${item.name}" (you requested ${requestedQty})`);
        }
      }
    }

    if (stockErrors.length > 0) {
      return NextResponse.json(
        { error: stockErrors.join(". ") },
        { status: 400 }
      );
    }

    let subtotal = 0;
    let discountTotal = 0;
    const orderItems = [];

    for (const item of data.items) {
      const product = await Product.findById(item._id);
      
      const itemPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
      const itemDiscount = product.price - itemPrice;
      
      const itemSubtotal = itemPrice * (item.quantity || 1);
      subtotal += itemSubtotal;
      discountTotal += itemDiscount * (item.quantity || 1);
      
      orderItems.push({
        ...item,
        originalPrice: product.price,
        discountPrice: itemPrice,
        itemTotal: itemSubtotal
      });
    }

    const total = subtotal;

    const orderData = {
      ...data,
      items: orderItems,
      subtotal,
      discountTotal,
      total,
      originalTotal: subtotal,
      updatedAt: new Date(),
    };

    // Only deduct stock for COD (bKash will deduct after successful payment)
    if (data.payment_method === "COD") {
      for (const item of data.items) {
        const requestedQty = item.quantity || 1;
        await Product.findByIdAndUpdate(
          item._id,
          { $inc: { stock: -requestedQty } }
        );
      }
    }

    const order = await Order.create(orderData);
    return NextResponse.json(order, { status: 201 });

  } catch (err) {
    console.error("❌ Order creation error:", err);
    return NextResponse.json(
      { error: "Failed to create order", details: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { orderId, status, admin_notes, bkash_trx_id } = body;

    const session = await getServerSession(authOptions);
    if (!session?.user?.admin) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    const updateData = { updatedAt: new Date() };
    
    if (status !== undefined) {
      updateData.status = status;
    }
    
    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes;
    }

    if (bkash_trx_id !== undefined) {
      updateData.bkash_trx_id = bkash_trx_id;
    }

    const updated = await Order.findOneAndUpdate(
      { order_id: orderId },
      updateData,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("❌ Order update error:", err);
    return NextResponse.json(
      { error: "Failed to update order", details: err.message },
      { status: 500 }
    );
  }
}