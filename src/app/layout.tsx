import type { Metadata } from "next";
import "@/styles/globals.css";
import { CartProvider } from "@/features/checkout/context/CartProvider";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Zara Challange",
  description: "Simple E-commerce for a challange",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
