import { ProductSpecs as ISpecs, Product } from "@/core/entities/product";
import styles from "./ProductSpec.module.css";

interface ProductSpecsProps {
  product: Pick<Product, "brand" | "name" | "description" | "specs">;
}

type CombinedSpecKeys = keyof ISpecs | "brand" | "name" | "description";

const SPEC_LABELS: Record<CombinedSpecKeys, string> = {
  brand: "BRAND",
  name: "NAME",
  description: "DESCRIPTION",
  screen: "SCREEN",
  resolution: "RESOLUTION",
  processor: "PROCESSOR",
  mainCamera: "MAIN CAMERA",
  selfieCamera: "SELFIE CAMERA",
  battery: "BATTERY",
  os: "OS",
  screenRefreshRate: "SCREEN REFRESH RATE",
};
const ProductSpecs: React.FC<ProductSpecsProps> = ({ product }) => {
  const { brand, name, description, specs } = product;
  const specsEntries = Object.entries(specs) as [keyof ISpecs, string][];
  const baseEntries: [CombinedSpecKeys, string][] = [
    ["brand", brand],
    ["name", name],
    ["description", description],
  ];
  const totalSpecs = [...baseEntries, ...specsEntries];
  return (
    <section className={styles["specs-card"]}>
      <h3>SPECIFICATIONS</h3>
      <dl>
        {totalSpecs.map(([key, value]) => {
          const label = SPEC_LABELS[key] || key;
          return (
            <div key={key} className={styles["specs-row"]}>
              <dt className={styles["specs-label"]}>{label}</dt>
              <dd className={styles["specs-value"]}>{value}</dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};

export default ProductSpecs;
