// app/api/payment/bkash/grant-token/route.js
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch(
      `${process.env.BKASH_BASE_URL}/checkout/token/grant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          username: process.env.BKASH_USERNAME,
          password: process.env.BKASH_PASSWORD,
        },
        body: JSON.stringify({
          app_key: process.env.BKASH_APP_KEY,
          app_secret: process.env.BKASH_APP_SECRET,
        }),
      }
    );

    const data = await response.json();

    if (data.statusCode === "0000") {
      return NextResponse.json({
        success: true,
        id_token: data.id_token,
      });
    } else {
      return NextResponse.json(
        { success: false, error: data.statusMessage },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("bKash Grant Token Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get bKash token" },
      { status: 500 }
    );
  }
}