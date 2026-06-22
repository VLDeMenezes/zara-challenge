import { notFound } from "next/navigation";
import { productRepository } from "@/infrastructure/api/api-product-repository";
import styles from "@/styles/page.module.css";
import ProductInfo from "@/features/product/components/ProductInfo/ProductInfo";
import SimilarItemsCarrousel from "@/features/product/components/SimilarItems/SimilarItems";
import ProductSpecs from "@/features/product/components/ProductSpec/ProductSpec";
import { removeDuplicates } from "@/utils/filter/array";
interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await productRepository.getById(id);
  if (!product) {
    notFound();
  }
  const uniqueSimilarProducts = removeDuplicates(product.similarProducts);
  return (
    <div className={styles.page}>
      <section className={styles["main"]}>
        <ProductInfo product={product} />
        <ProductSpecs product={product} />
        <SimilarItemsCarrousel similarItems={uniqueSimilarProducts} />
      </section>
    </div>
  );
}
