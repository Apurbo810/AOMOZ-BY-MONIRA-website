"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Great_Vibes } from "next/font/google";
import { motion } from "framer-motion";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function CategoryShowcase() {
  const router = useRouter();

  const categories = [
    {
      name: "Salwar Kamiz",
      image: "/salwar-kamiz.jpg",
      slug: "salwar-kamiz",
    },
    {
      name: "Saree",
      image: "/saree.jpg",
      slug: "saree",
    },
  ];

  const handleClick = (slug) => {
    router.push(`/products?category=${slug}`);
  };

  return (
    <section className="bg-[var(--color-bg-primary)] py-20 px-4 relative overflow-hidden">
      {/* Glow Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute w-[700px] h-[700px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className={`
              ${greatVibes.className}
              text-4xl md:text-5xl lg:text-6xl
              text-[var(--color-primary)]
              mb-6
            `}
          >
            Explore Categories
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Discover our premium collection of traditional wear crafted for timeless elegance
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              onClick={() => handleClick(cat.slug)}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="
                group cursor-pointer relative
                rounded-3xl overflow-hidden
                shadow-xl hover:shadow-2xl
                h-[500px] md:h-[550px]
              "
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="
                    object-cover
                    group-hover:scale-105
                    transition-transform duration-700
                  "
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <motion.div
                  initial={{ opacity: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center text-white w-full"
                >
                  <h3
                    className={`
                      ${greatVibes.className}
                      text-3xl md:text-4xl lg:text-5xl
                      font-bold mb-6 drop-shadow-lg
                    `}
                  >
                    {cat.name}
                  </h3>

                  <motion.div
                    whileHover={{ scaleX: 1.3 }}
                    className="w-20 h-1 bg-[var(--color-accent)] mx-auto rounded-full mb-6"
                  />

                  <p
                    className="
                      text-lg md:text-xl font-medium opacity-0
                      group-hover:opacity-100
                      translate-y-4 group-hover:translate-y-0
                      transition-all duration-500
                    "
                  >
                    Shop Now →
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}