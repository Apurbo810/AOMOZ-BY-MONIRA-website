// app/api/payment/bkash/execute-payment/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { paymentID, token } = await req.json();

    const response = await fetch(
      `${process.env.BKASH_BASE_URL}/checkout/payment/execute/${paymentID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: token,
          "x-app-key": process.env.BKASH_APP_KEY,
        },
      }
    );

    const data = await response.json();

    if (data.statusCode === "0000") {
      return NextResponse.json({
        success: true,
        paymentID: data.paymentID,
        trxID: data.trxID,
        transactionStatus: data.transactionStatus,
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.statusMessage },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("bKash Execute Payment Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to execute bKash payment" },
      { status: 500 }
    );
  }
}