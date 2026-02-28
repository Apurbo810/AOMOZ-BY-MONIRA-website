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

}