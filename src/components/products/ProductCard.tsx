"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useQuoteCart } from "@/store/quote-cart";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  imageUrl?: string | null;
  categoryName?: string;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  unit,
  imageUrl,
  categoryName,
}: ProductCardProps) {
  const { addItem } = useQuoteCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ id, name, slug, price, unit, imageUrl });
  };

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/urun/${slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-cream">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover transition group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-cream to-oak/20">
              <span className="text-5xl">🪵</span>
            </div>
          )}
          {categoryName && (
            <span className="absolute left-3 top-3 rounded-full bg-ebony/80 px-3 py-1 text-xs text-cream backdrop-blur">
              {categoryName}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/urun/${slug}`}>
          <h3 className="font-medium text-ebony line-clamp-2 hover:text-oak">{name}</h3>
        </Link>
        <p className="mt-1 font-display text-lg font-bold text-oak">
          {formatPrice(price)} <span className="text-sm font-normal text-ebony/60">/ {unit}</span>
        </p>
        <button
          onClick={handleAdd}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-ebony py-2.5 text-sm font-semibold text-cream transition hover:bg-oak hover:text-ebony"
        >
          <Plus size={16} />
          Teklif Listesine Ekle
        </button>
      </div>
    </div>
  );
}
