"use client";
import styles from "./SearchBar.module.css";
import { useSearchBar } from "../../hook/useSearchBar";

interface SearchBarProps {
  initialCounter: number;
}
const SearchBar: React.FC<SearchBarProps> = ({ initialCounter }) => {
  const { searchTerm, setSearchTerm, count } = useSearchBar(initialCounter);
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
        {count} RESULTS
      </span>
    </div>
  );
};

export default SearchBar;
