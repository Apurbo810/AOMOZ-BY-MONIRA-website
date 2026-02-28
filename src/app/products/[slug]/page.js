"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import Head from "next/head";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const isAdmin = session?.user?.admin === true;

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleDesktop = 3;
  const visibleMobile = 1.2;
  const total = Math.min(related.length, 9);

  useEffect(() => {
    if (slug) fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();

      setProduct(data.product);
      setRelated(data.related || []);

      // Set default size if product has sizes
      if (
        data.product.hasSizes &&
        data.product.sizes &&
        data.product.sizes.length > 0
      ) {
        setSelectedSize(data.product.sizes[0].ml);
      }

      setActiveImage(
        data.product.image.startsWith("http")
          ? data.product.image
          : `/storage/${data.product.image}`
      );

      setLoading(false);
    } catch {
      toast.error("Unable to load product");
      setLoading(false);
    }
  };

  const getCardWidth = () => {
    const width = sliderRef.current?.clientWidth || 0;
    const items = window.innerWidth < 768 ? visibleMobile : visibleDesktop;
    return width / items;
  };

  const moveNext = () => {
    const next = (activeIndex + 1) % total;
    setActiveIndex(next);
    sliderRef.current?.scrollTo({
      left: next * getCardWidth(),
      behavior: "smooth",
    });
  };

  const movePrev = () => {
    const prev = (activeIndex - 1 + total) % total;
    setActiveIndex(prev);
    sliderRef.current?.scrollTo({
      left: prev * getCardWidth(),
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.innerWidth > 768) return;
    const index = Math.round(sliderRef.current.scrollLeft / getCardWidth());
    setActiveIndex(index);
  };

  useEffect(() => {
    if (window.innerWidth > 768) return;
    const interval = setInterval(() => moveNext(), 2800);
    return () => clearInterval(interval);
  }, [activeIndex]);

  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!product)
    return (
      <div className="text-center mt-20 text-xl text-gray-600">
        Product not found
      </div>
    );

  // Handle sizes
  const hasSizes =
    product.hasSizes && product.sizes && product.sizes.length > 0;
  let currentPrice = product.price;
  let currentDiscountPrice = product.discountPrice || 0;
  let currentDiscountPercent = product.discountPercentage || 0;
  let currentStock = product.stock || 0;

  if (hasSizes && selectedSize) {
    const sizeData = product.sizes.find((s) => s.ml === selectedSize);
    if (sizeData) {
      currentPrice = sizeData.price;
      currentDiscountPrice = sizeData.discountPrice || 0;
      currentDiscountPercent = sizeData.discountPercentage || 0;
      currentStock = sizeData.stock || 0;
    }
  }

  const hasDiscount =
    currentDiscountPrice > 0 && currentDiscountPrice < currentPrice;
  const displayPrice = hasDiscount ? currentDiscountPrice : currentPrice;

  return (
    <div className="min-h-screen px-5 md:px-16 py-16 bg-gradient-to-b from-white via-red-50/15 to-white">
      <Head>
        <title>{product.name} | Perfume</title>
      </Head>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
        {/* IMAGE ZONE */}
        <div className="flex flex-col items-center">
          <div className="relative group bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow-xl p-6 transition hover:shadow-2xl w-full">
            <div className="relative w-full h-[480px]">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain duration-300 group-hover:scale-105 cursor-zoom-in"
              />
            </div>
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{currentDiscountPercent}%
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto scrollbar-hide">
            {[product.image, ...(product.images || [])].map((img, index) => {
              const src = img.startsWith("http") ? img : `/storage/${img}`;
              return (
                <div
                  key={index}
                  onClick={() => setActiveImage(src)}
                  className={`relative h-20 w-20 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                    activeImage === src
                      ? "border-red-600 scale-105"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`thumbnail-${index}`}
                    width={80}
                    height={80}
                    className="object-contain rounded-xl"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAILS ZONE */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 drop-shadow-sm">
            {product.name}
          </h1>

          {/* SIZE SELECTOR */}
          {hasSizes && (
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Size:
              </label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.ml}
                    onClick={() => setSelectedSize(size.ml)}
                    className={`px-6 py-3 text-base font-bold rounded-xl border-2 transition-all ${
                      selectedSize === size.ml
                        ? "bg-red-600 text-white border-red-600 shadow-lg scale-105"
                        : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                    }`}
                  >
                    {size.ml}ml
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRICE */}
          <div className="mt-6">
            {hasDiscount ? (
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <p className="text-red-600 text-4xl md:text-5xl font-bold">
                    ৳ {displayPrice.toLocaleString()}
                  </p>
                  <p className="text-gray-400 text-2xl line-through">
                    ৳ {currentPrice.toLocaleString()}
                  </p>
                </div>
                <p className="text-green-600 font-semibold">
                  You save ৳{(currentPrice - displayPrice).toLocaleString()} (
                  {currentDiscountPercent}% off)
                </p>
              </div>
            ) : (
              <p className="text-red-600 text-4xl md:text-5xl font-bold">
                ৳ {displayPrice.toLocaleString()}
              </p>
            )}
          </div>

          <p className="mt-4 text-gray-700 text-lg leading-relaxed">
            {product.description}
          </p>
          <p className="mt-3 text-gray-800">
            <b>Category:</b> {product.category}
          </p>
          <p className="text-gray-800 mb-2">
            <b>Gender:</b> {product.gender}
          </p>
          <p className="text-gray-800 mb-6">
            <b>Stock:</b>{" "}
            {currentStock > 0 ? `${currentStock} available` : "Out of stock"}
          </p>

          {!isAdmin && (
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 bg-gray-200 rounded-lg text-xl hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 bg-gray-200 rounded-lg text-xl hover:bg-gray-300"
              >
                +
              </button>
            </div>
          )}

          <button
            disabled={isAdmin || currentStock === 0}
            onClick={() => {
              if (!isAdmin && currentStock > 0) {
                addToCart({
                  ...product,
                  quantity,
                  selectedSize: hasSizes ? selectedSize : null,
                  price: currentPrice,
                  discountPrice: currentDiscountPrice,
                  displayPrice: displayPrice,
                  stock: currentStock,
                });
                toast.success(
                  `Added to cart${hasSizes ? ` (${selectedSize}ml)` : ""}`
                );
              }
            }}
            className={`mt-6 w-full py-4 text-lg font-bold rounded-xl text-white shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all ${
              isAdmin || currentStock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {currentStock === 0 ? "Out of Stock" : "Add To Cart"}
          </button>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto mt-20 relative">
        <h2 className="text-3xl font-bold mb-8">You may also like</h2>

        {related.length > 0 ? (
          <div className="relative">
            <button
              onClick={movePrev}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white w-12 h-12 rounded-full border shadow-md hover:shadow-xl items-center justify-center transition active:scale-95 backdrop-blur-md"
            >
              <IoIosArrowBack className="text-2xl text-gray-800" />
            </button>

            <button
              onClick={moveNext}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white w-12 h-12 rounded-full border shadow-md hover:shadow-xl items-center justify-center transition active:scale-95 backdrop-blur-md"
            >
              <IoIosArrowForward className="text-2xl text-gray-800" />
            </button>

            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-6 scrollbar-hide md:overflow-x-hidden"
            >
              {related.slice(0, 9).map((item) => {
                const img = item.image.startsWith("http")
                  ? item.image
                  : `/storage/${item.image}`;
                const itemPrice =
                  item.hasSizes && item.sizes?.[0]
                    ? item.sizes[0].price
                    : item.price;

                return (
                  <Link
                    key={item._id}
                    href={`/products/${item.slug}`}
                    className="group snap-center min-w-[80%] md:min-w-[32%] bg-gradient-to-br from-white to-gray-50/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-1 transition-all duration-500 border border-gray-100/50 backdrop-blur-xl relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out pointer-events-none"></div>

                    <div className="relative w-full h-64 flex justify-center items-center p-8 bg-gradient-to-b from-gray-50/50 to-white overflow-hidden">
                      <div className="absolute inset-0 blur-3xl bg-red-500/10 rounded-full scale-75 group-hover:scale-100 group-hover:bg-red-500/20 transition-all duration-700"></div>
                      <div className="absolute inset-0 m-auto w-48 h-48 border border-red-100/30 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={img}
                          alt={item.name}
                          fill
                          className="object-contain group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 ease-out drop-shadow-2xl"
                        />
                      </div>
                    </div>

                    <div className="relative p-6 pt-5 space-y-2">
                      <div className="inline-block">
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full group-hover:bg-red-100 transition-colors duration-300">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight min-h-[3.5rem] group-hover:text-red-600 transition-colors duration-300">
                        {item.name}
                      </h3>
                      <div className="w-12 h-0.5 bg-gradient-to-r from-red-500 to-transparent group-hover:w-full transition-all duration-500"></div>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-2xl font-black text-red-600 group-hover:scale-110 transition-transform duration-300 inline-block">
                          ৳ {itemPrice}
                        </p>
                        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center group-hover:bg-red-700 group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
                          <FiShoppingCart className="text-white w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: total }).map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "bg-red-600 scale-125" : "bg-gray-300"
                  }`}
                ></span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No related products found</p>
        )}
      </div>
    </div>
  );
}
