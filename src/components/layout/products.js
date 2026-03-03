"use client";

import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function ProductSection({ products = [], loading = false }) {
  const safeProducts = Array.isArray(products) ? products : [];
  const showSkeletons = loading;

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
            Premium Saree & Salwar Kamiz for modern elegance
          </p>
        </div>

        {/* Product Grid */}
        <div className="
          flex md:grid
          md:grid-cols-2 lg:grid-cols-3
          gap-8
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory
          scrollbar-none
        ">
          {(showSkeletons ? Array.from({ length: 6 }) : safeProducts.slice(0, 9))
            .map((p, i) => {
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

              const image =
                p.image?.startsWith("http")
                  ? p.image
                  : `/storage/${p.image}`;

              return (
                <Link
                  key={p._id}
                  href={`/products/${p.slug}`}
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
                      loading="lazy"
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
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
