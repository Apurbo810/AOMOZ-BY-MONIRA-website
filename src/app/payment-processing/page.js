'use client';

import { Suspense } from "react";
import PaymentProcessingContent from "./PaymentProcessingContent";

export default function PaymentProcessingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-50 to-pink-100 p-6">
        <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg text-center border border-pink-200">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-600 mx-auto mb-6"></div>
          <h1 className="text-3xl font-extrabold text-pink-700 tracking-wide">
            Loading...
          </h1>
          <p className="text-gray-600 mt-4">
            Please wait a moment.
          </p>
        </div>
      </div>
    }>
      <PaymentProcessingContent />
    </Suspense>
  );
}