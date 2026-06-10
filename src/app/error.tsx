"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="font-display text-2xl font-bold text-ebony">Bir hata oluştu</h2>
      <p className="mt-2 text-ebony/60">Sayfa yüklenirken sorun yaşandı.</p>
      <button
        onClick={reset}
        className="mt-6 rounded-full bg-oak px-6 py-3 font-semibold text-ebony"
      >
        Tekrar Dene
      </button>
    </div>
  );
}
