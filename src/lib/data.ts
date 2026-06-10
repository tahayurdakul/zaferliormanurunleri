import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";

const getCachedSiteSettings = unstable_cache(
  async () => prisma.siteSettings.findUnique({ where: { id: "default" } }),
  ["site-settings"],
  { revalidate: 60 }
);

const getCachedCategories = unstable_cache(
  async () =>
    prisma.category.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: { where: { active: true } } } } },
    }),
  ["categories"],
  { revalidate: 30 }
);

export async function getCategories() {
  return getCachedCategories();
}

export async function getProducts(options?: {
  categorySlug?: string;
  featured?: boolean;
  search?: string;
}) {
  const where: {
    active: boolean;
    featured?: boolean;
    category?: { slug: string };
    OR?: Array<{ name: { contains: string } } | { description: { contains: string } }>;
  } = { active: true };

  if (options?.featured) where.featured = true;
  if (options?.categorySlug) where.category = { slug: options.categorySlug };
  if (options?.search) {
    where.OR = [
      { name: { contains: options.search } },
      { description: { contains: options.search } },
    ];
  }

  return prisma.product.findMany({
    where,
    orderBy: { name: "asc" },
    include: { category: true },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, active: true },
    include: { category: true },
  });
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug, active: true },
  });
}

export async function getSiteSettings() {
  return getCachedSiteSettings();
}
