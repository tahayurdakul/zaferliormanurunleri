import { AdminShell } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import { Package, FolderOpen, Eye } from "lucide-react";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, activeProducts] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({ where: { active: true } }),
  ]);

  const stats = [
    { label: "Toplam Ürün", value: productCount, icon: Package, color: "bg-oak" },
    { label: "Kategoriler", value: categoryCount, icon: FolderOpen, color: "bg-forest" },
    { label: "Aktif Ürünler", value: activeProducts, icon: Eye, color: "bg-walnut" },
  ];

  return (
    <AdminShell>
      <h1 className="text-2xl font-bold text-ebony">Dashboard</h1>
      <p className="mt-1 text-ebony/60">Zaferli Orman Ürünleri yönetim paneline hoş geldiniz.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-xl bg-white p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ebony/60">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-ebony">{stat.value}</p>
                </div>
                <div className={`rounded-xl ${stat.color} p-3 text-cream`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-md">
        <h2 className="font-semibold text-ebony">Hızlı Başlangıç</h2>
        <ul className="mt-4 space-y-2 text-sm text-ebony/70">
          <li>• Ürün eklemek için <strong>Ürünler</strong> sayfasına gidin</li>
          <li>• Kategori düzenlemek için <strong>Kategoriler</strong> sayfasını kullanın</li>
          <li>• İletişim bilgilerini <strong>Ayarlar</strong> sayfasından güncelleyin</li>
          <li>• Müşteriler teklif listesini WhatsApp ile <strong>05010300461</strong> numarasına gönderir</li>
        </ul>
      </div>
    </AdminShell>
  );
}
