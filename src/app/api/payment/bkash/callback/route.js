// app/api/payment/bkash/callback/route.js
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const paymentID = searchParams.get("paymentID");
    const status = searchParams.get("status");

    if (status === "success" && paymentID) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-processing?paymentID=${paymentID}`,
        { status: 302 }
      );
    } else if (status === "cancel") {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
        { status: 302 }
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment-fail`,
        { status: 302 }
      );
    }
  } catch (error) {
    console.error("bKash Callback Error:", error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment-fail`,
      { status: 302 }
    );
  }
}