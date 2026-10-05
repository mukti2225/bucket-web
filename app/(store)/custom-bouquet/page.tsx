"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  ChevronRight,
  Heart,
  Palette,
  Gift
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { formatCurrency } from "@/utils/currency";

export default function CustomBouquetBuilderPage() {
  const router = useRouter();

  // Step state (1: Budget, 2: Style, 3: Color, 4: Size, 5: Review)
  const [step, setStep] = useState<number>(1);

  // Selections
  const [budget, setBudget] = useState(650000);
  const [stylePreference, setStylePreference] = useState("Korean Minimalist");
  const [colorPalette, setColorPalette] = useState("Blush & Cream");
  const [size, setSize] = useState("Regular (12-15 tangkai)");
  const [specialNote, setSpecialNote] = useState("");

  const styles = [
    { id: "korean", name: "Korean Minimalist", desc: "Wrapping kain berlipat estetik dengan nuansa pastel lembut" },
    { id: "classic", name: "Classic European", desc: "Rangkaian bulat bervolume mewah dengan dedaunan harum" },
    { id: "garden", name: "Wild Garden / Rustic", desc: "Kombinasi bunga liar, chamomile, dan tekstur organik" },
  ];

  const colors = [
    { id: "blush", name: "Blush & Cream", hex: "#F4DDD8" },
    { id: "crimson", name: "Crimson & Wine", hex: "#C97878" },
    { id: "yellow", name: "Yellow & Sunshine", hex: "#F3D06F" },
    { id: "lilac", name: "Lavender & Lilac", hex: "#C8B6DB" },
    { id: "white", name: "All White & Sage", hex: "#EAEAEA" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4DDD8]/50 px-3.5 py-1 text-xs font-semibold text-[#C97878]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Personalized Gifting Experience</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#24211F]">
              Custom Bouquet Builder
            </h1>
            <p className="max-w-lg mx-auto text-sm text-[#766F69]">
              Rancang buket bunga impianmu sendiri sesuai gaya, warna, dan budget yang kamu inginkan.
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="mt-8 flex items-center justify-center gap-2 sm:gap-4 text-xs font-medium">
            {["1. Budget", "2. Gaya", "3. Warna", "4. Review"].map((label, idx) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 transition ${
                  step === idx + 1
                    ? "bg-[#315C4C] text-white font-semibold"
                    : step > idx + 1
                    ? "bg-[#F2F6EF] text-[#315C4C]"
                    : "bg-[#F7F3F0] text-[#766F69]"
                }`}
              >
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Builder Form Card */}
          <div className="mt-8 rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-10 shadow-sm space-y-8">
            
            {/* STEP 1: Budget */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#24211F]">
                    Tentukan Perkiraan Budget
                  </h3>
                  <p className="text-xs text-[#766F69] mt-1">
                    Florist kami akan memilih kombinasi jenis bunga terbaik sesuai nominal yang kamu anggarkan.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="text-center py-4">
                    <span className="font-sans text-3xl sm:text-4xl font-bold text-[#315C4C]">
                      {formatCurrency(budget)}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="350000"
                    max="2500000"
                    step="50000"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[#315C4C]"
                  />

                  <div className="flex justify-between text-xs text-[#766F69]">
                    <span>Rp 350.000 (Compact)</span>
                    <span>Rp 1.200.000 (Medium)</span>
                    <span>Rp 2.500.000+ (Grand Luxury)</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Style */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#24211F]">
                    Pilih Gaya & Karakter Rangkaian
                  </h3>
                  <p className="text-xs text-[#766F69] mt-1">
                    Tentukan estetika buket yang paling mewakili kepribadian sang penerima.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {styles.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setStylePreference(s.name)}
                      className={`cursor-pointer rounded-2xl border p-5 transition ${
                        stylePreference === s.name
                          ? "border-[#315C4C] bg-[#F2F6EF]/60 shadow-xs"
                          : "border-[#E8E1DC] bg-white hover:border-[#315C4C]/40"
                      }`}
                    >
                      <h4 className="font-serif text-base font-semibold text-[#24211F]">
                        {s.name}
                      </h4>
                      <p className="mt-2 text-xs text-[#766F69] leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Color */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#24211F]">
                    Pilih Palet Warna Dominan
                  </h3>
                  <p className="text-xs text-[#766F69] mt-1">
                    Warna utama bunga dan kertas wrapping premium yang digunakan.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  {colors.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setColorPalette(c.name)}
                      className={`cursor-pointer flex items-center gap-3 rounded-2xl border p-4 transition ${
                        colorPalette === c.name
                          ? "border-[#315C4C] bg-[#F2F6EF]/60 shadow-xs"
                          : "border-[#E8E1DC] bg-white hover:border-[#315C4C]/40"
                      }`}
                    >
                      <div
                        className="h-8 w-8 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-xs font-semibold text-[#24211F]">
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Review */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#24211F]">
                    Konfirmasi Desain Rangkaian Kamu
                  </h3>
                  <p className="text-xs text-[#766F69] mt-1">
                    Berikut rangkuman konsep custom bouquet yang akan dirangkai oleh florist kami.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E8E1DC] bg-[#FDFBF7] p-5 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#E8E1DC] pb-2">
                    <span className="text-[#766F69]">Estimasi Budget</span>
                    <span className="font-bold text-[#315C4C] text-sm">{formatCurrency(budget)}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E8E1DC] pb-2">
                    <span className="text-[#766F69]">Gaya Rangkaian</span>
                    <span className="font-semibold text-[#24211F]">{stylePreference}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E8E1DC] pb-2">
                    <span className="text-[#766F69]">Palet Warna</span>
                    <span className="font-semibold text-[#24211F]">{colorPalette}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#24211F]">
                    Catatan Tambahan untuk Florist (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={specialNote}
                    onChange={(e) => setSpecialNote(e.target.value)}
                    placeholder="Contoh: Tolong sertakan mawar peach jika tersedia, hindari bunga aroma tajam..."
                    className="mt-1.5 w-full rounded-xl border border-[#E8E1DC] bg-[#F7F3F0]/40 p-3 text-xs outline-none focus:border-[#315C4C]"
                  />
                </div>

                <div className="rounded-xl bg-[#F2F6EF] p-3 text-[11px] text-[#315C4C] leading-relaxed">
                  💡 <strong>Catatan Florist:</strong> Bunga segar bersifat alami. Florist kami akan menjaga kesetaraan warna dan keindahan bila ada jenis kuntum musiman yang disubstitusi. Foto Quality Check akan dikirimkan sebelum dikirim.
                </div>
              </div>
            )}

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between border-t border-[#E8E1DC] pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#766F69] hover:text-[#24211F]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Kembali</span>
                </button>
              ) : <div />}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="flex items-center gap-2 rounded-full bg-[#315C4C] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#284C3F] shadow-sm"
                >
                  <span>Langkah Berikutnya</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="flex items-center gap-2 rounded-full bg-[#315C4C] px-7 py-3 text-xs font-semibold text-white hover:bg-[#284C3F] shadow-md"
                >
                  <span>Lanjut ke Checkout Pesanan</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
