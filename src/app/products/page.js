"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import useProducts from "@/components/products/useProducts";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/products/Pagination";
import AdminProductForm from "@/components/products/AdminProductForm";

import { useCart } from "@/context/CartContext";

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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok)
      toast.success("Product deleted");
    else
      toast.error("Delete failed");

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

      discountPercentage:
        product.discountPercentage || "",

      category: product.category,

      color: product.color || "",

      description: product.description || "",

      stock: product.stock || "",

      sizes: product.sizes || [],

      hasSizes: product.hasSizes || false,

    });

    setShowAddProduct(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };



  /* ================= RENDER ================= */

  return (

    <div className="
      min-h-screen
      bg-[var(--color-bg-primary)]
      pt-24 pb-36
      relative overflow-hidden
    ">

      {/* BACKGROUND GLOW */}
      <div className="
        pointer-events-none absolute
        w-[600px] h-[600px]
        bg-[var(--color-primary)]/10
        blur-3xl rounded-full
        left-1/2 -translate-x-1/2 -top-40
      " />


      <div className="
        relative max-w-7xl mx-auto
        px-4 sm:px-6 lg:px-8
        flex flex-col lg:flex-row gap-10
      ">


        {/* DESKTOP FILTER */}
        <aside className="
          hidden lg:block w-1/4
          bg-white
          border border-[var(--color-border)]
          rounded-3xl shadow-lg
          p-7 sticky top-24 h-fit
        ">

          <ProductFilters
            filters={filters}
            setFilters={setFilters}
          />

        </aside>



        {/* PRODUCTS */}
        <section className="w-full lg:w-3/4">

          {/* TITLE */}
          <h2 className="
            text-3xl md:text-4xl
            font-semibold
            tracking-wide uppercase
            mb-8
            text-[var(--color-primary)]
          ">
            All Collections
          </h2>



          {/* ADMIN BAR */}
          {session?.user?.admin && (

            <div className="
              flex flex-wrap gap-3
              items-center mb-8
            ">

              <button
                onClick={() =>
                  setAdminPreview(!adminPreview)
                }
                className="
                  px-5 py-2 rounded-full border
                  text-sm font-semibold
                "
              >
                {adminPreview
                  ? "Admin View"
                  : "Customer View"}
              </button>


              <button
                onClick={() =>
                  setShowAddProduct(true)
                }
                className="
                  px-5 py-2 rounded-full
                  bg-[var(--color-primary)]
                  text-white font-semibold
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



          {/* GRID */}
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
          />


        </section>

      </div>



      {/* MOBILE FILTER BUTTON */}
      <button
        onClick={() =>
          setShowFiltersMobile(true)
        }
        className="
          lg:hidden fixed bottom-16 right-5
          w-14 h-14 rounded-full
          bg-[var(--color-primary)]
          text-white shadow-xl text-xl z-40
        "
      >
        ☰
      </button>



      {/* MOBILE FILTER MODAL */}
      {showFiltersMobile && (

        <div className="
          fixed inset-0 z-50
          bg-black/40 backdrop-blur-md
        ">

          <div className="
            absolute bottom-0 inset-x-0
            bg-white rounded-t-3xl
            p-6 max-h-[75vh]
            overflow-y-auto shadow-2xl
          ">

            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              onClose={() =>
                setShowFiltersMobile(false)
              }
            />

            <button
              onClick={() =>
                setShowFiltersMobile(false)
              }
              className="
                w-full mt-6
                bg-[var(--color-primary)]
                text-white py-3 rounded-full
                font-semibold
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