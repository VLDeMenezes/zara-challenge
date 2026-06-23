import { CartItem } from "@/core/entities/cart";
import styles from "./QuantitySelector.module.css";
import { useCart } from "@/features/checkout/hook/useCart";
interface QuantitySelectorProps {
  cart: CartItem;
}
const QuantitySelector: React.FC<QuantitySelectorProps> = ({ cart }) => {
  const { product, selectedColor, selectedStorage, quantity } = cart;
  const { updateQuantity } = useCart();

  return (
    <div className={styles["quantity-selector"]} aria-label="Selector de cantidad">
      <button
        type="button"
        disabled={quantity <= 1}
        aria-label="Disminuir cantidad"
        onClick={() => updateQuantity(product.id, selectedColor, selectedStorage, -1)}
      >
        -
      </button>

      <span aria-live="polite" className={styles["quantity-value"]}>
        {quantity}
      </span>

      <button
        type="button"
        aria-label="Aumentar cantidad"
        onClick={() => updateQuantity(product.id, selectedColor, selectedStorage, 1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
