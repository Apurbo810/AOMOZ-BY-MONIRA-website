import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Order from "@/app/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";


// Connect MongoDB safely
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URL);
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Monthly stats
    const monthlyStats = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // Current month number (1–12)
    const currentMonth = new Date().getMonth() + 1;

    // Daily stats for current month
    const dailyStats = await Order.aggregate([
      {
        $match: {
          $expr: { $eq: [{ $month: "$createdAt" }, currentMonth] },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // Overall stats
    const totalStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: "$total" },
        },
      },
    ]);

    return NextResponse.json({
      monthlyStats,
      dailyStats,
      totalStats: totalStats[0] || { totalOrders: 0, totalRevenue: 0 },
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
