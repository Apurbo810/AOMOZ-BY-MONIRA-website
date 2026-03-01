"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CheckoutPage() {

  const { cart, clearCart } = useCart();

  const { data: session } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [name, setName] =
    useState(session?.user?.name || "");

  const [phone, setPhone] =
    useState(session?.user?.phone || "");

  const [address, setAddress] =
    useState("");

  const total =
    cart.reduce(
      (acc, item) =>
        acc + item.price * item.quantity,
      0
    );

  const vat = total * 0.05;

  const grandTotal = total + vat;

  const handlePayment = async () => {

    if (!session)
      return router.push("/login");

    if (!name || !phone || !address) {
      toast.error("Please fill all fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setLoading(true);

    const order_id = uuidv4();

    try {

      await axios.post("/api/orders", {

        order_id,

        items: cart,

        total: grandTotal,

        payment_method: "COD",

        user_email: session.user.email,

        status: "Pending",

        customer_name: name,

        customer_phone: phone,

        customer_address: address,

        createdAt: new Date(),

      });

      clearCart();

      toast.success(
        "Order placed successfully!"
      );

      router.push("/orders");

    } catch (error) {

      toast.error(
        "Error processing order"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[var(--color-bg-primary)] px-6 py-16 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[900px] h-[900px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-[var(--color-primary)] mb-10 text-center">
          Checkout
        </h1>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-gray-200 space-y-6">

          {/* Inputs */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          />

          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          />

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-xl">

            <h3 className="font-semibold text-[var(--color-primary)] mb-3">
              Order Summary
            </h3>

            {cart.map((item) => (

              <div
                key={item._id}
                className="flex justify-between text-gray-600"
              >

                <span>
                  {item.name} x {item.quantity}
                </span>

                <span>
                  ৳ {item.price * item.quantity}
                </span>

              </div>

            ))}

          </div>

          {/* Totals */}
          <div className="text-gray-700">

            <p>
              <b>Total:</b> ৳ {total.toFixed(2)}
            </p>

            <p>
              <b>VAT:</b> ৳ {vat.toFixed(2)}
            </p>

            <p className="text-xl font-bold text-[var(--color-accent)]">
              Grand Total: ৳ {grandTotal.toFixed(2)}
            </p>

          </div>

          {/* COD Button */}
          <button
            onClick={() =>
              setPaymentMethod("cod")
            }
            className="w-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-white hover:bg-[var(--color-primary)] hover:text-white py-3 rounded-xl font-semibold transition"
          >
            Cash on Delivery
          </button>

        </div>

        {/* Place Order */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl bg-[var(--color-primary)] text-white font-semibold shadow-md hover:bg-[var(--color-primary-hover)] transition disabled:bg-gray-300"
        >
          {loading
            ? "Processing..."
            : "Place Order"}
        </button>

        {/* Back */}
        <Link
          href="/cart"
          className="block text-center mt-6 text-gray-600 hover:text-[var(--color-primary)] underline"
        >
          Back to Cart
        </Link>

      </div>

    </div>

  );

}