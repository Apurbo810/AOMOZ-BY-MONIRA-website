import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Order from "@/app/models/Order";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = Object.fromEntries(body);

    console.log("PAYMENT CANCEL CALLBACK:", data);

    await connectDB();

    await Order.findOneAndUpdate(
      { order_id: data.tran_id },
      { payment_status: "Failed", status: "Cancelled" }
    );

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel?tran_id=${data.tran_id}`,
      { status: 302 }
    );

  } catch (err) {
    console.error("Cancel callback error:", err);
    return NextResponse.json({ error: "Cancel callback error" });
  }
}