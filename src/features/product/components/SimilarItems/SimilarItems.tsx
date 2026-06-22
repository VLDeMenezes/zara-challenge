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
    <section className={styles["similar--card"]}>
      <h3>SIMILAR ITEMS</h3>
      <div className={styles["similar--carrousel"]}>
        {similarItems.map((item) => (
          <ProductCard product={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default SimilarItemsCarrousel;
