"use client";
import CartGrid from "@/features/checkout/components/CartGrid/CartGrid";
import FooterCheckout from "@/features/checkout/components/FooterCheckout/FooterCheckout";
import { useCart } from "@/features/checkout/hook/useCart";
import styles from "@/styles/page.module.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tu Carrito | Zara Challenge",
  robots: {
    index: false,
    follow: false,
  },
};
const CartProduct: React.FC = () => {
  const { cart, totals } = useCart();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h2>Cart ({totals.itemsCount})</h2>
        <CartGrid cart={cart} />
      </main>
      <FooterCheckout />
    </div>
  );
};

export default CartProduct;
