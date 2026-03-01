"use client";

import {
  FiTruck,
  FiHeadphones,
  FiAward,
  FiRefreshCw,
} from "react-icons/fi";

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

        {/* Section Title */}
        <div className="text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)] uppercase tracking-wide">

            Trustworthy Shopping Experience

          </h2>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-8 text-center border border-gray-200"
            >

              {/* Icon */}
              <div className="flex justify-center mb-4 text-[var(--color-primary)]">

                {feature.icon}

              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">

                {feature.title}

              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">

                {feature.desc}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}