"use client";

import { buildQuoteMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { useQuoteCart } from "@/store/quote-cart";
import { usePathname } from "next/navigation";
import { useSettings } from "@/components/providers/SettingsProvider";
import { WhatsAppLogo } from "./WhatsAppLogo";

export function WhatsAppFab() {
  const pathname = usePathname();
  const { items } = useQuoteCart();
  const { whatsapp, companyName } = useSettings();

  if (pathname.startsWith("/admin")) return null;

  const message = buildQuoteMessage(
    items.map((i) => ({
      name: i.name,
      quantity: i.quantity,
      unit: i.unit,
      price: i.price,
    })),
    companyName
  );

  const url = buildWhatsAppUrl(whatsapp, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-breathe fixed bottom-6 right-6 z-50 flex h-[84px] w-[84px] items-center justify-center transition hover:scale-105"
      aria-label="WhatsApp ile iletişim"
    >
      <WhatsAppLogo size={84} />
    </a>
  );
}
