"use client";

import { useQuoteCart } from "@/store/quote-cart";
import { buildQuoteMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { useSettings } from "@/components/providers/SettingsProvider";
import { WhatsAppLogo } from "@/components/layout/WhatsAppLogo";

interface WhatsAppQuoteButtonProps {
  className?: string;
  label?: string;
}

export function WhatsAppQuoteButton({
  className = "",
  label = "WhatsApp ile Teklif İste",
}: WhatsAppQuoteButtonProps) {
  const { items } = useQuoteCart();
  const { whatsapp, companyName } = useSettings();

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
      className={`inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-[#20bd5a] hover:shadow-xl ${className}`}
    >
      <WhatsAppLogo size={28} />
      {label}
    </a>
  );
}
