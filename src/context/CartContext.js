"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const CartContext = createContext();

// A cart line is uniquely identified by product + size.
// Non-sized products use "nosize" so they still get a stable key.
const lineKey = (id, size) => `${id}_${size || "nosize"}`;

export const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on session change
  useEffect(() => {
    if (status === "loading") return;

    if (typeof window !== "undefined") {
      // Use email-specific key for logged-in users, guest key for others
      const cartKey = session?.user?.email
        ? `cart_${session.user.email}`
        : "cart_guest";

      const saved = localStorage.getItem(cartKey);
      setCart(saved ? JSON.parse(saved) : []);
    }
  }, [session, status]);

  // Save cart to localStorage on every change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartKey = session?.user?.email
        ? `cart_${session.user.email}`
        : "cart_guest";

      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, session]);

  /**
   * Returns { stock, price, discountPrice } for a product, resolved
   * against a specific size when the product is size-based.
   */
  const checkStock = async (productId, size = null) => {
    try {
      const res = await fetch(`/api/products?id=${productId}`);
      if (!res.ok) return { stock: 0, price: 0, discountPrice: 0 };

      const product = await res.json();

      if (product.hasSizes && product.sizes?.length > 0) {
        const sizeEntry = product.sizes.find((s) => s.size === size);

        if (!sizeEntry) {
          return { stock: 0, price: 0, discountPrice: 0 };
        }

        return {
          stock: sizeEntry.stock || 0,
          price: sizeEntry.price || 0,
          discountPrice: sizeEntry.discountPrice || 0,
        };
      }

      return {
        stock: product.stock || 0,
        price: product.price || 0,
        discountPrice: product.discountPrice || 0,
      };
    } catch (err) {
      console.error("Error checking stock:", err);
      return { stock: 0, price: 0, discountPrice: 0 };
    }
  };

  /**
   * item: the product object (must include hasSizes/sizes if size-based)
   * size: the size string the shopper picked (required if item.hasSizes)
   */
  const addToCart = async (item, size = null) => {
    // Redirect to login if not authenticated
    if (!session?.user) {
      toast.error("Please log in to add items to your cart");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return;
    }

    if (item.hasSizes && !size) {
      toast.error("Please select a size");
      return;
    }

    const key = lineKey(item._id, size);
    const { stock: currentStock, price, discountPrice } = await checkStock(
      item._id,
      size
    );

    setCart((prev) => {
      const exists = prev.find((i) => lineKey(i._id, i.size) === key);

      if (exists) {
        const newQuantity = exists.quantity + 1;
        if (newQuantity > currentStock) {
          toast.error(
            `Only ${currentStock} units available for ${item.name}${
              size ? ` (${size})` : ""
            }`
          );
          return prev;
        }
        return prev.map((i) =>
          lineKey(i._id, i.size) === key
            ? { ...i, quantity: newQuantity }
            : i
        );
      }

      if (currentStock < 1) {
        toast.error(
          `${item.name}${size ? ` (${size})` : ""} is out of stock`
        );
        return prev;
      }

      const resolvedPrice = item.hasSizes ? price : item.price;
      const resolvedDiscountPrice = item.hasSizes
        ? discountPrice
        : item.discountPrice;

      const cartItem = {
        _id: item._id,
        name: item.name,
        image: item.image,
        size: size || null,
        quantity: 1,
        price: resolvedPrice,
        displayPrice:
          resolvedDiscountPrice > 0 ? resolvedDiscountPrice : resolvedPrice,
        originalPrice: resolvedPrice,
      };

      return [...prev, cartItem];
    });
  };

  const removeFromCart = (id, size = null) => {
    const key = lineKey(id, size);
    setCart((prev) => prev.filter((i) => lineKey(i._id, i.size) !== key));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = async (id, quantity, size = null) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const key = lineKey(id, size);
    const item = cart.find((i) => lineKey(i._id, i.size) === key);
    if (!item) return;

    const { stock: currentStock } = await checkStock(id, size);

    if (quantity > currentStock) {
      toast.error(
        `Only ${currentStock} units available for ${item.name}${
          size ? ` (${size})` : ""
        }`
      );
      return;
    }

    setCart((prev) =>
      prev.map((i) =>
        lineKey(i._id, i.size) === key ? { ...i, quantity } : i
      )
    );
  };

  const getCartTotals = useCallback(() => {
    let subtotal = 0;
    let discountTotal = 0;

    cart.forEach((item) => {
      const itemPrice = item.displayPrice || item.price;
      const originalPrice = item.originalPrice || item.price;
      subtotal += itemPrice * item.quantity;
      discountTotal += (originalPrice - itemPrice) * item.quantity;
    });

    return { subtotal, discountTotal, total: subtotal };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCartTotals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);