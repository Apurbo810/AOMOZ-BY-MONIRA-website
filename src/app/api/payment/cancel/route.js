import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("PAYMENT CANCEL CALLBACK");

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
    { status: 302 }
  );
}
