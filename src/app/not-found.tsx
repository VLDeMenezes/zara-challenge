import Button from "@/components/button/Button";
import Link from "next/link";
import styles from "@/styles/page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página no encontrada (404) | Zara Challenge",
  description:
    "Lo sentimos, el producto o la página que buscas no está disponible en este momento.",
};
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
