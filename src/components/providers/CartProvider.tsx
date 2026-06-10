"use client";

import { QuoteDrawer } from "@/components/cart/QuoteDrawer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SettingsProvider } from "./SettingsProvider";

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      {children}
      <QuoteDrawer />
      <WhatsAppFab />
    </SettingsProvider>
  );
}
