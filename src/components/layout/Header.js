"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart() || {};
  const cartCount = cart?.length || 0;
  const isAdmin = session?.user?.admin;
  const userName = session?.user?.name || "User";

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="
        fixed top-0 left-0 w-full z-50
        bg-white/80 backdrop-blur-xl
        border-b border-[var(--color-border)]
        shadow-sm
      ">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          {/* LOGO → HOME */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/AOMOZ BY MONIRA.png"
              alt="AOMOZ BY MONIRA"
              className="h-10 transition group-hover:scale-105"
            />
          </Link>

          {/* DESKTOP MENU */}
          <ul className="
            hidden lg:flex items-center gap-8
            text-sm font-semibold
            text-[var(--color-text-primary)]
            tracking-wide
          ">
            <li>
              <Link href="/" className="hover:text-[var(--color-accent)] transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/products" className="hover:text-[var(--color-accent)] transition">
                Shop
              </Link>
            </li>

            <li>
              <Link
                href="/products?category=saree"
                className="hover:text-[var(--color-accent)] transition"
              >
                Saree
              </Link>
            </li>

            <li>
              <Link
                href="/products?category=salwar-kamiz"
                className="hover:text-[var(--color-accent)] transition"
              >
                Salwar Kamiz
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-[var(--color-accent)] transition">
                About
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-[var(--color-accent)] transition">
                Contact
              </Link>
            </li>

            {session && (
              <li>
                <Link href="/orders" className="hover:text-[var(--color-accent)] transition">
                  Orders
                </Link>
              </li>
            )}
          </ul>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-6">

            {!session && (
              <div className="flex items-center gap-4 text-sm">
                <Link href="/login" className="hover:text-[var(--color-accent)]">
                  Login
                </Link>
                <Link href="/register" className="hover:text-[var(--color-accent)]">
                  Register
                </Link>
              </div>
            )}

            {/* USER DROPDOWN */}
            {session && mounted && (
              <div
                className="relative text-sm"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <button className="font-semibold hover:text-[var(--color-accent)] transition">
                  {userName}
                </button>

                {open && (
                  <div className="
                    absolute right-0 mt-2 w-48
                    bg-white
                    border border-[var(--color-border)]
                    rounded-xl shadow-lg
                  ">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-50"
                    >
                      Profile
                    </Link>

                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-gray-50"
                    >
                      Orders
                    </Link>

                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* CART */}
            {mounted && !isAdmin && (
              <Link href="/cart" className="relative group">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="
                    h-7 w-7
                    text-[var(--color-primary)]
                    group-hover:text-[var(--color-accent)]
                    transition
                  "
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
                  <span className="
                    absolute -top-1 -right-2
                    bg-[var(--color-accent)]
                    text-black text-xs font-bold
                    w-5 h-5 flex items-center justify-center rounded-full
                  ">
                    {cartCount}
                  </span>
                )}

              </Link>
            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden text-3xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="
            lg:hidden
            bg-white
            border-t border-[var(--color-border)]
            px-6 py-4 space-y-3
          ">

            <Link href="/" onClick={() => setOpen(false)}>Home</Link>

            <Link href="/products" onClick={() => setOpen(false)}>Shop</Link>

            <Link href="/products?category=saree" onClick={() => setOpen(false)}>
              Saree
            </Link>

            <Link href="/products?category=salwar-kamiz" onClick={() => setOpen(false)}>
              Salwar Kamiz
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>About</Link>

            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

          </div>
        )}

      </nav>

      <div className="h-20"/>
    </>
  );
}