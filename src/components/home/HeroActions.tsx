"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function HeroActions() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Link
        href="/urunler"
        className="inline-flex items-center gap-2 rounded-full bg-oak px-8 py-4 font-semibold text-ebony transition hover:bg-oak/90"
      >
        Ürünleri Keşfet
        <ArrowRight size={18} />
      </Link>
      <Link
        href="/teklif-listesi"
        className="inline-flex items-center gap-2 rounded-full border-2 border-cream/40 px-8 py-4 font-semibold text-cream transition hover:bg-cream/10"
      >
        <MessageCircle size={18} />
        Teklif Listesi
      </Link>
    </div>
  );
}
