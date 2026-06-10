const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const categories = [
  { name: "Kereste & Tomruk", slug: "kereste-tomruk", icon: "🪵", sortOrder: 1 },
  { name: "Kontrplak & Plywood", slug: "kontrplak-plywood", icon: "📐", sortOrder: 2 },
  { name: "OSB & Sunta", slug: "osb-sunta", icon: "🧱", sortOrder: 3 },
  { name: "Lambri & Döşeme", slug: "lambri-doseme", icon: "🏠", sortOrder: 4 },
  { name: "İnşaat Ahşabı", slug: "insaat-ahsabi", icon: "🔨", sortOrder: 5 },
  { name: "Yalıtım & Aksesuar", slug: "yalitim-aksesuar", icon: "🛠️", sortOrder: 6 },
];

const products = [
  { name: "Çam Kereste 10x10cm (4m)", slug: "cam-kereste-10x10", description: "Birinci sınıf çam kereste, inşaat ve çatı işlerinde kullanıma uygun.", price: 400, unit: "ADET", featured: true, categorySlug: "kereste-tomruk" },
  { name: "Kayın Kereste 5x15cm (3m)", slug: "kayin-kereste-5x15", description: "Dayanıklı kayın kereste, mobilya ve iç mekan uygulamaları için ideal.", price: 320, unit: "ADET", featured: true, categorySlug: "kereste-tomruk" },
  { name: "Huş Kontrplak 18mm", slug: "hus-kontrplak-18mm", description: "Su geçirmez huş kontrplak, kalıp ve mobilya üretiminde tercih edilir.", price: 1850, unit: "ADET", featured: true, categorySlug: "kontrplak-plywood" },
  { name: "Plywood 11 Katman", slug: "plywood-11-katman", description: "Yüksek mukavemetli 11 katman plywood, zemin ve duvar kaplamalarında kullanılır.", price: 2850, unit: "ADET", featured: true, categorySlug: "kontrplak-plywood" },
  { name: "OSB 11mm", slug: "osb-11mm", description: "Standart OSB levha, çatı ve duvar kaplama uygulamaları için.", price: 675, unit: "ADET", featured: true, categorySlug: "osb-sunta" },
  { name: "Bordex", slug: "bordex", description: "Yüksek yoğunluklu bordex levha, zemin altı uygulamalarında kullanılır.", price: 675, unit: "ADET", featured: false, categorySlug: "osb-sunta" },
  { name: "Lambri 12.5cm", slug: "lambri-12-5cm", description: "Dekoratif ahşap lambri, iç mekan duvar kaplamaları için.", price: 95, unit: "METRE", featured: true, categorySlug: "lambri-doseme" },
  { name: "Deck Döşeme Ahşabı", slug: "deck-doseme-ahsabi", description: "Dış mekan deck döşeme için özel işlenmiş ahşap.", price: 450, unit: "M2", featured: false, categorySlug: "lambri-doseme" },
  { name: "Kalıp Tahtası 25mm", slug: "kalip-tahtasi-25mm", description: "Beton kalıp işlerinde kullanılan standart kalıp tahtası.", price: 280, unit: "ADET", featured: false, categorySlug: "insaat-ahsabi" },
  { name: "Ahşap Çatı Merdiveni", slug: "ahsap-cati-merdiveni", description: "Çatı çıkışı için dayanıklı ahşap merdiven.", price: 8500, unit: "ADET", featured: true, categorySlug: "insaat-ahsabi" },
  { name: "Taş Yünü 150x5", slug: "tas-yunu-150x5", description: "Isı ve ses yalıtımı için taş yünü levha.", price: 450, unit: "M2", featured: false, categorySlug: "yalitim-aksesuar" },
  { name: "Çivi-Vida Seti (1000'li)", slug: "civi-vida-seti", description: "Ahşap montaj işleri için karışık çivi ve vida seti.", price: 350, unit: "PAKET", featured: false, categorySlug: "yalitim-aksesuar" },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.siteSettings.deleteMany();
  await prisma.adminUser.deleteMany();

  const categoryMap = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.slug] = created.id;
  }

  for (const product of products) {
    const { categorySlug, ...data } = product;
    await prisma.product.create({
      data: { ...data, categoryId: categoryMap[categorySlug] },
    });
  }

  await prisma.siteSettings.create({
    data: {
      id: "default",
      companyName: "Zaferli Orman Ürünleri",
      phone: "05010300461",
      whatsapp: "905010300461",
      email: "yusufbaraktars@icloud.com",
      address: "Adres bilgisi yakında eklenecek",
      workingHours: "Pazartesi - Cumartesi: 08:00 - 18:00",
      aboutText: "Zaferli Orman Ürünleri olarak yılların deneyimiyle kereste, kontrplak, OSB ve inşaat ahşabı tedarikinde güvenilir çözüm ortağınızız. Kaliteli ürün, uygun fiyat ve hızlı teslimat ile hizmetinizdeyiz.",
    },
  });

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Zaferli2026!", 12);
  await prisma.adminUser.create({
    data: {
      email: process.env.ADMIN_EMAIL || "admin@zaferli.local",
      passwordHash,
    },
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
