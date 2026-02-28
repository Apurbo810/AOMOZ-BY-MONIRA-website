"use client";

import { AiOutlineCloseCircle } from "react-icons/ai";
import Link from "next/link";

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-red-50 to-red-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-red-200 animate-fadeIn">
        
        <AiOutlineCloseCircle className="text-red-600 text-7xl mx-auto mb-4 animate-pulse" />

        <h1 className="text-4xl font-extrabold text-red-700 tracking-wide">
          Payment Failed!
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Something went wrong. Please try again.
        </p>

        <Link
          href="/checkout"
          className="mt-8 inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl shadow-md font-semibold transition"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
