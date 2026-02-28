import { GiChemicalDrop, GiPerfumeBottle, GiGiftTrap } from "react-icons/gi";

export default function WhyChoose() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24">

      {/* Soft glowing red background (matches ProductSection) */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[1300px] h-[1300px]
                      bg-red-500/10 blur-3xl opacity-50 rounded-full"></div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <h4 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Why Choose Live Perwatch
          </h4>
          <p className="text-gray-600 mt-3 text-lg">
            Discover why our premium fragrances stand out
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Feature 1 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center">
            <GiChemicalDrop className="mx-auto w-12 h-12 text-red-600 mb-4" />
            <h5 className="text-xl font-bold text-red-600 mb-2">Quality Ingredients</h5>
            <p className="text-gray-600">Carefully selected extracts for a lasting, luxurious fragrance.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center">
            <GiPerfumeBottle className="mx-auto w-12 h-12 text-red-600 mb-4" />
            <h5 className="text-xl font-bold text-red-600 mb-2">Lasting Scents</h5>
            <p className="text-gray-600">Formulated for longevity — a scent that stays with you all day.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 text-center">
            <GiGiftTrap className="mx-auto w-12 h-12 text-red-600 mb-4" />
            <h5 className="text-xl font-bold text-red-600 mb-2">Premium Packaging</h5>
            <p className="text-gray-600">Luxurious and modern design that looks stunning on any shelf.</p>
          </div>

        </div>

              {/* Bangla Info Sections */}
      <div className="mt-24 space-y-12">

        {/* Section 1 */}
        <div className="bg-[#FBF7E6] rounded-2xl p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            আমরা কৃত্রিম ভাবে মূল্য বৃদ্ধি করি না
          </h3>

          <ul className="space-y-4 text-gray-800 text-lg">
            <li className="flex gap-3">
              <span className="text-green-600">✔</span>
              সততা আমাদের ব্যবসায়ের মূল ভিত্তি।
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✔</span>
              তাই অফার দেওয়ার সময় কৃত্রিম ভাবে রেগুলার প্রাইস বাড়িয়ে অফার প্রাইস তৈরি করি না।
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✔</span>
              ফলশ্রুতিতে, আপনি LivePerWatch এ বিশাল ছাড়ের ছড়াছড়ি দেখতে পাবেন না।
            </li>
            <li className="flex gap-3">
              <span className="text-green-600">✔</span>
              প্রাইস ঠিকই তুলনামূলক কম থাকে।
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-[#EAF6FB] rounded-2xl p-8 md:p-12 shadow-sm">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            অনলাইন এবং শো-রুম থেকে কেনাকাটার সুযোগ
          </h3>

          <ul className="space-y-4 text-gray-800 text-lg">
            <li className="flex gap-3">
              <span className="text-green-600">✔</span>
              LivePerWatch এ অনলাইনে প্রোডাক্ট ক্রয়ের পাশাপাশি শো-রুমে গিয়েও প্রোডাক্ট ক্রয় করতে পারেন।
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Shipping & Delivery
          </h3>

          <p className="text-gray-700 text-lg leading-relaxed">
            সারা বাংলাদেশে আমরা ৪৮–৭২ ঘন্টার মধ্যে হোম ডেলিভারি দিচ্ছি।
            <br />
            যেকোনো সমস্যায় সরাসরি ফোন করুন।
            <br />
            আমাদের হটলাইন নাম্বারে (সকাল ১০.০০ টা থেকে রাত ৮.০০ টা পর্যন্ত)
          </p>

          <div className="mt-6 inline-flex items-center gap-3 border rounded-xl px-6 py-3">
            <span className="text-red-600 text-xl">📞</span>
            <span className="text-lg font-semibold">01609-688588</span>
          </div>
        </div>

      </div>

      </div>
    </section>
  );
}
