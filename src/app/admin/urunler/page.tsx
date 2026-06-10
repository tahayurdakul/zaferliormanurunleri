"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AdminShell } from "@/components/admin/AdminShell";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { ProductImageUpload } from "@/components/admin/ProductImageUpload";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  unit: string;
  imageUrl: string | null;
  featured: boolean;
  active: boolean;
  categoryId: string;
  category: Category;
}

const UNITS = ["ADET", "KG", "M2", "M3", "PAKET", "METRE"];

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  price: "",
  unit: "ADET",
  imageUrl: "",
  featured: false,
  active: true,
  categoryId: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const fetchData = async () => {
    const [prodRes, catRes] = await Promise.all([
      fetch("/api/products"),
      fetch("/api/categories"),
    ]);
    setProducts(await prodRes.json());
    setCategories(await catRes.json());
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingId ? `/api/products/${editingId}` : "/api/products";
    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    fetchData();
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      price: product.price.toString(),
      unit: product.unit,
      imageUrl: product.imageUrl || "",
      featured: product.featured,
      active: product.active,
      categoryId: product.categoryId,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <AdminShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ebony">Ürünler</h1>
          <p className="text-ebony/60">Ürün ve fiyat yönetimi</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 rounded-lg bg-ebony px-4 py-2 text-sm font-semibold text-cream hover:bg-oak hover:text-ebony"
        >
          <Plus size={16} /> Yeni Ürün
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-xl bg-white p-6 shadow-md">
          <h2 className="mb-4 font-semibold">{editingId ? "Ürün Düzenle" : "Yeni Ürün"}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              placeholder="Ürün adı"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border px-4 py-2"
              required
            />
            <input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className="rounded-lg border px-4 py-2"
            />
            <input
              type="number"
              step="0.01"
              placeholder="Fiyat"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-lg border px-4 py-2"
              required
            />
            <select
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
              className="rounded-lg border px-4 py-2"
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="rounded-lg border px-4 py-2"
              required
            >
              <option value="">Kategori seçin</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ProductImageUpload
              imageUrl={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
            />
          </div>
          <textarea
            placeholder="Açıklama"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-4 w-full rounded-lg border px-4 py-2"
            rows={3}
          />
          <div className="mt-4 flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Öne Çıkan
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
              />
              Aktif
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button type="submit" className="rounded-lg bg-oak px-6 py-2 font-semibold text-ebony">
              {editingId ? "Güncelle" : "Ekle"}
            </button>
            <button
              type="button"
              onClick={() => { setShowForm(false); setEditingId(null); }}
              className="rounded-lg border px-6 py-2"
            >
              İptal
            </button>
          </div>
        </form>
      )}

      <div className="mt-6 overflow-hidden rounded-xl bg-white shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Ürün</th>
              <th className="px-4 py-3 text-left">Kategori</th>
              <th className="px-4 py-3 text-left">Fiyat</th>
              <th className="px-4 py-3 text-left">Durum</th>
              <th className="px-4 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-cream">
                      {product.imageUrl ? (
                        <Image src={product.imageUrl} alt="" fill className="object-cover" />
                      ) : (
                        <span className="flex h-full items-center justify-center">🪵</span>
                      )}
                    </div>
                    <span className="font-medium">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ebony/60">{product.category.name}</td>
                <td className="px-4 py-3">{formatPrice(product.price)} / {product.unit}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${product.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {product.active ? "Aktif" : "Pasif"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(product)} className="mr-2 text-oak hover:text-ebony">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
