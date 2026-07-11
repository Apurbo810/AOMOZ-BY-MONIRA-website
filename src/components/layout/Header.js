"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import { FiUser, FiPackage, FiLogOut, FiShield, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart() || {};
  const cartCount = cart?.length || 0;
  const isAdmin   = session?.user?.admin;
  const userName  = session?.user?.name  || "User";
  const userEmail = session?.user?.email || "";

  const [mounted,          setMounted]          = useState(false);
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileUserOpen,   setMobileUserOpen]   = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target))
        setUserDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileUserOpen(false);
  };

  const NAV_LINKS = [
    { href: "/",                             label: "Home"          },
    { href: "/products",                     label: "Shop"          },
    { href: "/products?category=saree",      label: "Saree"         },
    { href: "/products?category=salwar-kamiz", label: "Salwar Kamiz" },
    { href: "/about",                        label: "About"         },
    { href: "/contact",                      label: "Contact"       },
    ...(session ? [{ href: "/orders", label: "Orders" }] : []),
  ];

  return (
    <>
      {/* ══ NAVBAR ══ */}
      <nav suppressHydrationWarning className="fixed top-0 left-0 w-full z-50
        bg-white/90 backdrop-blur-xl
        border-b border-[#D4AF37]/20
        shadow-lg">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

          {/* ── Logo + text ── */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0 hover:scale-105 transition">
            <Image
              src="/AOMOZ BY MONIRA.png"
              alt="AOMOZ BY MONIRA"
              width={120}
              height={40}
              className="h-8 sm:h-10 w-auto object-contain group-hover:scale-105 transition"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-serif font-bold text-gray-900 tracking-tight leading-none">
                AOMOZ
              </span>
              <span className="text-xs sm:text-sm font-light text-gray-600 uppercase tracking-[0.2em] -mt-1">
                by Monira
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold tracking-wide">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href}
                  className="text-gray-700 hover:text-[#D4AF37] transition py-2 font-semibold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Desktop right side ── */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">

            {/* Login / Register */}
            {!session && (
              <div className="flex items-center gap-3 text-sm">
                <Link href="/login"    className="font-medium py-2 hover:text-[#D4AF37] transition">Login</Link>
                <Link href="/register" className="font-medium py-2 hover:text-[#D4AF37] transition">Register</Link>
              </div>
            )}

            {/* User popover */}
            {session && mounted && (
              <div className="relative text-sm" ref={popoverRef}>
                <button
                  onClick={() => setUserDropdownOpen((p) => !p)}
                  className="flex items-center gap-2 group focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold
                    transition-all duration-200 group-hover:scale-105"
                    style={{ background: "#D4AF37" }}>
                    {userName[0].toUpperCase()}
                  </div>
                  <span className="font-semibold text-gray-800 group-hover:text-[#D4AF37] transition hidden xl:block">
                    {userName.split(" ")[0]}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${userDropdownOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dark dropdown */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0,  scale: 1    }}
                      exit={{    opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute right-0 mt-3 w-64 rounded-2xl overflow-hidden shadow-2xl"
                      style={{ background: "#0D0A06", border: "1px solid rgba(212,175,55,0.25)" }}
                    >
                      {/* Header */}
                      <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                            style={{ background: "#D4AF37" }}>
                            {userName[0].toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p style={{ color: "#FDF6EC", fontSize: "14px", fontWeight: 500 }} className="truncate">{userName}</p>
                            <p style={{ color: "rgba(253,246,236,0.35)", fontSize: "11px" }} className="truncate">{userEmail}</p>
                          </div>
                        </div>
                        {isAdmin && (
                          <div className="mt-3 flex items-center gap-1.5"
                            style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.35em", color: "#D4AF37" }}>
                            <FiShield size={10} /> Admin Account
                          </div>
                        )}
                      </div>

                      {/* Links */}
                      <div className="py-2">
                        {[
                          { href: "/profile", icon: <FiUser size={14} />,    label: "Profile"   },
                          { href: "/orders",  icon: <FiPackage size={14} />, label: "My Orders" },
                        ].map((item) => (
                          <Link key={item.href} href={item.href}
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-3 px-5 py-3 transition-colors duration-200"
                            style={{ color: "rgba(253,246,236,0.65)", fontSize: "13px", textDecoration: "none" }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.15)"; e.currentTarget.style.color = "#FDF6EC"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(253,246,236,0.65)"; }}
                          >
                            <span style={{ color: "#D4AF37" }}>{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="py-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <button
                          onClick={() => { setUserDropdownOpen(false); signOut(); }}
                          className="w-full flex items-center gap-3 px-5 py-3 transition-colors duration-200"
                          style={{ color: "rgba(243,199,208,0.6)", fontSize: "13px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.15)"; e.currentTarget.style.color = "#F3C7D0"; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(243,199,208,0.6)"; }}
                        >
                          <FiLogOut size={14} style={{ color: "#D4AF37" }} />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Cart (desktop) */}
            {mounted && !isAdmin && (
              <Link href="/cart" className="relative p-2 hover:scale-110 transition group">
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 group-hover:text-[#D4AF37] transition"
                  fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] font-bold
                    w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* ── Mobile right: cart + hamburger ── */}
          <div className="flex lg:hidden items-center gap-1">

            {mounted && !isAdmin && (
              <Link href="/cart" className="relative p-2 hover:scale-110 transition group">
                <svg xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 group-hover:text-[#D4AF37] transition"
                  fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] font-bold
                    w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Hamburger */}
            <button
              className="p-2 ml-1 text-gray-700 hover:text-[#D4AF37] focus:outline-none rounded-lg transition"
              onClick={() => setMobileOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <FiX size={22} />
                : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ══ MOBILE DRAWER ══ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0, transition: { type: "spring", damping: 28, stiffness: 280 } }}
              exit={{ x: "100%", transition: { type: "tween", duration: 0.2, ease: "easeIn" } }}
              className="fixed top-0 right-0 h-full w-[78vw] max-w-xs z-50 lg:hidden flex flex-col overflow-y-auto"
              style={{ background: "rgba(255,252,248,0.98)", borderLeft: "1px solid rgba(212,175,55,0.15)", backdropFilter: "blur(20px)" }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#D4AF37]/10">
                <Link href="/" onClick={closeMobile} className="flex items-center gap-2">
                  <Image src="/AOMOZ BY MONIRA.png" alt="AOMOZ BY MONIRA" width={100} height={40}
                    className="h-9 w-auto object-contain" />
                  <div className="flex flex-col">
                    <span className="text-sm font-serif font-bold text-gray-900 leading-none">
                      AOMOZ
                    </span>
                    <span className="text-[10px] font-light text-gray-600 uppercase tracking-[0.2em] -mt-0.5">
                      by Monira
                    </span>
                  </div>
                </Link>
                <button onClick={closeMobile}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400
                    hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200">
                  <FiX size={16} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex flex-col px-3 py-4 gap-0.5">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.div key={href}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}>
                    <Link href={href} onClick={closeMobile}
                      className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold
                        text-gray-700 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200">
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mx-4 h-px bg-[#D4AF37]/10" />

              {/* Mobile user section */}
              {session ? (
                <div className="px-3 py-4 flex flex-col gap-0.5">
                  {/* User info toggle */}
                  <button
                    onClick={() => setMobileUserOpen((p) => !p)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl
                      hover:bg-[#D4AF37]/5 transition-all duration-200 w-full text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center
                        text-white text-xs font-bold flex-shrink-0"
                        style={{ background: "#D4AF37" }}>
                        {userName[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 leading-none mb-0.5">
                          {userName.split(" ")[0]}
                        </p>
                        <p className="text-[10px] text-gray-400 leading-none truncate max-w-[140px]">
                          {userEmail}
                        </p>
                      </div>
                    </div>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileUserOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Submenu */}
                  <AnimatePresence>
                    {mobileUserOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{    opacity: 0, height: 0    }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-2 flex flex-col gap-0.5"
                      >
                        {[
                          { href: "/profile", icon: <FiUser size={13} />,    label: "Profile"   },
                          { href: "/orders",  icon: <FiPackage size={13} />, label: "My Orders" },
                        ].map((item) => (
                          <Link key={item.href} href={item.href}
                            onClick={closeMobile}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm
                              font-medium text-gray-600 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5
                              transition-all duration-200">
                            <span className="text-[#D4AF37]">{item.icon}</span>
                            {item.label}
                          </Link>
                        ))}
                        <button
                          onClick={() => { closeMobile(); signOut(); }}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm
                            font-medium text-red-500 hover:bg-red-50 transition-all duration-200 text-left w-full">
                          <FiLogOut size={13} className="text-red-400" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="px-3 py-4 flex flex-col gap-2">
                  <Link href="/login" onClick={closeMobile}
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-sm
                      font-semibold text-gray-700 border border-gray-200
                      hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all duration-200">
                    Login
                  </Link>
                  <Link href="/register" onClick={closeMobile}
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-sm
                      font-semibold text-white bg-[#D4AF37]
                      hover:bg-[#c19d2e] transition-all duration-300 shadow-md shadow-[#D4AF37]/20">
                    Register
                  </Link>
                </div>
              )}

              {/* Admin badge */}
              {isAdmin && (
                <div className="mx-4 mb-6 mt-auto flex items-center gap-1.5 px-3 py-2 rounded-lg"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)" }}>
                  <FiShield size={11} className="text-[#D4AF37]" />
                  <span className="text-[9px] font-semibold tracking-[0.3em] uppercase text-[#D4AF37]">
                    Admin Account
                  </span>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div suppressHydrationWarning className="h-16 sm:h-20" />
    </>
  );
}