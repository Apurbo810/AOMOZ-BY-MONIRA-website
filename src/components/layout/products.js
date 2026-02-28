"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProductSection({ products = [] }) {

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleDesktop = 3;
  const visibleMobile = 1.2;
  const total = Array.isArray(products) ? Math.min(products.length, 9) : 0;

  const getCardWidth = () => {
    const width = sliderRef.current?.clientWidth || 0;
    const items = window.innerWidth < 768 ? visibleMobile : visibleDesktop;
    return width / items;
  };

  /* Auto slide mobile */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth > 768) return;

    const interval = setInterval(() => {
      moveNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const moveNext = () => {
    const next = (activeIndex + 1) % total;
    setActiveIndex(next);
    sliderRef.current?.scrollTo({
      left: next * getCardWidth(),
      behavior: "smooth",
    });
  };

  const movePrev = () => {
    const prev = (activeIndex - 1 + total) % total;
    setActiveIndex(prev);
    sliderRef.current?.scrollTo({
      left: prev * getCardWidth(),
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (typeof window === "undefined") return;
    if (window.innerWidth > 768) return;
    const index = Math.round(sliderRef.current.scrollLeft / getCardWidth());
    setActiveIndex(index);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg-primary)] py-24">

      {/* Background glow */}
      <div className="
        absolute left-1/2 top-0 -translate-x-1/2
        w-[1200px] h-[1200px]
        bg-[var(--color-primary)]/10
        blur-3xl rounded-full
      "></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="
            text-4xl lg:text-5xl font-bold
            text-[var(--color-primary)]
          ">
            Featured Collection
          </h2>

          <div className="
            w-20 h-1
            bg-[var(--color-accent)]
            mx-auto mt-4 rounded-full
          "></div>

          <p className="
            text-[var(--color-text-secondary)]
            mt-4 text-lg
          ">
            Premium Saree & Salwar Kamiz for modern elegance
          </p>
        </div>


        {/* Desktop arrows */}
        <div className="hidden md:block">

          <button
            onClick={movePrev}
            className="
              absolute left-6 top-1/2 -translate-y-1/2 z-20
              bg-white hover:bg-[var(--color-primary)]
              w-12 h-12 rounded-full border
              shadow-md flex items-center justify-center
              transition group
            "
          >
            <IoIosArrowBack className="
              text-xl
              text-[var(--color-primary)]
              group-hover:text-white
            " />
          </button>

          <button
            onClick={moveNext}
            className="
              absolute right-6 top-1/2 -translate-y-1/2 z-20
              bg-white hover:bg-[var(--color-primary)]
              w-12 h-12 rounded-full border
              shadow-md flex items-center justify-center
              transition group
            "
          >
            <IoIosArrowForward className="
              text-xl
              text-[var(--color-primary)]
              group-hover:text-white
            " />
          </button>

        </div>


        {/* Product slider */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="
            flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6
            scrollbar-none md:overflow-x-hidden
          "
        >

          {(Array.isArray(products) ? products : [])
            .slice(0, 9)
            .map((p, index) => {

              const image1 =
                p.image?.startsWith("http")
                  ? p.image
                  : `/storage/${p.image}`;

              const image2 =
                p.image2
                  ? (p.image2.startsWith("http")
                    ? p.image2
                    : `/storage/${p.image2}`)
                  : p.images?.[1]
                    ? (p.images[1].startsWith("http")
                      ? p.images[1]
                      : `/storage/${p.images[1]}`)
                    : null;

              return (
                <Link
                  key={p._id}
                  href={`/products/${p.slug}`}
                  className="
                    group snap-center min-w-[80%] md:min-w-[32%]
                    bg-white rounded-3xl overflow-hidden
                    shadow-md hover:shadow-xl
                    hover:-translate-y-1
                    transition-all duration-500
                    border border-[var(--color-border)]
                    relative cursor-pointer
                  "
                >

                  {/* Image container */}
                  <div className="
                    relative w-full h-64
                    flex items-center justify-center
                    overflow-hidden bg-white
                  ">

                    {/* Glow */}
                    <div className="
                      absolute inset-0 blur-3xl
                      bg-[var(--color-primary)]/10
                      rounded-full scale-75
                      group-hover:scale-100
                      transition-all duration-700
                    "></div>

                    {/* First image */}
                    <img
                      src={image1}
                      alt={p.name}
                      className={`
                        absolute w-full h-full object-contain p-6
                        transition-all duration-700
                        ${image2
                          ? "group-hover:opacity-0 group-hover:scale-95"
                          : "group-hover:scale-110"}
                      `}
                    />

                    {/* Second image hover */}
                    {image2 && (
                      <img
                        src={image2}
                        alt={p.name}
                        className="
                          absolute w-full h-full object-contain p-6
                          opacity-0 scale-95
                          group-hover:opacity-100 group-hover:scale-110
                          transition-all duration-700
                        "
                      />
                    )}

                  </div>


                  {/* Content */}
                  <div className="p-6 space-y-3">

                    {/* Category */}
                    <span className="
                      text-xs font-semibold
                      text-[var(--color-primary)]
                      bg-[var(--color-primary)]/10
                      px-3 py-1 rounded-full
                    ">
                      {p.category}
                    </span>

                    {/* Name */}
                    <h3 className="
                      font-semibold text-lg
                      text-[var(--color-text-primary)]
                      group-hover:text-[var(--color-primary)]
                      transition
                    ">
                      {p.name}
                    </h3>

                    {/* Accent line */}
                    <div className="
                      w-12 h-[2px]
                      bg-[var(--color-accent)]
                      group-hover:w-full
                      transition-all duration-500
                    "></div>

                    {/* Price and cart */}
                    <div className="flex items-center justify-between">

                      <p className="
                        text-xl font-bold
                        text-[var(--color-primary)]
                      ">
                        ৳ {p.price}
                      </p>

                      <div className="
                        w-10 h-10 rounded-full
                        bg-[var(--color-primary)]
                        flex items-center justify-center
                        group-hover:bg-[var(--color-accent)]
                        transition
                      ">
                        <FiShoppingCart className="text-white" />
                      </div>

                    </div>

                  </div>

                </Link>
              );
            })}

        </div>


        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`
                w-3 h-3 rounded-full transition
                ${activeIndex === i
                  ? "bg-[var(--color-accent)] scale-125"
                  : "bg-gray-300"}
              `}
            />
          ))}
        </div>


        {/* View all */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="
              inline-flex items-center gap-2
              px-8 py-3 rounded-xl
              bg-[var(--color-primary)]
              hover:bg-[var(--color-accent)]
              text-white font-semibold
              transition
            "
          >
            <FiShoppingCart />
            View All Products
          </Link>
        </div>

      </div>

    </section>
  );
}