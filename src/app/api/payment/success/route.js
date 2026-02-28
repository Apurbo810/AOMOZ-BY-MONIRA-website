import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.formData();
    const data = Object.fromEntries(body);

    console.log("SUCCESS DATA:", data);

    // Redirect user to success page with tran_id
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?tran_id=${data.tran_id}`,
      { status: 302 }
    );

  } catch (err) {
    console.error("Success error:", err);
    return NextResponse.json({ error: "Success callback error" });
  }
}
