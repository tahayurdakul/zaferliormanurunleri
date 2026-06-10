import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/format";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const slug = body.slug || slugify(body.name);

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug,
      icon: body.icon || "🪵",
      sortOrder: body.sortOrder ?? 0,
      active: body.active ?? true,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
