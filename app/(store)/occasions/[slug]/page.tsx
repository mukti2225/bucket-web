"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight,
  Sparkles, 
  ChevronRight, 
  ChevronDown,
  Truck,
  Camera,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";
import { OCCASIONS_DATA } from "../page";

export default function OccasionDetailPage() {
  const params = useParams();
  const rawSlug = ((params?.slug as string) || "birthday").toLowerCase();

  // Occasion Details & Content Mapping
  const occasionMap: Record<
    string,
    { 
      title: string; 
      subtitle: string; 
      occasionKey: string;
      tips: string;
      flowerRecommendation: string;
    }
  > = {
    birthday: {
      title: "Bunga Ulang Tahun (Birthday)",
      subtitle: "Buat hari kelahiran mereka terasa lebih istimewa dengan rangkaian bunga penuh warna dan keceriaan.",
      occasionKey: "Ulang Tahun",
      tips: "Pilih mawar pink atau peach yang cerah, dipadukan dengan baby's breath untuk kesan manis, atau bunga matahari untuk sahabat yang berenergi.",
      flowerRecommendation: "Mawar Pink, Hydrangea, Sunflower, Carnation Pastel",
    },
    anniversary: {
      title: "Bunga Anniversary & Perayaan Cinta",
      subtitle: "Ungkapkan rasa cinta dan perjalanan kasih berharga dengan keanggunan mawar premium memikat hati.",
      occasionKey: "Anniversary",
      tips: "Mawar merah beludru atau mawar fuschia adalah simbol klasik cinta sejati dan komitmen abadi. Sertakan pesan kartu tentang momen paling berkesan bagi Anda berdua.",
      flowerRecommendation: "Mawar Merah Beludru, Deep Rose, Mawar Putih, Lily",
    },
    graduation: {
      title: "Bunga Wisuda & Kelulusan (Graduation)",
      subtitle: "Rayakan kelulusan dan pencapaian akademik istimewa dengan buket bunga cerah bersemangat.",
      occasionKey: "Wisuda",
      tips: "Bunga matahari adalah simbol prestasi, kebanggaan, dan masa depan yang cerah. Ukuran buket sedang atau besar sangat fotogenik untuk sesi foto toga wisuda.",
      flowerRecommendation: "Bunga Matahari, Mawar Kuning Lemon, Chamomile, Boneka Wisuda",
    },
    romantic: {
      title: "Bunga Romantis & Kasih Sayang",
      subtitle: "Sentuhan romantis tak terlupakan dengan nuansa mawar merah beludru super premium.",
      occasionKey: "Romantic",
      tips: "Kombinasi mawar merah dengan kertas wrapping hitam midnight atau burgundy memberikan kontras dramatis yang mewah dan eksklusif.",
      flowerRecommendation: "Mawar Merah Super Beludru, Pink Spray Roses, Eucalyptus",
    },
    congratulations: {
      title: "Bunga Ucapan Selamat & Sukses",
      subtitle: "Sambut pembukaan bisnis, promosi karier, atau pencapaian baru dengan kemegahan rangkaian bunga.",
      occasionKey: "Congratulations",
      tips: "Warna cerah seperti oranye, kuning, dan putih melambangkan kemakmuran, energi sukses, dan awal yang gemilang.",
      flowerRecommendation: "Bunga Matahari, Lily Casablanca, Krisan Emas, Hydrangea",
    },
    "get-well-soon": {
      title: "Bunga Get Well Soon (Lekas Sembuh)",
      subtitle: "Hadirkan kehangatan, doa kesembuhan, dan aroma segar bagi sahabat atau keluarga tercinta.",
      occasionKey: "Get Well Soon",
      tips: "Pilih bunga beraroma lembut yang tidak menyengat dengan warna pastel yang menenangkan pikiran dan meredakan stres.",
      flowerRecommendation: "Lavender, Chamomile, Mawar Pastel, Gerbera",
    },
    pernikahan: {
      title: "Bunga Pernikahan & Pertunangan",
      subtitle: "Keanggunan murni mawar putih avalanche dan lily untuk hari bahagia yang sakral.",
      occasionKey: "Pernikahan",
      tips: "Nuansa putih bersih dan sentuhan krem pastel mencerminkan kesucian janji suci dan keabadian cinta.",
      flowerRecommendation: "Mawar Avalanche White, Casablanca Lily, Baby's Breath",
    },
    condolence: {
      title: "Bunga Belasungkawa & Simpati",
      subtitle: "Sampaikan rasa simpati mendalam dan penghormatan tulus dengan tenang dan khidmat.",
      occasionKey: "Simpati",
      tips: "Rangkaian bernuansa putih dan hijau dedaunan lembut memberikan ketenangan dan menunjukkan rasa hormat yang mendalam kepada keluarga duka.",
      flowerRecommendation: "Krisan Putih, Mawar Putih, Lily Putih, Foliage",
    },
    "just-because": {
      title: "Bunga Just Because (Apresiasi Spontan)",
      subtitle: "Kejutan manis spontan tanpa harus menunggu tanggal khusus, kapan pun kamu ingin berbagi senyuman.",
      occasionKey: "Spontan",
      tips: "Hadiah tanpa alasan sering kali menjadi hadiah yang paling membekas di hati penerima karena ketulusannya yang murni.",
      flowerRecommendation: "Sweet Blush, Pastel Harmony, Carnation Mix",
    },
  };

  const currentOccasion = occasionMap[rawSlug] || {
    title: `Bunga untuk Momen ${rawSlug.replace(/-/g, " ")}`,
    subtitle: "Pilihan buket bunga terindah yang dirangkai segar khusus untuk momen ini.",
    occasionKey: rawSlug,
    tips: "Pilih buket dengan komposisi bunga segar terbaik dan tambahkan kartu ucapan personal.",
    flowerRecommendation: "Mawar Segar, Carnation, Baby's Breath",
  };

  // Filter matching products
  const matchingProducts = PRODUCTS.filter((p) =>
    p.occasions.some(
      (occ) =>
        occ.toLowerCase().includes(currentOccasion.occasionKey.toLowerCase()) ||
        occ.toLowerCase().includes(rawSlug) ||
        (rawSlug === "birthday" && occ.toLowerCase().includes("ulang tahun")) ||
        (rawSlug === "anniversary" && occ.toLowerCase().includes("anniversary")) ||
        (rawSlug === "graduation" && occ.toLowerCase().includes("wisuda")) ||
        (rawSlug === "romantic" && (occ.toLowerCase().includes("romantic") || occ.toLowerCase().includes("valentine"))) ||
        (rawSlug === "congratulations" && occ.toLowerCase().includes("congratulations")) ||
        (rawSlug === "get-well-soon" && occ.toLowerCase().includes("get well soon")) ||
        (rawSlug === "pernikahan" && occ.toLowerCase().includes("pernikahan"))
    )
  );

  const displayedProducts = matchingProducts.length > 0 ? matchingProducts : PRODUCTS.slice(0, 4);

  // Related occasions (excluding current)
  const relatedOccasions = OCCASIONS_DATA.filter((o) => o.slug !== rawSlug).slice(0, 3);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const occasionFaqs = [
    {
      q: `Apakah buket ${currentOccasion.title} bisa ditambah boneka atau cokelat?`,
      a: "Tentu! Saat memilih produk atau pada halaman Hadiah (/gifts), Anda dapat menambahkan pelengkap seperti cokelat artisan, boneka teddy, dan lilin aromaterapi.",
    },
    {
      q: "Bagaimana jika penerima sedang tidak ada di tempat saat kurir tiba?",
      a: "Kurir kami akan menghubungi nomor telepon/WhatsApp penerima yang Anda cantumkan di form checkout untuk konfirmasi penerimaan aman (misal: resepsionis atau pihak keluarga).",
    },
    {
      q: "Apakah kartu ucapan bisa ditulis panjang?",
      a: "Kartu ucapan Florétta dapat memuat hingga 200 karakter, dicetak rapi dengan font kaligrafi elegan dan diselipkan pada buket bunga Anda.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. OCCASION HERO & BREADCRUMB */}
        {/* ========================================================================= */}
        <section className="border-b border-[#E8E1DC] bg-[#FAF8F5] py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-[#766F69] mb-4">
              <Link href="/" className="hover:text-[#315C4C] transition">Beranda</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/occasions" className="hover:text-[#315C4C] transition">Momen Spesial</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#24211F] font-semibold">{currentOccasion.title.split("(")[0]}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#F1D8D4] bg-[#F9ECE9] px-3 py-1 text-xs font-semibold text-[#C97878] mb-3 shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Koleksi Momen Pilihan</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#24211F] leading-tight">
                  {currentOccasion.title}
                </h1>
                <p className="mt-2.5 text-sm sm:text-base text-[#766F69] leading-relaxed max-w-xl">
                  {currentOccasion.subtitle}
                </p>
              </div>

              <div className="shrink-0 text-xs text-[#766F69]">
                Menampilkan <span className="font-semibold text-[#24211F]">{displayedProducts.length} buket bunga</span>
              </div>
            </div>

            {/* QUICK SWITCHER PILLS */}
            <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-medium text-[#766F69] shrink-0 mr-1">Momen Lain:</span>
              {OCCASIONS_DATA.map((tab) => {
                const isActive = rawSlug === tab.slug;
                return (
                  <Link
                    key={tab.slug}
                    href={`/occasions/${tab.slug}`}
                    className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                      isActive
                        ? "bg-[#315C4C] text-white shadow-xs"
                        : "bg-white border border-[#E8E1DC] text-[#766F69] hover:border-[#315C4C]/40 hover:text-[#24211F]"
                    }`}
                  >
                    {tab.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. PRODUCT GRID (3-4 columns desktop, 2 columns mobile) */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {displayedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="rounded-3xl border border-[#E8E1DC] bg-[#FAF8F5] p-12 text-center max-w-lg mx-auto">
                <Sparkles className="h-10 w-10 text-[#C97878] mx-auto mb-3" />
                <h3 className="font-serif text-lg font-semibold text-[#24211F]">
                  Belum ada rangkaian spesifik untuk momen ini
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#766F69] leading-relaxed">
                  Lihat koleksi utama bunga kami untuk menemukan buket bunga cantik lainnya.
                </p>
                <Link
                  href="/products"
                  className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#315C4C] px-6 text-xs font-semibold text-white shadow-md hover:bg-[#284C3F] transition"
                >
                  Lihat Semua Bunga
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. HELPFUL CONTENT (GIFTING ADVICE & COMPOSITION TIPS) */}
        {/* ========================================================================= */}
        <section className="border-t border-[#E8E1DC] bg-[#FAF8F5] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-10 shadow-xs">
              <div className="max-w-2xl mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                  Panduan Memilih Bunga untuk {currentOccasion.title.split("(")[0]}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-[#766F69] leading-relaxed">
                  {currentOccasion.tips}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E8E1DC]/70">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#24211F]">Rekomendasi Bunga</h4>
                    <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                      {currentOccasion.flowerRecommendation}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#24211F]">Foto QC Bunga Asli</h4>
                    <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                      Florist kami mengirimkan foto buket Anda sebelum kurir mengantar ke penerima.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#24211F]">Tiba di Jam yang Tepat</h4>
                    <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                      Pilihan 3 slot waktu pengiriman untuk memastikan kejutan tiba di momen terbaik.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. RELATED OCCASIONS */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#24211F]">
                  Momen Spesial Terkait
                </h2>
                <p className="text-xs sm:text-sm text-[#766F69] mt-0.5">
                  Jelajahi momen perayaan berharga lainnya
                </p>
              </div>
              <Link
                href="/occasions"
                className="text-xs font-semibold text-[#315C4C] hover:underline flex items-center gap-1"
              >
                <span>Lihat Semua Momen</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedOccasions.map((occ) => (
                <Link
                  key={occ.slug}
                  href={`/occasions/${occ.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8E1DC] bg-white transition-all hover:shadow-lg hover:-translate-y-1 hover:border-[#315C4C]/40"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7F3F0]">
                    <Image
                      src={occ.image}
                      alt={occ.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-base font-semibold text-[#24211F] group-hover:text-[#315C4C] transition-colors">
                        {occ.name}
                      </h3>
                      <p className="mt-1 text-xs text-[#766F69] line-clamp-2">
                        {occ.subtitle}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#E8E1DC]/60 flex items-center justify-between text-xs text-[#315C4C] font-semibold">
                      <span>Mulai {occ.priceStart}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. FAQ SECTION */}
        {/* ========================================================================= */}
        <section className="py-12 border-t border-[#E8E1DC] bg-[#FAF8F5]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#24211F] text-center mb-6">
              Pertanyaan Umum untuk {currentOccasion.title.split("(")[0]}
            </h2>

            <div className="space-y-3">
              {occasionFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#E8E1DC] bg-white transition overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-[#24211F] hover:text-[#315C4C]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#766F69] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#315C4C]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-[#766F69] leading-relaxed border-t border-[#E8E1DC]/60 pt-3">
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
