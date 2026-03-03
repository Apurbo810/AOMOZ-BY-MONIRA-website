"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

function RowCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-1/3 lg:w-1/4">
      <div className="card bg-base-100 border border-[var(--color-border)] overflow-hidden">
        <div className="relative h-[220px] skeleton" />
        <div className="p-3 text-center">
          <div className="h-4 w-3/4 mx-auto rounded skeleton" />
          <div className="h-4 w-1/3 mx-auto mt-3 rounded skeleton" />
        </div>
      </div>
    </div>
  );
}

export default function CategoryProductRow({
  title,
  banner,
  categorySlug,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?category=${categorySlug}`
        );

        const data = await res.json();
        const safeProducts =
          Array.isArray(data)
            ? data
            : data.products || [];

        setProducts(safeProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -800 : 800,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[var(--color-bg-primary)] py-16 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2
            className={`
              ${greatVibes.className}
              text-4xl md:text-5xl lg:text-6xl
              text-[var(--color-primary)]
            `}
          >
            {title}
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Discover our exclusive {title.toLowerCase()} crafted for elegance, comfort, and timeless fashion.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 md:p-6">
          <div className="flex gap-6 min-w-0">

            {/* LEFT BANNER (UNCHANGED) */}
            <div className="hidden md:block w-[260px] shrink-0">
              <Link href={`/products?category=${categorySlug}`}>
                <div className="relative h-[320px] rounded-xl overflow-hidden group">
                  <Image
                    src={banner}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{title}</h3>
                    <span className="text-[var(--color-accent)] text-sm">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* RIGHT PRODUCTS */}
            <div className="flex-1 min-w-0">

              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[var(--color-primary)]">
                  {title}
                </h2>

                <Link
                  href={`/products?category=${categorySlug}`}
                  className="flex items-center gap-1 text-sm text-[var(--color-accent)] hover:underline"
                >
                  View All
                  <IoIosArrowForward />
                </Link>
              </div>

              {/* Loading */}
              {loading && (
                <div className="flex gap-4 overflow-x-auto">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <RowCardSkeleton key={i} />
                  ))}
                </div>
              )}

              {/* PRODUCT SLIDER */}
              {!loading && (
                <div className="relative">

                  {/* Left Button (Desktop) */}
                  <button
                    onClick={() => scroll("left")}
                    className="hidden lg:flex btn btn-circle btn-sm absolute -left-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    ❮
                  </button>

                  {/* Right Button (Desktop) */}
                  <button
                    onClick={() => scroll("right")}
                    className="hidden lg:flex btn btn-circle btn-sm absolute -right-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    ❯
                  </button>

                  {/* Scroll Container */}
                  <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth"
                  >
                    {products.slice(0, 12).map((p) => {
                      const image =
                        p.image?.startsWith("http")
                          ? p.image
                          : `/storage/${p.image}`;

                      return (
                        <Link
                          key={p._id}
                          href={`/products/${p.slug}`}
                          className="flex-shrink-0 w-1/3 lg:w-1/4"
                        >
                          <div className="card bg-base-100 border border-[var(--color-border)] hover:shadow-xl transition">

                            {/* Image */}
                            <figure className="relative h-[220px] bg-white p-4">
                              <Image
                                src={image}
                                alt={p.name}
                                fill
                                loading="lazy"
                                className="object-contain"
                              />
                            </figure>

                            {/* Body */}
                            <div className="card-body p-3 text-center">
                              <h3 className="text-sm font-medium line-clamp-2">
                                {p.name}
                              </h3>

                              <p className="font-semibold text-[var(--color-primary)]">
                                ৳ {p.price}
                              </p>
                            </div>

                          </div>
                        </Link>
                      );
                    })}
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
