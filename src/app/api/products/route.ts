import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/format";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { name: "asc" },
    include: { category: true },
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const slug = body.slug || slugify(body.name);

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug,
      description: body.description,
      price: parseFloat(body.price),
      unit: body.unit || "ADET",
      imageUrl: body.imageUrl,
      featured: body.featured ?? false,
      active: body.active ?? true,
      categoryId: body.categoryId,
    },
    include: { category: true },
  });

  return NextResponse.json(product, { status: 201 });
}
