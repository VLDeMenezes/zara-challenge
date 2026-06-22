import { Product } from "@/core/entities/product";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";
type ProductGridProps = {
  products: Product[];
};
const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <section aria-label="Product catalog">
      <ul className={styles["product-grid"]}>
        {products.map((prod) => (
          <li key={prod.id}>
            <ProductCard product={prod} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProductGrid;
