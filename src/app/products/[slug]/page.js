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
<<<<<<< HEAD
import { Great_Vibes } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const isAdmin = session?.user?.admin === true;

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
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

      const mainImage = data.product.image.startsWith("http")
        ? data.product.image
        : `/storage/${data.product.image}`;
      setActiveImage(mainImage);

      if (data.product.images?.length > 0) {
        const second = data.product.images[0].startsWith("http")
          ? data.product.images[0]
          : `/storage/${data.product.images[0]}`;
        setHoverImage(second);
      }

      setLoading(false);
    } catch {
      toast.error("Failed to load product");
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
    sliderRef.current?.scrollTo({ left: next * getCardWidth(), behavior: "smooth" });
  };

  const movePrev = () => {
    const prev = (activeIndex - 1 + total) % total;
    setActiveIndex(prev);
    sliderRef.current?.scrollTo({ left: prev * getCardWidth(), behavior: "smooth" });
  };

  /* ── LOADING ── */
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[var(--color-bg-primary)] z-50">
        <div className="relative flex flex-col items-center gap-6">
          {/* Glow behind spinner */}
          <div className="absolute w-40 h-40 bg-[var(--color-primary)]/20 blur-3xl rounded-full" />
          <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin relative z-10" />
          <p
            className={`${greatVibes.className} text-3xl text-[var(--color-primary)] relative z-10`}
          >
            Loading…
          </p>
        </div>
      </div>
    );

  /* ── NOT FOUND ── */
  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
        <p className={`${greatVibes.className} text-4xl text-[var(--color-primary)]`}>
          Product not found
        </p>
      </div>
    );

  const displayPrice = product.discountPrice > 0 ? product.discountPrice : product.price;
  const hasDiscount = product.discountPrice > 0;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] relative overflow-hidden">
      <Head>
        <title>{product.name} | AOMOZ BY MONIRA</title>
      </Head>

      {/* ── BACKGROUND GLOW ── */}
      <div className="pointer-events-none absolute w-[700px] h-[700px] bg-[var(--color-primary)]/10 blur-3xl rounded-full left-1/2 -translate-x-1/2 -top-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 py-20">

        {/* ── PRODUCT HEADING (mobile) ── */}
        <div className="text-center mb-12 lg:hidden">
          <h1 className={`${greatVibes.className} text-5xl text-[var(--color-primary)] drop-shadow`}>
            {product.name}
          </h1>
          <div className="w-20 h-[2px] bg-[var(--color-primary)]/40 mx-auto mt-3 rounded-full" />
        </div>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── IMAGE PANEL ── */}
          <div className="flex flex-col gap-4">
            {/* Main image card */}
            <div
              className="relative bg-white rounded-3xl border border-[var(--color-primary)]/10 shadow-xl overflow-hidden cursor-zoom-in"
              onMouseEnter={() => hoverImage && setActiveImage(hoverImage)}
              onMouseLeave={() =>
                setActiveImage(
                  product.image.startsWith("http")
                    ? product.image
                    : `/storage/${product.image}`
                )
              }
            >
              {/* Subtle inner glow */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent rounded-3xl z-10" />

              <div className="relative w-full h-[420px] md:h-[520px]">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-contain transition-transform duration-700 hover:scale-105"
                />
              </div>

              {hasDiscount && (
                <span className="absolute top-4 left-4 z-20 bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg tracking-widest uppercase">
                  Sale
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 flex-wrap">
              {[product.image, ...(product.images || [])].map((img, i) => {
                const src = img.startsWith("http") ? img : `/storage/${img}`;
                const isActive = activeImage === src;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveImage(src)}
                    className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      isActive
                        ? "border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/20"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`thumb-${i}`}
                      width={80}
                      height={80}
                      className="object-cover w-20 h-20"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── DETAILS PANEL ── */}
          <div className="flex flex-col justify-start">

            {/* Title (desktop) */}
            <div className="hidden lg:block mb-6">
              <h1
                className={`${greatVibes.className} text-5xl xl:text-6xl text-[var(--color-primary)] leading-tight drop-shadow`}
              >
                {product.name}
              </h1>
              <div className="w-24 h-[2px] bg-[var(--color-primary)]/40 mt-3 rounded-full" />
            </div>

            {/* Price */}
            <div className="mt-2 mb-6">
              {hasDiscount && (
                <p className="text-gray-400 line-through text-lg mb-1">৳ {product.price}</p>
              )}
              <div className="flex items-end gap-3">
                <p className="text-4xl font-bold text-[var(--color-primary)]">
                  ৳ {displayPrice}
                </p>
                {hasDiscount && product.discountPercentage && (
                  <span className="text-sm font-semibold bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full mb-1">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-primary)]/20 to-transparent mb-6" />

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed text-base mb-6">
                {product.description}
              </p>
            )}

            {/* Category & Color chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              {product.category && (
                <span className="text-xs font-semibold tracking-widest uppercase px-4 py-2 bg-[var(--color-primary)]/8 text-[var(--color-primary)] rounded-full border border-[var(--color-primary)]/20">
                  {product.category}
                </span>
              )}
              {product.color && (
                <span className="text-xs font-semibold tracking-widest uppercase px-4 py-2 bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                  {product.color}
                </span>
              )}
              {product.stock > 0 ? (
                <span className="text-xs font-semibold tracking-widest uppercase px-4 py-2 bg-green-50 text-green-600 rounded-full border border-green-200">
                  In Stock
                </span>
              ) : (
                <span className="text-xs font-semibold tracking-widest uppercase px-4 py-2 bg-red-50 text-red-500 rounded-full border border-red-200">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <button
              disabled={isAdmin}
              onClick={() => {
                addToCart({ ...product, quantity });
                toast.success("Added to cart");
              }}
              className="
                group relative w-full py-4 rounded-3xl
                bg-[var(--color-primary)] text-white
                font-bold text-base tracking-wide
                shadow-lg shadow-[var(--color-primary)]/30
                hover:shadow-xl hover:shadow-[var(--color-primary)]/40
                hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-3
                overflow-hidden
              "
            >
              {/* shimmer */}
              <span className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-3xl" />
              <FiShoppingCart className="text-xl relative z-10" />
              <span className="relative z-10">
                {isAdmin ? "Admin Mode" : "Add to Cart"}
              </span>
            </button>

            {/* Trust badge */}
            <p className="text-center text-xs text-gray-400 mt-4 tracking-wide">
              🔒 Secure checkout &nbsp;·&nbsp; Free returns
            </p>
          </div>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <div className="mt-28">
            {/* Section heading */}
            <div className="text-center mb-12">
              <h2
                className={`${greatVibes.className} text-4xl md:text-5xl text-[var(--color-primary)] mb-4 drop-shadow`}
              >
                You May Also Like
              </h2>
              <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
                Handpicked pieces that complement your style
              </p>
              <div className="w-20 h-[2px] bg-[var(--color-primary)]/40 mx-auto mt-4 rounded-full" />
            </div>

            {/* Slider controls */}
            <div className="relative">
              <button
                onClick={movePrev}
                className="
                  hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 z-20
                  w-11 h-11 rounded-full bg-white
                  border border-[var(--color-primary)]/20
                  shadow-lg items-center justify-center
                  text-[var(--color-primary)]
                  hover:bg-[var(--color-primary)] hover:text-white
                  transition-all duration-300
                "
              >
                <IoIosArrowBack size={20} />
              </button>

              <div
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {related.map((item) => {
                  const itemSrc = item.image.startsWith("http")
                    ? item.image
                    : `/storage/${item.image}`;

                  return (
                    <Link
                      key={item._id}
                      href={`/products/${item.slug}`}
                      className="
                        group min-w-[220px] md:min-w-[260px]
                        bg-white rounded-3xl
                        border border-[var(--color-primary)]/10
                        shadow-md hover:shadow-xl hover:shadow-[var(--color-primary)]/15
                        overflow-hidden
                        transition-all duration-500
                        hover:-translate-y-1
                        flex flex-col
                      "
                    >
                      {/* Image */}
                      <div className="relative w-full h-[240px] overflow-hidden">
                        <Image
                          src={itemSrc}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* overlay on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
                      </div>

                      {/* Info */}
                      <div className="p-4 flex flex-col gap-1">
                        <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-300">
                          {item.name}
                        </p>
                        <p className="text-[var(--color-primary)] font-bold text-base">
                          ৳ {item.discountPrice > 0 ? item.discountPrice : item.price}
                        </p>
                        {item.discountPrice > 0 && (
                          <p className="text-gray-400 line-through text-xs">৳ {item.price}</p>
                        )}
                        {/* Shop now */}
                        <p className="text-xs text-[var(--color-primary)] font-medium mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          Shop Now →
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <button
                onClick={moveNext}
                className="
                  hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20
                  w-11 h-11 rounded-full bg-white
                  border border-[var(--color-primary)]/20
                  shadow-lg items-center justify-center
                  text-[var(--color-primary)]
                  hover:bg-[var(--color-primary)] hover:text-white
                  transition-all duration-300
                "
              >
                <IoIosArrowForward size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
=======

export default function ProductDetails() {

  const { slug } = useParams();

  const { addToCart } = useCart();

  const { data: session } = useSession();

  const isAdmin = session?.user?.admin === true;


  const [product, setProduct] = useState(null);

  const [related, setRelated] = useState([]);

  const [quantity, setQuantity] = useState(1);

  const [activeImage, setActiveImage] = useState("");

  const [hoverImage, setHoverImage] = useState("");

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

      const mainImage =
        data.product.image.startsWith("http")
          ? data.product.image
          : `/storage/${data.product.image}`;

      setActiveImage(mainImage);

      if (data.product.images?.length > 0) {

        const second =
          data.product.images[0].startsWith("http")
            ? data.product.images[0]
            : `/storage/${data.product.images[0]}`;

        setHoverImage(second);

      }

      setLoading(false);

    } catch {

      toast.error("Failed to load product");

      setLoading(false);

    }

  };



  const getCardWidth = () => {

    const width = sliderRef.current?.clientWidth || 0;

    const items =
      window.innerWidth < 768
        ? visibleMobile
        : visibleDesktop;

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

    const prev =
      (activeIndex - 1 + total) % total;

    setActiveIndex(prev);

    sliderRef.current?.scrollTo({

      left: prev * getCardWidth(),

      behavior: "smooth",

    });

  };



  if (loading)

    return (

      <div className="
        fixed inset-0 flex items-center justify-center
        bg-white z-50
      ">

        <div className="
          w-16 h-16 border-4
          border-[var(--color-primary)]
          border-t-transparent
          rounded-full animate-spin
        " />

      </div>

    );



  if (!product)

    return (

      <div className="text-center mt-20">

        Product not found

      </div>

    );



  const displayPrice =
    product.discountPrice > 0
      ? product.discountPrice
      : product.price;



  const hasDiscount =
    product.discountPrice > 0;



  return (

    <div className="
      min-h-screen px-5 md:px-16 py-16
      bg-[var(--color-bg-primary)]
    ">


      <Head>

        <title>
          {product.name} | AOMOZ BY MONIRA
        </title>

      </Head>



      <div className="
        max-w-6xl mx-auto
        grid grid-cols-1 lg:grid-cols-2 gap-14
      ">


        {/* IMAGE */}

        <div>


          <div
            className="
              relative bg-white rounded-3xl
              border border-[var(--color-border)]
              shadow-lg p-6 overflow-hidden
            "

            onMouseEnter={() =>
              hoverImage &&
              setActiveImage(hoverImage)
            }

            onMouseLeave={() =>
              setActiveImage(
                product.image.startsWith("http")
                  ? product.image
                  : `/storage/${product.image}`
              )
            }

          >


            <div className="
              relative w-full h-[500px]
            ">

              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="
                  object-contain
                  transition duration-500
                  hover:scale-105
                "
              />

            </div>



            {hasDiscount && (

              <span className="
                absolute top-4 left-4
                bg-[var(--color-primary)]
                text-white px-3 py-1
                rounded-full text-sm font-bold
              ">

                SALE

              </span>

            )}

          </div>



          {/* THUMBNAILS */}

          <div className="
            flex gap-3 mt-4
          ">

            {[product.image, ...(product.images || [])]
              .map((img, i) => {

                const src =
                  img.startsWith("http")
                    ? img
                    : `/storage/${img}`;

                return (

                  <Image

                    key={i}

                    src={src}

                    alt="thumb"

                    width={80}

                    height={80}

                    onClick={() =>
                      setActiveImage(src)
                    }

                    className="
                      rounded-xl border
                      border-[var(--color-border)]
                      cursor-pointer hover:scale-105
                    "

                  />

                );

              })}

          </div>

        </div>



        {/* DETAILS */}

        <div>


          <h1 className="
            text-4xl font-bold
            text-[var(--color-primary)]
          ">

            {product.name}

          </h1>



          <div className="mt-6">


            {hasDiscount && (

              <p className="
                text-gray-400 line-through
                text-xl
              ">

                ৳ {product.price}

              </p>

            )}



            <p className="
              text-4xl font-bold
              text-[var(--color-primary)]
            ">

              ৳ {displayPrice}

            </p>

          </div>



          <p className="mt-4">

            {product.description}

          </p>



          <p className="mt-4">

            Category: {product.category}

          </p>



          <button

            disabled={isAdmin}

            onClick={() => {

              addToCart({

                ...product,

                quantity,

              });

              toast.success("Added to cart");

            }}

            className="
              mt-6 w-full py-4
              bg-[var(--color-primary)]
              text-white font-bold
              rounded-xl
              hover:opacity-90
            "

          >

            Add To Cart

          </button>

        </div>

      </div>



      {/* RELATED */}

      <div className="mt-20">

        <h2 className="
          text-2xl font-bold mb-6
        ">

          You may also like

        </h2>



        <div
          ref={sliderRef}
          className="
            flex gap-6 overflow-x-auto
          "
        >

          {related.map((item) => (

            <Link

              key={item._id}

              href={`/products/${item.slug}`}

              className="
                min-w-[250px]
                bg-white rounded-xl
                shadow-md p-4
              "

            >

              <Image

                src={
                  item.image.startsWith("http")
                    ? item.image
                    : `/storage/${item.image}`
                }

                width={250}

                height={250}

                alt={item.name}

                className="
                  object-contain h-[250px]
                "

              />

              <p className="font-semibold mt-2">

                {item.name}

              </p>

              <p className="
                text-[var(--color-primary)]
                font-bold
              ">

                ৳ {item.price}

              </p>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );

>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
}