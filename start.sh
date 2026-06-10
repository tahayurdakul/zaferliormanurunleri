#!/bin/bash
cd "$(dirname "$0")"

# Eski sunucu varsa kapat
lsof -ti :3000 | xargs kill -9 2>/dev/null
sleep 1

# Bozuk önbelleği temizle
rm -rf .next

# Veritabanı yoksa kur
if [ ! -f prisma/dev.db ]; then
  echo "Veritabanı kuruluyor..."
  npm run db:setup
fi

echo "Sunucu başlatılıyor: http://localhost:3000"
npm run dev
