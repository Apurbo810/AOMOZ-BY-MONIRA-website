import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/AppContext";
import { CartProvider } from "@/context/CartContext";
import { Playfair_Display, Poppins } from "next/font/google";
import Script from "next/script";
import WhatsAppButton from "@/components/WhatsAppButton";

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
              var blockedAttrs = [
                "bis_register",
                "bis_skin_checked"
              ];

              function clean(el) {
                if (!el || !(el instanceof Element)) return;
                var attrs = Array.prototype.slice.call(el.attributes || []);
                attrs.forEach(function (a) {
                  if (
                    blockedAttrs.indexOf(a.name) !== -1 ||
                    /^__processed_/i.test(a.name) ||
                    /^data-bis/i.test(a.name) ||
                    /^bis_/i.test(a.name)
                  ) {
                    el.removeAttribute(a.name);
                  }
                });
              }
              function walk(root) {
                if (!root) return;
                clean(root);
                if (root.querySelectorAll) {
                  root.querySelectorAll("*").forEach(clean);
                }
              }

              function cleanDocument() {
                walk(document.documentElement);
                walk(document.body);
              }

              cleanDocument();

              if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", cleanDocument, { once: true });
              }

              requestAnimationFrame(cleanDocument);
              setTimeout(cleanDocument, 0);
              setTimeout(cleanDocument, 50);
              setTimeout(cleanDocument, 250);

              var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                  if (mutation.type === "attributes") {
                    clean(mutation.target);
                  }

                  mutation.addedNodes.forEach(function (node) {
                    if (node instanceof Element) {
                      walk(node);
                    }
                  });
                });
              });

              observer.observe(document.documentElement, {
                attributes: true,
                childList: true,
                subtree: true
              });

              setTimeout(function () {
                observer.disconnect();
              }, 5000);
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
            <main suppressHydrationWarning>
              {children}
            </main>

            <Footer />

            {/* Floating WhatsApp button — persists across every route */}
            <WhatsAppButton />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}