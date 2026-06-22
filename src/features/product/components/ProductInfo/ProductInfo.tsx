"use client";
import { ColorOption, Product, StorageOption } from "@/core/entities/product";
import Image from "next/image";
import styles from "./ProductInfo.module.css";
import { useState } from "react";
import { StoragePicker } from "./components/StoragePicker";
import { ColorPicker } from "./components/ColorPicker";
import Button from "@/components/button/Button";
import { useCart } from "@/features/checkout/hook/useCart";
import { useRouter } from "next/navigation";
import { removeDuplicates } from "@/utils/filter/array";
interface ProductInfoProps {
  product: Product;
}
const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const { addToCart } = useCart();
  const router = useRouter();
  const { name, colorOptions, storageOptions, brand } = product;
  const uniqueColors = removeDuplicates(colorOptions, "name");
  const cheapestStorage = storageOptions.reduce(
    (min, option) => (option.price < min.price ? option : min),
    storageOptions[0],
  );

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(
    uniqueColors[0] || null,
  );
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(
    null,
  );
  const displayedPrice = selectedStorage
    ? selectedStorage.price
    : cheapestStorage.price;
  const isReady = selectedColor != null && selectedStorage != null;
  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;

    addToCart({
      product,
      quantity: 1,
      selectedColor: selectedColor,
      selectedStorage: selectedStorage,
    });
    router.push("/cart");
  };
  return (
    <section className={styles["product-card"]}>
      <div className={styles["product-card__image-wrapper"]}>
        <Image
          src={selectedColor?.imageUrl || "/placeholder.png"}
          alt={`Imagen del producto ${brand} - ${name}`}
          style={{ objectFit: "contain" }}
          width={510}
          height={630}
        />
      </div>
      <div className={styles["product-card__info-wrapper"]}>
        <div>
          <h2>{name}</h2>
          <span>From {displayedPrice} EUR</span>
        </div>
        <StoragePicker
          options={storageOptions}
          selectedStorage={selectedStorage}
          onSelectStorage={setSelectedStorage}
        />
        <ColorPicker
          options={uniqueColors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
        <Button
          aria-label={`Add the ${selectedColor?.name} ${name} - ${brand} with ${selectedStorage?.capacity} `}
          onClick={handleAddToCart}
          disabled={!isReady}
          extraHeight
        >
          <span>Añadir</span>
        </Button>
      </div>
    </section>
  );
};

export default ProductInfo;
