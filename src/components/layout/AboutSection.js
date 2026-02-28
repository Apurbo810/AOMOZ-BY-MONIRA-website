"use client";

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24 lg:py-32">

      {/* Animated Background Elements */}
      <div className="absolute left-1/4 top-0 w-96 h-96 bg-red-500/10 blur-3xl opacity-60 rounded-full animate-pulse"></div>
      <div
        className="absolute right-1/4 bottom-0 w-96 h-96 bg-orange-500/10 blur-3xl opacity-60 rounded-full animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(239, 68, 68, 0.15) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:gap-20 items-start">

          {/* LEFT CONTENT */}
          <div className="space-y-6 lg:space-y-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full border border-red-100">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-sm font-semibold text-red-600 uppercase">
                Our Story
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900">
              About{" "}
              <span className="bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent">
                Live Perwatch
              </span>
            </h2>

            <p className="text-gray-600 text-lg">
              Live Perwatch crafts{" "}
              <span className="font-semibold text-gray-900">modern fragrances</span>{" "}
              inspired by bold personalities.
            </p>

            <p className="text-gray-600 text-lg">
              We combine{" "}
              <span className="font-semibold text-gray-900">artistry and quality</span>{" "}
              to bring you perfumes that leave a lasting impression.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: "✨", label: "Premium Quality" },
                { icon: "⏱️", label: "Long-lasting" },
                { icon: "🎨", label: "Unique Scents" },
                { icon: "💎", label: "Luxury Experience" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 bg-white border rounded-xl shadow-sm"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-semibold text-gray-700">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* VIDEO SECTION */}
          <div className="relative mt-12 w-full lg:max-w-4xl mx-auto">

            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-3xl blur opacity-25 animate-pulse"></div>

            <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <div className="relative aspect-video">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/videos/about.mp4"
                  controls
                  preload="metadata"
                  playsInline
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
