"use client";

import React, { useMemo, useSyncExternalStore } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "@/core/entities/cart";
import { ColorOption, StorageOption } from "@/core/entities/product";
const cartStore = {
  subscribe(onStoreChange: () => void) {
    window.addEventListener("storage", onStoreChange);
    return () => window.removeEventListener("storage", onStoreChange);
  },
  getSnapshot() {
    return localStorage.getItem("zara_cart") || "[]";
  },
  getServerSnapshot() {
    return "[]";
  },
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const rawCart = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot
  );

  const cart = useMemo<CartItem[]>(() => {
    try {
      return JSON.parse(rawCart);
    } catch {
      return [];
    }
  }, [rawCart]);

  const saveCart = (newCart: CartItem[]) => {
    if (newCart.length > 0) {
      localStorage.setItem("zara_cart", JSON.stringify(newCart));
    } else {
      localStorage.removeItem("zara_cart");
    }
    window.dispatchEvent(new Event("storage"));
  };

  const addToCart = (newItem: CartItem) => {
    const existingItemIndex = cart.findIndex(
      (item) =>
        item.product.id === newItem.product.id &&
        item.selectedColor.name === newItem.selectedColor.name &&
        item.selectedStorage.capacity === newItem.selectedStorage.capacity
    );

    let updatedCart: CartItem[];
    if (existingItemIndex > -1) {
      updatedCart = cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item
      );
    } else {
      updatedCart = [...cart, newItem];
    }

    saveCart(updatedCart);
  };

  const removeFromCart = (
    productId: string,
    color: ColorOption,
    storage: StorageOption
  ) => {
    const updatedCart = cart.filter(
      (item) =>
        !(
          item.product.id === productId &&
          item.selectedColor.name === color.name &&
          item.selectedStorage.capacity === storage.capacity
        )
    );
    saveCart(updatedCart);
  };

  const clearCart = () => saveCart([]);

  const totals = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.subtotal += item.selectedStorage.price * item.quantity;
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
