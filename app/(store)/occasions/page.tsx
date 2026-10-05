"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Camera, 
  ChevronRight,
  ChevronDown,
  Gift,
  HeartHandshake
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";

export const OCCASIONS_DATA = [
  {
    slug: "birthday",
    name: "Ulang Tahun",
    subtitle: "Rayakan hari spesial mereka dengan rangkaian bunga penuh warna dan keceriaan.",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=700&q=80",
    tag: "Terfavorit",
    count: "18 Pilihan",
    priceStart: "Rp529.000",
  },
  {
    slug: "anniversary",
    name: "Anniversary & Cinta",
    subtitle: "Ungkapkan rasa cinta dan perjalanan berharga dengan mawar merah dan pink berkelas.",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=80",
    tag: "Romantis",
    count: "15 Pilihan",
    priceStart: "Rp599.000",
  },
  {
    slug: "graduation",
    name: "Wisuda & Kelulusan",
    subtitle: "Apresiasi perjuangan dan pencapaian akademik istimewa dengan buket matahari cerah.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=700&q=80",
    tag: "Populer",
    count: "12 Pilihan",
    priceStart: "Rp489.000",
  },
  {
    slug: "romantic",
    name: "Romantis & Kasih Sayang",
    subtitle: "Sentuhan romantis tak terlupakan dengan nuansa mawar merah beludru super premium.",
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=700&q=80",
    tag: "Best Seller",
    count: "16 Pilihan",
    priceStart: "Rp599.000",
  },
  {
    slug: "congratulations",
    name: "Ucapan Selamat",
    subtitle: "Sambut pembukaan bisnis, promosi karier, atau keberhasilan baru dengan megah.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=700&q=80",
    count: "14 Pilihan",
    priceStart: "Rp549.000",
  },
  {
    slug: "get-well-soon",
    name: "Get Well Soon",
    subtitle: "Hadirkan kehangatan, doa lekas sembuh, dan kesegaran bagi sahabat atau keluarga tercinta.",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80",
    count: "10 Pilihan",
    priceStart: "Rp529.000",
  },
  {
    slug: "pernikahan",
    name: "Pernikahan & Tunangan",
    subtitle: "Keanggunan murni mawar putih avalanche dan lily untuk hari bahagia yang sakral.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80",
    count: "12 Pilihan",
    priceStart: "Rp689.000",
  },
  {
    slug: "condolence",
    name: "Belasungkawa & Simpati",
    subtitle: "Sampaikan rasa simpati mendalam dan penghormatan tulus dengan tenang dan khidmat.",
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=700&q=80",
    count: "8 Pilihan",
    priceStart: "Rp590.000",
  },
  {
    slug: "just-because",
    name: "Just Because (Spontan)",
    subtitle: "Kejutan manis spontan tanpa harus menunggu tanggal khusus, kapan pun kamu ingin berbagi senyuman.",
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=700&q=80",
    tag: "Spontan",
    count: "14 Pilihan",
    priceStart: "Rp450.000",
  },
];

export default function OccasionsIndexPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Featured Bouquets for Occasions
  const featuredBouquets = PRODUCTS.slice(0, 4);

  const faqs = [
    {
      q: "Bagaimana cara memilih bunga yang tepat jika saya bingung acaranya?",
      a: "Anda dapat memilih kategori 'Just Because' untuk pilihan aman dan disukai banyak orang seperti mawar peach atau pastel, atau hubungi florist kami via WhatsApp untuk rekomendasi personal sesuai penerima.",
    },
    {
      q: "Apakah rangkaian bunga bisa dikirim pada hari yang sama (Same-Day Delivery)?",
      a: "Ya! Pesanan yang diselesaikan sebelum pukul 14.00 WIB dapat dikirim pada hari yang sama dengan garansi kesegaran bunga maksimal.",
    },
    {
      q: "Apakah setiap pemesanan sudah termasuk kartu ucapan gratis?",
      a: "Tentu. Setiap pesanan di Florétta sudah dilengkapi kartu ucapan premium gratis dengan pesan personal yang Anda tulis saat checkout.",
    },
    {
      q: "Apakah saya akan menerima foto hasil buket sebelum dikirim?",
      a: "Ya, tim florist kami mengambil foto Quality Check (QC) asli buket Anda dan mengirimkannya sebelum kurir berangkat mengantarkan hadiah.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Editorial, Product-First, Calm) */}
        {/* ========================================================================= */}
        <section className="border-b border-[#E8E1DC] bg-[#FAF8F5] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-1.5 text-xs text-[#766F69] mb-4">
                <Link href="/" className="hover:text-[#315C4C] transition">Beranda</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="text-[#24211F] font-semibold">Momen Spesial</span>
              </nav>

              <div className="inline-flex items-center gap-2 rounded-full border border-[#F1D8D4] bg-[#F9ECE9] px-3.5 py-1 text-xs font-medium text-[#C97878] mb-4 shadow-xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Pilih Berdasarkan Momen &amp; Perayaan</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#24211F] leading-[1.18]">
                Hadiah untuk setiap momen berarti
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#766F69] leading-relaxed max-w-xl">
                Temukan bunga dan hadiah yang tepat untuk menyampaikan apa yang ingin kamu katakan — dari rasa cinta, apresiasi, hingga doa dan kehangatan.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OCCASION GRID (3 columns desktop, 2 columns mobile) */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                  Pilih Momen Berharga Anda
                </h2>
                <p className="text-xs sm:text-sm text-[#766F69] mt-1">
                  Setiap momen memiliki karakter dan bunga pilihan yang tepat
                </p>
              </div>
              <span className="text-xs text-[#766F69]">
                Menampilkan {OCCASIONS_DATA.length} kategori momen
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {OCCASIONS_DATA.map((occ) => (
                <Link
                  key={occ.slug}
                  href={`/occasions/${occ.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#315C4C]/40"
                >
                  {/* Image container */}
                  <div className="relative aspect-[4/3] sm:aspect-[4/3.5] w-full overflow-hidden bg-[#F7F3F0]">
                    <Image
                      src={occ.image}
                      alt={occ.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {occ.tag && (
                      <span className="absolute top-3 left-3 rounded-full bg-[#315C4C]/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-white shadow-xs">
                        {occ.tag}
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] sm:text-xs font-medium text-white/90">
                        {occ.count}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                    <div>
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-[#24211F] group-hover:text-[#315C4C] transition-colors">
                        {occ.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-[#766F69] leading-relaxed line-clamp-2">
                        {occ.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E8E1DC]/60 flex items-center justify-between text-xs">
                      <span className="text-[#766F69]">
                        Mulai <span className="font-semibold text-[#24211F]">{occ.priceStart}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#315C4C] group-hover:translate-x-0.5 transition-transform">
                        <span>Lihat</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. POPULAR FOR THIS WEEK / RECOMMENDED */}
        {/* ========================================================================= */}
        <section className="bg-[#FAF8F5] py-14 sm:py-20 border-y border-[#E8E1DC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#315C4C]/10 px-3 py-1 text-xs font-semibold text-[#315C4C] mb-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Favorit Pekan Ini</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                  Rangkaian Paling Banyak Dipilih
                </h2>
                <p className="text-xs sm:text-sm text-[#766F69] mt-1">
                  Buket bunga segar terlaris yang selalu berhasil menghadirkan senyum
                </p>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315C4C] hover:underline"
              >
                <span>Lihat Semua Koleksi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredBouquets.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CUSTOM BOUQUET CTA */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#315C4C] text-white p-8 sm:p-12 lg:p-16">
              {/* Subtle background decoration */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none hidden md:block">
                <Image
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80"
                  alt="Floral background"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative z-10 max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-[#F4DDD8] backdrop-blur-xs mb-4">
                  <Gift className="h-3.5 w-3.5" />
                  <span>Kustomisasi Sepenuh Hati</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-medium tracking-tight leading-snug">
                  Punya ide rangkaian bunga sendiri?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed">
                  Tentukan sendiri anggaran, preferensi bunga, palet warna, dan kartu ucapan. Florist profesional kami siap merangkainya khusus untuk orang tersayang.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/custom-bouquet"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-7 text-xs font-semibold text-[#315C4C] shadow-md transition hover:bg-[#FAF8F5] active:scale-98"
                  >
                    <span>Rancang Custom Bouquet</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/gifts"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-xs font-semibold text-white transition hover:bg-white/10"
                  >
                    <span>Jelajahi Hadiah Pelengkap</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TRUST / DELIVERY INFO */}
        {/* ========================================================================= */}
        <section className="border-t border-[#E8E1DC] bg-[#FAF8F5] py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E8E1DC] text-[#315C4C] shadow-xs">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#24211F]">
                    Pengiriman Terjadwal &amp; Same Day
                  </h4>
                  <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                    Pesan sebelum pukul 14:00 WIB untuk pengantaran di hari yang sama dengan slot waktu teratur.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E8E1DC] text-[#315C4C] shadow-xs">
                  <Camera className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#24211F]">
                    Foto QC Sebelum Pengantaran
                  </h4>
                  <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                    Dapatkan jaminan kepuasan dengan foto asli buket Anda sebelum kurir berangkat mengantarkannya.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E8E1DC] text-[#315C4C] shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#24211F]">
                    100% Garansi Bunga Segar
                  </h4>
                  <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                    Dipetik dan dirangkai dari bunga grade A terbaik agar keindahannya bertahan lama di pelukan penerima.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FAQ ACCORDION */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 border-t border-[#E8E1DC] bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                Pertanyaan Seputar Pemesanan Momen
              </h2>
              <p className="text-xs sm:text-sm text-[#766F69] mt-2">
                Informasi penting agar pengalaman gifting Anda berjalan sempurna
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#E8E1DC] bg-[#FAF8F5] transition overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-[#24211F] hover:text-[#315C4C]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#766F69] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#315C4C]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-[#766F69] leading-relaxed border-t border-[#E8E1DC]/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
