import CartView from "@/features/checkout/view/cartView";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tu Carrito | Zara Challenge",
  robots: {
    index: false,
    follow: false,
  },
};

const CartPage = () => {
  return <CartView />;
};

export default CartPage;
