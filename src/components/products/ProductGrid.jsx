"use client";

import ProductCard from "./ProductCard";

function ProductSkeleton() {
  return (
    <div className="bg-white/90 border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
      <div className="relative aspect-[3/4] skeleton" />
      <div className="p-4 space-y-3">
        <div className="h-3 rounded w-3/4 skeleton" />
        <div className="h-3 rounded w-1/2 skeleton" />
        <div className="h-8 rounded w-full mt-3 skeleton" />
      </div>
    </div>
  );
}

export default function ProductGrid({
  products = [],
  loading = false,
  session,
  adminPreview = false,
  addToCart,
  onEdit,
  onDelete,
}) {

  /* 🔴 OLD-FEEL LOADING */
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  /* 🟡 EMPTY STATE */
  if (!products.length) {
    return (
      <p className="text-gray-500 text-lg text-center py-12">
        No products found...
      </p>
    );
  }

  /* 🟢 REAL PRODUCTS */
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          p={p}
          session={session}
          adminPreview={adminPreview}
          addToCart={addToCart}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
