import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Order from "@/app/models/Order";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = Object.fromEntries(body);

    console.log("SUCCESS DATA:", data);

    await connectDB();

    await Order.findOneAndUpdate(
      { order_id: data.tran_id },
      { payment_status: "Completed", status: "Confirmed" }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?tran_id=${data.tran_id}`,
      { status: 302 }
    );

  } catch (err) {
    console.error("Success error:", err);
    return NextResponse.json({ error: "Success callback error" });
  }
}