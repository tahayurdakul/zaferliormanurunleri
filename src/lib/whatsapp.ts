import { formatPrice } from "./format";

export interface QuoteItem {
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

export function buildQuoteMessage(
  items: QuoteItem[],
  companyName = "Zaferli Orman Ürünleri"
): string {
  if (items.length === 0) {
    return `Merhaba ${companyName},\n\nÜrünleriniz hakkında bilgi ve teklif almak istiyorum.`;
  }

  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.name} — ${item.quantity} ${item.unit} — ${formatPrice(item.price * item.quantity)}`
  );

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return [
    `Merhaba ${companyName},`,
    "",
    "Teklif talebim:",
    "",
    ...lines,
    "",
    `Ara Toplam: ${formatPrice(total)}`,
    "",
    "Bilgi ve teklif rica ederim.",
  ].join("\n");
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP = "905010300461";
