"use client";
<<<<<<< HEAD

=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineShoppingCart, AiFillDelete } from "react-icons/ai";
import { FiPlus, FiMinus, FiShoppingBag, FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function CartPage() {
<<<<<<< HEAD

  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

  const [stockData, setStockData] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchStockData = async () => {

=======
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [stockData, setStockData] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch stock data for all cart items
  useEffect(() => {
    const fetchStockData = async () => {
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      if (cart.length === 0) {
        setLoading(false);
        return;
      }

      try {
<<<<<<< HEAD

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
=======
        const stockPromises = cart.map(async (item) => {
          const res = await fetch(`/api/products?id=${item._id}`);
          if (res.ok) {
            const product = await res.json();
            return { id: item._id, stock: product.stock || 0 };
          }
          return { id: item._id, stock: 0 };
        });

        const stocks = await Promise.all(stockPromises);
        const stockMap = {};
        stocks.forEach((s) => {
          stockMap[s.id] = s.stock;
        });
        setStockData(stockMap);
      } catch (err) {
        console.error("Error fetching stock:", err);
        toast.error("Failed to fetch stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [cart]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const DELIVERY_CHARGE = 50;
  const grandTotal = subtotal + DELIVERY_CHARGE;

  // Check if any item exceeds stock
  const hasStockIssue = cart.some((item) => {
    const availableStock = stockData[item._id] || 0;
    return item.quantity > availableStock;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
      {/* Subtle Background Effect */}
      <div className="absolute w-[800px] h-[800px] bg-red-500/5 blur-3xl rounded-full left-1/4 -top-40 pointer-events-none"></div>
      <div className="absolute w-[600px] h-[600px] bg-red-500/5 blur-3xl rounded-full right-1/4 bottom-40 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-600 p-3 rounded-2xl shadow-lg">
              <FiShoppingBag className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
          </div>
          <p className="text-gray-600 ml-16 text-sm sm:text-base">
            {cart.length === 0 ? "No items in your cart" : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-20 text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-12 sm:p-16">
            <div className="bg-gray-50 p-8 rounded-full mb-6">
              <AiOutlineShoppingCart className="text-gray-300 text-8xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you have not added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link
              href="/products"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex items-center gap-2"
            >
              <FiShoppingBag size={20} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-600 mb-4"></div>
                  <p className="text-gray-500">Loading your cart...</p>
                </div>
              ) : (
                cart.map((item) => {
                  const availableStock = stockData[item._id] || 0;
                  const exceedsStock = item.quantity > availableStock;
                  const isOutOfStock = availableStock === 0;

                  return (
                    <div
                      key={item._id}
                      className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md ${
                        exceedsStock ? "border-red-300 bg-red-50/30" : "border-gray-100"
                      }`}
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                          {/* Product Image */}
                          <div className="relative w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.png"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                            {isOutOfStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white text-xs font-bold px-3 py-1 bg-red-600 rounded-full">
                                  Out of Stock
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 flex flex-col justify-between min-w-0">
                            <div>
                              <h2 className="font-bold text-lg sm:text-xl text-gray-900 mb-1 truncate">
                                {item.name}
                              </h2>
                              <p className="text-red-600 font-bold text-xl mb-3">
                                ৳{item.price.toLocaleString()}
                                <span className="text-gray-400 text-sm font-normal ml-2">per item</span>
                              </p>

                              {/* Stock Status */}
                              {isOutOfStock ? (
                                <div className="flex items-center gap-2 text-red-600 text-sm font-semibold bg-red-50 px-3 py-1.5 rounded-lg w-fit">
                                  <FiAlertCircle size={16} />
                                  Out of Stock
                                </div>
                              ) : exceedsStock ? (
                                <div className="flex items-start gap-2 text-red-600 text-xs font-semibold bg-red-50 px-3 py-2 rounded-lg">
                                  <FiAlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                  <span>Only {availableStock} available. Please reduce quantity.</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                  {availableStock} in stock
                                </div>
                              )}
                            </div>

                            {/* Quantity and Remove */}
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500 font-medium">Quantity:</span>
                                <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                                  <button
                                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                    className="p-2 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isOutOfStock}
                                  >
                                    <FiMinus size={16} className="text-gray-700" />
                                  </button>
                                  <span className="px-4 py-2 text-base font-bold text-gray-900 min-w-[3rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                    className="p-2 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={item.quantity >= availableStock}
                                  >
                                    <FiPlus size={16} className="text-gray-700" />
                                  </button>
                                </div>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="text-lg font-bold text-gray-900">
                                  ৳{(item.price * item.quantity).toLocaleString()}
                                </span>
                                <button
                                  onClick={() => {
                                    removeFromCart(item._id);
                                    toast.success("Item removed from cart");
                                  }}
                                  className="text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                  title="Remove item"
                                >
                                  <AiFillDelete size={22} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {/* Continue Shopping Button */}
              {!loading && cart.length > 0 && (
                <Link
                  href="/products"
                  className="block text-center text-red-600 hover:text-red-700 font-semibold py-4 transition-colors"
                >
                  ← Continue Shopping
                </Link>
              )}
            </div>

            {/* Order Summary - Sticky on large screens */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cart.length} items)</span>
                    <span className="font-semibold text-gray-900">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-gray-900">৳{DELIVERY_CHARGE}</span>
                  </div>
                  
                  <div className="pt-4 border-t-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-red-600">
                        ৳{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stock Warning */}
                {hasStockIssue && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                    <FiAlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-sm text-red-700 font-medium">
                      Some items exceed available stock. Please adjust quantities before checkout.
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link
                    href="/checkout"
                    className={`block w-full text-center px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl ${
                      hasStockIssue || loading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                        : "bg-red-600 hover:bg-red-700 text-white transform hover:-translate-y-0.5"
                    }`}
                  >
                    {hasStockIssue ? "Fix Stock Issues First" : "Proceed to Checkout"}
                  </Link>

                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to clear your cart?")) {
                        clearCart();
                        toast.success("Cart cleared successfully");
                      }
                    }}
                    className="w-full px-6 py-3 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-200"
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure checkout guaranteed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free returns within 7 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
