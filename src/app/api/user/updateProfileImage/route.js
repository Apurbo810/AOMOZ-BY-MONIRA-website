import mongoose from "mongoose";
import User from "@/app/models/User";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // Ensure Node.js runtime for MongoDB

export async function POST(req) {
  try {
    // Connect to DB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL);
    }

    // Verify logged-in user
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get form data
    const formData = await req.formData();
    const name = formData.get("name")?.trim();
    const phone = formData.get("phone")?.trim();
    const address = formData.get("address")?.trim();
    const profileImage = formData.get("profileImage")?.trim();

    // Only allow updates for specific fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (phone) updateFields.phone = phone;
    if (address) updateFields.address = address;
    if (profileImage) updateFields.profileImage = profileImage;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      token.sub,
      { $set: updateFields },
      { new: true }
    ).lean();

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id.toString(),
        name: updatedUser.name,
        email: updatedUser.email, // Email cannot be updated
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
        profileImage: updatedUser.profileImage || "",
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
