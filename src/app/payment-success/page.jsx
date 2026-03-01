"use client";

import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "next/link";

export default function PaymentSuccessPage({ searchParams }) {
  const trxID = searchParams?.trxID;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[var(--color-bg-primary)] p-6 relative overflow-hidden">

      {/* Luxury Glow Background */}
      <div className="absolute w-[800px] h-[800px] bg-[var(--color-primary)]/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg text-center border border-gray-200 relative z-10">

        {/* Success Icon */}
        <AiOutlineCheckCircle className="text-[var(--color-primary)] text-7xl mx-auto mb-4 animate-bounce" />

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-[var(--color-primary)] tracking-wide">
          Payment Successful!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mt-4 text-lg">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* Transaction ID */}
        {trxID && (
          <p className="mt-3 font-semibold text-gray-800">
            <span className="text-[var(--color-accent)]">
              bKash Transaction ID:
            </span>{" "}
            {trxID}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-8 space-y-3">

          {/* Primary Button */}
          <Link
            href="/orders"
            className="block w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-xl shadow-md font-semibold transition"
          >
            View My Orders
          </Link>

          {/* Outline Button */}
          <Link
            href="/products"
            className="block w-full bg-white hover:bg-gray-50 text-[var(--color-primary)] border-2 border-[var(--color-primary)] px-8 py-3 rounded-xl shadow-md font-semibold transition"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}