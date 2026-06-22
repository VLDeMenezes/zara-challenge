"use client";
import Link from "next/link";
import styles from "./CartButton.module.css";
import { useCart } from "../../hook/useCart";
import Image from "next/image";
import { usePathname } from "next/navigation";
const CartButton: React.FC = () => {
  const pathname = usePathname();
  const { totals } = useCart();
  if (pathname === "/cart") {
    return null;
  }
  const hasItems = totals.itemsCount > 0;
  const cartIconSrc = hasItems ? "/bag-active.svg" : "/bag-inactive.svg";
  const ariaLabelText = hasItems
    ? `View cart, ${totals.itemsCount} ${totals.itemsCount === 1 ? "item" : "items"}`
    : "View empty cart";
  return (
    <Link
      href="/cart"
      className={styles["cart-button"]}
      aria-label={ariaLabelText}
    >
      <Image src={cartIconSrc} alt="" width={24} height={24} priority />
      <span aria-hidden="true">{totals.itemsCount}</span>
    </Link>
  );
};

export default CartButton;
