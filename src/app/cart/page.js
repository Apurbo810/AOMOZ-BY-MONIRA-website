"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { FiPlus, FiMinus, FiShoppingBag, FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// Must match the lineKey logic in CartContext
const lineKey = (id, size) => `${id}_${size || "nosize"}`;

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

        // Only need one fetch per unique product _id, even if multiple sizes are in cart
        const uniqueIds = [...new Set(cart.map((item) => item._id))];

        const productPromises = uniqueIds.map(async (id) => {

          const res = await fetch(`/api/products?id=${id}`);

          if (res.ok) {
            const product = await res.json();
            return { id, product };
          }

          return { id, product: null };

        });

        const results = await Promise.all(productPromises);

        const productMap = {};

        results.forEach(({ id, product }) => {
          productMap[id] = product;
        });

        const stockMap = {};

        cart.forEach((item) => {

          const product = productMap[item._id];
          const key = lineKey(item._id, item.size);

          if (!product) {
            stockMap[key] = 0;
            return;
          }

          if (product.hasSizes && product.sizes?.length > 0) {

            const sizeEntry = product.sizes.find(
              (s) => s.size === item.size
            );

            stockMap[key] = sizeEntry?.stock || 0;

          } else {

            stockMap[key] = product.stock || 0;

          }

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
        acc + (item.displayPrice || item.price) * item.quantity,
      0
    );

  const DELIVERY_CHARGE = 50;

  const grandTotal =
    subtotal + DELIVERY_CHARGE;

  const hasStockIssue =
    cart.some((item) => {

      const availableStock =
        stockData[lineKey(item._id, item.size)] || 0;

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

              {hasStockIssue && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                  <FiAlertCircle />
                  <span>
                    Some items in your cart exceed available stock. Please adjust quantities before checkout.
                  </span>
                </div>
              )}

              {cart.map((item) => {

                const key = lineKey(item._id, item.size);

                const availableStock =
                  stockData[key] || 0;

                const itemPrice = item.displayPrice || item.price;

                const exceedsStock = item.quantity > availableStock;

                return (

                  <div
                    key={key}
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

                        {item.size && (
                          <p className="text-sm text-gray-500 mt-1">
                            Size: <span className="font-semibold text-gray-700">{item.size}</span>
                          </p>
                        )}

                        <p className="text-[var(--color-accent)] font-bold text-lg mt-1">
                          ৳{itemPrice}
                        </p>

                        {exceedsStock && (
                          <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                            <FiAlertCircle size={12} />
                            Only {availableStock} available
                          </p>
                        )}

                        {/* Quantity */}
                        <div className="flex items-center gap-3 mt-4">

                          <button
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity - 1,
                                item.size
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
                                item.quantity + 1,
                                item.size
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
                          removeFromCart(item._id, item.size)
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

              {hasStockIssue ? (
                <button
                  disabled
                  className="block w-full text-center mt-6 bg-gray-300 text-white py-3 rounded-xl font-bold cursor-not-allowed"
                >
                  Resolve Stock Issues First
                </button>
              ) : (
                <Link
                  href="/checkout"
                  className="block w-full text-center mt-6 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-3 rounded-xl font-bold"
                >
                  Proceed to Checkout
                </Link>
              )}

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