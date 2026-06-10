"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/layout/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@zaferli.local");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Geçersiz e-posta veya şifre. Şifre: Zaferli2026!");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Bağlantı hatası. Sunucunun çalıştığından emin olun.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ebony px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <Logo size={100} className="mx-auto rounded-full" />
          <h1 className="mt-4 font-display text-2xl font-bold text-ebony">Yönetim Paneli</h1>
          <p className="text-sm text-ebony/60">Zaferli Orman Ürünleri</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-ebony">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-oak focus:outline-none focus:ring-2 focus:ring-oak/20"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-ebony">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Zaferli2026!"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-oak focus:outline-none focus:ring-2 focus:ring-oak/20"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-ebony py-3 font-semibold text-cream transition hover:bg-oak hover:text-ebony disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-ebony/50">
          Varsayılan: admin@zaferli.local / Zaferli2026!
        </p>
      </div>
    </div>
  );
}
