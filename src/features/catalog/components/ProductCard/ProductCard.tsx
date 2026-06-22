import { BaseProduct } from "@/core/entities/product";
import Image from "next/image";
import styles from "./ProductCard.module.css";
import Link from "next/link";
interface ProductCardProps {
  product: BaseProduct;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, brand, basePrice, imageUrl, id } = product;
  return (
    <Link
      href={`/product/${id}`}
      tabIndex={-1}
      aria-label={`Ver detalles de ${brand} ${name}, precio ${basePrice} euros`}
    >
      <article
        className={styles["product-card"]}
        aria-label={`${brand} ${name}`}
      >
        <div className={styles["product-card__image-wrapper"]}>
          <Image
            src={imageUrl || "/placeholder.webp"}
            alt=""
            style={{ objectFit: "contain" }}
            width={312}
            height={257}
          />
        </div>
        <div>
          <span className={styles["product-card__brand"]}>{brand}</span>
          <div className={styles["product-card__info-wrapper"]}>
            <div className={styles["product-card__name"]}>{name}</div>
            <span className={styles["product-card__price"]}>
              {basePrice} EUR
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
