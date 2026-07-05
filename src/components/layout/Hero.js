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
    src="/hero-saree-mobile.jpg"
    fill
    priority
    sizes="100vw"
    className="object-cover"
    alt="Luxury Saree"
  />
</div>

<div className="absolute inset-0 hidden md:block">
  <Image
    src={heroImages[currentImage]}
    fill
    priority
    sizes="100vw"
    className="object-cover object-[82%_10%]"
    alt="Luxury Saree"
  />
</div>
        </motion.div>
      </AnimatePresence>

      {/* Luxury Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

      {/* Emerald Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#065f4630,transparent_55%)]" />

      {/* Extra Mobile Overlay */}
      <div className="absolute inset-0 bg-black/20 lg:hidden" />

      {/* Decorative Blur */}
      <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-emerald-600/20 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
      {/* Content */}
<div className="
relative
z-20

flex

h-full

items-end
lg:items-center

pb-28
lg:pb-0
">
  <div className="
mx-auto
w-full
max-w-7xl

px-5

sm:px-8

lg:px-12
">

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="
max-w-xl
lg:max-w-2xl

text-center
lg:text-left

mx-auto
lg:mx-0
"
    >

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .2 }}
        className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-600/10 backdrop-blur-xl px-4 py-2"
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

        <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-emerald-200">
          Luxury Collection 2026
        </span>
      </motion.div>

      {/* Heading */}

      <motion.h1
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .35 }}
        className="
        mt-6
        text-3xl
        font-bold
        leading-[1.05]
        
        text-white

        sm:text-5xl

        lg:text-7xl
        "
      >
        Timeless
        <span className="block text-emerald-400">
          Elegance
        </span>

        <span className="block">
          For Every Woman
        </span>
      </motion.h1>

      {/* Description */}

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .55 }}
        className="
        mt-6
        max-w-md
        text-base
        leading-7
        text-gray-200

        sm:max-w-xl
        sm:text-lg
        sm:leading-8
        "
      >
        Discover premium handcrafted sarees and salwar
        kameez designed with luxurious fabrics, timeless
        craftsmanship and effortless elegance for every
        celebration.
      </motion.p>

      {/* Buttons */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .75 }}
className="
mt-8

flex

flex-col

gap-3

sm:flex-row

justify-center
lg:justify-start
"
      >

        <Link
          href="/products"
          className="
          group

          inline-flex
          items-center
          justify-center

          rounded-full

          bg-emerald-600

          px-8
          py-4

          font-semibold

          text-white

          transition-all
          duration-300

          hover:bg-emerald-700
          hover:scale-105
          "
        >
          Shop Now

          <ChevronRight
            className="
            ml-2
            h-5
            w-5
            transition-transform
            group-hover:translate-x-1
            "
          />
        </Link>

        <Link
          href="/products?category=saree"
          className="
          inline-flex
          items-center
          justify-center

          rounded-full

          border
          border-white/30

          bg-white/10

          px-8
          py-4

          font-semibold
          text-white

          backdrop-blur-xl

          transition

          hover:bg-white
          hover:text-emerald-700
          "
        >
          Explore Collection
        </Link>

      </motion.div>

      {/* Features */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="
        mt-12



        grid-cols-1

        gap-4

        text-sm

        text-white

       hidden
      md:grid
      md:grid-cols-3
        "
      >

        {[
          "Premium Fabrics",
          "Worldwide Shipping",
          "Authentic Craftsmanship",
        ].map((item) => (

          <div
            key={item}
            className="
            flex
            items-center
            gap-3

            rounded-xl

            bg-white/5

            px-4
            py-3

            backdrop-blur-md
            "
          >
            <div className="h-2 w-2 rounded-full bg-emerald-400" />

            {item}
          </div>

        ))}

      </motion.div>

    </motion.div>

  </div>
</div>
      {/* Image Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-3">
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
    </div> {/* closes Hero Height */}

  </section>
);
}
