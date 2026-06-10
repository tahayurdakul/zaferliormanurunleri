import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getProducts } from "@/lib/data";
import { ProductGrid } from "@/components/products/ProductGrid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) notFound();

  const products = await getProducts({ categorySlug: slug });

  return (
    <div className="wood-texture min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="mb-4 text-sm text-ebony/60">
          <Link href="/urunler" className="hover:text-oak">Ürünler</Link>
          <span className="mx-2">/</span>
          <span className="text-ebony">{category.name}</span>
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="font-display text-4xl font-bold text-ebony">{category.name}</h1>
            <p className="text-ebony/60">{products.length} ürün</p>
          </div>
        </div>

        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
