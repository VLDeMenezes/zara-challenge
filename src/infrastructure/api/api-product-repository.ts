import {
  ProductRepository,
  GetAllFilters,
} from "@/core/ports/http/product-repository.interface";
import { Product } from "@/core/entities/product";
import { ApiProductDto } from "./dto/product.dto";
import { mapDtoToProduct } from "./mappers/product.mapper";

export class ApiProductRepository implements ProductRepository {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;
  private headers = {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY || "",
  };

  async getAll(filters?: GetAllFilters): Promise<Product[]> {
    const queryParams = new URLSearchParams();

    if (filters?.search) queryParams.append("search", filters.search);
    if (filters?.limit) queryParams.append("limit", filters.limit.toString());
    if (filters?.offset)
      queryParams.append("offset", filters.offset.toString());

    const url = `${this.baseUrl}/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
      next: { revalidate: 3600 }, // 1 hour cache
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const dtos: ApiProductDto[] = await response.json();
    return dtos.map(mapDtoToProduct);
  }

  async getById(id: string): Promise<Product | null> {
    const url = `${this.baseUrl}/products/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: this.headers,
      next: { revalidate: 600 }, // 10 minutes cache
    });
    if (response.status === 404) return null;
    if (!response.ok) {
      throw new Error(`Error fetching product ${id}: ${response.statusText}`);
    }

    const dto: ApiProductDto = await response.json();
    console.log(dto);
    return mapDtoToProduct(dto);
  }
}

export const productRepository = new ApiProductRepository();
