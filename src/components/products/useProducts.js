"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

let debounceTimer;

export default function useProducts() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    gender: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
  });
  const [loading, setLoading] = useState(false);

  /* ✅ READ CATEGORY FROM URL */
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const genderFromUrl = searchParams.get("gender");

    setFilters((prev) => ({
      ...prev,
      category: categoryFromUrl || "",
      gender: genderFromUrl || "",
    }));
  }, [searchParams]);

  /* FETCH PRODUCTS */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();

      if (filters.gender) queryParams.append("gender", filters.gender);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.minPrice) queryParams.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
      if (filters.sort) queryParams.append("sort", filters.sort);

      const url = queryParams.toString()
        ? `/api/products?${queryParams.toString()}`
        : "/api/products";

      const res = await fetch(url);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Failed to fetch products");
    }
    setLoading(false);
  }, [filters]);

  /* Debounce fetch */
  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(fetchProducts, 400);
    return () => clearTimeout(debounceTimer);
  }, [fetchProducts]);

  return {
    products,
    setProducts,
    filters,
    setFilters,
    loading,
    fetchProducts,
  };
}