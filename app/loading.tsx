export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FFFDFC] px-4">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#315C4C]/10 text-[#315C4C]">
        <svg
          className="h-8 w-8 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <p className="mt-4 font-serif text-base font-medium text-[#24211F]">
        Menyiapkan Bunga Segar...
      </p>
      <p className="text-xs text-[#766F69]">Florétta Florist & Gifting</p>
    </div>
  );
}
