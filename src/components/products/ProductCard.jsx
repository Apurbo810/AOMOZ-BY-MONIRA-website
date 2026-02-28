"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProductCard({
  p,
  session,
  adminPreview = false,
  addToCart,
  onEdit,
  onDelete,
}) {
  const [selectedSize, setSelectedSize] = useState(null);

  // Initialize selected size when product loads
  useEffect(() => {
    if (p.hasSizes && p.sizes && p.sizes.length > 0 && !selectedSize) {
      setSelectedSize(p.sizes[0].ml);
    }
  }, [p, selectedSize]);

  if (!session?.user?.admin && typeof addToCart !== "function") {
    console.error("addToCart function not provided to ProductCard");
    return null;
  }

  const isAdmin = session?.user?.admin === true;
  const isCustomer = !isAdmin;

  // Handle sizes
  const hasSizes = p.hasSizes && p.sizes && p.sizes.length > 0;
  let currentPrice = p.price;
  let currentDiscountPrice = p.discountPrice || 0;
  let currentDiscountPercent = p.discountPercentage || 0;
  let currentStock = p.stock || 0;

  if (hasSizes && selectedSize) {
    const sizeData = p.sizes.find(s => s.ml === selectedSize);
    if (sizeData) {
      currentPrice = sizeData.price;
      currentDiscountPrice = sizeData.discountPrice || 0;
      currentDiscountPercent = sizeData.discountPercentage || 0;
      currentStock = sizeData.stock || 0;
    }
  }

  const hasDiscount = currentDiscountPrice > 0 && currentDiscountPrice < currentPrice;
  const displayPrice = hasDiscount ? currentDiscountPrice : currentPrice;
  const isOutOfStock = currentStock === 0;

  const handleAddToCart = () => {
    if (typeof addToCart !== "function") {
      console.error("addToCart function not provided to ProductCard");
      return;
    }

    const productToAdd = {
      ...p,
      selectedSize: hasSizes ? selectedSize : null,
      price: currentPrice,
      discountPrice: currentDiscountPrice,
      displayPrice: displayPrice,
      stock: currentStock
    };

    addToCart(productToAdd);
    toast.success(`${p.name}${hasSizes ? ` (${selectedSize}ml)` : ''} added to cart`);
  };

  return (
    <div className="relative group bg-gradient-to-b from-white via-red-50/10 to-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-500/10 blur-3xl rounded-full" />

      <div
        className="relative h-48 sm:h-56 bg-gray-50 overflow-hidden cursor-pointer"
        onClick={() => {
          if (!isAdmin) {
            window.location.href = `/products/${p.slug}`;
          }
        }}
      >
        <Image
          src={p.image}
          alt={p.name}
          fill
          className={`object-cover transition duration-300 group-hover:scale-105 ${isOutOfStock ? "opacity-60 grayscale" : ""}`}
        />

        <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-auto flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          {p.category && (
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.12em] bg-black/90 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md w-fit">
              {p.category}
            </span>
          )}

          {hasDiscount && (
            <span className="text-[9px] sm:text-[10px] bg-gradient-to-r from-red-600 to-pink-600 text-white px-2.5 py-0.5 sm:px-4 sm:py-1.5 rounded-full font-bold shadow-md border border-white/40 w-fit sm:ml-auto">
              -{currentDiscountPercent}% OFF
            </span>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1 relative z-10">
        <h3 className="font-serif text-sm sm:text-base text-gray-900 tracking-wide group-hover:text-red-600 transition font-medium">
          {p.name}
        </h3>

        <p className="text-[11px] text-gray-500 uppercase tracking-[0.2em]">
          {p.gender || "Universal"}
        </p>

        {/* SIZE SELECTOR */}
        {hasSizes && (
          <div className="flex gap-2 mt-2">
            {p.sizes.map((size) => (
              <button
                key={size.ml}
                onClick={() => setSelectedSize(size.ml)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border-2 transition-all ${
                  selectedSize === size.ml
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                }`}
              >
                {size.ml}ml
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 space-y-2">
          {hasDiscount ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="text-red-600 font-black text-xl sm:text-2xl tracking-wide drop-shadow-md">
                  ৳{displayPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400 line-through font-medium">
                  ৳{currentPrice.toLocaleString()}
                </span>
              </div>

              <span className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-3 py-1 rounded-full font-semibold inline-block shadow-sm">
                Save ৳{(currentPrice - displayPrice).toLocaleString()}
              </span>
            </>
          ) : (
            <span className="text-red-600 font-black text-xl sm:text-2xl tracking-wide">
              ৳{displayPrice.toLocaleString()}
            </span>
          )}
        </div>

        <div className="mt-auto pt-4">
          {isAdmin && !adminPreview ? (
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(p);
                }}
                className="flex-1 bg-black text-white text-xs py-2 rounded-full hover:bg-gray-900 transition font-medium"
              >
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(p._id);
                }}
                className="flex-1 bg-red-600 text-white text-xs py-2 rounded-full hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          ) : (
            isCustomer && (
              <button
                disabled={isOutOfStock}
                className={`w-full text-white text-sm py-3 rounded-full font-semibold transition-all duration-300 transform ${
                  isOutOfStock
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:bg-gray-900 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                }`}
                onClick={handleAddToCart}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}