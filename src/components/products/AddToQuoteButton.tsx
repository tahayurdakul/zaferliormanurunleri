"use client";

import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { useQuoteCart } from "@/store/quote-cart";

interface AddToQuoteButtonProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    unit: string;
    imageUrl?: string | null;
  };
}

export function AddToQuoteButton({ product }: AddToQuoteButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useQuoteCart();

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-md">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="rounded-lg bg-cream p-2 hover:bg-oak/20"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="rounded-lg bg-cream p-2 hover:bg-oak/20"
        >
          <Plus size={16} />
        </button>
        <span className="text-sm text-ebony/60">{product.unit}</span>
      </div>

      <button
        onClick={handleAdd}
        className={`flex flex-1 items-center justify-center gap-2 rounded-full py-4 font-semibold transition ${
          added
            ? "bg-forest text-cream"
            : "bg-ebony text-cream hover:bg-oak hover:text-ebony"
        }`}
      >
        {added ? (
          <>
            <Check size={20} />
            Eklendi!
          </>
        ) : (
          <>
            <Plus size={20} />
            Teklif Listesine Ekle
          </>
        )}
      </button>
    </div>
  );
}
