"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "@/core/entities/cart";
import { ColorOption, StorageOption } from "@/core/entities/product";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  "use memo";
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];

    const storedCart = localStorage.getItem("zara_cart");
    if (storedCart) {
      try {
        return JSON.parse(storedCart);
      } catch (error) {
        console.error("Error parsing cart from localStorage", error);
      }
    }
    return [];
  });

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("zara_cart", JSON.stringify(cart));
    } else if (localStorage.getItem("zara_cart")) {
      localStorage.removeItem("zara_cart");
    }
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedColor.name === newItem.selectedColor.name &&
          item.selectedStorage.capacity === newItem.selectedStorage.capacity
      );

      if (existingItemIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }

      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (
    productId: string,
    color: ColorOption,
    storage: StorageOption
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedStorage === storage
          )
      )
    );
  };

  const clearCart = () => setCart([]);

  const totals = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const itemPrice = item.selectedStorage.price;

        acc.subtotal += itemPrice * item.quantity;
        acc.itemsCount += item.quantity;
        return acc;
      },
      { subtotal: 0, itemsCount: 0 }
    );
  }, [cart]);

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totals,
  };

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};
