"use client";
import { useEffect, useState } from "react";

import AboutSection from "@/components/layout/AboutSection";
import ProductSection from "@/components/layout/products";
import Hero from "@/components/layout/Hero";
import CategoryProductRow from "@/components/layout/CategoryProductRow";
import CategoryShowcase from "@/components/layout/CategoryShowcase";


export default function Home() {

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    setLoadingProducts(true);
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("Product fetch error:", err))
      .finally(() => setLoadingProducts(false));
  }, []);

  return (
    <>
      <Hero/>
      <CategoryShowcase/>
      <ProductSection products={products} loading={loadingProducts}/>
      <CategoryProductRow
        title="Saree Collection"
        banner="/saree-banner.jpg"
        categorySlug="saree"
      />

      {/* Salwar Kamiz Section */}
      <CategoryProductRow
        title="Salwar Kamiz Collection"
        banner="/salwar-banner.jpg"
        categorySlug="salwar-kamiz"
      />
      <AboutSection/>


    </>
  );
}
