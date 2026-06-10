"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";

interface ProductImageUploadProps {
  imageUrl: string;
  onChange: (url: string) => void;
}

export function ProductImageUpload({ imageUrl, onChange }: ProductImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Sadece görsel dosyaları yüklenebilir.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu en fazla 5 MB olabilir.");
      return;
    }

    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Yükleme başarısız.");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Yükleme sırasında bir hata oluştu.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-medium text-ebony">Ürün Görseli</label>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {imageUrl ? (
        <div className="relative overflow-hidden rounded-xl border border-oak/20 bg-cream">
          <div className="relative aspect-[16/10] w-full max-w-md">
            <Image
              src={imageUrl}
              alt="Ürün görseli"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex gap-2 border-t border-oak/10 bg-white p-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-lg bg-ebony px-4 py-2 text-sm font-medium text-cream transition hover:bg-oak hover:text-ebony disabled:opacity-50"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              Görseli Değiştir
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={uploading}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 size={16} />
              Görseli Kaldır
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          disabled={uploading}
          className={`flex w-full max-w-md flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 transition ${
            dragOver
              ? "border-oak bg-oak/10"
              : "border-oak/30 bg-cream/50 hover:border-oak hover:bg-oak/5"
          } disabled:opacity-50`}
        >
          {uploading ? (
            <>
              <Loader2 size={32} className="animate-spin text-oak" />
              <p className="mt-3 text-sm font-medium text-ebony">Yükleniyor...</p>
            </>
          ) : (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-oak/15">
                <ImagePlus size={28} className="text-oak" />
              </div>
              <p className="mt-3 text-sm font-medium text-ebony">Görsel yüklemek için tıklayın</p>
              <p className="mt-1 text-xs text-ebony/50">veya sürükleyip bırakın</p>
              <p className="mt-2 text-xs text-ebony/40">JPG, PNG, WebP — max 5 MB</p>
            </>
          )}
        </button>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
