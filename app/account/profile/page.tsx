"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  User, 
  Check, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Lock, 
  Calendar,
  Camera,
  Upload,
  CheckCircle2
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

export default function AccountProfilePage() {
  const { user, login } = useAuthStore();
  const [name, setName] = useState(user?.name || "Budi Santoso");
  const [email, setEmail] = useState(user?.email || "budi.santoso@example.com");
  const [phone, setPhone] = useState(user?.phone || "0812-3456-7890");
  const [birthDate, setBirthDate] = useState("1995-08-17");
  const [gender, setGender] = useState<"L" | "P">("L");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, user?.role || "CUSTOMER");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-8 shadow-xs">
        <div className="border-b border-[#E8E1DC] pb-4 mb-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#24211F]">
            Profil Saya
          </h2>
          <p className="text-xs text-[#766F69] mt-0.5">
            Kelola informasi profil dan keamanan akun Anda untuk kemudahan pengiriman hadiah.
          </p>
        </div>

        {saved && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-semibold text-emerald-800 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Perubahan data profil Anda berhasil disimpan!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: FORM BIODATA (8 Kolom) */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <form onSubmit={handleSave} className="space-y-5">
              
              {/* Nama Lengkap */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#24211F] block">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C] focus:ring-1 focus:ring-[#315C4C] transition"
                />
              </div>

              {/* Alamat Email */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#24211F] block">
                    Alamat Email
                  </label>
                  <span className="text-[10px] text-[#3F7D5A] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Terverifikasi
                  </span>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#766F69]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white pl-10 pr-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C] focus:ring-1 focus:ring-[#315C4C] transition"
                  />
                </div>
              </div>

              {/* Nomor Telepon / WhatsApp */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#24211F] block">
                    Nomor WhatsApp / HP
                  </label>
                  <span className="text-[10px] text-[#3F7D5A] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    Terhubung
                  </span>
                </div>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#766F69]" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white pl-10 pr-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C] focus:ring-1 focus:ring-[#315C4C] transition"
                  />
                </div>
                <p className="text-[11px] text-[#766F69]">
                  Nomor ini digunakan untuk konfirmasi pratinjau foto QC dan status kurir.
                </p>
              </div>

              {/* Tanggal Lahir & Jenis Kelamin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#24211F] block">
                    Tanggal Lahir
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C] transition"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#24211F] block">
                    Jenis Kelamin
                  </label>
                  <div className="flex items-center gap-4 pt-2">
                    <label className="flex items-center gap-2 text-xs text-[#24211F] cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === "L"}
                        onChange={() => setGender("L")}
                        className="text-[#315C4C] focus:ring-[#315C4C]"
                      />
                      <span>Laki-laki</span>
                    </label>
                    <label className="flex items-center gap-2 text-xs text-[#24211F] cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        checked={gender === "P"}
                        onChange={() => setGender("P")}
                        className="text-[#315C4C] focus:ring-[#315C4C]"
                      />
                      <span>Perempuan</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E1DC]">
                <button
                  type="submit"
                  className="flex h-11 items-center justify-center rounded-full bg-[#315C4C] px-8 text-xs font-semibold text-white shadow-md hover:bg-[#284C3F] transition cursor-pointer"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: FOTO PROFIL & KEAMANAN AKUN (4 Kolom Shopee Style) */}
          <div className="lg:col-span-4 order-1 lg:order-2 space-y-5">
            {/* Foto Profil Card */}
            <div className="rounded-2xl border border-[#E8E1DC] bg-[#FAF8F5] p-5 text-center">
              <div className="relative mx-auto h-24 w-24">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#315C4C] text-[#F7EFE4] text-3xl font-serif font-bold shadow-md">
                  {name.charAt(0)}
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-white border border-[#E8E1DC] text-[#24211F] shadow-xs hover:bg-[#F2F6EF] transition"
                  aria-label="Ubah Foto Profil"
                >
                  <Camera className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8E1DC] bg-white px-4 py-2 text-xs font-semibold text-[#24211F] hover:bg-[#FAF8F5] transition shadow-2xs"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Pilih Foto</span>
                </button>
                <p className="mt-2 text-[10px] text-[#766F69] leading-relaxed">
                  Ukuran maks: 2 MB. Format foto: JPEG, PNG.
                </p>
              </div>
            </div>

            {/* Keamanan Akun */}
            <div className="rounded-2xl border border-[#E8E1DC] bg-white p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#24211F] flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#315C4C]" />
                <span>Keamanan Akun</span>
              </h4>

              <div className="flex items-center justify-between text-xs pt-1">
                <div>
                  <p className="font-semibold text-[#24211F]">Kata Sandi</p>
                  <p className="text-[11px] text-[#766F69]">Terakhir diubah 30 hari lalu</p>
                </div>
                <button type="button" className="text-xs font-semibold text-[#315C4C] hover:underline">
                  Ubah
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[#E8E1DC]/60">
                <div>
                  <p className="font-semibold text-[#24211F]">PIN Transaksi</p>
                  <p className="text-[11px] text-[#3F7D5A]">Sudah aktif</p>
                </div>
                <button type="button" className="text-xs font-semibold text-[#315C4C] hover:underline">
                  Atur
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
