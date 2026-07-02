"use client";

import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 py-20 px-4 md:px-10 bg-[var(--color-bg-primary)] relative overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[700px] h-[700px] bg-[var(--color-primary)]/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      {/* Text Section */}
      <div className="md:w-1/2 space-y-6 text-center md:text-left relative z-10">

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          About{" "}
          <span className="text-[var(--color-primary)]">
            AOMOZ BY MONIRA
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700">
          AOMOZ BY MONIRA brings timeless elegance through premium sarees and
          salwar kamiz collections. Our designs reflect tradition, beauty, and
          modern sophistication for women who value style and quality.
        </p>

        <p className="text-base md:text-lg text-gray-700">
          We are committed to providing authentic fabrics, exceptional
          craftsmanship, and a luxury shopping experience. Every piece is
          carefully selected to make you feel confident, graceful, and unique.
        </p>

        {/* Button */}
        <div className="pt-4">

          <a
            href="/contact"
            className="inline-block bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold text-base md:text-lg px-7 py-3 rounded-xl transition shadow-md hover:shadow-lg"
          >
            Contact Us
          </a>

        </div>

      </div>

      {/* Logo Section */}
      <div className="md:w-1/2 w-full flex justify-center relative z-10">

        <div className="w-[360px] h-[360px] md:w-[520px] md:h-[520px] relative rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white flex items-center justify-center">

          <Image
            src="/AOMOZ BY MONIRA.png" // replace with your logo if needed
            alt="AOMOZ BY MONIRA Logo"
            width={420}
            height={420}
            className="object-contain"
            priority
          />

        </div>

      </div>

    </section>
  );
};

export default About;