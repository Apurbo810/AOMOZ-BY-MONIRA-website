"use client";

import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 py-20 px-4 md:px-10 bg-[#fff5f5]">
      {/* Text Section */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-sm text-gray-900">
          About <span className="text-[#E60000]">Live Perwatch</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700">
          Live Perwatch is more than a fragrance brand — it is elegance,
          confidence, and identity. Crafted with premium long-lasting notes, our
          perfumes bring out a bold character in every spray.
        </p>

        <p className="text-base md:text-lg text-gray-700">
          Founded with passion for modern luxury, we aim to redefine the
          fragrance experience with quality, presentation and long-lasting charm.
          Designed for those who love to stand out.
        </p>

        <div className="pt-4">
          <a
            href="/contact"
            className="inline-block bg-[#E60000] hover:bg-[#B30000] text-white font-semibold text-base md:text-lg px-7 py-3 rounded-full transition duration-300 shadow-md hover:shadow-xl"
          >
            Contact Us
          </a>
        </div>
      </div>

      {/* Logo Section */}
      <div className="md:w-1/2 w-full flex justify-center">
        <div className="w-[360px] h-[360px] md:w-[520px] md:h-[520px] relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#E60000]/20 bg-white flex items-center justify-center">
          <Image
            src="/live-logo.png" // your logo file
            alt="Live Perwatch Logo"
            width={400} // adjust for desktop
            height={400} // adjust for desktop
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default About;
