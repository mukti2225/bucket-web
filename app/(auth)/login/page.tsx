"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Sparkles, Lock, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth.store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("budi.santoso@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Silakan isi email dan kata sandi.");
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

  const handleAdminQuickLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login("admin@floretta.id", "ADMIN");
      setIsLoading(false);
      router.push("/admin");
    }, 500);
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
          Masuk ke Akun Anda
        </h2>
        <p className="mt-2 text-center text-sm text-[#766F69]">
          Kelola pesanan bunga dan simpan tanggal penting orang terkasih.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-[#E8E1DC] bg-white p-8 shadow-sm sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-[#B84A4A]/10 border border-[#B84A4A]/20 p-3 text-xs text-[#B84A4A]">
                {error}
              </div>
            )}

            <Input
              label="Alamat Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
            />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[#24211F]">
                  Kata Sandi <span className="text-[#B84A4A]">*</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-[#315C4C] hover:underline"
                >
                  Lupa kata sandi?
                </Link>
              </div>
              <Input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Masuk Sekarang
            </Button>
          </form>

          {/* Quick Demo Access Bar */}
          <div className="mt-6 border-t border-[#E8E1DC] pt-5">
            <p className="text-center text-xs font-medium text-[#766F69] mb-3">
              Akses Cepat Pengujian:
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  login("budi.santoso@example.com", "CUSTOMER");
                  router.push("/account");
                }}
              >
                Login Customer
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={handleAdminQuickLogin}
              >
                Login Admin
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-[#766F69]">
            Belum memiliki akun?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#315C4C] hover:underline"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
