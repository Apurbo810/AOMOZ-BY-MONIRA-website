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
  const [hoverImage, setHoverImage] = useState(null);

  const isAdmin = session?.user?.admin === true;
  const isCustomer = !isAdmin;

  useEffect(() => {
    if (p.hasSizes && p.sizes?.length > 0) {
      setSelectedSize(p.sizes[0].ml);
    }

    if (p.images?.length > 0) {
      setHoverImage(p.images[0]);
    }
  }, [p]);

  /* SIZE LOGIC PRESERVED */

  const hasSizes = p.hasSizes && p.sizes?.length > 0;

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

  const hasDiscount = currentDiscountPrice > 0;

  const displayPrice = hasDiscount
    ? currentDiscountPrice
    : currentPrice;

  const isOutOfStock = currentStock === 0;

  const handleAddToCart = () => {
    if (!addToCart) return;

    addToCart({
      ...p,
      selectedSize: hasSizes ? selectedSize : null,
      price: currentPrice,
      discountPrice: currentDiscountPrice,
      displayPrice,
      stock: currentStock,
    });

    toast.success(`${p.name} added to cart`);
  };

  const mainImage = p.image;
  const secondImage = hoverImage || mainImage;

  return (
    <div className="
      bg-white
      rounded-2xl
      overflow-hidden
      border border-gray-200
      hover:shadow-xl
      transition-all duration-300
      group
      relative
    ">

      {/* IMAGE */}
      <div
        className="relative h-[260px] overflow-hidden"
        onMouseEnter={() => hoverImage && setHoverImage(null)}
        onMouseLeave={() => setHoverImage(secondImage)}
      >

        <Image
          src={hoverImage ? secondImage : mainImage}
          alt={p.name}
          fill
          className="
            object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* DISCOUNT BADGE */}
        {hasDiscount && (
          <span className="
            absolute top-3 left-3
            bg-[var(--color-accent)]
            text-white text-xs font-semibold
            px-3 py-1 rounded-full shadow
          ">
            -{currentDiscountPercent}%
          </span>
        )}

        {/* ADD TO CART OVERLAY */}
        {isCustomer && (
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="
              absolute bottom-0 left-0 right-0
              bg-[var(--color-primary)]
              hover:bg-[var(--color-primary-hover)]
              text-white font-semibold text-sm
              py-3
              opacity-0 group-hover:opacity-100
              transition
            "
          >
            {isOutOfStock ? "Out of stock" : "Add to Cart"}
          </button>
        )}

        {/* ADMIN CONTROLS */}
        {isAdmin && !adminPreview && (
          <div className="absolute top-3 right-3 flex gap-2">

            <button
              onClick={() => onEdit?.(p)}
              className="
                bg-black text-white text-xs
                px-3 py-1 rounded-lg
                hover:bg-gray-800
              "
            >
              Edit
            </button>

            <button
              onClick={() => onDelete?.(p._id)}
              className="
                bg-[var(--color-accent)]
                text-white text-xs
                px-3 py-1 rounded-lg
                hover:bg-[var(--color-accent-hover)]
              "
            >
              Delete
            </button>

          </div>
        )}

      </div>

      {/* INFO */}
      <div className="p-4 text-center">

        {/* NAME */}
        <h3
          className="
            font-semibold text-gray-800
            hover:text-[var(--color-primary)]
            cursor-pointer
            transition
          "
          onClick={() =>
            window.location.href = `/products/${p.slug}`
          }
        >
          {p.name}
        </h3>

        {/* SIZE SELECTOR */}
        {hasSizes && (
          <div className="flex justify-center gap-2 mt-3">

            {p.sizes.map(size => (

              <button
                key={size.ml}
                onClick={() => setSelectedSize(size.ml)}
                className={`
                  text-xs px-3 py-1 rounded-full border
                  transition
                  ${
                    selectedSize === size.ml
                      ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                      : "border-gray-300 hover:border-[var(--color-primary)]"
                  }
                `}
              >
                {size.ml}
              </button>

            ))}

          </div>
        )}

        {/* PRICE */}
        <div className="mt-3 flex justify-center items-center gap-2">

          {hasDiscount && (
            <span className="text-gray-400 line-through text-sm">
              ৳{currentPrice}
            </span>
          )}

          <span className="text-lg font-bold text-[var(--color-primary)]">
            ৳{displayPrice}
          </span>

        </div>

      </div>

    </div>
  );
}