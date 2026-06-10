import { getSiteSettings } from "@/lib/data";
import { buildQuoteMessage, buildWhatsAppUrl, DEFAULT_WHATSAPP } from "@/lib/whatsapp";
import { ContactCards } from "@/components/iletisim/ContactCards";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const message = buildQuoteMessage([]);
  const whatsappUrl = buildWhatsAppUrl(settings?.whatsapp || DEFAULT_WHATSAPP, message);

  return (
    <div className="wood-texture min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-ebony">İletişim</h1>
        <p className="mt-2 text-ebony/60">Bize ulaşın, size yardımcı olalım</p>

        <ContactCards
          address={settings?.address || "Adres bilgisi yakında eklenecek"}
          phone={settings?.phone || "05010300461"}
          email={settings?.email || "yusufbaraktars@icloud.com"}
          workingHours={settings?.workingHours || "Pazartesi - Cumartesi: 08:00 - 18:00"}
          whatsappUrl={whatsappUrl}
        />
      </div>
    </div>
  );
}
