"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import animated sections
const Hero = dynamic(
  () => import("@/components/layout/Hero"),
  { ssr: false }
);

const CategoryShowcase = dynamic(
  () => import("@/components/layout/CategoryShowcase"),
  { ssr: false }
);

const ProductSection = dynamic(
  () => import("@/components/layout/products"),
  { ssr: false }
);

const CategoryProductRow = dynamic(
  () => import("@/components/layout/CategoryProductRow"),
  { ssr: false }
);

const AboutSection = dynamic(
  () => import("@/components/layout/AboutSection"),
  { ssr: false }
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    setLoadingProducts(true);

    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Product fetch error:", err))
      .finally(() => setLoadingProducts(false));
  }, []);

  return (
    <>
      <Hero />

      <CategoryShowcase />

      <ProductSection
        products={products}
        loading={loadingProducts}
      />

      <CategoryProductRow
        title="Saree Collection"
        banner="/saree-banner.jpg"
        categorySlug="saree"
      />

      <CategoryProductRow
        title="Salwar Kamiz Collection"
        banner="/salwar-banner.jpg"
        categorySlug="salwar-kamiz"
      />

      <AboutSection />
    </>
  );
}