"use client";

import { useRouter } from "next/navigation";

export default function CategoryShowcase() {
  const router = useRouter();

  const categories = [
    {
      name: "Salwar Kamiz",
      image: "/categories/salwar-kamiz.jpg",
      slug: "salwar-kamiz",
    },
    {
      name: "Saree",
      image: "/categories/saree.jpg",
      slug: "saree",
    },
  ];

  const handleClick = (slug) => {
    router.push(`/products?category=${slug}`);
  };

  return (
    <section className="bg-[var(--color-bg-primary)] py-20">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleClick(cat.slug)}
              className="group cursor-pointer relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            >
              
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition"></div>

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">

                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                    {cat.name}
                  </h3>

                  <div className="w-16 h-1 bg-[var(--color-accent)] mx-auto rounded"></div>

                  <p className="text-white mt-4 opacity-0 group-hover:opacity-100 transition">
                    Shop Now →
                  </p>

                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}