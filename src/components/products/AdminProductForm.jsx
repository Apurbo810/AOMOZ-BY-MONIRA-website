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

  const [uploading, setUploading] = useState(false);


  if (!session?.user?.admin || !showAddProduct)
    return null;


  const closeModal = () => {

    setShowAddProduct(false);

    setEditingId(null);

    setErrors({});

    setApplyDiscount(false);

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


  /* VALIDATION */
  const validate = () => {

    const newErrors = {};

    if (!form.name?.trim())
      newErrors.name = "Name required";

    if (!form.image)
      newErrors.image = "Main image required";

    if (!form.price)
      newErrors.price = "Price required";

    if (!form.category)
      newErrors.category = "Category required";

    if (!form.color)
      newErrors.color = "Color required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };


  /* IMAGE UPLOAD */
  const uploadImage = async (file, multiple = false) => {

    setUploading(true);

    const toastId =
      toast.loading("Uploading image...");

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload-menu", {

      method: "POST",

      body: formData,

    });

    const data = await res.json();

    setUploading(false);

    if (!data.url) {

      toast.error("Upload failed", {
        id: toastId,
      });

      return;

    }

    if (multiple) {

      setForm({

        ...form,

        images: [
          ...(form.images || []),
          data.url,
        ],

      });

    } else {

      setForm({
        ...form,
        image: data.url,
      });

    }

    toast.success("Uploaded", {
      id: toastId,
    });

  };


  /* SUBMIT */
  const onSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) return;

    const payload = {

      ...form,

      price: Number(form.price),

      discountPrice:
        Number(form.discountPrice) || 0,

      discountPercentage:
        Number(form.discountPercentage) || 0,

      stock: Number(form.stock) || 0,

    };

    if (editingId)
      payload.id = editingId;

    const res = await fetch("/api/products", {

      method: editingId ? "PUT" : "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),

    });

    if (!res.ok) {

      toast.error("Save failed");

      return;

    }

    toast.success(
      editingId
        ? "Updated"
        : "Product added"
    );

    fetchProducts();

    closeModal();

  };


  /* UI */
  return (

    <>

      {/* BACKDROP */}
      <div
        onClick={closeModal}
        className="
        fixed inset-0 bg-black/40
        backdrop-blur-sm z-40
      "
      />


      {/* MODAL */}
      <div className="
        fixed inset-0 z-[100]
        flex justify-center px-4
      ">

        <form
          onSubmit={onSubmit}
          className="
            w-full max-w-4xl
            bg-white
            rounded-3xl
            shadow-2xl
            p-8 space-y-5
            mt-24
            max-h-[90vh]
            overflow-y-auto
          "
        >

          {/* HEADER */}
          <div className="
            flex justify-between
            items-center
          ">

            <h2 className="
              text-2xl font-bold
              text-[var(--color-primary)]
            ">

              {editingId
                ? "Edit Product"
                : "Add Product"}

            </h2>

            <button
              type="button"
              onClick={closeModal}
              className="text-xl"
            >
              ✕
            </button>

          </div>


          {/* NAME */}
          <div>

            <label>Name *</label>

            <input
              className="
                w-full border rounded-xl
                px-3 py-2 mt-1
              "
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            {errors.name &&
              <p className="text-red-500 text-sm">
                {errors.name}
              </p>}

          </div>


          {/* MAIN IMAGE */}
          <div>

            <label>Main Image *</label>

            <input
              type="file"
              onChange={(e) =>
                uploadImage(e.target.files[0])
              }
            />

            {form.image &&

              <Image
                src={form.image}
                width={200}
                height={200}
                alt=""
                className="
                  mt-2 rounded-xl
                "
              />

            }

          </div>


          {/* MULTIPLE IMAGES */}
          <div>

            <label>
              Additional Images
            </label>

            <input
              type="file"
              multiple
              onChange={(e) =>
                [...e.target.files]
                  .forEach(file =>
                    uploadImage(file, true)
                  )
              }
            />

            <div className="
              flex gap-3 mt-2 flex-wrap
            ">

              {(form.images || [])
                .map((img, i) => (

                  <Image
                    key={i}
                    src={img}
                    width={100}
                    height={100}
                    alt=""
                    className="rounded-xl"
                  />

                ))}

            </div>

          </div>


          {/* CATEGORY */}
          <div>

            <label>Category *</label>

            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value,
                })
              }
              className="
                w-full border rounded-xl
                px-3 py-2 mt-1
              "
            >

              <option value="">
                Select
              </option>

              <option value="saree">
                Saree
              </option>

              <option value="salwar-kamiz">
                Salwar Kamiz
              </option>

            </select>

          </div>


          {/* COLOR */}
          <div>

            <label>Color *</label>

            <input
              value={form.color || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  color: e.target.value,
                })
              }
              className="
                w-full border rounded-xl
                px-3 py-2 mt-1
              "
            />

          </div>


          {/* PRICE */}
          <div>

            <label>Price *</label>

            <input
              type="number"
              value={form.price}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
              className="
                w-full border rounded-xl
                px-3 py-2 mt-1
              "
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
                  description:
                    e.target.value,
                })
              }
              className="
                w-full border rounded-xl
                px-3 py-2 mt-1
              "
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

            {uploading
              ? "Uploading..."
              : "Save Product"}

          </button>


        </form>

      </div>

    </>

  );

}