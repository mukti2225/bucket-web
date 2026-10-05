import Link from "next/link";
import { ArrowRight, ShoppingBag, Heart, Star, Sparkles, Check } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function StyleGuidePage() {
  const primaryColors = [
    { name: "Botanical Green", hex: "#315C4C", text: "#FFFFFF", role: "Primary Brand, CTAs, Active States" },
    { name: "Blush / Pink", hex: "#F4DDD8", text: "#24211F", role: "Soft Accents, Occasion Highlights" },
    { name: "Rose", hex: "#C97878", text: "#FFFFFF", role: "Badges, Favorit, Romantic Highlights" },
    { name: "Cream", hex: "#F7EFE4", text: "#24211F", role: "Warm Backgrounds, Hero Banners" },
  ];

  const secondaryColors = [
    { name: "Sage", hex: "#A4B494", text: "#24211F", role: "Botanical Subtle Accents" },
    { name: "Peach", hex: "#E8B4A2", text: "#24211F", role: "Warm Pastels" },
    { name: "Sand", hex: "#DFD7CE", text: "#24211F", role: "Borders & Muted Elements" },
    { name: "Charcoal", hex: "#24211F", text: "#FFFFFF", role: "Main Text & High Contrast" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4DDD8]/60 px-3.5 py-1 text-xs font-semibold text-[#C97878]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Design System & Tokens</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#24211F] mt-2">
              Florétta Style & UI Elements
            </h1>
            <p className="mt-1 text-sm text-[#766F69]">
              Dokumentasi acuan palet warna, tipografi, radius, dan tombol sesuai DESIGN.md dan lembar referensi.
            </p>
          </div>

          {/* PALET WARNA UTAMA */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#24211F] border-b border-[#E8E1DC] pb-2">
              Warna Utama
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {primaryColors.map((c) => (
                <div key={c.name} className="overflow-hidden rounded-2xl border border-[#E8E1DC] bg-white shadow-xs">
                  <div
                    className="h-24 w-full flex items-end p-3 font-mono text-xs font-bold"
                    style={{ backgroundColor: c.hex, color: c.text }}
                  >
                    {c.hex}
                  </div>
                  <div className="p-3 text-xs">
                    <p className="font-bold text-[#24211F]">{c.name}</p>
                    <p className="text-[#766F69] text-[11px] mt-0.5">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PALET WARNA PENDUKUNG */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#24211F] border-b border-[#E8E1DC] pb-2">
              Warna Pendukung
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {secondaryColors.map((c) => (
                <div key={c.name} className="overflow-hidden rounded-2xl border border-[#E8E1DC] bg-white shadow-xs">
                  <div
                    className="h-20 w-full flex items-end p-3 font-mono text-xs font-bold"
                    style={{ backgroundColor: c.hex, color: c.text }}
                  >
                    {c.hex}
                  </div>
                  <div className="p-3 text-xs">
                    <p className="font-bold text-[#24211F]">{c.name}</p>
                    <p className="text-[#766F69] text-[11px] mt-0.5">{c.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* TYPOGRAPHY */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#24211F] border-b border-[#E8E1DC] pb-2">
              Tipografi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-8">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#315C4C]">
                  Heading Font: Playfair Display
                </span>
                <p className="font-serif text-3xl font-semibold text-[#24211F] leading-tight">
                  Bunga untuk Setiap Cerita Berharga
                </p>
                <p className="font-serif italic text-lg text-[#766F69]">
                  &quot;Lebih dari sekadar bunga, untuk setiap rasa yang ingin disampaikan.&quot;
                </p>
              </div>

              <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-[#E8E1DC] pt-4 sm:pt-0 sm:pl-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#315C4C]">
                  Body Font: Inter
                </span>
                <p className="font-sans text-sm text-[#24211F] leading-relaxed">
                  Rangkaian bunga segar dan hadiah istimewa untuk orang-orang terdekat, di setiap momen bermakna. Didesain dengan penuh ketelitian dan perhatian pada setiap detail kelopak.
                </p>
                <p className="font-sans text-xs text-[#766F69]">
                  Body text, metadata, form controls, navigation, and pricing labels.
                </p>
              </div>
            </div>
          </section>

          {/* BUTTON STYLES */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold text-[#24211F] border-b border-[#E8E1DC] pb-2">
              Button Styles
            </h2>
            <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-8">
              {/* Primary Button */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#315C4C] px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#284C3F]"
              >
                <span>Primary Button</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              {/* Secondary Button */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#F4DDD8] px-6 py-3 text-xs font-semibold text-[#24211F] hover:bg-[#f0d2cc]"
              >
                <span>Secondary Button</span>
              </button>

              {/* Outline Button */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-[#24211F] px-6 py-3 text-xs font-semibold text-[#24211F] hover:bg-[#F7F3F0]"
              >
                <span>Outline Button</span>
              </button>

              {/* Tambah ke Keranjang CTA */}
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-[#315C4C] px-7 py-3 text-xs font-semibold text-white shadow-md hover:bg-[#284C3F]"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Tambah ke Keranjang</span>
              </button>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
