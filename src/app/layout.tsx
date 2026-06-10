import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { FooterWrapper } from "@/components/layout/FooterWrapper";
import { CartProvider } from "@/components/providers/CartProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zaferli Orman Ürünleri | Kereste ve Orman Ürünleri",
  description:
    "Zaferli Orman Ürünleri - Kereste, kontrplak, OSB ve inşaat ahşabı tedarikçisi. WhatsApp ile anında teklif alın.",
  icons: {
    icon: "/zaferli.jpg",
    apple: "/zaferli.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <SessionProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <FooterWrapper />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
