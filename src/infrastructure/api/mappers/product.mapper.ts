import { Product, SimilarProduct } from "@/core/entities/product";
import { ApiProductDto } from "../dto/product.dto";

export function mapDtoToProduct(dto: ApiProductDto): Product {
  return {
    id: dto.id,
    brand: dto.brand,
    name: dto.name,
    description: dto.description ?? "",
    basePrice: dto.basePrice,
    rating: dto.rating,
    imageUrl: dto.imageUrl,
    specs: {
      screen: dto.specs?.screen ?? "",
      resolution: dto.specs?.resolution ?? "",
      processor: dto.specs?.processor ?? "",
      mainCamera: dto.specs?.mainCamera ?? "",
      selfieCamera: dto.specs?.selfieCamera ?? "",
      battery: dto.specs?.battery ?? "",
      os: dto.specs?.os ?? "",
      screenRefreshRate: dto.specs?.screenRefreshRate ?? "",
    },
    colorOptions:
      dto.colorOptions?.map((color) => ({
        name: color.name,
        hexCode: color.hexCode,
        imageUrl: color.imageUrl,
      })) ?? [],
    storageOptions:
      dto.storageOptions?.map((storage) => ({
        capacity: storage.capacity,
        price: storage.price,
      })) ?? [],
    similarProducts: dto.similarProducts?.map(mapSimilarDtoToEntity) ?? [],
  };
}

function mapSimilarDtoToEntity(dto: any): SimilarProduct {
  return {
    id: dto.id,
    brand: dto.brand,
    name: dto.name,
    basePrice: dto.basePrice,
    imageUrl: dto.imageUrl,
  };
}
