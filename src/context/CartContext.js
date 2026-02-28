"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState([]);

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
    const currentStock = await checkStock(item._id);
    
    setCart((prev) => {
      const exists = prev.find((i) => i._id === item._id);
      
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
      
      if (currentStock < 1) {
        toast.error(`${item.name} is out of stock`);
        return prev;
      }
      
      const cartItem = {
        ...item,
        quantity: 1,
        displayPrice: item.displayPrice || item.discountPrice > 0 ? item.discountPrice : item.price,
        originalPrice: item.price
      };
      
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
    
    cart.forEach((item) => {
      const itemPrice = item.displayPrice || item.price;
      const originalPrice = item.originalPrice || item.price;
      const itemSubtotal = itemPrice * item.quantity;
      
      subtotal += itemSubtotal;
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
        getCartTotals 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
