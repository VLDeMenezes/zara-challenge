"use client";
import Button from "@/components/button/Button";
import styles from "./FooterCheckout.module.css";
import { useCart } from "../../hook/useCart";
import Link from "next/link";
import { useRouter } from "next/navigation";
const FooterCheckout: React.FC = () => {
  const { totals, clearCart } = useCart();
  const router = useRouter();
  const handlePay = () => {
    clearCart();
    router.push("/");
  };
  return (
    <footer className={styles["footer"]}>
      <Link href={"/"}>
        <Button aria-label="Continue shopping" variant="secondary" extraHeight>
          <span>CONTINUE SHOPPING</span>
        </Button>
      </Link>
      {totals.itemsCount > 0 && (
        <div className={styles["footer__row-wrapper"]}>
          <span>TOTAL {totals.subtotal} EUR</span>
          <Button
            aria-label="Continue to checkout"
            disabled={totals.itemsCount === 0}
            onClick={handlePay}
            extraHeight
          >
            <span>PAY</span>
          </Button>
        </div>
      )}
    </footer>
  );
};

export default FooterCheckout;
