"use client";

import { Product } from "@/core/entities/product";
import ProductCard from "../ProductCard/ProductCard";
import Button from "@/components/button/Button";
import styles from "./ProductGrid.module.css";
import { useInfiniteCatalog } from "../../hook/useInfiniteCatalog";

type ProductGridProps = {
  initialProducts: Product[];
};

const ProductGrid: React.FC<ProductGridProps> = ({ initialProducts }) => {
  const { products, hasMore, isLoading, handleLoadMore } =
    useInfiniteCatalog(initialProducts);

  return (
    <section aria-label="Product catalog" className={styles["catalog-section"]}>
      <ul className={styles["product-grid"]}>
        {products.map((prod) => (
          <li key={prod.id}>
            <ProductCard product={prod} />
          </li>
        ))}
      </ul>
      <div className={styles["actions-container"]}>
        {hasMore ? (
          <Button type="button" disabled={isLoading} onClick={handleLoadMore}>
            {isLoading ? "Cargando teléfonos..." : "Mostrar más productos"}
          </Button>
        ) : (
          products.length > 0 && (
            <p className={styles["end-catalog-text"]}>
              Mostrando todos los productos ({products.length})
            </p>
          )
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
