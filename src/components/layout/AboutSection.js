<<<<<<< HEAD
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
=======
"use client";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-black">
      
      {/* Animated Background Elements */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-[#D4AF37]/10 blur-3xl opacity-40 rounded-full animate-pulse"></div>
      <div 
        className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-[#D4AF37]/5 blur-3xl opacity-40 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Content */}
          <div className="space-y-8 lg:space-y-12 text-white">
            
            {/* Top Label */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full max-w-fit mx-auto">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Our Story
              </span>
            </div>

            {/* Main Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-semibold leading-tight">
                Curated{" "}
                <span className="text-[#D4AF37]">Women's Fashion</span>
              </h2>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light mt-4 text-gray-300">
                Timeless Elegance
              </p>
            </div>

            {/* Description - Updated for retail business */}
            <div className="space-y-6 text-gray-300 max-w-2xl mx-auto">
              <p className="text-lg sm:text-xl leading-relaxed">
                We carefully curate the finest women's clothing from renowned designers across the country.
              </p>
              <p className="text-lg sm:text-xl leading-relaxed">
                From exquisite sarees to elegant salwar kameez, we bring you premium collections that celebrate timeless style and sophistication.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 max-w-4xl mx-auto">
              {[
                { label: "Premium Collections", desc: "Sourced from top designers" },
                { label: "Authentic Quality", desc: "Guaranteed original pieces" },
                { label: "Latest Trends", desc: "Season's most sought-after designs" },
                { label: "Perfect Fit", desc: "Size inclusive luxury fashion" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="group flex flex-col p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl hover:bg-white/20 transition-all duration-400 hover:-translate-y-3 shadow-2xl hover:shadow-3xl text-left"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300">
                    <div className="w-8 h-8 bg-[#D4AF37] rounded-lg shadow-lg flex items-center justify-center font-serif font-bold text-sm text-black">
                      {index + 1}
                    </div>
                  </div>
                  <h4 className="text-lg font-serif font-semibold mb-2">{item.label}</h4>
                  <p className="text-sm text-gray-300 opacity-90">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-16 justify-center">
              <Link
                href="/products"
                className="px-12 py-5 bg-[#D4AF37] text-black font-serif font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 tracking-wide text-lg w-fit"
              >
                EXPLORE COLLECTION
              </Link>
              <Link
                href="/about"
                className="px-12 py-5 border-2 border-[#D4AF37] text-[#D4AF37] font-serif font-semibold rounded-xl transition-all duration-300 hover:bg-[#D4AF37] hover:text-black backdrop-blur-sm text-lg w-fit"
              >
                OUR STORY
              </Link>
            </div>

            {/* Additional Text Below */}
            <div className="pt-20 max-w-2xl mx-auto text-center">
              <p className="text-gray-400 text-lg leading-relaxed">
                Join thousands of women who trust us for their ethnic wear needs. 
                <span className="font-semibold text-[#D4AF37]">Every purchase is backed by our quality promise.</span>
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mt-4">
                Experience premium fashion delivered with care across the nation.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
