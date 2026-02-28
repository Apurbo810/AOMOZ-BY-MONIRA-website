"use client";
import { useEffect, useState } from "react";

import AboutSection from "@/components/layout/AboutSection";
import ProductSection from "@/components/layout/products";
import Hero from "@/components/layout/Hero";
import WhyChoose from "@/components/layout/WhyChoose";
import CategoryShowcase from "@/components/layout/CategoryShowcase";


export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("Product fetch error:", err));
  }, []);

  return (
    <>
      <Hero/>
      <CategoryShowcase/>
      <ProductSection products={products}/>
      <AboutSection/>
      <WhyChoose/>

    </>
  );
}
