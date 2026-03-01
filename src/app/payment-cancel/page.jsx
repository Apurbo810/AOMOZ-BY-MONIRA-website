"use client";

import { AiOutlineWarning } from "react-icons/ai";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-yellow-200 animate-fadeIn">
        
        <AiOutlineWarning className="text-yellow-600 text-7xl mx-auto mb-4 animate-bounce" />

        <h1 className="text-4xl font-extrabold text-yellow-700 tracking-wide">
          Payment Cancelled
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          You cancelled the payment.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-xl shadow-md font-semibold transition"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
}
