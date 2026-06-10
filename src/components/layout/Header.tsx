"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ClipboardList, Menu, X } from "lucide-react";
import { useState } from "react";
import { useQuoteCart } from "@/store/quote-cart";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openDrawer } = useQuoteCart();
  const count = totalItems();

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 bg-ebony/95 backdrop-blur-md text-cream shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        <Link href="/" className="flex items-center">
          <Logo size={64} className="rounded-full" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={true}
              className={`text-sm font-medium transition-colors hover:text-oak ${
                pathname === link.href ? "text-oak" : "text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openDrawer}
            className="relative flex items-center gap-2 rounded-full bg-oak px-4 py-2 text-sm font-semibold text-ebony transition hover:bg-oak/90"
          >
            <ClipboardList size={18} />
            <span className="hidden sm:inline">Teklif Listem</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-xs font-bold text-cream">
                {count}
              </span>
            )}
          </button>

          <button
            className="md:hidden text-cream"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menü"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-oak/20 px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-cream hover:text-oak"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
