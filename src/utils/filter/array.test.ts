import { describe, it, expect } from "vitest";
import { removeDuplicates } from "./array";

describe("remove duplicates", () => {
  it("It should remove duplicates objects from a array, default property 'id'", () => {
    const mockProducts = [
      { id: "1", name: "iPhone 15" },
      { id: "2", name: "Samsung Galaxy" },
      { id: "1", name: "iPhone 15" }, // Duplicado
    ];
    const result = removeDuplicates(mockProducts);

    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: "1", name: "iPhone 15" },
      { id: "2", name: "Samsung Galaxy" },
    ]);
  });

  it("It should remove duplicates color by property of name", () => {
    const mockColors = [
      { name: "white", hex: "#ffff" },
      { name: "black", hex: "#0000" },
      { name: "red", hex: "#ce3535" },
      { name: "white", hex: "#ffff" }, // Duplicado
    ];

    const result = removeDuplicates(mockColors, "name");
    expect(result).toHaveLength(3);
    expect(result).toEqual([
      { name: "white", hex: "#ffff" },
      { name: "black", hex: "#0000" },
      { name: "red", hex: "#ce3535" },
    ]);
  });
});
