"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

interface FooterProps {
  settings?: {
    companyName?: string;
    address?: string;
    phone?: string;
    email?: string;
    workingHours?: string;
  } | null;
}

export function Footer({ settings }: FooterProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-ebony text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-1">
          <Logo size={96} className="rounded-full" />
          <p className="mt-4 text-sm text-cream/70">
            Kaliteli kereste ve orman ürünleri tedarikçiniz.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-oak">Hızlı Linkler</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/urunler" className="hover:text-oak">Ürünler</Link></li>
            <li><Link href="/kurumsal" className="hover:text-oak">Kurumsal</Link></li>
            <li><Link href="/iletisim" className="hover:text-oak">İletişim</Link></li>
            <li><Link href="/teklif-listesi" className="hover:text-oak">Teklif Listesi</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-oak">Bize Ulaşın</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-oak" />
              <span>{settings?.address || "Adres bilgisi yakında eklenecek"}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-oak" />
              <a href={`tel:${settings?.phone}`} className="hover:text-oak">{settings?.phone || "05010300461"}</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-oak" />
              <a href={`mailto:${settings?.email}`} className="hover:text-oak">{settings?.email || "yusufbaraktars@icloud.com"}</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-oak" />
              <span>{settings?.workingHours || "Pazartesi - Cumartesi: 08:00 - 18:00"}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-lg font-semibold text-oak">Teklif Alın</h3>
          <p className="text-sm text-cream/70">
            Ürünleri teklif listenize ekleyin ve WhatsApp üzerinden anında teklif isteyin.
          </p>
          <Link
            href="/teklif-listesi"
            className="mt-4 inline-block rounded-full bg-oak px-6 py-2.5 text-sm font-semibold text-ebony transition hover:bg-oak/90"
          >
            Teklif Listeme Git
          </Link>
        </div>
      </div>

      <div className="border-t border-oak/20 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {settings?.companyName || "Zaferli Orman Ürünleri"}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
