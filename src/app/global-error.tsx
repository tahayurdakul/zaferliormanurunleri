"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body className="flex min-h-screen flex-col items-center justify-center bg-cream px-4 text-center">
        <h2 className="text-2xl font-bold text-ebony">Bir hata oluştu</h2>
        <p className="mt-2 text-ebony/60">Lütfen sayfayı yenileyin.</p>
        <button
          onClick={reset}
          className="mt-6 rounded-full bg-oak px-6 py-3 font-semibold text-ebony"
        >
          Tekrar Dene
        </button>
      </body>
    </html>
  );
}
