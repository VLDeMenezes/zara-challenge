import Button from "@/components/button/Button";
import Link from "next/link";
import styles from "@/styles/page.module.css";
const NotFound: React.FC = () => {
  return (
    <main className={styles["page"]}>
      <section className={styles["main"]}>
        <h2>Lo sentimos mucho pero hubo un error!</h2>
        <Link href={"/"}>
          <Button aria-label="Return to the store's homepage">
            <span>Volver al Inicio</span>
          </Button>
        </Link>
      </section>
    </main>
  );
};

export default NotFound;
