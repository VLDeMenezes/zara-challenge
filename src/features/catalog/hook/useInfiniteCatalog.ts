"use client";

import { useState, useEffect } from "react";
import { Product } from "@/core/entities/product";
import { useSearchParams } from "next/navigation";
import { fetchMoreProductsAction } from "@/infrastructure/actions/products";

export const useInfiniteCatalog = (initialProducts: Product[]) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || undefined;

  const [prevInitialProducts, setPrevInitialProducts] = useState(initialProducts);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [offset, setOffset] = useState(initialProducts.length);
  const [hasMore, setHasMore] = useState(initialProducts.length >= 20);
  const [isLoading, setIsLoading] = useState(false);

  if (initialProducts !== prevInitialProducts) {
    setPrevInitialProducts(initialProducts);
    setProducts(initialProducts);
    setOffset(initialProducts.length);
    setHasMore(initialProducts.length >= 20);
  }

  useEffect(() => {
    const event = new CustomEvent("catalog-counter-update", {
      detail: { newCount: products.length },
    });
    window.dispatchEvent(event);
  }, [products.length]);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newProducts = await fetchMoreProductsAction(offset, search);

      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => {
          const combined = [...prev, ...newProducts];
          return combined.filter(
            (item, index, self) => self.findIndex((p) => p.id === item.id) === index
          );
        });
        setOffset((prevOffset) => prevOffset + newProducts.length);

        if (newProducts.length < 20) {
          setHasMore(false);
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar más productos:", error);
      setIsLoading(false);
    }
  };

  return {
    products,
    hasMore,
    isLoading,
    handleLoadMore,
  };
};
