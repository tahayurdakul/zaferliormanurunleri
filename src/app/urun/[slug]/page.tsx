import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { AddToQuoteButton } from "@/components/products/AddToQuoteButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="wood-texture min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <nav className="mb-8 text-sm text-ebony/60">
          <Link href="/urunler" className="hover:text-oak">Ürünler</Link>
          <span className="mx-2">/</span>
          <Link href={`/kategori/${product.category.slug}`} className="hover:text-oak">
            {product.category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ebony">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-xl">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" priority />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-cream to-oak/20">
                <span className="text-8xl">🪵</span>
              </div>
            )}
          </div>

          <div>
            <span className="rounded-full bg-oak/20 px-4 py-1 text-sm font-medium text-walnut">
              {product.category.name}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-ebony">{product.name}</h1>
            <p className="mt-4 font-display text-3xl font-bold text-oak">
              {formatPrice(product.price)}{" "}
              <span className="text-lg font-normal text-ebony/60">/ {product.unit}</span>
            </p>

            {product.description && (
              <p className="mt-6 leading-relaxed text-ebony/70">{product.description}</p>
            )}

            <div className="mt-8">
              <AddToQuoteButton
                product={{
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  unit: product.unit,
                  imageUrl: product.imageUrl,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
