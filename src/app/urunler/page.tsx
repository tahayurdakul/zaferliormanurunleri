import { getCategories, getProducts } from "@/lib/data";
import { ProductGrid } from "@/components/products/ProductGrid";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ q?: string; kategori?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      search: params.q,
      categorySlug: params.kategori,
    }),
  ]);

  return (
    <div className="wood-texture min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-ebony">Tüm Ürünler</h1>
        <p className="mt-2 text-ebony/60">Kereste ve orman ürünleri kataloğumuz</p>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <aside className="lg:w-64">
            <div className="rounded-2xl bg-white p-5 shadow-md">
              <h2 className="mb-4 font-display text-lg font-semibold">Kategoriler</h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/urunler"
                    className={`block rounded-lg px-3 py-2 text-sm transition hover:bg-cream ${
                      !params.kategori ? "bg-cream font-semibold text-oak" : "text-ebony"
                    }`}
                  >
                    Tüm Kategoriler
                  </Link>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/urunler?kategori=${cat.slug}`}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition hover:bg-cream ${
                        params.kategori === cat.slug
                          ? "bg-cream font-semibold text-oak"
                          : "text-ebony"
                      }`}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            <form className="mb-6">
              <input
                type="search"
                name="q"
                defaultValue={params.q}
                placeholder="Ürün ara..."
                className="w-full rounded-xl border border-oak/20 bg-white px-4 py-3 text-ebony shadow-sm focus:border-oak focus:outline-none focus:ring-2 focus:ring-oak/20"
              />
            </form>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
