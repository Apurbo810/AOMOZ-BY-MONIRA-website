"use client";

import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "next/link";

export default function PaymentSuccessPage({ searchParams }) {
  const trxID = searchParams?.trxID;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-green-200 animate-fadeIn">
        
        <AiOutlineCheckCircle className="text-green-600 text-7xl mx-auto mb-4 animate-bounce" />

        <h1 className="text-4xl font-extrabold text-green-700 tracking-wide">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mt-4 text-lg">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

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
      </div>
    </div>
  );
}