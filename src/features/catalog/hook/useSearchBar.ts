"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce/useDebounce";

export const useSearchBar = (initialCounter: number) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [prevInitialCounter, setPrevInitialCounter] = useState(initialCounter);
  const [count, setCount] = useState(initialCounter);

  if (initialCounter !== prevInitialCounter) {
    setPrevInitialCounter(initialCounter);
    setCount(initialCounter);
  }

  useEffect(() => {
    const handleCounterUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ newCount: number }>;
      setCount(customEvent.detail.newCount);
    };

    window.addEventListener("catalog-counter-update", handleCounterUpdate);
    return () =>
      window.removeEventListener("catalog-counter-update", handleCounterUpdate);
  }, []);

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") ?? "");
  const debouncedSearchTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    const currentSearchInUrl = searchParams.get("search") ?? "";
    if (debouncedSearchTerm === currentSearchInUrl) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearchTerm) {
      params.set("search", debouncedSearchTerm);
    } else {
      params.delete("search");
    }
    params.delete("offset");

    replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearchTerm, pathname, replace, searchParams]);

  return {
    searchTerm,
    setSearchTerm,
    count,
  };
};
