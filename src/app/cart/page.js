"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { FiPlus, FiMinus, FiShoppingBag, FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CartPage() {

  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const [stockData, setStockData] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStockData = async () => {

      if (cart.length === 0) {
        setLoading(false);
        return;
      }

      try {

        const stockPromises = cart.map(async (item) => {

          const res = await fetch(`/api/products?id=${item._id}`);

          if (res.ok) {

            const product = await res.json();

            return {
              id: item._id,
              stock: product.stock || 0,
            };

          }

          return {
            id: item._id,
            stock: 0,
          };

        });

        const stocks = await Promise.all(stockPromises);

        const stockMap = {};

        stocks.forEach((s) => {
          stockMap[s.id] = s.stock;
        });

        setStockData(stockMap);

      } catch {

        toast.error("Failed to fetch stock");

      } finally {

        setLoading(false);

      }

    };

    fetchStockData();

  }, [cart]);

  const subtotal =
    cart.reduce(
      (acc, item) =>
        acc + item.price * item.quantity,
      0
    );

  const DELIVERY_CHARGE = 50;

  const grandTotal =
    subtotal + DELIVERY_CHARGE;

  const hasStockIssue =
    cart.some((item) => {

      const availableStock =
        stockData[item._id] || 0;

      return item.quantity >
        availableStock;

    });

  return (

    <div className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-20 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[800px] h-[800px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/4 -top-40"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="mb-12">

          <div className="flex items-center gap-3">

            <div className="bg-[var(--color-primary)] p-3 rounded-2xl">

              <FiShoppingBag className="text-white text-2xl" />

            </div>

            <h1 className="text-4xl font-bold text-gray-900">
              Shopping Cart
            </h1>

          </div>

          <p className="text-gray-600 ml-16">
            {cart.length} items in cart
          </p>

        </div>

        {cart.length === 0 ? (

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-16 text-center">

            <AiOutlineShoppingCart className="text-gray-300 text-8xl mx-auto mb-6" />

            <h2 className="text-2xl font-bold mb-3">
              Your cart is empty
            </h2>

            <Link
              href="/products"
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-xl font-semibold"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-3 gap-8">

            {/* Items */}
            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => {

                const availableStock =
                  stockData[item._id] || 0;

                return (

                  <div
                    key={item._id}
                    className="bg-white rounded-2xl border border-gray-200 p-6"
                  >

                    <div className="flex gap-4">

                      <div className="relative w-32 h-32">

                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-xl"
                        />

                      </div>

                      <div className="flex-1">

                        <h2 className="font-bold text-xl">
                          {item.name}
                        </h2>

                        <p className="text-[var(--color-accent)] font-bold text-lg">
                          ৳{item.price}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-4">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity - 1
                              )
                            }
                            className="p-2 border rounded-lg hover:bg-gray-100"
                          >
                            <FiMinus />
                          </button>

                          <span className="font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity + 1
                              )
                            }
                            className="p-2 border rounded-lg hover:bg-gray-100"
                          >
                            <FiPlus />
                          </button>

                        </div>

                      </div>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          removeFromCart(item._id)
                        }
                        className="text-gray-400 hover:text-[var(--color-primary)]"
                      >
                        <AiFillDelete size={22} />
                      </button>

                    </div>

                  </div>

                );

              })}

            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 h-fit">

              <h2 className="text-xl font-bold mb-4">
                Order Summary
              </h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Delivery</span>
                <span>৳{DELIVERY_CHARGE}</span>
              </div>

              <div className="flex justify-between font-bold text-lg text-[var(--color-primary)]">
                <span>Total</span>
                <span>৳{grandTotal}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full text-center mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-xl font-bold"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={clearCart}
                className="w-full mt-3 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl"
              >
                Clear Cart
              </button>

            </div>

          </div>

        )}

      </div>

    </div>

  );

}