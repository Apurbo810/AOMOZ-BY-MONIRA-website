"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function AdminProductForm({
  session,
  form,
  setForm,
  editingId,
  setEditingId,
  showAddProduct,
  setShowAddProduct,
  fetchProducts,
}) {

  const [uploading, setUploading] = useState(false);

  /* ---------------- CLOSE ---------------- */

  const closeModal = () => {

    setShowAddProduct(false);
    setEditingId(null);

    setForm({
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

  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const uploadImage = async (file, multiple = false) => {
    if (!file) return;

    if (!file.type?.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    const toastId = toast.loading("Uploading image...");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-menu", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        toast.error(data.error || "Upload failed", { id: toastId });
        return;
      }

      if (multiple) {
        setForm(prev => ({
          ...prev,
          images: [...(prev.images || []), data.url],
        }));
      } else {
        setForm(prev => ({
          ...prev,
          image: data.url,
        }));
      }

      toast.success("Uploaded", { id: toastId });
    } catch (err) {
      toast.error(err?.message || "Upload failed", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  /* ---------------- DRAG DROP ---------------- */

  const handleDrop = (e) => {

    e.preventDefault();

    const files = [...e.dataTransfer.files];

    files.forEach(file => uploadImage(file, true));

  };

  /* ---------------- REMOVE IMAGE ---------------- */

  const removeGalleryImage = (index) => {

    const updated = [...form.images];
    updated.splice(index, 1);

    setForm({
      ...form,
      images: updated,
    });

  };

  /* ---------------- REORDER ---------------- */

  const moveImage = (index, direction) => {

    const updated = [...form.images];

    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= updated.length) return;

    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

    setForm({
      ...form,
      images: updated,
    });

  };

  /* ---------------- AUTO DISCOUNT ---------------- */

  useEffect(() => {
    if (!showAddProduct) return;

    const price = Number(form.price);
    const discountPrice = Number(form.discountPrice);

    if (!price || !discountPrice || discountPrice >= price) {
      if (form.discountPercentage !== "") {
        setForm(prev => ({
          ...prev,
          discountPercentage: "",
        }));
      }
      return;
    }

    const percent = Math.round(((price - discountPrice) / price) * 100);
    if (Number(form.discountPercentage) !== percent) {
      setForm(prev => ({
        ...prev,
        discountPercentage: percent,
      }));
    }
  }, [form.price, form.discountPrice, form.discountPercentage, setForm]);

  if (!session?.user?.admin || !showAddProduct) return null;

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (e) => {

    e.preventDefault();

    if (!form.name?.trim()) return toast.error("Product name is required");
    if (!form.image) return toast.error("Main image is required");
    if (!form.category) return toast.error("Category is required");
    if (!form.color?.trim()) return toast.error("Color is required");
    if (!form.price || Number(form.price) <= 0) {
      return toast.error("Valid price is required");
    }

    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice: Number(form.discountPrice) || 0,
      discountPercentage: Number(form.discountPercentage) || 0,
      stock: Number(form.stock) || 0,
    };

    if (editingId) payload.id = editingId;

    const res = await fetch("/api/products", {

      method: editingId ? "PUT" : "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),

    });

    if (!res.ok) {
      let errorMessage = "Save failed";
      try {
        const data = await res.json();
        errorMessage = data.error || errorMessage;
      } catch {}
      toast.error(errorMessage);
      return;
    }

    toast.success(editingId ? "Updated" : "Product added");

    fetchProducts();
    closeModal();

  };

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-[100] flex justify-center px-4">

        <form
          onSubmit={onSubmit}
          className="
          w-full max-w-5xl
          bg-white
          rounded-3xl
          shadow-2xl
          p-8 space-y-6
          mt-20
          max-h-[90vh]
          overflow-y-auto
        "
        >

          {/* HEADER */}

          <div className="flex justify-between items-center">

            <h2 className="text-2xl font-bold text-[var(--color-primary)]">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <button type="button" onClick={closeModal}>
              ✕
            </button>

          </div>

          {/* NAME */}

          <div>

            <label className="font-semibold">
              Product Name
            </label>

            <input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl px-3 py-2 mt-1"
            />

          </div>

          {/* MAIN IMAGE */}

          <div>

            <p className="font-semibold mb-2">
              Main Image
            </p>

            <label className="
              border-2 border-dashed
              rounded-xl p-6 block
              text-center cursor-pointer
              hover:border-[var(--color-primary)]
            ">

              Upload Main Image

              <input
                hidden
                type="file"
                onChange={(e) =>
                  uploadImage(e.target.files[0])
                }
              />

            </label>

            {form.image && (

              <div className="mt-4 relative w-40">

                <Image
                  src={form.image}
                  width={200}
                  height={200}
                  alt=""
                  className="rounded-xl border"
                />

                <span className="
                absolute top-2 left-2
                bg-green-600 text-white
                text-xs px-2 py-1 rounded
              ">
                  MAIN
                </span>

              </div>

            )}

          </div>

          {/* GALLERY */}

          <div>

            <p className="font-semibold mb-2">
              Gallery Images
            </p>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="
              border-2 border-dashed
              p-6 rounded-xl text-center
              text-gray-500
            "
            >
              Drag & drop images here
            </div>

            <div className="flex gap-4 flex-wrap mt-4">

              {(form.images || []).map((img, i) => (

                <div key={i} className="relative">

                  <Image
                    src={img}
                    width={120}
                    height={120}
                    alt=""
                    className="rounded-xl border"
                  />

                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="
                    absolute -top-2 -right-2
                    bg-red-500 text-white
                    w-6 h-6 rounded-full
                  "
                  >
                    ✕
                  </button>

                  <div className="flex justify-center gap-1 mt-1">

                    <button
                      type="button"
                      onClick={() => moveImage(i, -1)}
                      className="text-xs"
                    >
                      ◀
                    </button>

                    <button
                      type="button"
                      onClick={() => moveImage(i, 1)}
                      className="text-xs"
                    >
                      ▶
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* PRICE */}

          <div className="grid grid-cols-3 gap-4">

            <div>

              <label>Price</label>

              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-3 py-2 mt-1"
              />

            </div>

            <div>

              <label>Discount Price</label>

              <input
                type="number"
                value={form.discountPrice}
                onChange={(e) =>
                  setForm({
                    ...form,
                    discountPrice: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-3 py-2 mt-1"
              />

            </div>

            <div>

              <label>Discount %</label>

              <input
                type="number"
                value={form.discountPercentage}
                disabled
                className="w-full border rounded-xl px-3 py-2 mt-1 bg-gray-100"
              />

            </div>

          </div>

          {/* CATEGORY + COLOR */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label>Category</label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-3 py-2 mt-1 bg-white"
              >
                <option value="">Select category</option>
                <option value="saree">Saree</option>
                <option value="salwar-kamiz">Salwar Kamiz</option>
              </select>

            </div>

            <div>

              <label>Color</label>

              <input
                value={form.color}
                onChange={(e) =>
                  setForm({
                    ...form,
                    color: e.target.value,
                  })
                }
                className="w-full border rounded-xl px-3 py-2 mt-1"
                placeholder="e.g. Maroon"
              />

            </div>

          </div>

          {/* STOCK */}

          <div>

            <label>Stock Quantity</label>

            <input
              type="number"
              value={form.stock}
              onChange={(e) =>
                setForm({
                  ...form,
                  stock: e.target.value,
                })
              }
              className="w-full border rounded-xl px-3 py-2 mt-1"
            />

          </div>

          {/* DESCRIPTION */}

          <div>

            <label>Description</label>

            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              className="w-full border rounded-xl px-3 py-2 mt-1"
            />

          </div>

          {/* SAVE */}

          <button
            type="submit"
            disabled={uploading}
            className="
            w-full py-3 rounded-full
            bg-[var(--color-primary)]
            text-white font-bold
          "
          >

            {uploading ? "Uploading..." : "Save Product"}

          </button>

        </form>

      </div>
    </>
  );
}
