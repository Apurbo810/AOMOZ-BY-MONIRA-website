"use client";

<<<<<<< HEAD
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function ProductSection({ products = [] }) {
  return (
    <section className="bg-[var(--color-bg-primary)] py-20 px-4 relative overflow-hidden">
      <div className="absolute w-[700px] h-[700px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className={`
            ${greatVibes.className}
            text-5xl md:text-6xl
            text-[var(--color-primary)]
          `}>
            Featured Collection
          </h2>
          <p className="
            mt-6
            text-gray-600
            max-w-2xl
            mx-auto
            text-lg
            italic
          ">
=======
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProductSection({ products = [] }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleDesktop = 3;
  const visibleMobile = 1.1;
  const total = Array.isArray(products) ? Math.min(products.length, 9) : 0;

  const getCardWidth = () => {
    const width = sliderRef.current?.clientWidth || 0;
    const items = window.innerWidth < 768 ? visibleMobile : visibleDesktop;
    return width / items;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth > 768) return;

    const interval = setInterval(() => {
      moveNext();
    }, 4000);

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
    <section className="relative w-full overflow-hidden bg-black py-24">
      {/* Background glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1200px] h-[1200px] bg-[#D4AF37]/10 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold text-white">
            Featured Collection
          </h2>
          <div className="w-20 h-1 bg-[#D4AF37] mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-gray-300 text-lg">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
            Premium Saree & Salwar Kamiz for modern elegance
          </p>
        </div>

<<<<<<< HEAD
        {/* Product Grid */}
        <div className="
          flex md:grid
          md:grid-cols-2 lg:grid-cols-3
          gap-8
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory
          scrollbar-none
        ">
          {(Array.isArray(products) ? products : [])
            .slice(0, 9)
            .map((p) => {
              const image =
                p.image?.startsWith("http")
                  ? p.image
                  : `/storage/${p.image}`;
=======
        {/* Desktop arrows */}
        <div className="hidden md:block">
          <button
            onClick={movePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-[#D4AF37] hover:bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center transition group"
          >
            <IoIosArrowBack className="text-xl text-black group-hover:text-[#D4AF37]" />
          </button>

          <button
            onClick={moveNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-[#D4AF37] hover:bg-white w-12 h-12 rounded-full shadow-md flex items-center justify-center transition group"
          >
            <IoIosArrowForward className="text-xl text-black group-hover:text-[#D4AF37]" />
          </button>
        </div>

        {/* Product slider */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-none md:overflow-x-hidden"
        >
          {(Array.isArray(products) ? products : [])
            .slice(0, 9)
            .map((p) => {
              const image1 = p.image?.startsWith("http") ? p.image : `/storage/${p.image}`;
              const image2 = p.image2
                ? p.image2.startsWith("http")
                  ? p.image2
                  : `/storage/${p.image2}`
                : p.images?.[1]
                ? p.images[1].startsWith("http")
                  ? p.images[1]
                  : `/storage/${p.images[1]}`
                : null;
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3

              return (
                <Link
                  key={p._id}
                  href={`/products/${p.slug}`}
<<<<<<< HEAD
                  className="
                    group
                    min-w-[75%] sm:min-w-[60%] md:min-w-0
                    snap-center
                    bg-white
                    rounded-2xl
                    shadow-sm hover:shadow-xl
                    transition-all duration-500
                    border border-gray-100
                    overflow-hidden
                  "
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                    <Image
                      src={image}
                      alt={p.name}
                      fill
                      className="
                        object-cover
                        transition-transform duration-700
                        group-hover:scale-110
                      "
                    />
                  </div>
                  <div className="p-7 text-center">
                    <span className="
                      text-xs uppercase tracking-widest
                      text-[var(--color-primary)]
                    ">
                      {p.category}
                    </span>
                    {/* PECHANO PRODUCT NAME - Original font kept */}
                    <h3 className="
                      mt-4
                      text-2xl
                      text-gray-900
                      font-[var(--font-pechano)]
                      group-hover:text-[var(--color-primary)]
                      transition
                    ">
                      {p.name}
                    </h3>
                    <p className="
                      mt-4
                      text-xl
                      font-semibold
                      text-[var(--color-primary)]
                    ">
                      ৳ {p.price}
                    </p>
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transition duration-300">
                      <div className="
                        inline-flex items-center gap-2
                        px-5 py-2.5
                        rounded-full
                        bg-[var(--color-primary)]
                        text-white
                        text-sm
                        hover:bg-[var(--color-accent)]
                        transition
                      ">
                        <FiShoppingCart size={16} />
                        Add to Cart
=======
                  className="group snap-center min-w-[80%] md:min-w-[32%] bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 border border-gray-200 relative cursor-pointer"
                >
                  {/* Image container */}
                  <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden bg-white">
                    <div className="absolute inset-0 blur-3xl bg-[#D4AF37]/10 rounded-full scale-75 group-hover:scale-100 transition-all duration-700"></div>

                    <Image
                      src={image1}
                      alt={p.name}
                      fill
                      className={`object-cover object-[center_25%] transition-all duration-700 ${
                        image2 ? "group-hover:opacity-0 group-hover:scale-95" : "group-hover:scale-105"
                      }`}
                      sizes="(max-width: 768px) 80vw, 32vw"
                    />

                    {image2 && (
                      <Image
                        src={image2}
                        alt={p.name}
                        fill
                        className="object-cover object-[center_25%] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        sizes="(max-width: 768px) 80vw, 32vw"
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <span className="text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                      {p.category}
                    </span>

                    <h3 className="font-serif font-semibold text-lg text-black group-hover:text-[#D4AF37] transition">
                      {p.name}
                    </h3>

                    <div className="w-12 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all duration-500"></div>

                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-[#D4AF37]">৳ {p.price}</p>
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center group-hover:bg-white transition">
                        <FiShoppingCart className="text-black" />
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
<<<<<<< HEAD
      </div>
    </section>
  );
}
=======

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition ${
                activeIndex === i ? "bg-[#D4AF37] scale-125" : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* View all */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#D4AF37] hover:bg-white text-black font-semibold transition"
          >
            <FiShoppingCart />
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
