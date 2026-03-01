"use client";

import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "next/link";

export default function PaymentSuccessPage({ searchParams }) {
  const trxID = searchParams?.trxID;

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-green-200 animate-fadeIn">
        
        <AiOutlineCheckCircle className="text-green-600 text-7xl mx-auto mb-4 animate-bounce" />

        <h1 className="text-4xl font-extrabold text-green-700 tracking-wide">
          Payment Successful!
        </h1>

>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
        <p className="text-gray-600 mt-4 text-lg">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

<<<<<<< HEAD
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

=======
        {trxID && (
          <p className="mt-3 font-semibold text-gray-800">
            <span className="text-green-700">bKash Transaction ID:</span> {trxID}
          </p>
        )}

        <div className="mt-8 space-y-3">
          <Link
            href="/orders"
            className="block w-full bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl shadow-md font-semibold transition"
          >
            View My Orders
          </Link>
          
          <Link
            href="/products"
            className="block w-full bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl shadow-md font-semibold transition"
          >
            Continue Shopping
          </Link>
        </div>
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      </div>
    </div>
  );
}