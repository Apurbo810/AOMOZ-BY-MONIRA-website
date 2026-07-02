// app/api/payment/bkash/create-payment/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, orderId, token } = await req.json();

    const response = await fetch(
      `${process.env.BKASH_BASE_URL}/checkout/payment/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: token,
          "x-app-key": process.env.BKASH_APP_KEY,
        },
        body: JSON.stringify({
          mode: "0011", // Checkout mode
          payerReference: " ",
          callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/bkash/callback`,
          amount: amount.toString(),
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: orderId,
        }),
      }
    );

    const data = await response.json();

    if (data.statusCode === "0000") {
      return NextResponse.json({
        success: true,
        paymentID: data.paymentID,
        bkashURL: data.bkashURL,
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.statusMessage },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("bKash Create Payment Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create bKash payment" },
      { status: 500 }
    );
  }
}