"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { Great_Vibes } from "next/font/google";
import { motion } from "framer-motion";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

function RowCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-[70%] sm:w-[48%] md:w-[32%] lg:w-1/4">
      <div className="card bg-base-100 border border-[var(--color-border)] overflow-hidden">
        <div className="relative h-[180px] sm:h-[220px] skeleton" />
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

        const safeProducts = Array.isArray(data)
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
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
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
            Discover our exclusive {title.toLowerCase()} crafted for
            elegance, comfort, and timeless fashion.
          </p>
        </motion.div>

        {/* Main Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-[var(--color-border)] p-4 md:p-6 overflow-hidden"
        >
          <div className="flex gap-6 min-w-0">
            {/* LEFT BANNER */}
            <div className="hidden md:block w-[260px] shrink-0">
              <Link href={`/products?category=${categorySlug}`}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="relative h-[320px] rounded-xl overflow-hidden group"
                >
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
                </motion.div>
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

              {/* Product Slider */}
              {!loading && (
                <div className="relative">
                  {/* Left Button */}
                  <button
                    onClick={() => scroll("left")}
                    className="hidden lg:flex btn btn-circle btn-sm absolute -left-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    ❮
                  </button>

                  {/* Right Button */}
                  <button
                    onClick={() => scroll("right")}
                    className="hidden lg:flex btn btn-circle btn-sm absolute -right-4 top-1/2 -translate-y-1/2 z-10"
                  >
                    ❯
                  </button>

                  {/* Scroll Container */}
                  <motion.div
                    ref={scrollRef}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="
                      flex gap-3 md:gap-4
                      overflow-x-auto scroll-smooth
                      snap-x snap-mandatory
                      scrollbar-hide
                    "
                  >
                    {products.slice(0, 12).map((p) => {
                      const image = p.image?.startsWith("http")
                        ? p.image
                        : `/storage/${p.image}`;

                      return (
                        <motion.div
                          key={p._id}
                          variants={itemVariants}
                          whileHover={{
                            y: -8,
                            transition: { duration: 0.2 },
                          }}
                          className="
                            flex-shrink-0
                            w-[70%]
                            sm:w-[48%]
                            md:w-[32%]
                            lg:w-1/4
                            snap-start
                          "
                        >
                          <Link
                            href={`/products/${p.slug}`}
                            className="block"
                          >
                            <div className="card bg-base-100 border border-[var(--color-border)] hover:shadow-xl transition-all duration-300">
                              {/* Image */}
                              <figure className="relative h-[180px] sm:h-[220px] bg-white p-4">
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
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}