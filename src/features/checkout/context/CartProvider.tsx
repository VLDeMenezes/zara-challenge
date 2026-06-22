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
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Persistencia: Cargar el carrito desde LocalStorage al iniciar (Solo en el cliente)
  useEffect(() => {
    const storedCart = localStorage.getItem("zara_cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error parsing cart from localStorage", error);
      }
    }
  }, []);

  // 2. Persistencia: Guardar en LocalStorage cada vez que cambie el carrito
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("zara_cart", JSON.stringify(cart));
    } else if (localStorage.getItem("zara_cart")) {
      localStorage.removeItem("zara_cart");
    }
  }, [cart]);

  // 3. Funciones de negocio mutadoras
  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Validamos si ya existe el producto con las MISMAS variantes
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedColor === newItem.selectedColor &&
          item.selectedStorage === newItem.selectedStorage,
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += newItem.quantity;
        return newCart;
      }

      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (
    productId: string,
    color: ColorOption,
    storage: StorageOption,
  ) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === color &&
            item.selectedStorage === storage
          ),
      ),
    );
  };

  const clearCart = () => setCart([]);

  // 4. Cálculos derivados (Totales)
  // Usamos useMemo para optimizar y evitar recalcular en renders irrelevantes
  const totals = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const itemPrice = item.product.basePrice;

        acc.subtotal += itemPrice * item.quantity;
        acc.itemsCount += item.quantity;
        return acc;
      },
      { subtotal: 0, itemsCount: 0 },
    );
  }, [cart]);

  // 5. El valor del contexto expuesto
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    totals,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
