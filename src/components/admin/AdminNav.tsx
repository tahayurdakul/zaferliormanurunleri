"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Package, FolderOpen, Settings, LogOut, ExternalLink } from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/kategoriler", label: "Kategoriler", icon: FolderOpen },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-full w-64 flex-col bg-ebony text-cream">
      <div className="border-b border-oak/20 p-6">
        <h1 className="font-display text-xl font-bold">Zaferli Admin</h1>
        <p className="text-xs text-oak">Yönetim Paneli</p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition ${
                active ? "bg-oak text-ebony font-semibold" : "hover:bg-oak/20"
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-oak/20 p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm hover:bg-oak/20"
        >
          <ExternalLink size={18} />
          Siteyi Görüntüle
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin" })}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-300 hover:bg-red-900/30"
        >
          <LogOut size={18} />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
