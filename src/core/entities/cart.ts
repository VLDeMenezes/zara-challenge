import { ColorOption, Product, StorageOption } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ColorOption;
  selectedStorage: StorageOption;
}
