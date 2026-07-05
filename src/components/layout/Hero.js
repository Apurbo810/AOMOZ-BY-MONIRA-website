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

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-white">
      {/* Background Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Image
              src={heroImages[currentImage]}
              alt="Luxury Saree"
              fill
              sizes="100vw"
              priority
              className="object-cover object-[80%_10%]"
            />
          </motion.div>
        </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />

      {/* Green Glow */}
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_left,#0f766e55,transparent_55%)]" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-block rounded-full border border-emerald-300/30 bg-emerald-700/20 px-5 py-2 text-sm font-medium tracking-widest text-emerald-200 backdrop-blur-md"
          >
            PREMIUM ETHNIC COLLECTION
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-5xl font-bold leading-tight text-white md:text-7xl"
          >
            Elegance
            <span className="block text-emerald-400">
              Woven Into Every Thread
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl text-lg leading-8 text-gray-200"
          >
            Discover our exclusive collection of premium Sarees and Salwar
            Kameez designed to celebrate tradition with modern elegance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-5"
          >
            <Link
              href="/products"
              className="group inline-flex items-center rounded-full bg-emerald-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-emerald-700"
            >
              Shop Sarees
              <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/collections"
              className="rounded-full border border-white/40 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-emerald-700"
            >
              Explore Collection
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            {[
              "Premium Fabric",
              "Authentic Design",
              "Worldwide Shipping",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="text-white">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              currentImage === index
                ? "w-12 bg-emerald-500"
                : "w-3 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Right Glass Card */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-14 right-10 hidden w-72 rounded-3xl border border-white/20 bg-white/10 p-6 text-white backdrop-blur-xl lg:block"
      >
        <p className="text-sm uppercase tracking-widest text-emerald-300">
          New Arrival
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          Luxury Wedding Collection
        </h3>

        <p className="mt-3 text-sm text-gray-200">
          Handcrafted designs made with premium fabrics and timeless artistry.
        </p>

        <Link
          href="/new-arrivals"
          className="mt-5 inline-flex items-center font-semibold text-emerald-300 hover:text-emerald-200"
        >
          View Collection
          <ChevronRight className="ml-1 h-5 w-5" />
        </Link>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="absolute bottom-6 right-6 hidden text-white lg:block"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-xs tracking-[4px]">SCROLL</span>
          <div className="flex h-12 w-7 justify-center rounded-full border border-white">
            <div className="mt-2 h-3 w-1 rounded-full bg-white" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}