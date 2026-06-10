import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  _count?: { products: number };
}

export function CategoryStrip({ categories }: { categories: Category[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/kategori/${cat.slug}`}
          className="flex shrink-0 items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span className="text-2xl">{cat.icon}</span>
          <div>
            <p className="font-medium text-ebony">{cat.name}</p>
            {cat._count && (
              <p className="text-xs text-ebony/50">{cat._count.products} ürün</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
