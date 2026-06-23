import { CartItem as CartItemType } from "@/core/entities/cart";
import CartItem from "../CartItem/CartItem";
import styles from "./CartGrid.module.css";
interface CartGridProps {
  cart: CartItemType[];
}
const CartGrid: React.FC<CartGridProps> = ({ cart }) => {
  if (cart.length < 1)
    return (
      <section aria-label="Cart list">
        <span>
          It looks like you don&apos;t have any items yet, you can explore them in the
          catalog!
        </span>
      </section>
    );

  return (
    <section aria-label="Cart list">
      <ul className={styles["cart-grid"]}>
        {cart.map((item) => {
          const uniqueVariantKey = `${item.product.id}-${item.selectedColor.name}-${item.selectedStorage.capacity}`;
          return (
            <li key={uniqueVariantKey}>
              <CartItem cart={item} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CartGrid;
