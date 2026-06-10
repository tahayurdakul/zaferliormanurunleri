"use client";

import { X, Plus, Minus, Trash2 } from "lucide-react";
import { WhatsAppLogo } from "@/components/layout/WhatsAppLogo";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useQuoteCart } from "@/store/quote-cart";
import { formatPrice } from "@/lib/format";
import { buildQuoteMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { useSettings } from "@/components/providers/SettingsProvider";

export function QuoteDrawer() {
  const {
    items,
    isOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    totalPrice,
  } = useQuoteCart();
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
  const whatsappUrl = buildWhatsAppUrl(whatsapp, message);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ebony/50 backdrop-blur-sm"
            onClick={closeDrawer}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-oak/20 px-6 py-4">
              <h2 className="font-display text-xl font-bold text-ebony">Teklif Listem</h2>
              <button onClick={closeDrawer} className="text-ebony/60 hover:text-ebony">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-ebony/60">Teklif listeniz boş.</p>
                  <Link
                    href="/urunler"
                    onClick={closeDrawer}
                    className="mt-4 text-oak underline"
                  >
                    Ürünlere göz atın
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 rounded-xl bg-white p-3 shadow-sm">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-2xl">🪵</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-ebony line-clamp-2">{item.name}</p>
                        <p className="text-xs text-oak">{formatPrice(item.price)} / {item.unit}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded bg-cream p-1 hover:bg-oak/20"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded bg-cream p-1 hover:bg-oak/20"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-bold text-ebony">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-oak/20 px-6 py-4">
                <div className="mb-4 flex justify-between">
                  <span className="font-medium">Toplam</span>
                  <span className="font-display text-xl font-bold text-oak">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-semibold text-white transition hover:bg-[#20bd5a]"
                >
                  <WhatsAppLogo size={24} />
                  WhatsApp ile Teklif İste
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
