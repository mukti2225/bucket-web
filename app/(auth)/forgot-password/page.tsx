"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-[#FFFDFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#766F69] hover:text-[#315C4C] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Halaman Masuk</span>
        </Link>

        <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-[#24211F]">
          Atur Ulang Kata Sandi
        </h2>
        <p className="mt-2 text-center text-sm text-[#766F69]">
          Masukkan email akunmu. Kami akan mengirimkan tautan untuk menyetel kata sandi baru.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-[#E8E1DC] bg-white p-8 shadow-sm sm:px-10">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#3F7D5A]/10 text-[#3F7D5A]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-[#24211F]">
                Tautan Terkirim!
              </h3>
              <p className="text-xs text-[#766F69] leading-relaxed">
                Kami telah mengirimkan instruksi pemulihan ke <span className="font-semibold text-[#24211F]">{email}</span>. Silakan periksa kotak masuk atau spam email Anda.
              </p>
              <div className="pt-2">
                <Link href="/login">
                  <Button variant="primary" className="w-full">
                    Kembali ke Halaman Masuk
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                label="Alamat Email Terdaftar"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Kirim Tautan Pemulihan
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
