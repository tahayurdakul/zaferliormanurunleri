"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PublicSettings {
  companyName: string;
  whatsapp: string;
  phone: string;
}

const defaultSettings: PublicSettings = {
  companyName: "Zaferli Orman Ürünleri",
  whatsapp: "905010300461",
  phone: "05010300461",
};

const SettingsContext = createContext<PublicSettings>(defaultSettings);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PublicSettings>(defaultSettings);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setSettings({
            companyName: data.companyName || defaultSettings.companyName,
            whatsapp: data.whatsapp || defaultSettings.whatsapp,
            phone: data.phone || defaultSettings.phone,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
