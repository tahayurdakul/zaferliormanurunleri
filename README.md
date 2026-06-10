# Zaferli Orman Ürünleri — Kereste Teklif Sitesi

Modern kereste ve orman ürünleri kataloğu. Müşteriler ürünleri teklif listesine ekler ve WhatsApp üzerinden otomatik teklif mesajı gönderir.

## Özellikler

- Ürün kataloğu ve kategori filtreleme
- Teklif listesi (sepet) — tarayıcıda kalıcı
- WhatsApp ile otomatik teklif mesajı (`05010300461`)
- Yönetim paneli (ürün, kategori, fiyat, ayarlar)
- Keresteciye özel premium arayüz

## Kurulum

```bash
cd zaferli-ticaret
npm install
npm run db:setup
npm run dev
```

Site: http://localhost:3000  
Admin: http://localhost:3000/admin

## Admin Girişi

- **E-posta:** `admin@zaferli.local`
- **Şifre:** `Zaferli2026!`

`.env` dosyasından değiştirilebilir.

## WhatsApp Entegrasyonu

Müşteri teklif listesine ürün ekledikten sonra "WhatsApp ile Teklif İste" butonuna tıklar. Sistem otomatik olarak şu formatta mesaj oluşturur:

```
Merhaba Zaferli Orman Ürünleri,

Teklif talebim:

1. OSB 11mm — 5 ADET — ₺3.375,00
...

Ara Toplam: ₺3.375,00

Bilgi ve teklif rica ederim.
```

Mesaj `905010300461` numarasına yönlendirilir.

## Teknoloji

- Next.js 16 (App Router)
- Prisma + SQLite
- NextAuth (admin girişi)
- Tailwind CSS
- Zustand (teklif listesi)
- Framer Motion (animasyonlar)

## Yayın (Vercel)

1. GitHub'a push edin
2. Vercel'e bağlayın
3. `DATABASE_URL`, `NEXTAUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` env değişkenlerini ekleyin
4. Production için SQLite yerine PostgreSQL kullanın
