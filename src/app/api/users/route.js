export const runtime = "nodejs"; // Ensure Node.js runtime

import mongoose from "mongoose";
import User from "@/app/models/User";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Connect DB safely
async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URL);
  }
}

// GET - Fetch all users (Admin only)
export async function GET(req) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const users = await User.find({}, "-password").lean();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE - Delete a user by ID (Admin only)
export async function DELETE(req) {
  try {
    await connectDB();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token?.admin) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ message: "User ID is required" }, { status: 400 });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
