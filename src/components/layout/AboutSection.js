"use client";

import {
  FiTruck,
  FiHeadphones,
  FiAward,
  FiRefreshCw,
} from "react-icons/fi";
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function AboutSection() {
  const features = [
    {
      icon: <FiTruck size={32} />,
      title: "Fastest Delivery",
      desc: "We provide Same Day (8 Hours) & Next Day delivery service besides regular delivery.",
    },
    {
      icon: <FiHeadphones size={32} />,
      title: "24/7 Customer Support",
      desc: "We provide 24/7 friendly customer service for your convenience.",
    },
    {
      icon: <FiAward size={32} />,
      title: "Premium Quality",
      desc: "We never compromise with quality. 100% authentic and premium products.",
    },
    {
      icon: <FiRefreshCw size={32} />,
      title: "Easy Return",
      desc: "We provide hassle-free and customer-friendly return service.",
    },
  ];

  return (
    <section className="bg-[var(--color-bg-primary)] py-20 px-4 relative overflow-hidden">
      {/* Glow Background */}
      <div className="absolute w-[700px] h-[700px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title - Stylish Pechano Design */}
        <div className="text-center mb-16">
          <h2 className={`
            ${greatVibes.className}
            text-4xl md:text-5xl lg:text-6xl
            text-[var(--color-primary)]
            mb-4
          `}>
            Trustworthy Shopping Experience
          </h2>
          <p className="
            text-gray-600 
            max-w-2xl mx-auto 
            text-sm md:text-base 
            leading-relaxed
          ">
            Discover why thousands choose us for their premium fashion needs
          </p>
        </div>

        {/* Professional Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                group bg-white/80 backdrop-blur-sm
                rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-500 hover:-translate-y-2
                border border-[var(--color-border)]/50
                overflow-hidden hover:border-[var(--color-primary)]/30
                p-6 md:p-8 text-center
                h-full
              "
            >
              {/* Icon with hover effect */}
              <div className="
                flex justify-center mb-6 
                text-[var(--color-primary)] 
                group-hover:scale-110 transition-transform duration-300
              ">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="
                text-lg md:text-xl font-semibold 
                text-gray-900 mb-4
                bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent
                group-hover:from-[var(--color-primary)] group-hover:to-[var(--color-accent)]
                transition-all duration-300
              ">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="
                text-sm md:text-base 
                text-gray-600 leading-relaxed
                group-hover:text-gray-800 transition-colors
              ">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
