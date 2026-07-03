"use client";

import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from "next/link";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccessPage({ searchParams }) {
  const trxID = searchParams?.tran_id;
  const { clearCart } = useCart();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    // Clear the persisted cart directly in localStorage, not just the
    // React state. CartProvider's own hydration effect (in CartContext)
    // also runs on this page load and re-reads localStorage — depending
    // on effect ordering it can fire before or after this effect. By
    // wiping localStorage here too, both effects converge on an empty
    // cart no matter which one runs first:
    //   - if this effect runs first: localStorage is emptied, then
    //     hydration reads nothing and sets cart to []
    //   - if hydration runs first: it loads the old cart, but this
    //     effect immediately clears both localStorage and state after
    if (typeof window !== "undefined") {
      const cartKey = session?.user?.email
        ? `cart_${session.user.email}`
        : "cart_guest";
      localStorage.removeItem(cartKey);
    }

    clearCart();
  }, [status, session]);

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
              Transaction ID:
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