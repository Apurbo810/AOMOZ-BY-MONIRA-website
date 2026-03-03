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
  const isCustomer = !isAdmin;

  useEffect(() => {
    if (p.hasSizes && p.sizes?.length > 0) {
      setSelectedSize(p.sizes[0].ml);
    }
    if (p.images?.length > 0) {
      setHoverImage(p.images[0]);
    }
    setImageLoaded(false);
  }, [p]);

  /* SIZE LOGIC PRESERVED */
  const hasSizes = p.hasSizes && p.sizes?.length > 0;

  let currentPrice = p.price;
  let currentDiscountPrice = p.discountPrice || 0;
  let currentDiscountPercent = p.discountPercentage || 0;
  let currentStock = p.stock || 0;

  if (hasSizes && selectedSize) {
    const sizeData = p.sizes.find((s) => s.ml === selectedSize);
    if (sizeData) {
      currentPrice = sizeData.price;
      currentDiscountPrice = sizeData.discountPrice || 0;
      currentDiscountPercent = sizeData.discountPercentage || 0;
      currentStock = sizeData.stock || 0;
    }
  }

  const hasDiscount = currentDiscountPrice > 0;
  const displayPrice = hasDiscount ? currentDiscountPrice : currentPrice;
  const isOutOfStock = currentStock === 0;

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent Link navigation when clicking Add to Cart
    e.stopPropagation();
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

  const handleSizeSelect = (e, ml) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(ml);
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
          <div className="flex justify-center gap-2 mt-3">
            {p.sizes.map((size) => (
              <button
                key={size.ml}
                onClick={(e) => handleSizeSelect(e, size.ml)}
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
    </Link>
  );
}
