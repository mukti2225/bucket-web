import Link from "next/link";
import { Sparkles, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FFFDFC] px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F7EFE4] text-[#C58A32] mb-4">
        <Sparkles className="h-8 w-8" />
      </div>

      <span className="text-xs font-semibold text-[#766F69] tracking-wider uppercase mb-1">
        Halaman Tidak Ditemukan • 404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#24211F]">
        Rangkaian bunga yang kamu cari belum ada
      </h1>
      <p className="mt-2 text-xs sm:text-sm text-[#766F69] max-w-md leading-relaxed">
        Halaman mungkin telah dipindahkan atau tautan tidak valid. Temukan buket bunga cantik lainnya di katalog kami.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Link href="/products">
          <Button variant="primary" size="md" className="gap-2">
            <span>Lihat Semua Bunga</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="md" className="gap-2">
            <Home className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
