"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Sparkles, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Silakan lengkapi semua kolom wajib.");
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      login(email, "CUSTOMER");
      setIsLoading(false);
      router.push("/account");
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#FFFDFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#766F69] hover:text-[#315C4C] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Brand Logo */}
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#315C4C] text-[#F7EFE4] shadow-sm">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V12m4.5 0a4.5 4.5 0 1 1-4.5 4.5M16.5 12H12m-4.5 0a4.5 4.5 0 1 0 4.5 4.5M7.5 12H12m0 4.5V21" />
            </svg>
          </div>
        </div>

        <h2 className="mt-4 text-center font-serif text-3xl font-semibold tracking-tight text-[#24211F]">
          Buat Akun Florétta
        </h2>
        <p className="mt-2 text-center text-sm text-[#766F69]">
          Simpan daftar penerima, alamat, dan jangan pernah lewatkan tanggal spesial lagi.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-[#E8E1DC] bg-white p-8 shadow-sm sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-[#B84A4A]/10 border border-[#B84A4A]/20 p-3 text-xs text-[#B84A4A]">
                {error}
              </div>
            )}

            <Input
              label="Nama Lengkap"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso"
            />

            <Input
              label="Alamat Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
            />

            <Input
              label="Nomor WhatsApp / HP"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0812-3456-7890"
              helperText="Digunakan untuk konfirmasi pesanan dan status pengiriman."
            />

            <Input
              label="Kata Sandi"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Daftar Sekarang
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-xs text-[#766F69]">
            Sudah memiliki akun?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#315C4C] hover:underline"
            >
              Masuk di Sini
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
