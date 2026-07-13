"use client";

import { useState } from "react";
import { FaComments, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_NUMBER = "8801XXXXXXXXX";
const MESSENGER_LINK = "https://m.me/yourpage"; // Replace with your page

const DEFAULT_MESSAGE =
  "Hi! I'd like to know more about your products.";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  const whatsapp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-3"
          >
            {/* Messenger */}
            <motion.a
              whileHover={{ x: -4 }}
              href={MESSENGER_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white rounded-full shadow-xl px-4 py-3"
            >
              <div className="w-11 h-11 rounded-full bg-[#0084FF] flex items-center justify-center">
                <FaFacebookMessenger className="text-white text-xl" />
              </div>
              <span className="font-medium text-gray-700">
                Messenger
              </span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              whileHover={{ x: -4 }}
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white rounded-full shadow-xl px-4 py-3"
            >
              <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center">
                <FaWhatsapp className="text-white text-xl" />
              </div>
              <span className="font-medium text-gray-700">
                WhatsApp
              </span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative w-16 h-16 rounded-full bg-[var(--color-accent)] text-black shadow-2xl flex items-center justify-center"
      >
        <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-30 animate-ping"></span>

        <FaComments className="relative text-3xl" />
      </motion.button>
    </div>
  );
}