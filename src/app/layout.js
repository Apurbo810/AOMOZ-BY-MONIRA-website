import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/AppContext";
import { CartProvider } from "@/context/CartContext";
import { Playfair_Display, Poppins } from "next/font/google";

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
    <html lang="en">
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased bg-[#f7f3ee] text-[#2b2b2b]`}
      >
        <Providers>
          <CartProvider>
            <Header />

            <main>{children}</main>

            <Footer />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}