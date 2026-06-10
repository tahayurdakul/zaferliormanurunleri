import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  imageUrl?: string | null;
  category?: { name: string };
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center text-ebony/60">
        <p className="text-lg">Bu kategoride ürün bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          slug={product.slug}
          price={product.price}
          unit={product.unit}
          imageUrl={product.imageUrl}
          categoryName={product.category?.name}
        />
      ))}
    </div>
  );
}
