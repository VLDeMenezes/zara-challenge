"use server";

import { productRepository } from "@/infrastructure/api/api-product-repository";
import { removeDuplicates } from "@/utils/filter/array";
import { Product } from "@/core/entities/product";

export async function fetchMoreProductsAction(
  offset: number,
  search?: string
): Promise<Product[]> {
  const products = await productRepository.getAll({
    search,
    limit: 20,
    offset,
  });

  return removeDuplicates(products);
}
