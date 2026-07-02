import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("PAYMENT FAILED CALLBACK");

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/payment-fail`,
    { status: 302 }
  );
}
