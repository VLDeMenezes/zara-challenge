"use client";
import { createContext } from "react";
import { CartItem } from "@/core/entities/cart";
import { ColorOption, StorageOption } from "@/core/entities/product";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, color: ColorOption, storage: StorageOption) => void;
  updateQuantity: (
    productId: string,
    color: ColorOption,
    storage: StorageOption,
    amount: number
  ) => void;
  clearCart: () => void;
  totals: { subtotal: number; itemsCount: number };
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
