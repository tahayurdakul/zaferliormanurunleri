"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

interface Settings {
  companyName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  workingHours: string;
  aboutText: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    companyName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    workingHours: "",
    aboutText: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-ebony">Site Ayarları</h1>
      <p className="mt-1 text-ebony/60">İletişim bilgileri ve genel ayarlar</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-4 rounded-xl bg-white p-6 shadow-md">
        <div>
          <label className="mb-1 block text-sm font-medium">Şirket Adı</label>
          <input
            value={settings.companyName}
            onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium">Telefon</label>
            <input
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">WhatsApp (uluslararası format)</label>
            <input
              value={settings.whatsapp}
              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full rounded-lg border px-4 py-2"
              placeholder="905010300461"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">E-posta</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Adres</label>
          <textarea
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
            rows={2}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Çalışma Saatleri</label>
          <input
            value={settings.workingHours}
            onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Hakkımızda Metni</label>
          <textarea
            value={settings.aboutText}
            onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
            className="w-full rounded-lg border px-4 py-2"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-ebony px-8 py-3 font-semibold text-cream hover:bg-oak hover:text-ebony"
        >
          Kaydet
        </button>
        {saved && <span className="ml-4 text-sm text-green-600">Kaydedildi!</span>}
      </form>
    </AdminShell>
  );
}
