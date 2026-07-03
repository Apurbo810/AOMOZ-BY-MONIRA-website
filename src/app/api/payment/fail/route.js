import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Order from "@/app/models/Order";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = Object.fromEntries(body);

    console.log("PAYMENT FAILED CALLBACK:", data);

    await connectDB();

    await Order.findOneAndUpdate(
      { order_id: data.tran_id },
      { payment_status: "Failed" }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment-fail?tran_id=${data.tran_id}`,
      { status: 302 }
    );

  } catch (err) {
    console.error("Fail callback error:", err);
    return NextResponse.json({ error: "Fail callback error" });
  }
}