"use client";

import { Shield, Truck, MessageCircle } from "lucide-react";

export function TrustBand({ phone }: { phone?: string }) {
  return (
    <section className="bg-ebony py-16 text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 lg:px-8">
        <div className="text-center">
          <Shield className="mx-auto mb-4 text-oak" size={40} />
          <h3 className="font-display text-xl font-semibold">Kalite Garantisi</h3>
          <p className="mt-2 text-sm text-cream/70">Birinci sınıf kereste ve orman ürünleri</p>
        </div>
        <div className="text-center">
          <Truck className="mx-auto mb-4 text-oak" size={40} />
          <h3 className="font-display text-xl font-semibold">Hızlı Teslimat</h3>
          <p className="mt-2 text-sm text-cream/70">Siparişleriniz en kısa sürede kapınızda</p>
        </div>
        <div className="text-center">
          <MessageCircle className="mx-auto mb-4 text-oak" size={40} />
          <h3 className="font-display text-xl font-semibold">WhatsApp Teklif</h3>
          <p className="mt-2 text-sm text-cream/70">
            {phone || "05010300461"} numarasına anında teklif gönderin
          </p>
        </div>
      </div>
    </section>
  );
}
