"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const heroImages = [
  "/hero-saree.jpg",
  "/hero-saree-2.jpg",
  "/hero-saree-3.jpg",
];
const heroMobileImages = [
  "/hero-saree-mobile.jpg",
  "/hero-saree-mobile-2.jpg",
  "/hero-saree-mobile-3.jpg",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative isolate w-full overflow-hidden bg-black">
      {/* Hero Height */}
      <div className="relative min-h-[820px] sm:min-h-[900px] lg:h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
          >
            <div className="absolute inset-0 md:hidden">
              <Image
                src={heroMobileImages[currentImage]}
                fill
                priority={currentImage === 0}
                sizes="(max-width: 768px) 100vw"
                className="object-cover"
                alt="Luxury Saree"
              />
            </div>

            <div className="absolute inset-0 hidden md:block">
              <Image
                src={heroImages[currentImage]}
                fill
                priority={currentImage === 0}
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-[82%_10%]"
                alt="Luxury Saree"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ================= OVERLAYS ================= */}

        {/* Desktop overlay — left to right, matches landscape crop */}
        <div className="absolute inset-0 z-[1] hidden bg-gradient-to-r from-black/90 via-black/60 to-black/20 lg:block" />

        {/* Mobile / tablet overlay — bottom to top, matches portrait crop
            where the content sits at the bottom of the frame */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/75 to-black/35 lg:hidden" />

        {/* Flat darkening pass so the image never washes the text out,
            regardless of how bright the underlying photo is */}
        <div className="absolute inset-0 z-[1] bg-black/35" />

        {/* Emerald Glow */}
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_left,#065f4630,transparent_55%)]" />

        {/* Decorative Blur */}
        <div className="absolute -left-32 top-32 z-[1] h-96 w-96 rounded-full bg-emerald-600/20 blur-[140px]" />
        <div className="absolute right-0 bottom-0 z-[1] h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />

        {/* ================= AOMOZ BY MONIRA WATERMARK ================= */}
        <div className="pointer-events-none absolute inset-0 z-[2] flex -translate-y-21 flex-col items-center justify-center overflow-hidden select-none sm:translate-y-0">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="leading-none text-white/[0.14] drop-shadow-[0_0_35px_rgba(16,185,129,0.15)]"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "20vw",
              letterSpacing: "0.08em",
            }}
          >
            AOMOZ
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.15 }}
            className="-mt-1 text-white/[0.14] sm:-mt-2"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "5.2vw",
              letterSpacing: "0.55em",
            }}
          >
            BY MONIRA
          </motion.span>
        </div>

        {/* ================= CONTENT ================= */}
       <div className="relative z-20 flex h-full items-end pb-20 pt-16 sm:pb-24 sm:pt-0 lg:items-center lg:pb-0">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl text-left lg:max-w-2xl"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-[11px] uppercase tracking-[0.4em] text-white/70 sm:text-xs">
                  New Collection · 2026
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-6 text-4xl font-semibold leading-[0.98] text-white sm:text-6xl lg:text-7xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Timeless
                <span className="block italic text-emerald-400">Elegance</span>
                <span className="block">For Every Woman</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mt-5 max-w-md text-base leading-7 text-gray-300 sm:max-w-xl sm:text-lg sm:leading-8"
              >
                Discover premium handcrafted sarees and salwar kameez
                designed with luxurious fabrics, timeless craftsmanship and
                effortless elegance for every celebration.
              </motion.p>

              {/* Buttons — stacked, full width on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="mt-8 flex flex-col items-stretch gap-3 sm:max-w-xs"
              >
                {/* Primary — solid gradient, uppercase tracked label */}
                <Link
                  href="/products"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_8px_30px_-8px_rgba(16,185,129,0.65)] transition-all duration-300 hover:shadow-[0_12px_36px_-6px_rgba(16,185,129,0.85)]"
                >
                  <span className="relative z-10 flex items-center">
                    Shop Now
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
                </Link>

                {/* Secondary — hairline outline, uppercase tracked label */}
                <Link
                  href="/products?category=saree"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/[0.04] px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-xl transition-all duration-300 hover:border-white hover:bg-white hover:text-emerald-700"
                >
                  Explore Collection
                </Link>
              </motion.div>

              {/* Feature row — small tracked caps, wraps like reference */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] sm:text-xs"
              >
                <span className="text-emerald-300">Premium Quality</span>
                <span className="text-gray-400">Free Delivery</span>
                <span className="text-gray-400">Easy Returns</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Vertical Scroll Indicator */}
  
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.3 }}
  className="pointer-events-none absolute bottom-8 right-5 z-20 flex flex-col items-center gap-2 sm:right-8 lg:bottom-10"
>
  <span className="h-8 w-px bg-white/40" />
  <div className="flex flex-col items-center gap-[3px] text-[9px] uppercase tracking-widest text-white/60">
    {"SCROLL".split("").map((letter, i) => (
      <span key={i}>{letter}</span>
    ))}
  </div>
</motion.div>

        {/* Image Indicators */}
        <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3 md:bottom-8">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-2 rounded-full transition-all ${
                currentImage === index
                  ? "w-10 bg-emerald-500"
                  : "w-2 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}