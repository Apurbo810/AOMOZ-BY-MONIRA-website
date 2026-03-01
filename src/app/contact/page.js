"use client";

import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
<<<<<<< HEAD

  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {

    const phone = "8801609688588";

=======
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    const phone = "8801609688588"; // ✅ FIXED NUMBER
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    const encoded = encodeURIComponent(
      message || "Hello! I’d like to make an inquiry."
    );

    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`,
      "_blank"
    );
  };

  return (
<<<<<<< HEAD

    <section className="bg-[var(--color-bg-primary)] min-h-screen py-20 px-4 md:px-10 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-[900px] h-[900px] bg-[var(--color-primary)]/10 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
          Contact{" "}
          <span className="text-[var(--color-primary)]">
            AOMOZ BY MONIRA
          </span>
        </h1>

        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          For orders, support, or business inquiries — feel free to contact us anytime.
=======
    <section className="bg-gradient-to-br from-[#fff5f5] via-white to-[#ffeaea] min-h-screen py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
          Contact <span className="text-[#E60000]">Live Perwatch</span>
        </h1>

        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          For orders, business, supply or partnership — reach out any time.
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* CONTACT INFO */}
<<<<<<< HEAD
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-l-4 border-[var(--color-primary)] space-y-6">

            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
              Get in Touch
            </h2>

            <div className="space-y-4 text-gray-700">

              <div className="flex items-start gap-3">
                <FiMapPin className="text-[var(--color-accent)] text-xl mt-1" />
                <p>Dhaka, Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-[var(--color-accent)] text-xl" />

                <a
                  href="tel:01609688588"
                  className="hover:text-[var(--color-primary)] transition"
                >
                  01609-688588
                </a>

              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-[var(--color-accent)] text-xl" />

                <a
                  href="mailto:your@email.com"
                  className="hover:text-[var(--color-primary)] transition"
                >
                  your@email.com
                </a>

              </div>

            </div>

          </div>

          {/* MESSAGE BOX */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border-l-4 border-[var(--color-primary)] space-y-6">

            <h2 className="text-2xl font-semibold text-[var(--color-primary)]">
=======
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-l-4 border-[#E60000] space-y-6">
            <h2 className="text-2xl font-semibold text-[#E60000]">
              Get in Touch
            </h2>

            <div className="space-y-4 text-gray-700 text-base">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-[#E60000] text-xl mt-1" />
                <p>Banani, Dhaka — Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <FiPhone className="text-[#E60000] text-xl" />
                <a
                  href="tel:01609688588"
                  className="hover:text-[#B30000] transition"
                >
                  01609-688588
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FiMail className="text-[#E60000] text-xl" />
                <a
                  href="mailto:liveperwatch@gmail.com"
                  className="hover:text-[#B30000] transition"
                >
                  liveperwatch@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* MESSAGE BOX */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border-l-4 border-[#E60000] space-y-6">
            <h2 className="text-2xl font-semibold text-[#E60000]">
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
              Send us a Message
            </h2>

            <textarea
              rows="6"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
<<<<<<< HEAD
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-gray-700"
=======
              className="w-full p-4 border border-[#E60000]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E60000] text-gray-700"
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
            />

            <button
              onClick={handleWhatsApp}
<<<<<<< HEAD
              className="flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold px-6 py-3 rounded-xl transition shadow-md hover:shadow-lg w-full"
=======
              className="flex items-center justify-center gap-2 bg-[#E60000] hover:bg-[#B30000] text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md hover:shadow-xl w-full"
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
            >
              <FaWhatsapp className="text-xl" />
              Send via WhatsApp
            </button>
<<<<<<< HEAD

          </div>

        </div>

        {/* MAP */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg border border-gray-200">

          <iframe
            title="Location"
            src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />

        </div>

      </div>

    </section>

  );
};

export default Contact;
=======
          </div>
        </div>

        {/* MAP */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl border border-[#E60000]/30">
        <iframe
  title="Live Perwatch Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.661405904964!2d90.35601587440254!3d23.760146688369203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1248aa91cc9%3A0x49e6e96dd4e9ad6c!2sChandol%20Bhog%20Road%2C%20Dhaka%201234!5e0!3m2!1sen!2sbd!4v1721770549991!5m2!1sen!2sbd"
  width="100%"
  height="420"
  style={{ border: 0 }}
  loading="lazy"
  allowFullScreen
/>
        </div>

      </div>
    </section>
  );
};

export default Contact;
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
