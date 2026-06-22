import CartButton from "@/features/checkout/components/CartButton/CartButton";
import styles from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";
const Header: React.FC = () => {
  return (
    <header className={styles["header-section"]}>
      <Link href="/" aria-label="Return to the store's homepage">
        <Image src="/brand.svg" alt="" width={74} height={24} priority />
      </Link>
      <CartButton />
    </header>
  );
};

export default Header;
