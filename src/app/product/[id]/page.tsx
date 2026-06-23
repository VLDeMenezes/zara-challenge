import { notFound } from "next/navigation";
import { productRepository } from "@/infrastructure/api/api-product-repository";
import styles from "@/styles/page.module.css";
import ProductInfo from "@/features/product/components/ProductInfo/ProductInfo";
import SimilarItemsCarrousel from "@/features/product/components/SimilarItems/SimilarItems";
import ProductSpecs from "@/features/product/components/ProductSpec/ProductSpec";
import { removeDuplicates } from "@/utils/filter/array";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await productRepository.getById(id);

  if (!product) {
    return {
      title: "Producto no encontrado | Zara Challenge",
    };
  }

  return {
    title: `${product.name} | Comprar ${product.brand} - Zara Challenge`,
    description:
      product.description ||
      `Consigue tu nuevo ${product.name} al mejor precio. Revisa sus especificaciones técnicas aquí.`,
    openGraph: {
      title: `${product.name} - Características y Precio`,
      description: product.description,
      images: [
        {
          url: product.imageUrl,
          alt: `Imagen de ${product.name}`,
        },
      ],
      type: "article",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await productRepository.getById(id);
  if (!product) {
    notFound();
  }
  const uniqueSimilarProducts = removeDuplicates(product.similarProducts);
  return (
    <div className={styles["page"]}>
      <section className={styles["main"]}>
        <ProductInfo product={product} />
        <ProductSpecs product={product} />
        <SimilarItemsCarrousel similarItems={uniqueSimilarProducts} />
      </section>
    </div>
  );
}
