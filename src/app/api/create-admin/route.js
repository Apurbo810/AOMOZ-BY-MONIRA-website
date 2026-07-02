export const runtime = "nodejs";

import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    const email = "admin1@aomoz.com";
    const password = "admin123";

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      phone: "",
      address: "",
      profileImage: "",
      admin: true,
    });

    return NextResponse.json({ message: "Admin created successfully" });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}