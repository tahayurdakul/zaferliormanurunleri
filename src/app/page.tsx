import Link from "next/link";
import { getCategories, getProducts, getSiteSettings } from "@/lib/data";
import { CategoryStrip } from "@/components/products/CategoryStrip";
import { ProductGrid } from "@/components/products/ProductGrid";
import { TrustBand } from "@/components/home/TrustBand";
import { HeroActions } from "@/components/home/HeroActions";

export default async function HomePage() {
  const [categories, featuredProducts, settings] = await Promise.all([
    getCategories(),
    getProducts({ featured: true }),
    getSiteSettings(),
  ]);

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-ebony">
        <div className="absolute inset-0 bg-gradient-to-br from-ebony via-walnut/80 to-forest/60" />
        <div className="absolute inset-0 opacity-30 wood-texture" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-oak">
              Zaferli Orman Ürünleri
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight text-cream md:text-7xl">
              Doğanın Gücü,<br />
              <span className="text-oak">Yapınızın Temeli</span>
            </h1>
            <p className="mt-6 text-lg text-cream/80">
              Kereste, kontrplak, OSB ve inşaat ahşabında kaliteli ürünler.
              Teklif listenizi oluşturun, WhatsApp ile anında teklif alın.
            </p>
            <HeroActions />
          </div>
        </div>
      </section>

      <section className="wood-texture py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-8 font-display text-3xl font-bold text-ebony">Kategoriler</h2>
          <CategoryStrip categories={categories} />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-ebony">Öne Çıkan Ürünler</h2>
              <p className="mt-2 text-ebony/60">En çok tercih edilen orman ürünlerimiz</p>
            </div>
            <Link href="/urunler" className="hidden text-oak hover:underline sm:block">
              Tümünü Gör →
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      <TrustBand phone={settings?.phone} />
    </>
  );
}
