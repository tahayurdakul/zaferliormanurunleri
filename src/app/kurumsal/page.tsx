import { getSiteSettings } from "@/lib/data";
import { ValuesGrid } from "@/components/kurumsal/ValuesGrid";

export default async function CorporatePage() {
  const settings = await getSiteSettings();

  return (
    <div className="wood-texture min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-ebony">Kurumsal</h1>
        <p className="mt-2 text-ebony/60">{settings?.companyName}</p>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-md lg:p-12">
          <p className="text-lg leading-relaxed text-ebony/80">
            {settings?.aboutText ||
              "Zaferli Orman Ürünleri olarak yılların deneyimiyle kereste ve orman ürünleri tedarikinde güvenilir çözüm ortağınızız."}
          </p>
        </div>

        <ValuesGrid />
      </div>
    </div>
  );
}
