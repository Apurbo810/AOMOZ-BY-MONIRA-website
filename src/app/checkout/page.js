'use client';
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
  const [paymentMethod, setPaymentMethod] = useState("cod"); // default COD

  const [name, setName] = useState(session?.user?.name || "");
  const [phone, setPhone] = useState(session?.user?.phone || "");
  const [address, setAddress] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = total * 0.05;
  const grandTotal = total + vat;

  const handlePayment = async () => {
    if (!session) return router.push("/login");
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
      // Only COD is shown on frontend, but bKash logic stays for future
      if (paymentMethod === "cod") {
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
        toast.success("Order placed successfully!");
        router.push("/orders");
      } else {
        // bKash logic preserved but not called from frontend
        console.log("bKash logic will execute via API when integrated");
      }
    } catch (error) {
      console.error("Order error:", error);
      toast.error("Error processing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16 relative overflow-hidden">
      <div className="absolute w-[900px] h-[900px] bg-red-500/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h1 className="text-4xl font-extrabold text-red-600 mb-10 tracking-wide text-center">
          Checkout
        </h1>

        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-md border border-red-200/40 space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition"
          />

          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none transition"
          />

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between text-gray-600">
                  <span>{item.name} x {item.quantity}</span>
                  <span>৳ {item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-gray-700 space-y-1">
            <p><b>Total:</b> ৳ {total.toFixed(2)}</p>
            <p><b>VAT (5%):</b> ৳ {vat.toFixed(2)}</p>
            <p className="text-xl font-bold text-red-600">
              Grand Total: ৳ {grandTotal.toFixed(2)}
            </p>
          </div>

          {/* Only COD payment button shown */}
          <div className="mt-4 grid gap-3">
            <button
              onClick={() => setPaymentMethod("cod")}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-red-500 bg-red-50 text-red-600 font-semibold transition"
            >
              Cash on Delivery
            </button>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 transition active:scale-95 disabled:bg-gray-300"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>

        <Link
          href="/cart"
          className="block text-center mt-6 text-gray-600 hover:text-red-600 underline"
        >
          Back to Cart
        </Link>
      </div>
    </div>
  );
}
