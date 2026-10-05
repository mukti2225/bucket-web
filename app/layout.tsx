import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Florétta — Bunga untuk Setiap Cerita Berharga",
  description: "Florist & gifting premium Indonesia. Rangkaian bunga segar dan hadiah istimewa untuk orang-orang terdekat di setiap momen bermakna.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FFFDFC] text-[#24211F]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

