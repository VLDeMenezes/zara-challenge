import ProductGrid from "@/features/catalog/components/ProductGrid/ProductGrid";
import SearchBar from "@/features/catalog/components/SearchBar/SearchBar";
import { productRepository } from "@/infrastructure/api/api-product-repository";
import styles from "@/styles/page.module.css";
import { removeDuplicates } from "@/utils/filter/array";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Zara Challenge",
  description:
    "Explora nuestra amplia gama de smartphones. Encuentra las mejores marcas como Samsung, Apple y más al mejor precio.",
  keywords: [
    "e-commerce",
    "móviles",
    "smartphones",
    "comprar teléfonos",
    "Zara challenge",
  ],
  openGraph: {
    title: "Zara Challenge",
    description:
      "Explora nuestra amplia gama de smartphones con disponibilidad inmediata.",
    type: "website",
  },
};

type Props = {
  searchParams: Promise<{
    search?: string;
    limit?: string;
    offset?: string;
  }>;
};
const HomePage = async ({ searchParams }: Props) => {
  const resolvedParams = await searchParams;
  const filters = {
    search: resolvedParams.search,
    limit: resolvedParams.limit ? parseInt(resolvedParams.limit, 10) : undefined,
    offset: resolvedParams.offset ? parseInt(resolvedParams.offset, 10) : undefined,
  };
  const products = await productRepository.getAll(filters);
  const uniqueProducts = removeDuplicates(products);
  const limitToApply = filters.limit ?? 20;
  const finalCatalogProducts = uniqueProducts.slice(0, limitToApply);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Suspense fallback={<div style={{ height: "45px" }}>Loading search...</div>}>
          <SearchBar initialCounter={finalCatalogProducts.length} />
        </Suspense>
        <ProductGrid initialProducts={finalCatalogProducts} />
      </main>
    </div>
  );
};
export default HomePage;
