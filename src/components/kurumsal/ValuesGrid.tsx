"use client";

import { TreePine, Award, Users } from "lucide-react";

export function ValuesGrid() {
  return (
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl bg-white p-6 text-center shadow-md">
        <TreePine className="mx-auto mb-4 text-forest" size={36} />
        <h3 className="font-display text-lg font-semibold">Doğal Ürünler</h3>
        <p className="mt-2 text-sm text-ebony/60">Sürdürülebilir orman kaynaklarından temin</p>
      </div>
      <div className="rounded-2xl bg-white p-6 text-center shadow-md">
        <Award className="mx-auto mb-4 text-oak" size={36} />
        <h3 className="font-display text-lg font-semibold">Kalite Odaklı</h3>
        <p className="mt-2 text-sm text-ebony/60">Her ürün titizlikle seçilir ve kontrol edilir</p>
      </div>
      <div className="rounded-2xl bg-white p-6 text-center shadow-md">
        <Users className="mx-auto mb-4 text-walnut" size={36} />
        <h3 className="font-display text-lg font-semibold">Müşteri Memnuniyeti</h3>
        <p className="mt-2 text-sm text-ebony/60">WhatsApp ile hızlı iletişim ve teklif</p>
      </div>
    </div>
  );
}
