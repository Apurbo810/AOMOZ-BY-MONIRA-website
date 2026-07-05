"use client";

import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
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
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function ProductSection({
  products = [],
  loading = false,
}) {
  const safeProducts = Array.isArray(products) ? products : [];
  const showSkeletons = loading;

  return (
    <section className="bg-[var(--color-bg-primary)] py-20 px-4 relative overflow-hidden">
      {/* Glow Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute w-[700px] h-[700px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className={`
              ${greatVibes.className}
              text-5xl md:text-6xl
              text-[var(--color-primary)]
            `}
          >
            Featured Collection
          </h2>

          <p
            className="
              mt-6
              text-gray-600
              max-w-2xl
              mx-auto
              text-lg
              italic
            "
          >
            Premium Saree & Salwar Kamiz for modern elegance
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="
            flex md:grid
            md:grid-cols-2 lg:grid-cols-3
            gap-8
            overflow-x-auto md:overflow-visible
            snap-x snap-mandatory
            scrollbar-hide
          "
        >
          {(showSkeletons
            ? Array.from({ length: 6 })
            : safeProducts.slice(0, 9)
          ).map((p, i) => {
            if (!p) {
              return (
                <div
                  key={`skeleton-${i}`}
                  className="
                    min-w-[75%] sm:min-w-[60%] md:min-w-0
                    bg-white rounded-2xl border border-gray-100 overflow-hidden
                  "
                >
                  <div className="relative w-full aspect-[3/4] skeleton" />

                  <div className="p-7 text-center">
                    <div className="h-3 w-20 mx-auto rounded skeleton" />
                    <div className="h-7 w-1/2 mx-auto mt-4 rounded skeleton" />
                    <div className="h-6 w-24 mx-auto mt-4 rounded skeleton" />
                  </div>
                </div>
              );
            }

            const image = p.image?.startsWith("http")
              ? p.image
              : `/storage/${p.image}`;

            return (
              <motion.div
                key={p._id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                className="
                  min-w-[75%]
                  sm:min-w-[60%]
                  md:min-w-0
                  snap-center
                "
              >
                <Link
                  href={`/products/${p.slug}`}
                  className="
                    group
                    block
                    bg-white
                    rounded-2xl
                    shadow-sm hover:shadow-xl
                    transition-all duration-500
                    border border-gray-100
                    overflow-hidden
                    h-full
                  "
                >
                  {/* Product Image */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
                    <Image
                      src={image}
                      alt={p.name}
                      fill
                      loading="lazy"
                      className="
                        object-cover
                        transition-transform duration-700
                        group-hover:scale-110
                      "
                    />
                  </div>

                  {/* Product Content */}
                  <div className="p-7 text-center">
                    <span
                      className="
                        text-xs uppercase tracking-widest
                        text-[var(--color-primary)]
                      "
                    >
                      {p.category}
                    </span>

                    <h3
                      className="
                        mt-4
                        text-2xl
                        text-gray-900
                        font-[var(--font-pechano)]
                        group-hover:text-[var(--color-primary)]
                        transition
                      "
                    >
                      {p.name}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-xl
                        font-semibold
                        text-[var(--color-primary)]
                      "
                    >
                      ৳ {p.price}
                    </p>

                    <div className="mt-6">
                      <div
                        className="
                          inline-flex items-center justify-center gap-2
                          w-full sm:w-auto
                          px-6 py-3
                          rounded-full
                          bg-[var(--color-primary)]
                          text-white
                          text-sm font-semibold
                          transition-colors duration-300
                          group-hover:bg-[var(--color-accent)]
                        "
                      >
                        <FiShoppingCart size={16} />
                        Add to Cart
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}