"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [imageLoaded, setImageLoaded] = useState(false);

  const isAdmin = session?.user?.admin === true;
  const isCustomer = !isAdmin || adminPreview;

  const hasSizes = p.hasSizes && p.sizes?.length > 0;

  useEffect(() => {
    // Only auto-select when there's exactly one size option.
    // Otherwise leave it unselected so the shopper has to choose.
    if (hasSizes && p.sizes.length === 1) {
      setSelectedSize(p.sizes[0].size);
    } else {
      setSelectedSize(null);
    }

    if (p.images?.length > 0) {
      setHoverImage(p.images[0]);
    } else {
      setHoverImage(null);
    }

    setImageLoaded(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p]);

  /* PRICE / STOCK RESOLUTION */

  let currentPrice = p.price;
  let currentDiscountPrice = p.discountPrice || 0;
  let currentDiscountPercent = p.discountPercentage || 0;
  let currentStock = p.stock || 0;

  if (hasSizes) {
    const sizeData = p.sizes.find((s) => s.size === selectedSize);

    if (sizeData) {
      currentPrice = sizeData.price;
      currentDiscountPrice = sizeData.discountPrice || 0;
      currentDiscountPercent = sizeData.discountPercentage || 0;
      currentStock = sizeData.stock || 0;
    } else {
      // No size picked yet — nothing to display as a firm price/stock
      currentPrice = null;
      currentDiscountPrice = 0;
      currentDiscountPercent = 0;
      currentStock = 0;
    }
  }

  const hasDiscount = currentDiscountPrice > 0;
  const displayPrice = hasDiscount ? currentDiscountPrice : currentPrice;
  const isOutOfStock = hasSizes ? currentStock === 0 : currentStock === 0;

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent Link navigation when clicking Add to Cart
    e.stopPropagation();

    if (!addToCart) return;

    if (hasSizes && !selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart(p, hasSizes ? selectedSize : null);
    toast.success(`${p.name} added to cart`);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(p);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete?.(p._id);
  };

  const handleSizeSelect = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  };

  const mainImage = p.image;
  const secondImage = hoverImage || mainImage;
  const imageSrc = hoverImage ? secondImage : mainImage;

  useEffect(() => {
    setImageLoaded(false);
  }, [imageSrc]);

  return (
    <Link
      href={`/products/${p.slug}`}
      className="
        block
        bg-white
        rounded-2xl
        overflow-hidden
        border border-gray-200
        hover:shadow-xl
        transition-all duration-300
        group
        relative
      "
    >

      {/* IMAGE */}
      <div
        className="
          relative
          aspect-[3/4]        /* ⭐ BEST for saree clothing */
          bg-white
          overflow-hidden
          flex items-center justify-center
        "
        onMouseEnter={() => hoverImage && setHoverImage(null)}
        onMouseLeave={() => {
          if (p.images?.length > 0) setHoverImage(p.images[0]);
        }}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton z-[1]" aria-hidden="true" />
        )}
        <Image
          src={imageSrc}
          alt={p.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className="
            object-contain
            transition-transform duration-500
            group-hover:scale-105
            z-[2]
          "
          priority={false}
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
              absolute bottom-0 left-0 right-0 z-10
              bg-[var(--color-primary)]
              hover:bg-[var(--color-primary-hover)]
              text-white font-semibold text-sm
              py-3
              opacity-0 group-hover:opacity-100
              transition
            "
          >
            {isOutOfStock
              ? "Out of stock"
              : hasSizes && !selectedSize
              ? "Select size"
              : "Add to Cart"}
          </button>
        )}

        {/* ADMIN CONTROLS */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex gap-2 z-[20]">
            <button
              onClick={handleEdit}
              className="
                bg-black text-white text-xs
                px-3 py-1 rounded-lg
                hover:bg-gray-800
              "
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
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
        <h3 className="
          font-semibold text-gray-800
          group-hover:text-[var(--color-primary)]
          transition
        ">
          {p.name}
        </h3>

        {/* SIZE SELECTOR */}
        {hasSizes && (
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            {p.sizes.map((size) => {
              const sizeOutOfStock = (size.stock || 0) === 0;

              return (
                <button
                  key={size.size}
                  onClick={(e) => handleSizeSelect(e, size.size)}
                  disabled={sizeOutOfStock}
                  className={`
                    text-xs px-3 py-1 rounded-full border
                    transition
                    ${
                      selectedSize === size.size
                        ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                        : "border-gray-300 hover:border-[var(--color-primary)]"
                    }
                    ${sizeOutOfStock ? "opacity-40 cursor-not-allowed line-through" : ""}
                  `}
                >
                  {size.size}
                </button>
              );
            })}
          </div>
        )}

        {/* PRICE */}
        <div className="mt-3 flex justify-center items-center gap-2">
          {displayPrice === null ? (
            <span className="text-sm text-gray-400">Select a size</span>
          ) : (
            <>
              {hasDiscount && (
                <span className="text-gray-400 line-through text-sm">
                  ৳{currentPrice}
                </span>
              )}
              <span className="text-lg font-bold text-[var(--color-primary)]">
                ৳{displayPrice}
              </span>
            </>
          )}
        </div>

      </div>
    </Link>
  );
}