"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function CategoryProductRow({
  title,
  banner,
  categorySlug,
}) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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


  return (
    <section className="py-12">

      <div className="
        max-w-7xl mx-auto
        bg-white
        rounded-2xl
        border border-[var(--color-border)]
        p-4 md:p-6
      ">

        <div className="flex gap-6">

          {/* LEFT BANNER */}
          <div className="hidden md:block w-[260px] shrink-0">

            <Link href={`/products?category=${categorySlug}`}>

              <div className="
                relative h-[320px]
                rounded-xl overflow-hidden group
              ">

                <img
                  src={banner}
                  className="
                    w-full h-full object-cover
                    group-hover:scale-105 transition duration-700
                  "
                />

                <div className="
                  absolute inset-0
                  bg-gradient-to-t from-black/60 to-transparent
                "></div>

                <div className="
                  absolute bottom-4 left-4
                  text-white
                ">
                  <h3 className="text-xl font-bold">
                    {title}
                  </h3>

                  <span className="text-[var(--color-accent)] text-sm">
                    Shop Now →
                  </span>
                </div>

              </div>

            </Link>

          </div>


          {/* RIGHT PRODUCTS */}
          <div className="flex-1">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">

              <h2 className="
                text-xl font-semibold
                text-[var(--color-primary)]
              ">
                {title}
              </h2>

              <Link
                href={`/products?category=${categorySlug}`}
                className="
                  flex items-center gap-1
                  text-sm
                  text-[var(--color-accent)]
                  hover:underline
                "
              >
                View All
                <IoIosArrowForward />
              </Link>

            </div>


            {/* Loading */}
            {loading && (
              <div className="text-gray-400 text-sm">
                Loading products...
              </div>
            )}


            {/* Products */}
            {!loading && (
              <div className="
                flex gap-4 overflow-x-auto
                scrollbar-none
              ">

                {products.slice(0, 8).map((p) => {

                  const image =
                    p.image?.startsWith("http")
                      ? p.image
                      : `/storage/${p.image}`;

                  return (

                    <Link
                      key={p._id}
                      href={`/products/${p.slug}`}
                      className="min-w-[180px] group"
                    >

                      <div className="
                        bg-white rounded-xl border
                        border-[var(--color-border)]
                        overflow-hidden
                        hover:shadow-lg transition
                      ">

                        <div className="
                          h-[180px]
                          overflow-hidden
                        ">
                          <img
                            src={image}
                            className="
                              w-full h-full object-cover
                              group-hover:scale-110
                              transition duration-700
                            "
                          />
                        </div>

                        <div className="p-3 text-center">

                          <h3 className="
                            text-sm font-medium
                            text-[var(--color-text-primary)]
                          ">
                            {p.name}
                          </h3>

                          <p className="
                            text-[var(--color-primary)]
                            font-semibold mt-1
                          ">
                            ৳ {p.price}
                          </p>

                        </div>

                      </div>

                    </Link>

                  );

                })}

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );

}