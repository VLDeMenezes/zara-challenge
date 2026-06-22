import { Product } from "@/core/entities/product";

export interface GetAllFilters {
  search?: string;
  limit?: number;
  offset?: number;
}

export interface ProductRepository {
  getAll(filters?: GetAllFilters): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
}
