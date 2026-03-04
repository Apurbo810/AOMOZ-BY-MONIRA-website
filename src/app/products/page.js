  "use client";

  import { useState } from "react";
  import { useSession } from "next-auth/react";
  import toast from "react-hot-toast";
  import { Great_Vibes } from "next/font/google";

  import useProducts from "@/components/products/useProducts";
  import ProductFilters from "@/components/products/ProductFilters";
  import ProductGrid from "@/components/products/ProductGrid";
  import Pagination from "@/components/products/Pagination";
  import AdminProductForm from "@/components/products/AdminProductForm";

  import { useCart } from "@/context/CartContext";

  const greatVibes = Great_Vibes({
    subsets: ["latin"],
    weight: "400",
  });

  export default function ProductsPage() {
    const { data: session } = useSession();

    const {
      products,
      filters,
      setFilters,
      loading,
      fetchProducts,
      currentPage,
      totalPages,
      goToPage,
    } = useProducts();

    const { addToCart } = useCart();

    /* ADMIN UI */
    const [adminPreview, setAdminPreview] = useState(false);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [editingId, setEditingId] = useState(null);

    /* MOBILE FILTER */
    const [showFiltersMobile, setShowFiltersMobile] = useState(false);

    const [form, setForm] = useState({
      name: "",
      image: "",
      images: [],
      price: "",
      discountPrice: "",
      discountPercentage: "",
      category: "",
      color: "",
      description: "",
      stock: "",
    });

    /* DELETE */
    const handleDelete = async (id) => {
      if (!confirm("Delete this product?")) return;

      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) toast.success("Product deleted");
      else toast.error("Delete failed");

      fetchProducts();
    };

    /* EDIT */
    const loadProductForEdit = (product) => {
      setEditingId(product._id);
      setForm({
        name: product.name,
        image: product.image,
        images: product.images || [],
        price: product.price,
        discountPrice: product.discountPrice || "",
        discountPercentage: product.discountPercentage || "",
        category: product.category,
        color: product.color || "",
        description: product.description || "",
        stock: product.stock || "",
        sizes: product.sizes || [],
        hasSizes: product.hasSizes || false,
      });
      setShowAddProduct(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    /* ================= RENDER ================= */

    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] pt-24 pb-36 relative overflow-hidden">

        {/* BACKGROUND GLOW — matches CategoryShowcase */}
        <div className="absolute w-[700px] h-[700px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── PAGE HEADING ── */}
          <div className="text-center mb-14">
            <h1 className={`
              ${greatVibes.className}
              text-5xl md:text-6xl lg:text-7xl
              text-[var(--color-primary)]
              drop-shadow mb-4
            `}>
              All Collections
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Discover our premium collection of traditional wear crafted for timeless elegance
            </p>
            {/* Accent line */}
            <div className="w-20 h-[2px] bg-[var(--color-primary)]/40 mx-auto mt-5 rounded-full" />
          </div>

          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── DESKTOP FILTER SIDEBAR ── */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="
                bg-white rounded-3xl
                border border-[var(--color-primary)]/10
                shadow-lg p-7
                sticky top-24 h-fit
              ">
                <p className="
                  text-xs font-semibold tracking-[0.25em] uppercase
                  text-[var(--color-primary)]/60
                  mb-5 pb-4
                  border-b border-[var(--color-primary)]/10
                ">
                  Refine
                </p>
                <ProductFilters filters={filters} setFilters={setFilters} />
              </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <section className="flex-1 min-w-0">

              {/* ADMIN BAR */}
              {session?.user?.admin && (
                <div className="
                  flex flex-wrap gap-3 items-center mb-8
                  p-4 bg-white rounded-3xl
                  border border-[var(--color-primary)]/10
                  shadow-sm
                ">
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[var(--color-primary)]/50 mr-2">
                    Admin
                  </span>
                  <button
                    onClick={() => setAdminPreview(!adminPreview)}
                    className="
                      px-5 py-2 rounded-full
                      border border-[var(--color-primary)]/30
                      text-sm font-semibold text-[var(--color-primary)]
                      hover:bg-[var(--color-primary)] hover:text-white
                      transition-all duration-300
                    "
                  >
                    {adminPreview ? "Admin View" : "Customer View"}
                  </button>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="
                      px-5 py-2 rounded-full
                      bg-[var(--color-primary)] text-white
                      text-sm font-semibold
                      hover:opacity-90 hover:scale-105
                      transition-all duration-300
                      shadow-md shadow-[var(--color-primary)]/20
                    "
                  >
                    + Add Product
                  </button>
                </div>
              )}

              {/* ADMIN FORM */}
              <AdminProductForm
                session={session}
                form={form}
                setForm={setForm}
                editingId={editingId}
                setEditingId={setEditingId}
                showAddProduct={showAddProduct}
                setShowAddProduct={setShowAddProduct}
                fetchProducts={fetchProducts}
              />

              {/* PRODUCT GRID */}
              <ProductGrid
                products={products}
                loading={loading}
                session={session}
                adminPreview={adminPreview}
                onEdit={loadProductForEdit}
                onDelete={handleDelete}
                addToCart={addToCart}
              />

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-14">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent mb-8" />
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    goToPage={goToPage}
                  />
                </div>
              )}

            </section>
          </div>
        </div>

        {/* ── MOBILE FILTER FAB ── */}
        <button
          onClick={() => setShowFiltersMobile(true)}
          className="
            lg:hidden fixed bottom-16 right-5
            w-14 h-14 rounded-full
            bg-[var(--color-primary)] text-white
            shadow-xl shadow-[var(--color-primary)]/30
            text-xl z-40
            hover:scale-110 active:scale-95
            transition-transform duration-300
            flex items-center justify-center
          "
        >
          ☰
        </button>

        {/* ── MOBILE FILTER MODAL ── */}
        {showFiltersMobile && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md">
            <div className="
              absolute bottom-0 inset-x-0
              bg-[var(--color-bg-primary)] rounded-t-3xl
              p-6 max-h-[75vh] overflow-y-auto shadow-2xl
            ">
              <p className="
                text-xs font-semibold tracking-[0.25em] uppercase
                text-[var(--color-primary)]/60
                mb-5 pb-4
                border-b border-[var(--color-primary)]/10
              ">
                Refine Results
              </p>
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                onClose={() => setShowFiltersMobile(false)}
              />
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="
                  w-full mt-6
                  bg-[var(--color-primary)] text-white
                  py-3 rounded-full font-semibold
                  hover:opacity-90 transition-opacity
                  shadow-lg shadow-[var(--color-primary)]/20
                "
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }