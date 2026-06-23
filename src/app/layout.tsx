import type { Metadata } from "next";
import "@/styles/globals.css";
import { CartProvider } from "@/features/checkout/context/CartProvider";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Zara Challenge",
  description: "Simple E-commerce for a challenge",
  icons: { icon: "/favicon.ico" },
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
