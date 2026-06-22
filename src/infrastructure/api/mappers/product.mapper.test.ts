import { describe, it, expect } from "vitest";
import { mapDtoToProduct } from "./product.mapper";
import { spec } from "node:test/reporters";
import { ApiProductDto } from "../dto/product.dto";

describe("It should map the backend response and convert to a BasicProduct or Product interface", () => {
  it("Happy path, it should correctly map an API DTO to a Product entity", () => {
    const mockGetAllResponse: ApiProductDto = {
      id: "samsung-A25",
      brand: "samsung",
      name: "A25",
      description: "Smarphone A25 description",
      basePrice: 100,
      rating: 2,
      imageUrl: "http//imagen.jpg",
      specs: {
        screen: "amoled",
        resolution: "full hd",
        processor: "qualcomm",
        mainCamera: "48 pixeles",
        selfieCamera: "12 pixeles",
        battery: "5000 mAh",
        os: "ANDROID",
        screenRefreshRate: "60hz",
      },
      colorOptions: [
        {
          name: "blue",
          hexCode: "#340dbe",
          imageUrl: "http//image.jpg",
        },
      ],
      storageOptions: [
        {
          capacity: "12gb",
          price: 200,
        },
      ],
      similarProducts: [
        {
          id: "xiaomi-13",
          brand: "xiaomi",
          name: "xiaomi 13",
          basePrice: 150,
          imageUrl: "http://image.jpg",
        },
      ],
    };

    const result = mapDtoToProduct(mockGetAllResponse);
    expect(result.id).toBe("samsung-A25");
    expect(result.specs.screen).toBe("amoled");
    expect(result.colorOptions).toHaveLength(1);
    expect(result.similarProducts[0].name).toBe("xiaomi 13");
  });

  it("Null or undefined cases, it should provides default values when objects are missing", () => {
    const mockFaillureDto: any = {
      id: "samsung-A25",
      brand: "samsung",
      name: "A25",
      description: "Smarphone A25 description",
      basePrice: 100,
      rating: 2,
      imageUrl: "http//imagen.jpg",
      //missing specs, color and storage options
    };
    const result = mapDtoToProduct(mockFaillureDto);

    expect(result.specs).toEqual({
      screen: "",
      resolution: "",
      processor: "",
      mainCamera: "",
      selfieCamera: "",
      battery: "",
      os: "",
      screenRefreshRate: "",
    });
    expect(result.colorOptions).toEqual([]);
    expect(result.storageOptions).toEqual([]);
    expect(result.similarProducts).toEqual([]);
  });
});
