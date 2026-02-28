"use client";

import React, { useState } from "react";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleWhatsApp = () => {
    const phone = "8801609688588"; // ✅ FIXED NUMBER
    const encoded = encodeURIComponent(
      message || "Hello! I’d like to make an inquiry."
    );

    window.open(
      `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`,
      "_blank"
    );
  };

  return (
    <section className="bg-gradient-to-br from-[#fff5f5] via-white to-[#ffeaea] min-h-screen py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
          Contact <span className="text-[#E60000]">Live Perwatch</span>
        </h1>

        <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto mb-12">
          For orders, business, supply or partnership — reach out any time.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* CONTACT INFO */}
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
              Send us a Message
            </h2>

            <textarea
              rows="6"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 border border-[#E60000]/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E60000] text-gray-700"
            />

            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#E60000] hover:bg-[#B30000] text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md hover:shadow-xl w-full"
            >
              <FaWhatsapp className="text-xl" />
              Send via WhatsApp
            </button>
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
