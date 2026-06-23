import Image from "next/image";
import styles from "./CartItem.module.css";
import { useCart } from "../../hook/useCart";
import Button from "@/components/button/Button";
import { CartItem as CartItemType } from "@/core/entities/cart";
import QuantitySelector from "./components/QuantitySelector";
interface CartItemProps {
  cart: CartItemType;
}
const CartItem: React.FC<CartItemProps> = ({ cart }) => {
  const { removeFromCart } = useCart();
  const { product, selectedColor, selectedStorage, quantity } = cart;
  return (
    <article className={styles["product-card"]}>
      <Image
        src={selectedColor.imageUrl || "/placeholder.png"}
        alt={`Smartphone ${product.name}`}
        style={{ objectFit: "contain" }}
        width={312}
        height={257}
      />
      <div className={styles["product-card__info-delete-wrapper"]}>
        <div className={styles["product-card__info-delete-wrapper--info"]}>
          <div>
            <h3>{product.name}</h3>
            <span>
              {selectedStorage.capacity} | {selectedColor.name}
            </span>
          </div>

          <span>
            {selectedStorage.price} EUR {quantity > 1 && "c/u"}
          </span>
        </div>
        <div className={styles["product-cart__action-wrapper"]}>
          <Button
            aria-label={`Remove ${product.name} from the color ${selectedColor.name} and ${selectedStorage.capacity} from the cart`}
            variant="destroy"
            onClick={() => removeFromCart(product.id, selectedColor, selectedStorage)}
          >
            <span aria-hidden="true">Eliminar</span>
          </Button>
          <QuantitySelector cart={cart} />
        </div>
      </div>
    </article>
  );
};

export default CartItem;
