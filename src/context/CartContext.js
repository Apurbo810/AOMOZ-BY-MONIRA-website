"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);

<<<<<<< HEAD
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
=======
  useEffect(() => {
    if (status === "loading") return;
    if (typeof window !== "undefined" && session?.user?.email) {
      const userCartKey = `cart_${session.user.email}`;
      const saved = localStorage.getItem(userCartKey);
      setCart(saved ? JSON.parse(saved) : []);
    } else {
      setCart([]);
    }
  }, [session, status]);

  useEffect(() => {
    if (typeof window !== "undefined" && session?.user?.email) {
      const userCartKey = `cart_${session.user.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(cart));
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    }
  }, [cart, session]);

  const checkStock = async (productId) => {
    try {
      const res = await fetch(`/api/products?id=${productId}`);
      if (res.ok) {
        const product = await res.json();
        return product.stock || 0;
      }
      return 0;
    } catch (err) {
      console.error("Error checking stock:", err);
      return 0;
    }
  };

  const addToCart = async (item) => {
<<<<<<< HEAD
    // Redirect to login if not authenticated
    if (!session?.user) {
      toast.error("Please log in to add items to your cart");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return;
    }

    const currentStock = await checkStock(item._id);

    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);

=======
    const currentStock = await checkStock(item._id);
    
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      if (exists) {
        const newQuantity = exists.quantity + 1;
        if (newQuantity > currentStock) {
          toast.error(`Only ${currentStock} units available for ${item.name}`);
          return prev;
        }
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: newQuantity } : i
        );
      }
<<<<<<< HEAD

=======
      
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      if (currentStock < 1) {
        toast.error(`${item.name} is out of stock`);
        return prev;
      }
<<<<<<< HEAD

      // ✅ Fixed operator precedence bug: wrapped ternary in parentheses
      const cartItem = {
        ...item,
        quantity: 1,
        displayPrice: item.displayPrice || (item.discountPrice > 0 ? item.discountPrice : item.price),
        originalPrice: item.price,
      };

=======
      
      const cartItem = {
        ...item,
        quantity: 1,
        displayPrice: item.displayPrice || item.discountPrice > 0 ? item.discountPrice : item.price,
        originalPrice: item.price
      };
      
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const item = cart.find((i) => i._id === id);
    if (!item) return;

    const currentStock = await checkStock(id);
<<<<<<< HEAD

=======
    
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    if (quantity > currentStock) {
      toast.error(`Only ${currentStock} units available for ${item.name}`);
      return;
    }

    setCart((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity } : i))
    );
  };

  const getCartTotals = useCallback(() => {
    let subtotal = 0;
    let discountTotal = 0;
<<<<<<< HEAD

    cart.forEach((item) => {
      const itemPrice = item.displayPrice || item.price;
      const originalPrice = item.originalPrice || item.price;
      subtotal += itemPrice * item.quantity;
      discountTotal += (originalPrice - itemPrice) * item.quantity;
    });

=======
    
    cart.forEach((item) => {
      const itemPrice = item.displayPrice || item.price;
      const originalPrice = item.originalPrice || item.price;
      const itemSubtotal = itemPrice * item.quantity;
      
      subtotal += itemSubtotal;
      discountTotal += (originalPrice - itemPrice) * item.quantity;
    });
    
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
    return { subtotal, discountTotal, total: subtotal };
  }, [cart]);

  return (
    <CartContext.Provider
<<<<<<< HEAD
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getCartTotals,
=======
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart, 
        updateQuantity,
        getCartTotals 
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

<<<<<<< HEAD
export const useCart = () => useContext(CartContext);
=======
export const useCart = () => useContext(CartContext);
>>>>>>> f3300f327d0f341b4adc5a8ea25fa5d740a3a0e3
