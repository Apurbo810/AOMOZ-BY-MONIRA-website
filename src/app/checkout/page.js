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

        const total = cart.reduce(
          (acc, item) =>
            acc + (item.displayPrice || item.price) * item.quantity,
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

          items: cart.map((item) => ({
            _id: item._id,
            productId: item._id,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
          })),

        total: grandTotal,

        payment_method: paymentMethod === "online" ? "SSLCOMMERZ" : "COD",

        user_email: session.user.email,

        status: "Pending",

        customer_name: name,

        customer_phone: phone,

        customer_address: address,

        createdAt: new Date(),

      });

      if (paymentMethod === "online") {

        const { data } = await axios.post(
          "/api/payment/sslcommerz-payment",
          {
            amount: grandTotal,
            customer_name: name,
            customer_email: session.user.email,
            customer_phone: phone,
            customer_address: address,
            order_id,
          }
        );

        if (data.GatewayPageURL) {
          // Don't clear the cart here — payment isn't confirmed yet.
          // If the user cancels or the payment fails, they should still
          // have their cart. The cart is only cleared on /payment-success
          // once SSLCommerz confirms the transaction.
          window.location.href = data.GatewayPageURL;
          return;
        }

        toast.error("Could not start payment. Try again.");
        setLoading(false);
        return;

      }

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

        {/* Payment Method */}
          <div className="grid grid-cols-2 gap-3">

            <button
              onClick={() => setPaymentMethod("cod")}
              className={`border-2 py-3 rounded-xl font-semibold transition ${
                paymentMethod === "cod"
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "border-[var(--color-primary)] text-[var(--color-primary)] bg-white"
              }`}
            >
              Cash on Delivery
            </button>

            <button
              onClick={() => setPaymentMethod("online")}
              className={`border-2 py-3 rounded-xl font-semibold transition ${
                paymentMethod === "online"
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "border-[var(--color-primary)] text-[var(--color-primary)] bg-white"
              }`}
            >
              Online Payment
            </button>

          </div>

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