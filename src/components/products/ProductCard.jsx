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

      const img =
        p.images[0].startsWith("http")
          ? p.images[0]
          : p.images[0];

      setHoverImage(img);

    }

  }, [p]);


  /* SIZE LOGIC PRESERVED */

  const hasSizes =
    p.hasSizes &&
    p.sizes?.length > 0;

  let currentPrice =
    p.price;

  let currentDiscountPrice =
    p.discountPrice || 0;

  let currentDiscountPercent =
    p.discountPercentage || 0;

  let currentStock =
    p.stock || 0;


  if (hasSizes && selectedSize) {

    const sizeData =
      p.sizes.find(
        s => s.ml === selectedSize
      );

    if (sizeData) {

      currentPrice =
        sizeData.price;

      currentDiscountPrice =
        sizeData.discountPrice || 0;

      currentDiscountPercent =
        sizeData.discountPercentage || 0;

      currentStock =
        sizeData.stock || 0;

    }

  }


  const hasDiscount =
    currentDiscountPrice > 0;

  const displayPrice =
    hasDiscount
      ? currentDiscountPrice
      : currentPrice;


  const isOutOfStock =
    currentStock === 0;


  const handleAddToCart = () => {

    if (!addToCart) return;

    addToCart({

      ...p,

      selectedSize:
        hasSizes
          ? selectedSize
          : null,

      price:
        currentPrice,

      discountPrice:
        currentDiscountPrice,

      displayPrice,

      stock:
        currentStock

    });

    toast.success(
      `${p.name} added to cart`
    );

  };


  const mainImage =
    p.image?.startsWith("http")
      ? p.image
      : p.image;


  const secondImage =
    hoverImage || mainImage;


  return (

    <div className="
      border rounded-xl
      bg-white
      hover:shadow-xl
      transition-all duration-300
      overflow-hidden
      group relative
    ">


      {/* IMAGE */}

      <div className="
        relative h-[220px]
        overflow-hidden
      "

        onMouseEnter={() =>
          hoverImage &&
          setHoverImage(null)
        }

        onMouseLeave={() =>
          setHoverImage(secondImage)
        }

      >

        <Image

          src={
            hoverImage
              ? secondImage
              : mainImage
          }

          alt={p.name}

          fill

          className="
            object-cover
            transition duration-500
            group-hover:scale-105
          "

        />


        {/* DISCOUNT BADGE */}

        {hasDiscount && (

          <span className="
            absolute top-2 left-2
            bg-[var(--color-primary)]
            text-white text-xs
            px-2 py-1 rounded
          ">

            -{currentDiscountPercent}%

          </span>

        )}


        {/* ADD TO CART HOVER */}

        {isCustomer && (

          <button

            onClick={handleAddToCart}

            disabled={isOutOfStock}

            className="
              absolute bottom-0 left-0 right-0
              bg-[var(--color-primary)]
              text-white text-sm
              py-2
              opacity-0 group-hover:opacity-100
              transition
            "

          >

            {isOutOfStock
              ? "Out of stock"
              : "Add to cart"}

          </button>

        )}


        {/* ADMIN CONTROLS */}

        {isAdmin && !adminPreview && (

          <div className="
            absolute top-2 right-2
            flex gap-2
          ">

            <button

              onClick={() =>
                onEdit?.(p)
              }

              className="
                bg-black text-white
                text-xs px-2 py-1
                rounded
              "

            >

              Edit

            </button>

            <button

              onClick={() =>
                onDelete?.(p._id)
              }

              className="
                bg-red-600 text-white
                text-xs px-2 py-1
                rounded
              "

            >

              Delete

            </button>

          </div>

        )}

      </div>


      {/* INFO */}

      <div className="
        p-3 text-center
      ">

        <h3 className="
          text-sm font-medium
          hover:text-[var(--color-primary)]
          cursor-pointer
        "

          onClick={() =>
            window.location.href =
            `/products/${p.slug}`
          }

        >

          {p.name}

        </h3>


        {/* SIZE SELECTOR */}

        {hasSizes && (

          <div className="
            flex justify-center gap-2 mt-2
          ">

            {p.sizes.map(size => (

              <button

                key={size.ml}

                onClick={() =>
                  setSelectedSize(size.ml)
                }

                className={`
                  text-xs px-2 py-1
                  border rounded
                  ${
                    selectedSize === size.ml
                      ? "bg-[var(--color-primary)] text-white"
                      : ""
                  }
                `}

              >

                {size.ml}

              </button>

            ))}

          </div>

        )}


        {/* PRICE */}

        <div className="
          mt-2 flex justify-center gap-2
        ">

          {hasDiscount && (

            <del className="
              text-gray-400 text-sm
            ">

              ৳{currentPrice}

            </del>

          )}

          <span className="
            text-[var(--color-primary)]
            font-bold
          ">

            ৳{displayPrice}

          </span>

        </div>

      </div>

    </div>

  );

}