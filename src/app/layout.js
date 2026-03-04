import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/AppContext";
import { CartProvider } from "@/context/CartContext";
import { Playfair_Display, Poppins } from "next/font/google";
import Script from "next/script";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata = {
  title: "AOMOZ by Monira - Luxury Fashion Boutique",
  description: "Shop premium sarees, dresses and handbags online",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/AOMOZ-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/AOMOZ-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/AOMOZ-logo.png" />
        <Script id="strip-extension-attrs" strategy="beforeInteractive">
          {`
            (function () {
              function clean(el) {
                if (!el) return;
                el.removeAttribute("bis_register");
                var attrs = Array.prototype.slice.call(el.attributes || []);
                attrs.forEach(function (a) {
                  if (/^__processed_/i.test(a.name)) {
                    el.removeAttribute(a.name);
                  }
                });
              }
              clean(document.documentElement);
              clean(document.body);
            })();
          `}
        </Script>
      </head>

      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${poppins.variable} antialiased bg-[#f7f3ee] text-[#2b2b2b]`}
      >
        <Providers>
          <CartProvider>
            <Header />

            {/* 🔥 IMPORTANT: NO CONTAINER HERE */}
            <main>
              {children}
            </main>

            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
