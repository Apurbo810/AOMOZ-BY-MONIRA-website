"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[75vh] lg:min-h-[80vh] overflow-hidden">

      {/* Background Image */}
        <Image
          src="/hero-saree.jpg"
          alt="Luxury Saree"
          fill
          priority
          className="object-cover object-center"
        />

      {/* Proper Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r 
                      from-black via-black/80 to-black/20" />

      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 lg:px-20">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl text-white"
          >

            {/* Small Top Label */}
            <p className="uppercase tracking-[0.3em] text-sm text-[#D4AF37] mb-6">
              New Arrival
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight">
              Timeless
              <span className="text-[#D4AF37]"> Elegance</span>
            </h1>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mt-2">
              Redefined
            </h2>

            {/* Description */}
            <p className="mt-8 text-gray-300 text-lg md:text-xl leading-relaxed max-w-lg">
              Discover handcrafted sarees, elegant dresses,
              and premium handbags curated for women
              who define their own style.
            </p>

            {/* CTA */}
            <div className="mt-10 flex gap-5">
              <Link
                href="/products"
                className="px-10 py-4 bg-[#D4AF37] text-black font-semibold
                           rounded-md transition-all duration-300
                           hover:bg-white hover:scale-105"
              >
                SHOP NOW
              </Link>

              <Link
                href="/products"
                className="px-10 py-4 border border-white text-white
                           rounded-md transition-all duration-300
                           hover:bg-white hover:text-black"
              >
                EXPLORE
              </Link>
            </div>

          </motion.div>
        </div>
      </div>

    </section>
  );
}