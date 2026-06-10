"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { WhatsAppLogo } from "@/components/layout/WhatsAppLogo";

interface ContactCardsProps {
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  whatsappUrl: string;
}

export function ContactCards({
  address,
  phone,
  email,
  workingHours,
  whatsappUrl,
}: ContactCardsProps) {
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md">
          <MapPin className="shrink-0 text-oak" size={24} />
          <div>
            <h3 className="font-semibold">Adres</h3>
            <p className="mt-1 text-ebony/70">{address}</p>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md">
          <Phone className="shrink-0 text-oak" size={24} />
          <div>
            <h3 className="font-semibold">Telefon</h3>
            <a href={`tel:${phone}`} className="mt-1 text-oak hover:underline">{phone}</a>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md">
          <Mail className="shrink-0 text-oak" size={24} />
          <div>
            <h3 className="font-semibold">E-posta</h3>
            <a href={`mailto:${email}`} className="mt-1 text-oak hover:underline">{email}</a>
          </div>
        </div>
        <div className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-md">
          <Clock className="shrink-0 text-oak" size={24} />
          <div>
            <h3 className="font-semibold">Çalışma Saatleri</h3>
            <p className="mt-1 text-ebony/70">{workingHours}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-ebony p-8 text-cream">
        <h2 className="font-display text-2xl font-bold">WhatsApp ile Ulaşın</h2>
        <p className="mt-4 text-cream/70">
          Ürünler hakkında bilgi almak veya teklif istemek için WhatsApp üzerinden
          bize yazabilirsiniz.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 font-semibold text-white transition hover:bg-[#20bd5a]"
        >
          <WhatsAppLogo size={24} />
          WhatsApp&apos;a Yaz
        </a>
      </div>
    </div>
  );
}
