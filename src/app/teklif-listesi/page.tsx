"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useQuoteCart } from "@/store/quote-cart";
import { formatPrice } from "@/lib/format";
import { WhatsAppQuoteButton } from "@/components/cart/WhatsAppQuoteButton";

export default function QuoteListPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useQuoteCart();

  return (
    <div className="wood-texture min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-ebony">Teklif Listem</h1>
        <p className="mt-2 text-ebony/60">
          Ürünlerinizi kontrol edin ve WhatsApp ile teklif isteyin
        </p>

        {items.length === 0 ? (
          <div className="mt-16 rounded-3xl bg-white p-12 text-center shadow-md">
            <p className="text-lg text-ebony/60">Teklif listeniz boş.</p>
            <Link
              href="/urunler"
              className="mt-6 inline-block rounded-full bg-oak px-8 py-3 font-semibold text-ebony"
            >
              Ürünlere Göz Atın
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                    {item.imageUrl ? (
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl">🪵</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Link href={`/urun/${item.slug}`} className="font-semibold text-ebony hover:text-oak">
                      {item.name}
                    </Link>
                    <p className="text-sm text-oak">
                      {formatPrice(item.price)} / {item.unit}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded bg-cream p-1.5 hover:bg-oak/20"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded bg-cream p-1.5 hover:bg-oak/20"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl font-bold text-oak">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl bg-ebony p-8 text-cream">
              <div className="flex items-center justify-between">
                <span className="text-lg">Toplam Tutar</span>
                <span className="font-display text-3xl font-bold text-oak">
                  {formatPrice(totalPrice())}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <WhatsAppQuoteButton className="flex-1" />
                <button
                  onClick={clearCart}
                  className="rounded-full border border-cream/30 px-6 py-4 text-sm transition hover:bg-cream/10"
                >
                  Listeyi Temizle
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
