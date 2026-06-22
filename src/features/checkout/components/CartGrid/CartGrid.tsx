import { CartItem as CartItemType } from "@/core/entities/cart";
import CartItem from "../CartItem/CartItem";
import styles from "./CartGrid.module.css";
interface CartGridProps {
  cart: CartItemType[];
}
const CartGrid: React.FC<CartGridProps> = ({ cart }) => {
  return (
    <section className={styles["cart-grid"]} aria-label="Cart list">
      <ul>
        {cart.map((item) => (
          <li key={item.product.id}>
            <CartItem cart={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CartGrid;
