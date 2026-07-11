"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const shopLinks = [
  { label: "All Products", href: "/products" },
  { label: "Saree Collection", href: "/products?category=saree" },
  { label: "Salwar Kamiz", href: "/products?category=salwar-kamiz" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Create Account", href: "/register" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      suppressHydrationWarning
      className="relative overflow-hidden bg-[var(--color-primary)]"
    >
      {/* ── Cohesive vignette — same hue family as the background, no clashing black/glow blobs ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--color-primary) 70%, white 6%) 0%, var(--color-primary) 55%), linear-gradient(180deg, transparent 0%, color-mix(in srgb, var(--color-primary) 60%, black 40%) 100%)",
        }}
      />

      {/* ── Subtle watermark, contained ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-6 right-0 z-[1] select-none whitespace-nowrap"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontWeight: 600,
          letterSpacing: "0.08em",
          fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
          color: "rgba(255,255,255,0.05)",
        }}
      >
        AOMOZ
      </div>

      {/* ── Accent top divider ── */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/60 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 pt-20 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-14 gap-x-8">

          {/* BRAND — 4 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 lg:pr-8"
          >
            <Image
              src="/AOMOZ BY MONIRA.png"
              className="h-10 mb-3 brightness-0 invert"
              alt="AOMOZ BY MONIRA"
              width={180}
              height={48}
            />

            <p
              className="italic mb-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "13px",
                letterSpacing: "0.3em",
                color: "var(--color-accent)",
              }}
            >
              by Monira
            </p>

            <p className="text-sm leading-7 max-w-xs text-white/55">
              Discover elegance with our premium Saree and Salwar Kamiz
              collections — designed for modern women who value tradition
              and luxury.
            </p>

            <Link
              href="/products"
              className="
                group inline-flex items-center gap-2 mt-7
                rounded-full px-6 py-2.5
                border border-[var(--color-accent)]
                text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black
                text-xs font-semibold uppercase tracking-[0.2em]
                no-underline transition-all duration-300
              "
            >
              Explore Collection
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>

            {/* Social icons */}
            <div className="flex gap-3 mt-8">
              {[
                { icon: <FaFacebookF size={13} />, href: "#" },
                { icon: <FaInstagram size={13} />, href: "#" },
                { icon: <FaLinkedinIn size={13} />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="
                    w-9 h-9 flex items-center justify-center rounded-full
                    border border-white/15 text-white/50
                    hover:bg-[var(--color-accent)]
                    hover:border-[var(--color-accent)]
                    hover:text-black
                    transition-all duration-300
                  "
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* SHOP — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-8"
          >
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
              Shop
            </p>
            <ul className="space-y-3.5">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="
                      group inline-flex items-center gap-1.5
                      text-sm no-underline text-white/60
                      hover:text-white transition-colors duration-300
                    "
                  >
                    <span className="w-0 h-px bg-[var(--color-accent)] group-hover:w-3 transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* COMPANY — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="lg:col-span-2 lg:border-l lg:border-white/10 lg:pl-8"
          >
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
              Company
            </p>
            <ul className="space-y-3.5">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="
                      group inline-flex items-center gap-1.5
                      text-sm no-underline text-white/60
                      hover:text-white transition-colors duration-300
                    "
                  >
                    <span className="w-0 h-px bg-[var(--color-accent)] group-hover:w-3 transition-all duration-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* NEWSLETTER — 4 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.26 }}
            className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8"
          >
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
              Stay Connected
            </p>

            <p className="text-sm leading-7 mb-5 max-w-xs text-white/55">
              New arrivals, exclusive offers, and styling notes — straight to
              your inbox.
            </p>

            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="
                  w-full text-sm pl-5 pr-24 py-3 rounded-full
                  bg-black/15 border border-white/15
                  text-white placeholder:text-white/35 outline-none
                  focus:border-[var(--color-accent)]
                  transition-colors duration-300
                "
              />
              <button
                className="
                  absolute right-1.5 top-1/2 -translate-y-1/2 rounded-full
                  bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]
                  text-black text-[10px] font-bold uppercase tracking-[0.25em]
                  px-5 py-2.5
                  transition-colors duration-300
                "
              >
                Join
              </button>
            </div>

            {/* Trust strip */}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
              <span>Free Delivery</span>
              <span className="text-white/15">•</span>
              <span>Easy Returns</span>
              <span className="text-white/15">•</span>
              <span>Premium Quality</span>
            </div>
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
          <p className="text-[11px] tracking-[0.1em] text-white/35">
            © {currentYear} AOMOZ BY MONIRA — All Rights Reserved.
          </p>
          <div className="flex gap-6 text-[11px] uppercase tracking-[0.12em] text-white/30">
            <Link
              href="/privacy"
              className="no-underline text-inherit hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="no-underline text-inherit hover:text-[var(--color-accent)] transition-colors duration-300"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}