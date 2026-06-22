"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  counter: number;
}
const SearchBar: React.FC<SearchBarProps> = ({ counter }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") ?? "",
  );
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
  }, [debouncedSearchTerm, pathname, replace]);

  return (
    <div className={styles["search-wrapper"]}>
      <input
        data-testid={"search-bar"}
        type="search"
        aria-label="Search for smartphones by brand or model"
        placeholder="Search for a smartphone..."
        className={styles["search-input"]}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span className={styles["search-result-counter"]} aria-live="polite">
        {counter} RESULTS
      </span>
    </div>
  );
};

export default SearchBar;
