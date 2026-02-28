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
  const [errors, setErrors] = useState({});
  const [applyDiscount, setApplyDiscount] = useState(false);
  const [hasSizes, setHasSizes] = useState(false);
  const [sizes, setSizes] = useState({
    size10ml: false,
    size40ml: false,
    price10ml: "",
    price40ml: "",
    discount10ml: "",
    discount40ml: "",
    stock10ml: "",
    stock40ml: ""
  });

  useEffect(() => {
    if (editingId && (form.discountPrice || form.discountPercentage)) {
      setApplyDiscount(true);
    } else {
      setApplyDiscount(false);
    }

    // Load sizes if editing
    if (editingId && form.hasSizes && form.sizes) {
      setHasSizes(true);
      const newSizes = { ...sizes };
      form.sizes.forEach(size => {
        if (size.ml === 10) {
          newSizes.size10ml = true;
          newSizes.price10ml = size.price;
          newSizes.discount10ml = size.discountPercentage || "";
          newSizes.stock10ml = size.stock || "";
        } else if (size.ml === 40) {
          newSizes.size40ml = true;
          newSizes.price40ml = size.price;
          newSizes.discount40ml = size.discountPercentage || "";
          newSizes.stock40ml = size.stock || "";
        }
      });
      setSizes(newSizes);
    }
  }, [editingId, form]);

  if (!session?.user?.admin || !showAddProduct) return null;

  const closeModal = () => {
    setShowAddProduct(false);
    setEditingId(null);
    setErrors({});
    setApplyDiscount(false);
    setHasSizes(false);
    setSizes({
      size10ml: false,
      size40ml: false,
      price10ml: "",
      price40ml: "",
      discount10ml: "",
      discount40ml: "",
      stock10ml: "",
      stock40ml: ""
    });
    setForm({
      name: "",
      image: "",
      price: "",
      discountPrice: "",
      discountPercentage: "",
      gender: "",
      category: "",
      description: "",
      stock: "",
    });
  };

  const handleAddValidation = () => {
    if (editingId) return true;

    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = "Name is required";
    if (!form.image) newErrors.image = "Image is required";
    if (!hasSizes && !form.price) newErrors.price = "Price is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.category) newErrors.category = "Category is required";

    if (hasSizes) {
      if (!sizes.size10ml && !sizes.size40ml) {
        newErrors.sizes = "Select at least one size";
      }
      if (sizes.size10ml && !sizes.price10ml) {
        newErrors.price10ml = "10ml price required";
      }
      if (sizes.size40ml && !sizes.price40ml) {
        newErrors.price40ml = "40ml price required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!handleAddValidation()) return;

    // Build sizes array
    const sizesArray = [];
    if (hasSizes) {
      if (sizes.size10ml) {
        const price10 = Number(sizes.price10ml);
        const discount10 = Number(sizes.discount10ml) || 0;
        sizesArray.push({
          ml: 10,
          price: price10,
          discountPercentage: discount10,
          discountPrice: discount10 > 0 ? Math.round(price10 * (1 - discount10 / 100)) : 0,
          stock: Number(sizes.stock10ml) || 0
        });
      }
      if (sizes.size40ml) {
        const price40 = Number(sizes.price40ml);
        const discount40 = Number(sizes.discount40ml) || 0;
        sizesArray.push({
          ml: 40,
          price: price40,
          discountPercentage: discount40,
          discountPrice: discount40 > 0 ? Math.round(price40 * (1 - discount40 / 100)) : 0,
          stock: Number(sizes.stock40ml) || 0
        });
      }
    }

    // Create payload with sizes
    const payload = {
      name: form.name.trim(),
      image: form.image,
      gender: form.gender,
      category: form.category,
      description: form.description || "",
      hasSizes,
      sizes: hasSizes ? sizesArray : []
    };

    // Add regular fields only if not using sizes
    if (!hasSizes) {
      payload.price = Number(form.price);
      payload.discountPrice = Number(form.discountPrice) || 0;
      payload.discountPercentage = Number(form.discountPercentage) || 0;
      payload.stock = Number(form.stock) || 0;
    }

    // Add ID for edit mode
    if (editingId) {
      payload.id = editingId;
    }

    try {
      const res = await fetch("/api/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        toast.error("Save failed");
        return;
      }

      toast.success(editingId ? "Product updated!" : "Product added!");

      // Reset form
      setForm({
        name: "",
        image: "",
        price: "",
        discountPrice: "",
        discountPercentage: "",
        gender: "",
        category: "",
        description: "",
        stock: "",
      });

      setEditingId(null);
      setShowAddProduct(false);
      setHasSizes(false);
      setSizes({
        size10ml: false,
        size40ml: false,
        price10ml: "",
        price40ml: "",
        discount10ml: "",
        discount40ml: "",
        stock10ml: "",
        stock40ml: ""
      });

      // Call parent refresh
      if (fetchProducts) {
        fetchProducts();
      }
      
      closeModal();
    } catch (err) {
      console.error("Submit error:", err);
      toast.error("Failed to save product");
    }
  };

  const calculateDiscountPrice = (price, percent) => {
    if (!price || !percent) return "";
    const p = Number(price);
    const d = Number(percent);
    if (p <= 0 || d <= 0) return "";
    return Math.round(p - (p * d) / 100);
  };

  return (
    <>
      <div onClick={closeModal} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      <div className="fixed inset-0 z-[100] flex justify-center px-4">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-6 space-y-4 mt-28 max-h-[calc(100vh-8rem)] overflow-y-auto"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
            <button type="button" onClick={closeModal} className="text-gray-600 hover:text-black text-xl">
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Name *</label>
              <input
                className={`w-full border rounded-xl px-3 py-2 mt-1 text-sm ${errors.name ? "border-red-500" : ""}`}
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="font-medium">Image *</label>
              <input
                type="file"
                accept="image/*"
                className={`w-full border rounded-xl px-3 py-2 mt-1 text-sm ${errors.image ? "border-red-500" : ""}`}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const toastId = toast.loading("Uploading...");
                  const formData = new FormData();
                  formData.append("file", file);

                  const res = await fetch("/api/upload-menu", {
                    method: "POST",
                    body: formData,
                  });

                  const data = await res.json();
                  if (data.url) {
                    setForm({ ...form, image: data.url });
                    toast.success("Image uploaded", { id: toastId });
                  } else {
                    toast.error("Upload failed", { id: toastId });
                  }
                }}
              />
              {errors.image && <p className="text-xs text-red-600">{errors.image}</p>}
              {form.image && (
                <div className="mt-2 relative h-40 rounded-xl overflow-hidden">
                  <Image src={form.image} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="font-medium">Gender *</label>
              <select
                className={`w-full border rounded-xl px-3 py-2 mt-1 text-sm ${errors.gender ? "border-red-500" : ""}`}
                value={form.gender || ""}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
              {errors.gender && <p className="text-xs text-red-600">{errors.gender}</p>}
            </div>

            <div>
              <label className="font-medium">Category *</label>
              <select
                className={`w-full border rounded-xl px-3 py-2 mt-1 text-sm ${errors.category ? "border-red-500" : ""}`}
                value={form.category || ""}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Eau de Parfum">Eau de Parfum</option>
                <option value="Eau de Toilette">Eau de Toilette</option>
                <option value="Eau de Cologne">Eau de Cologne</option>
                <option value="Body Mist">Body Mist</option>
                <option value="Attar">Attar</option>
              </select>
              {errors.category && <p className="text-xs text-red-600">{errors.category}</p>}
            </div>

            {/* SIZE TOGGLE */}
            <div className="md:col-span-2 flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
              <input
                type="checkbox"
                checked={hasSizes}
                onChange={(e) => {
                  setHasSizes(e.target.checked);
                  if (!e.target.checked) {
                    setSizes({
                      size10ml: false,
                      size40ml: false,
                      price10ml: "",
                      price40ml: "",
                      discount10ml: "",
                      discount40ml: "",
                      stock10ml: "",
                      stock40ml: ""
                    });
                  }
                }}
                className="w-4 h-4 accent-blue-600"
              />
              <label className="font-medium">This product has multiple sizes (10ml / 40ml)</label>
            </div>
            {errors.sizes && <p className="text-xs text-red-600 md:col-span-2">{errors.sizes}</p>}

            {/* IF NO SIZES - REGULAR FIELDS */}
            {!hasSizes && (
              <>
                <div>
                  <label className="font-medium">Price *</label>
                  <input
                    type="number"
                    className={`w-full border rounded-xl px-3 py-2 mt-1 text-sm ${errors.price ? "border-red-500" : ""}`}
                    value={form.price || ""}
                    onChange={(e) => {
                      const price = e.target.value;
                      setForm({
                        ...form,
                        price,
                        discountPrice: applyDiscount ? calculateDiscountPrice(price, form.discountPercentage) : form.discountPrice,
                      });
                    }}
                  />
                  {errors.price && <p className="text-xs text-red-600">{errors.price}</p>}
                </div>

                <div>
                  <label className="font-medium">Stock</label>
                  <input
                    type="number"
                    className="w-full border rounded-xl px-3 py-2 mt-1 text-sm"
                    value={form.stock || ""}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={applyDiscount}
                    onChange={(e) => {
                      setApplyDiscount(e.target.checked);
                      if (!e.target.checked) {
                        setForm({ ...form, discountPrice: "", discountPercentage: "" });
                      }
                    }}
                    className="w-4 h-4 accent-red-600"
                  />
                  <label className="font-medium">Apply Discount</label>
                </div>

                {applyDiscount && (
                  <>
                    <div>
                      <label className="font-medium text-green-700">Discount %</label>
                      <input
                        type="number"
                        min="0"
                        max="90"
                        className="w-full border rounded-xl px-3 py-2 mt-1 text-sm"
                        value={form.discountPercentage || ""}
                        onChange={(e) => {
                          const percent = e.target.value;
                          setForm({
                            ...form,
                            discountPercentage: percent,
                            discountPrice: calculateDiscountPrice(form.price, percent),
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label className="font-medium text-blue-700">Discount Price</label>
                      <input
                        type="number"
                        readOnly
                        className="w-full border rounded-xl px-3 py-2 mt-1 text-sm bg-gray-100 cursor-not-allowed"
                        value={form.discountPrice || ""}
                      />
                    </div>
                  </>
                )}
              </>
            )}

            {/* IF SIZES ENABLED */}
            {hasSizes && (
              <div className="md:col-span-2 space-y-6">
                {/* 10ML SIZE */}
                <div className="p-4 border-2 border-blue-200 rounded-xl bg-blue-50/50">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={sizes.size10ml}
                      onChange={(e) => setSizes({ ...sizes, size10ml: e.target.checked })}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <label className="font-semibold text-lg">10ml Size</label>
                  </div>

                  {sizes.size10ml && (
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm font-medium">Price *</label>
                        <input
                          type="number"
                          className={`w-full border rounded-lg px-3 py-2 mt-1 text-sm ${errors.price10ml ? "border-red-500" : ""}`}
                          value={sizes.price10ml}
                          onChange={(e) => setSizes({ ...sizes, price10ml: e.target.value })}
                        />
                        {errors.price10ml && <p className="text-xs text-red-600">{errors.price10ml}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium">Discount %</label>
                        <input
                          type="number"
                          min="0"
                          max="90"
                          className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                          value={sizes.discount10ml}
                          onChange={(e) => setSizes({ ...sizes, discount10ml: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Stock</label>
                        <input
                          type="number"
                          className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                          value={sizes.stock10ml}
                          onChange={(e) => setSizes({ ...sizes, stock10ml: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 40ML SIZE */}
                <div className="p-4 border-2 border-purple-200 rounded-xl bg-purple-50/50">
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="checkbox"
                      checked={sizes.size40ml}
                      onChange={(e) => setSizes({ ...sizes, size40ml: e.target.checked })}
                      className="w-4 h-4 accent-purple-600"
                    />
                    <label className="font-semibold text-lg">40ml Size</label>
                  </div>

                  {sizes.size40ml && (
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm font-medium">Price *</label>
                        <input
                          type="number"
                          className={`w-full border rounded-lg px-3 py-2 mt-1 text-sm ${errors.price40ml ? "border-red-500" : ""}`}
                          value={sizes.price40ml}
                          onChange={(e) => setSizes({ ...sizes, price40ml: e.target.value })}
                        />
                        {errors.price40ml && <p className="text-xs text-red-600">{errors.price40ml}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-medium">Discount %</label>
                        <input
                          type="number"
                          min="0"
                          max="90"
                          className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                          value={sizes.discount40ml}
                          onChange={(e) => setSizes({ ...sizes, discount40ml: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Stock</label>
                        <input
                          type="number"
                          className="w-full border rounded-lg px-3 py-2 mt-1 text-sm"
                          value={sizes.stock40ml}
                          onChange={(e) => setSizes({ ...sizes, stock40ml: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="font-medium">Description</label>
            <textarea
              rows="3"
              className="w-full border rounded-xl px-3 py-2 mt-1 text-sm"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-semibold"
          >
            Save Product
          </button>
        </form>
      </div>
    </>
  );
}