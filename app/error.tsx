"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#FFFDFC] px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#B84A4A]/10 text-[#B84A4A] mb-4">
        <AlertCircle className="h-8 w-8" />
      </div>

      <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
        Kami belum bisa memuat halaman ini
      </h1>
      <p className="mt-2 text-xs sm:text-sm text-[#766F69] max-w-md leading-relaxed">
        Terjadi kendala sementara pada sistem. Silakan coba beberapa saat lagi atau kembali ke halaman utama.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <Button
          variant="primary"
          size="md"
          className="gap-2"
          onClick={() => reset()}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Coba Lagi</span>
        </Button>
        <Link href="/">
          <Button variant="outline" size="md" className="gap-2">
            <Home className="h-4 w-4" />
            <span>Ke Beranda</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
