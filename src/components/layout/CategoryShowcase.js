"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
<<<<<<< HEAD
import { Great_Vibes } from "next/font/google";
import Link from "next/link";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});
=======
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3

export default function CategoryShowcase() {
  const router = useRouter();

  const categories = [
    {
      name: "Salwar Kamiz",
<<<<<<< HEAD
      image: "/salwar-kamiz.jpg",
=======
      image: "/salwar-banner.jpg",
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      slug: "salwar-kamiz",
    },
    {
      name: "Saree",
<<<<<<< HEAD
      image: "/saree.jpg",
=======
      image: "/saree-banner.jpg",
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      slug: "saree",
    },
  ];

  const handleClick = (slug) => {
    router.push(`/products?category=${slug}`);
  };

  return (
<<<<<<< HEAD
    <section className="bg-[var(--color-bg-primary)] py-20 px-4 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute w-[700px] h-[700px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stylish Section Heading */}
        <div className="text-center mb-20">
          <h2 className={`
            ${greatVibes.className}
            text-4xl md:text-5xl lg:text-6xl
            text-[var(--color-primary)]
            mb-6
          `}>
            Explore Categories
          </h2>
          <p className="
            text-gray-600 
            max-w-2xl mx-auto 
            text-lg md:text-xl 
            leading-relaxed
          ">
            Discover our premium collection of traditional wear crafted for timeless elegance
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
=======
    <section className="relative py-16 md:py-24 overflow-hidden bg-black">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-20">
        {/* Section Heading */}
        <div className="text-center mb-12 md:mb-16">
          <p className="uppercase tracking-[0.4em] text-sm text-[#D4AF37] mb-4">
            Collections
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-white mb-4">
            Explore Our Exclusive{" "}
            <span className="text-[#D4AF37]">Categories</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto text-lg sm:text-xl">
            Discover handcrafted sarees and elegant salwar kamiz that redefine
            timeless fashion. Each piece is curated for style, comfort, and
            luxury.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
          {categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleClick(cat.slug)}
<<<<<<< HEAD
              className="
                group cursor-pointer relative 
                rounded-3xl overflow-hidden 
                shadow-xl hover:shadow-2xl 
                transition-all duration-500
                h-[500px] md:h-[550px]
              "
            >
              {/* Image */}
              <div className="relative w-full h-full">
=======
              className="group cursor-pointer relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl hover:shadow-2xl transition duration-500"
            >
              {/* Image */}
              <div className="relative w-full h-72 sm:h-80 md:h-[500px]">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
<<<<<<< HEAD
                  className="
                    object-cover 
                    group-hover:scale-105 
                    transition-transform duration-700
                  "
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center text-white w-full">
                  {/* Stylish Category Name */}
                  <h3 className={`
                    ${greatVibes.className}
                    text-3xl md:text-4xl lg:text-5xl 
                    font-bold mb-6 drop-shadow-lg
                    group-hover:scale-105 transition-transform duration-300
                  `}>
                    {cat.name}
                  </h3>
                  
                  {/* Accent Line */}
                  <div className="w-20 h-1 bg-[var(--color-accent)] mx-auto rounded-full mb-6 transform group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Shop CTA */}
                  <p className="
                    text-lg md:text-xl font-medium opacity-0 
                    group-hover:opacity-100 
                    translate-y-4 group-hover:translate-y-0
                    transition-all duration-500
                  ">
=======
                  className="object-cover object-[center_30%] md:group-hover:scale-105 md:group-hover:brightness-110 transition duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 50vw"
                />
              </div>

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/25 md:bg-black/30 group-hover:bg-black/40 transition duration-500" />

              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center px-4">
                <div className="text-center text-white">
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif font-semibold mb-2 sm:mb-4">
                    {cat.name}
                  </h3>

                  <div className="w-16 md:w-20 h-[2px] bg-[#D4AF37] mx-auto mb-2 sm:mb-4" />

                  <p className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition duration-500 text-lg tracking-wide text-[#D4AF37] font-semibold">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
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
