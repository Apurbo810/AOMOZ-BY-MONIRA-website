"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart() || {};
  const cartCount = cart?.length || 0;
  const isAdmin = session?.user?.admin;
  const userName = session?.user?.name || "User";

  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="
        fixed top-0 left-0 w-full z-50
        bg-white/90 backdrop-blur-xl
        border-b border-gray-200
        shadow-lg
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* LOGO + STYLISH HEADING */}
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

          {/* DESKTOP MENU - FIXED ROUTING */}
          <ul className="
            hidden lg:flex items-center gap-6 xl:gap-8
            text-sm font-semibold
            tracking-wide
          ">
            <li><Link href="/" className="text-gray-700 hover:text-[#D4AF37] transition py-2 font-semibold">Home</Link></li>
            <li><Link href="/products" className="text-gray-700 hover:text-[#D4AF37] transition py-2 font-semibold">Shop</Link></li>
            <li><Link href="/products?category=saree" className="text-gray-700 hover:text-[#D4AF37] transition py-2 font-semibold">Saree</Link></li>
            <li><Link href="/products?category=salwar-kamiz" className="text-gray-700 hover:text-[#D4AF37] transition py-2 font-semibold">Salwar Kamiz</Link></li>
            <li><Link href="/about" className="text-gray-700 hover:text-[#D4AF37] transition py-2 font-semibold">About</Link></li>
            <li><Link href="/contact" className="text-gray-700 hover:text-[#D4AF37] transition py-2 font-semibold">Contact</Link></li>
            {session && <li><Link href="/orders" className="text-gray-700 hover:text-[#D4AF37] transition py-2 font-semibold">Orders</Link></li>}
          </ul>

          {/* RIGHT SIDE - Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            
            {/* LOGIN/REGISTER - Desktop (when NO session) */}
            {!session && (
              <div className="flex items-center gap-3 text-sm">
                <Link href="/login" className="font-medium py-2 hover:text-[#D4AF37] transition">Login</Link>
                <Link href="/register" className="font-medium py-2 hover:text-[#D4AF37] transition">Register</Link>
              </div>
            )}

            {/* USER DROPDOWN - Desktop (when session exists) */}
            {session && mounted && (
              <div
                className="relative text-sm"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <button className="font-semibold hover:text-[#D4AF37] transition py-2">
                  {userName}
                </button>
                {userDropdownOpen && (
                  <div className="
                    absolute right-0 mt-2 w-48
                    bg-white
                    border border-gray-200
                    rounded-xl shadow-xl
                    backdrop-blur-sm
                  ">
                    <Link href="/profile" className="block px-4 py-3 hover:bg-gray-50 font-medium text-gray-800">Profile</Link>
                    <Link href="/orders" className="block px-4 py-3 hover:bg-gray-50 font-medium text-gray-800">Orders</Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CART */}
            {mounted && !isAdmin && (
              <Link href="/cart" className="relative p-2 hover:scale-110 transition group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700 group-hover:text-[#D4AF37] transition"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.7}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m5-9v9m4-9v9m5-9l2 9"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full text-[10px]">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="lg:hidden p-2 ml-2 text-xl text-gray-700 hover:text-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-lg transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 px-4 sm:px-6 py-6 space-y-2 shadow-2xl">
            {/* Mobile Nav Links - FIXED ROUTING */}
            <Link href="/" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-semibold text-gray-800 text-base">Home</Link>
            <Link href="/products" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-semibold text-gray-800 text-base">Shop</Link>
            <Link href="/products?category=saree" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-semibold text-gray-800 text-base">Saree</Link>
            <Link href="/products?category=salwar-kamiz" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-semibold text-gray-800 text-base">Salwar Kamiz</Link>
            <Link href="/about" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-semibold text-gray-800 text-base">About</Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-gray-100 font-semibold text-gray-800 text-base">Contact</Link>

            {/* MOBILE USER SECTION */}
            {session ? (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => setUserDropdownOpen(!userDropdownOpen)}>
                  <span className="font-semibold text-gray-800 text-base">{userName}</span>
                  <svg className={`w-4 h-4 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                {userDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2 px-2">
                    <Link href="/profile" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 font-medium text-sm text-gray-700">Profile</Link>
                    <Link href="/orders" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded-lg hover:bg-gray-100 font-medium text-sm text-gray-700">Orders</Link>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut();
                      }}
                      className="w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 font-medium text-sm rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="py-3 px-4 font-semibold text-gray-800 text-base hover:bg-gray-100 rounded-lg">Login</Link>
                <Link href="/register" onClick={() => setMobileOpen(false)} className="py-3 px-4 font-semibold text-gray-800 text-base hover:bg-gray-100 rounded-lg">Register</Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20 lg:h-20" />
    </>
  );
}
