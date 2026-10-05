"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Heart,
  ChevronRight,
  Gift,
  Star,
  ChevronDown,
  Quote
} from "lucide-react";
import { OCCASIONS_LIST, PRODUCTS } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"Terlaris" | "Bunga Segar" | "Hand Bouquet" | "Flower Box" | "Hadiah">("Terlaris");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filterTabs = [
    "Terlaris",
    "Bunga Segar",
    "Hand Bouquet",
    "Flower Box",
    "Hadiah"
  ] as const;

  // Filter products based on active tab
  const displayedProducts = PRODUCTS.slice(0, 4);

  const faqs = [
    {
      q: "Apakah bunga yang dikirim pasti segar?",
      a: "Ya, 100%. Florétta memanen dan merangkai bunga langsung di hari pengiriman dari petani mitra dataran tinggi terpercaya. Bunga dijamin tahan kesegaran 3-5 hari dengan panduan perawatan yang kami sertakan.",
    },
    {
      q: "Bisakah melakukan pengiriman di hari yang sama (Same-Day Delivery)?",
      a: "Tentu bisa! Untuk area Jabodetabek dan kota besar, pesanan yang masuk sebelum pukul 15.00 WIB dapat dikirimkan pada hari yang sama dengan kurir khusus pendingin (chilled courier).",
    },
    {
      q: "Apakah saya mendapatkan foto rangkaian sebelum dikirim (QC Photo)?",
      a: "Pasti. Begitu florist kami selesai merangkai pesananmu, sistem kami akan mengambil foto Quality Check (QC Photo) beresolusi tinggi dan langsung mengirimkannya ke halaman lacak pesananmu.",
    },
    {
      q: "Apakah bisa request kartu ucapan dan pesan khusus?",
      a: "Tentu. Setiap buket sudah termasuk opsi kartu ucapan gratis. Kamu bisa menuliskan pesan personal hingga 200 karakter yang akan dicetak pada kartu bertekstur elegan.",
    },
  ];

  const testimonials = [
    {
      name: "Priska Anindya",
      occasion: "Anniversary 3rd Year",
      rating: 5,
      comment: "Bunganya cantik banget, bahkan lebih harum dan segar dari foto katalognya! Foto QC-nya dikirim tepat waktu sebelum dikirim ke kantor suamiku. Pelayanan bintang 5!",
    },
    {
      name: "Dimas Suryo",
      occasion: "Hadiah Wisuda Adik",
      rating: 5,
      comment: "Proses custom bouquet gampang banget di web ini. Warnanya sesuai request, bungkusnya rapi dan sangat premium. Adik saya suka sekali!",
    },
    {
      name: "Clara Tanuwidjaja",
      occasion: "Birthday Surprise",
      rating: 5,
      comment: "Paling tenang pesan di Florétta karena ada tracking real-time dan notifikasi foto buket. Terima kasih sudah membantu bikin hari sahabat saya berkesan.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION - Matching Reference 1 with gentle floating animation */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#F7EFE4]/60 via-[#FFFDFC] to-white py-12 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              
              {/* Left Column: Text & CTAs */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#C97878]/30 bg-[#F4DDD8]/40 px-3.5 py-1 text-xs font-medium text-[#C97878] shadow-xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Florist & Gifting Premium • Sejak 2018</span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] tracking-tight text-[#24211F]">
                  Bunga untuk <br className="hidden sm:inline" />
                  <span className="italic font-serif font-light text-[#315C4C]">Setiap Cerita</span> <br />
                  Berharga
                </h1>

                <p className="max-w-xl text-base sm:text-lg leading-relaxed text-[#766F69]">
                  Rangkaian bunga segar dan hadiah istimewa untuk orang-orang terdekat, di setiap momen bermakna. Dibuat tangan dengan ketelitian tinggi oleh florist profesional.
                </p>

                {/* Call to Actions */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#315C4C] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#284C3F] hover:shadow-lg hover:scale-[1.02] active:scale-95"
                  >
                    <span>Belanja Bunga</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/custom-bouquet"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#24211F]/20 bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#24211F] backdrop-blur-xs transition-all duration-200 hover:border-[#315C4C] hover:text-[#315C4C] hover:bg-white active:scale-95"
                  >
                    <Gift className="h-4 w-4 text-[#C97878]" />
                    <span>Custom Bouquet</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Arrangement Presentation */}
              <div className="lg:col-span-6">
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  {/* Decorative circular backdrop glow */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#F4DDD8]/70 via-[#F7EFE4]/80 to-[#A4B494]/30 blur-2xl -z-10" />

                  {/* Main Hero Bouquet Photo Container */}
                  <div className="relative aspect-[4/4.2] w-full overflow-hidden rounded-3xl border border-[#E8E1DC] bg-white p-3.5 shadow-2xl">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <Image
                        src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85"
                        alt="Sweet Blush Hand Bouquet Florétta"
                        fill
                        priority
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>

                    {/* Floating Greeting Card Tag with gentle float animation */}
                    <div className="absolute bottom-7 left-7 max-w-[210px] rounded-xl border border-[#E8E1DC]/80 bg-[#FFFDFC]/95 p-3.5 shadow-lg backdrop-blur-md animate-float">
                      <p className="font-serif italic text-xs text-[#315C4C] font-semibold">
                        Fresh Flowers
                      </p>
                      <p className="mt-1 text-[11px] text-[#766F69] leading-tight font-serif">
                        Brighten Days Ahead
                      </p>
                    </div>

                    {/* Floating Artistic Cursive Badge */}
                    <div className="absolute top-7 right-7 rounded-2xl bg-white/90 px-3.5 py-2 shadow-md backdrop-blur-xs border border-[#E8E1DC]/70">
                      <p className="font-serif italic text-xs text-[#24211F]">
                        &quot;Good Flowers Brighten People&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* VALUE PROPOSITION BANNER - 4 items matching reference */}
        <section className="border-y border-[#E8E1DC] bg-white py-7">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              <div className="flex items-center gap-3 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F2F6EF] text-[#315C4C] transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#24211F]">Bunga Segar Pilihan</h4>
                  <p className="text-[11px] text-[#766F69]">Langsung dari petani</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F2F6EF] text-[#315C4C] transition-transform duration-300 group-hover:scale-110">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#24211F]">Pengiriman Tepat Waktu</h4>
                  <p className="text-[11px] text-[#766F69]">Seluruh Indonesia</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F2F6EF] text-[#315C4C] transition-transform duration-300 group-hover:scale-110">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#24211F]">Custom Sesuai Keinginan</h4>
                  <p className="text-[11px] text-[#766F69]">Untuk momen spesial</p>
                </div>
              </div>

              <div className="flex items-center gap-3 group">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F2F6EF] text-[#315C4C] transition-transform duration-300 group-hover:scale-110">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#24211F]">Pembayaran Aman</h4>
                  <p className="text-[11px] text-[#766F69]">100% Terpercaya</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PILIH MOMEN SPESIALMU (OCCASIONS) - Matching Section 1 of reference */}
        <section id="occasions" className="py-14 sm:py-20 bg-[#FFFDFC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                  Pilih Momen Spesialmu
                </h2>
                <p className="mt-1 text-sm text-[#766F69]">
                  Temukan karangan bunga yang dirancang khusus untuk mewakili perasaanmu.
                </p>
              </div>

              <Link
                href="/products"
                className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#315C4C] hover:underline"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 6 Occasion Cards Grid with smooth hover lift */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
              {OCCASIONS_LIST.map((item) => (
                <Link
                  key={item.id}
                  href={`/products?occasion=${encodeURIComponent(item.id)}`}
                  className="group relative flex flex-col items-center rounded-2xl border border-[#E8E1DC] bg-white p-3 text-center transition-all duration-300 hover:border-[#315C4C] hover:shadow-lg hover:-translate-y-1.5"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F7F3F0]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-3 font-serif text-sm font-medium text-[#24211F] group-hover:text-[#315C4C] transition-colors">
                    {item.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* RANGKAIAN PILIHAN (FEATURED BOUQUETS) - Filter tabs & Product Grid */}
        <section className="py-14 sm:py-20 bg-[#F7EFE4]/30 border-t border-[#E8E1DC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                  Rangkaian Pilihan
                </h2>
                <p className="mt-1 text-sm text-[#766F69]">
                  Koleksi terfavorit yang paling banyak membahagiakan penerima minggu ini.
                </p>
              </div>

              <Link
                href="/products"
                className="group flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#315C4C] hover:underline"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Filter Tabs with tactile state */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 ${
                    activeTab === tab
                      ? "bg-[#315C4C] text-white shadow-sm font-semibold"
                      : "bg-white border border-[#E8E1DC] text-[#766F69] hover:border-[#315C4C] hover:text-[#24211F]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Product Cards Grid: 4 items matching reference */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {displayedProducts.map((product, idx) => (
                <ProductCard key={product.id} product={product} priority={idx < 2} />
              ))}
            </div>
          </div>
        </section>

        {/* RANGKAIAN SESUAI CERITA KAMU (CUSTOM BOUQUET BANNER) - Matching Reference */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#F7EFE4] p-8 sm:p-12 lg:p-16 border border-[#E8E1DC]">
              {/* Background delicate decorative pattern */}
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#F4DDD8]/50 blur-3xl -z-0" />

              <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C97878]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Personalized Flower Experience</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-[#24211F]">
                    Rangkaian Sesuai <br />
                    <span className="italic font-serif font-light text-[#315C4C]">Cerita Kamu</span>
                  </h2>

                  <p className="max-w-lg text-sm sm:text-base leading-relaxed text-[#766F69]">
                    Ceritakan ide dan momen spesialmu, kami bantu wujudkan dalam rangkaian bunga yang unik, personal, dan berkesan bagi orang tercinta.
                  </p>

                  <div className="pt-2">
                    <Link
                      href="/custom-bouquet"
                      className="inline-flex items-center gap-2 rounded-full bg-[#315C4C] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#284C3F] hover:shadow-lg active:scale-95"
                    >
                      <span>Custom Bouquet</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col items-center sm:items-end text-center sm:text-right">
                  <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl border border-white shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=700&q=80"
                      alt="Custom Bouquet Design"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 font-serif italic text-sm text-[#766F69]">
                    &quot;Karena setiap cerita layak dirayakan.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOMER TESTIMONIALS SECTION */}
        <section className="py-14 sm:py-20 bg-[#FFFDFC] border-t border-[#E8E1DC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-[#315C4C] uppercase tracking-wider">
                Cerita Bahagia
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                Dipercaya Ribuan Senyuman
              </h2>
              <p className="text-xs sm:text-sm text-[#766F69]">
                Simak pengalaman nyata pelanggan yang telah mengabadikan momen bersama Florétta.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-[#E8E1DC] bg-white p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-1 text-[#C58A32]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#C58A32]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#24211F] leading-relaxed italic">
                    &quot;{t.comment}&quot;
                  </p>
                  <div className="border-t border-[#E8E1DC] pt-3">
                    <p className="text-xs font-bold text-[#24211F]">{t.name}</p>
                    <p className="text-[11px] text-[#766F69]">{t.occasion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section id="faq" className="py-14 sm:py-20 bg-[#FDFBF7] border-t border-[#E8E1DC]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                Pertanyaan yang Sering Diajukan
              </h2>
              <p className="text-xs sm:text-sm text-[#766F69]">
                Semua yang perlu Anda ketahui tentang pemesanan dan pengiriman bunga segar kami.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-[#E8E1DC] bg-white transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-[#24211F] hover:text-[#315C4C]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 transition-transform duration-200 text-[#766F69] ${
                          isOpen ? "rotate-180 text-[#315C4C]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-[#766F69] leading-relaxed border-t border-[#E8E1DC]/40">
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
