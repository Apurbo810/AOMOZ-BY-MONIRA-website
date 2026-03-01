"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      className="relative w-full 
                 min-h-[85vh] lg:min-h-screen
                 pt-28 lg:pt-36
                 overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src="/hero-saree.jpg"
        alt="Luxury Saree"
        fill
        priority
        className="object-cover object-[70%_20%] sm:object-[60%_30%] md:object-[center_30%] lg:object-[center_25%]"
      />

      {/* Luxury Gradient Overlay */}
      {/* Mobile: top-to-bottom so the woman on the right stays visible */}
      {/* Desktop: left-to-right to keep text readable */}
      <div
        className="absolute inset-0
                   bg-gradient-to-b from-black/90 via-black/60 to-black/10
                   md:bg-gradient-to-r md:from-black/95 md:via-black/75 md:to-black/20"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full px-6 md:px-12 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl text-white"
          >
            {/* Small Top Label */}
            <p className="uppercase tracking-[0.4em] text-sm text-[#D4AF37] mb-6">
              New Arrival
            </p>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight">
              Timeless
              <span className="text-[#D4AF37]"> Elegance</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif font-light mt-3">
              Redefined
            </h2>

            {/* Description */}
            <p className="mt-6 sm:mt-8 text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg">
              Discover handcrafted sarees, elegant dresses, and premium handbags
              curated for women who define their own style.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 sm:gap-5">
              <Link
                href="/products"
                className="px-8 sm:px-10 py-3 sm:py-4 bg-[#D4AF37] text-black font-semibold
                           rounded-md transition-all duration-300
                           hover:bg-white hover:scale-105"
              >
                SHOP NOW
              </Link>

              <Link
                href="/products"
                className="px-8 sm:px-10 py-3 sm:py-4 border border-white text-white
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