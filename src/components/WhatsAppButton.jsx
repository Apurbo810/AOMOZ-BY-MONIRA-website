"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

/**
 * Floating WhatsApp button — shows on every page it's mounted on.
 * Mount this ONCE in app/layout.js (outside <main>) so it persists
 * across the whole app instead of adding it to individual pages.
 *
 * Usage in app/layout.js:
 *
 *   import WhatsAppButton from "@/components/WhatsAppButton";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en">
 *         <body>
 *           {children}
 *           <WhatsAppButton />
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * NOTE: positioned bottom-right. On mobile it's raised to bottom-36
 * (with extra clearance since the label adds height below the icon)
 * so it sits well above the products-page filter FAB (bottom-16
 * right-5, lg:hidden) without overlapping; on desktop it drops to
 * the standard bottom-right corner since the filter FAB doesn't
 * exist there.
 */

// TODO: replace with your real WhatsApp number, country code first, no + or spaces
const WHATSAPP_NUMBER = "8801XXXXXXXXX";
const DEFAULT_MESSAGE = "Hi! I'd like to know more about your products.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      className="
        fixed z-[60]
        bottom-36 right-5
        lg:bottom-6 lg:right-6
        flex flex-col items-center gap-1.5
        group
      "
    >
      {/* Icon with pulsing ring */}
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        <div
          className="
            relative w-14 h-14 rounded-full
            bg-[#25D366]
            flex items-center justify-center
            shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)]
            group-hover:bg-[#20bd5a]
            transition-colors duration-300
          "
        >
          <FaWhatsapp size={28} className="text-white" />
        </div>
      </div>

      {/* Label */}
      <span
        className="
          text-[11px] font-semibold uppercase tracking-[0.15em]
          text-white bg-black backdrop-blur-sm
          px-3 py-1 rounded-full
          shadow-md
          group-hover:bg-black/85
          transition-colors duration-300
        "
      >
        WhatsApp
      </span>
    </motion.a>
  );
}