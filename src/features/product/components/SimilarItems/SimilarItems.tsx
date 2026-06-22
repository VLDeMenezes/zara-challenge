import { SimilarProduct } from "@/core/entities/product";
import ProductCard from "@/features/catalog/components/ProductCard/ProductCard";
import styles from "./SimilarItems.module.css";
interface SimilarItemsProps {
  similarItems: SimilarProduct[];
}
const SimilarItemsCarrousel: React.FC<SimilarItemsProps> = ({
  similarItems,
}) => {
  return (
    <section
      className={styles["similar--card"]}
      aria-label="Similar products list"
    >
      <h3>SIMILAR ITEMS</h3>
      <ul className={styles["similar--carrousel"]}>
        {similarItems.map((item) => (
          <li key={item.id}>
            <ProductCard product={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SimilarItemsCarrousel;
