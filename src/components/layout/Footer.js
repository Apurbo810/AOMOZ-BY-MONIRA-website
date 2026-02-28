import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
        w-full
        bg-[var(--color-primary)]
        text-white
        pt-16 pb-10
        border-t border-white/10
      "
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div>
          <img
            src="/AOMOZ BY MONIRA.png"
            className="h-12 mb-4 brightness-0 invert"
            alt="AOMOZ BY MONIRA"
          />

          <p className="opacity-80 text-sm leading-relaxed">
            Discover elegance with our premium Saree and Salwar Kamiz collections.
            Designed for modern women who value tradition and luxury.
          </p>

          <a
            href="/products"
            className="
              inline-block mt-5
              py-2 px-6
              bg-[var(--color-accent)]
              hover:bg-[var(--color-accent-hover)]
              text-black font-semibold
              rounded-full text-sm
              transition
            "
          >
            Explore Collection
          </a>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Shop
          </h3>

          <ul className="space-y-2 text-sm opacity-90">
            <li>
              <a href="/products" className="hover:text-[var(--color-accent)] transition">
                All Products
              </a>
            </li>

            <li>
              <a href="/products?category=saree" className="hover:text-[var(--color-accent)] transition">
                Saree Collection
              </a>
            </li>

            <li>
              <a href="/products?category=salwar-kamiz" className="hover:text-[var(--color-accent)] transition">
                Salwar Kamiz
              </a>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Company
          </h3>

          <ul className="space-y-2 text-sm opacity-90">
            <li>
              <a href="/about" className="hover:text-[var(--color-accent)] transition">
                About Us
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-[var(--color-accent)] transition">
                Contact
              </a>
            </li>

            <li>
              <a href="/register" className="hover:text-[var(--color-accent)] transition">
                Create Account
              </a>
            </li>
          </ul>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-lg">
            Stay Connected
          </h3>

          <input
            placeholder="Enter your email"
            className="
              bg-white/10
              border border-white/20
              text-sm px-4 py-2
              rounded-lg w-full mb-3
              outline-none
              focus:border-[var(--color-accent)]
            "
          />

          <button
            className="
              w-full py-2
              bg-[var(--color-accent)]
              hover:bg-[var(--color-accent-hover)]
              text-black font-semibold
              rounded-lg text-sm
              transition
            "
          >
            Subscribe
          </button>

          {/* SOCIAL */}
          <div className="flex gap-4 text-lg mt-5">

            <a
              href="#"
              className="
                w-9 h-9 flex items-center justify-center
                rounded-full
                bg-white/10 hover:bg-[var(--color-accent)]
                hover:text-black
                transition
              "
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="
                w-9 h-9 flex items-center justify-center
                rounded-full
                bg-white/10 hover:bg-[var(--color-accent)]
                hover:text-black
                transition
              "
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="
                w-9 h-9 flex items-center justify-center
                rounded-full
                bg-white/10 hover:bg-[var(--color-accent)]
                hover:text-black
                transition
              "
            >
              <FaLinkedinIn />
            </a>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <p className="text-center text-sm opacity-70 mt-12">
        © {new Date().getFullYear()} AOMOZ BY MONIRA — All Rights Reserved.
      </p>

    </footer>
  );
}