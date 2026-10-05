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
  ChevronLeft,
  Star, 
  ChevronDown, 
  ChevronUp,
  ArrowUpRight
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useCart } from "@/context/CartContext";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>("Semua");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({
    "prod-1": true,
  });

  const filterTabs = [
    "Semua",
    "Bunga Segar",
    "Hand Bouquet",
    "Romantis",
    "Hadiah",
  ] as const;

  // Occasions with Arch-shaped cards matching the reference design
  const occasions = [
    {
      name: "Ulang Tahun",
      slug: "birthday",
      image: "/ultah.jpg",
    },
    {
      name: "Anniversary",
      slug: "anniversary",
      image: "/aniv.jpg",
    },
    {
      name: "Wisuda",
      slug: "graduation",
      image: "/grad.jpg",
    },
    {
      name: "Valentine",
      slug: "valentine",
      image: "/valentine.jpg",
    },
    {
      name: "Pernikahan",
      slug: "wedding",
      image: "/married.jpg",
    },
    {
      name: "Get Well Soon",
      slug: "get-well-soon",
      image: "/gws.jpg",
    },
  ];

  // 4 Featured Products matching the reference screenshot cards
  const featuredBouquets = [
    {
      id: "prod-1",
      slug: "sweet-blush",
      name: "Sweet Blush",
      price: 599000,
      priceFormatted: "Rp 599.000",
      rating: "4.9",
      reviews: "128",
      badge: "Terlaris",
      image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=85",
      category: "Hand Bouquet",
      occasions: ["Ulang Tahun", "Romantis"],
    },
    {
      id: "prod-2",
      slug: "rose-dream",
      name: "Rose Dream",
      price: 749000,
      priceFormatted: "Rp 749.000",
      rating: "4.8",
      reviews: "94",
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=85",
      category: "Bunga Segar",
      occasions: ["Anniversary", "Romantis"],
    },
    {
      id: "prod-3",
      slug: "sunshine-day",
      name: "Sunshine Day",
      price: 529000,
      priceFormatted: "Rp 529.000",
      rating: "4.9",
      reviews: "74",
      image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=85",
      category: "Bunga Segar",
      occasions: ["Wisuda", "Ulang Tahun"],
    },
    {
      id: "prod-4",
      slug: "white-serenade",
      name: "White Serenade",
      price: 689000,
      priceFormatted: "Rp 689.000",
      rating: "4.8",
      reviews: "82",
      image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=85",
      category: "Hadiah",
      occasions: ["Pernikahan", "Romantis"],
    },
  ];

  // Filter products based on active tab
  const displayedProducts =
    activeTab === "Semua"
      ? featuredBouquets
      : featuredBouquets.filter(
          (p) =>
            p.category.toLowerCase() === activeTab.toLowerCase() ||
            p.occasions.some((occ) => occ.toLowerCase() === activeTab.toLowerCase())
        );

  const testimonials = [
    {
      name: "Priska Anindya",
      location: "Anniversary • Semanggi",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      comment: "Bunganya cantik banget, bahkan lebih wangi dan fresh dari foto. Pelayanan cepat dan sangat membantu!",
    },
    {
      name: "Dimas Suryo",
      location: "Wisuda • Jakarta",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      comment: "Buket custom wisuda adik hasilnya persis seperti impian. Foto QC dikirim detail sebelum kurir jalan.",
    },
    {
      name: "Clara Tanuwidjaja",
      location: "Birthday • Serpong",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      comment: "Pengiriman 100% on time dan bunganya diantar dalam kemasan khusus. Penerimanya bahagia banget.",
    },
  ];

  const faqs = [
    {
      q: "Apakah bunga yang dikirim pasti segar?",
      a: "Ya, 100%. Florétta memanen dan merangkai bunga langsung dari petani mitra dataran tinggi terpercaya. Bunga dijamin tahan kesegaran 3-5 hari dengan panduan perawatan dan food packet yang kami sertakan pada setiap rangkaian.",
    },
    {
      q: "Bisakah melakukan pengiriman di hari yang sama (Same-Day Delivery)?",
      a: "Tentu bisa! Untuk area Jabodetabek dan kota besar, pesanan yang masuk sebelum batas jam operasional (15.00 WIB) dapat dikirimkan pada hari yang sama dengan kurir khusus pendingin (chilled courier).",
    },
    {
      q: "Apakah saya mendapatkan foto rangkaian sebelum dikirim (QC Photo)?",
      a: "Pasti. Begitu florist kami selesai merangkai pesananmu, sistem kami akan mengambil foto Quality Check (QC Photo) beresolusi tinggi dan langsung menyediakannya di halaman lacak pesanan sebelum diserahkan ke kurir pengantar.",
    },
    {
      q: "Apakah bisa request kartu ucapan dan pesan khusus?",
      a: "Tentu. Setiap buket sudah termasuk opsi kartu ucapan gratis. Kamu bisa menuliskan pesan personal hingga 200 karakter yang akan dicetak pada kartu bertekstur elegan.",
    },
  ];

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION - Full-bleed image matching reference */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-[#FAF8F5] min-h-[460px] lg:min-h-[520px]">

          {/* Hero Image — bleeds right to viewport edge */}
          <div className="absolute inset-y-0 right-0 w-full lg:w-[58%] h-full">
            {/* Left-fade gradient so left text stays readable */}
            <div className="absolute inset-y-0 left-0 z-10 w-2/3 lg:w-56 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/70 to-transparent pointer-events-none" />
            {/* Bottom fade on mobile */}
            <div className="absolute bottom-0 inset-x-0 z-10 h-20 bg-gradient-to-t from-[#FAF8F5] to-transparent pointer-events-none lg:hidden" />

            <Image
              src="/hero-image2.jpg"
              alt="Buket Bunga Florétta — Rangkaian Bunga Segar Premium"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
          </div>

          {/* Left text content — sits above the image layer */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-14 lg:py-20 max-w-md space-y-6">

              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F1D8D4] bg-[#F9ECE9] px-3.5 py-1 text-xs font-medium text-[#C97878] shadow-xs">
                <span>🌸</span>
                <span>Florétta • Bunga &amp; Gifting Premium</span>
              </div>

              {/* Main H1 Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] font-normal leading-[1.12] tracking-tight text-[#24211F]">
                Bunga untuk <br />
                <span className="italic font-serif font-light text-[#315C4C]">Setiap Cerita</span> <br />
                Berharga
              </h1>

              {/* Subtitle */}
              <p className="max-w-sm text-sm sm:text-[15px] leading-relaxed text-[#766F69]">
                Rangkaian bunga segar dan hadiah istimewa untuk orang-orang terdekat, di setiap momen bermakna. Dibuat dengan ketelitian tinggi oleh florist profesional.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#315C4C] px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#284C3F] hover:shadow-md active:scale-95"
                >
                  <span>Belanja Bunga</span>
                  <ArrowRight className="h-4 w-4 animate-bounce-x" />
                </Link>

                <Link
                  href="/custom-bouquet"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DFD7CE] bg-white/90 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-[#24211F] transition-all duration-200 hover:border-[#315C4C] hover:text-[#315C4C] active:scale-95"
                >
                  <Sparkles className="h-4 w-4 text-[#C97878]" />
                  <span>Custom Bouquet</span>
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-3.5">
                <div className="flex -space-x-2 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 text-[#C58A32]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#C58A32]" />
                    ))}
                    <span className="font-semibold text-[#24211F] ml-1">4.9/5</span>
                    <span className="text-[#766F69]">(1.2k review)</span>
                  </div>
                  <p className="text-[11px] text-[#766F69] mt-0.5">
                    Dipercaya oleh 10.000+ pelanggan
                  </p>
                </div>
              </div>

            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 2. VALUE PROPOSITIONS BAR 1 */}
        {/* ========================================================================= */}
        <section className="border-y border-[#E8E1DC] bg-white py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3F0] text-[#315C4C]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#24211F]">Bunga Segar Pilihan</h4>
                  <p className="text-[11px] text-[#766F69]">Langsung dari petani lokal</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3F0] text-[#315C4C]">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#24211F]">Pengiriman Tepat Waktu</h4>
                  <p className="text-[11px] text-[#766F69]">Di seluruh Indonesia</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3F0] text-[#315C4C]">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#24211F]">Custom Sesuai Keinginan</h4>
                  <p className="text-[11px] text-[#766F69]">Untuk momen spesial</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3F0] text-[#315C4C]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#24211F]">Pembayaran Aman</h4>
                  <p className="text-[11px] text-[#766F69]">100% terpercaya</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PILIH MOMEN SPESIALMU - Arch Shape Cards */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Heading & View All */}
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C97878]">
                  Temukan Momenmu
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#24211F] mt-1">
                  Pilih Momen Spesialmu
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#766F69]">
                  Temukan koleksi bunga yang dirancang khusus untuk mewakili perasaanmu.
                </p>
              </div>

              <Link
                href="/products"
                className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#24211F] hover:text-[#315C4C]"
              >
                <span>Lihat Semua</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* 6 Arch-topped Cards Grid matching reference */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 sm:gap-5">
              {occasions.map((occ) => (
                <Link
                  key={occ.name}
                  href={`/occasions/${occ.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  {/* ARCH SHAPE CONTAINER: rounded-t-full rounded-b-2xl */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-[85px] rounded-b-sm bg-[#F7F3F0] shadow-xs transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                    <Image
                      src={occ.image}
                      alt={occ.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover"
                    />

                    {/* Small circular button with arrow at bottom right */}
                    <div className="absolute bottom-2.5 right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-xs transition-all duration-200 group-hover:bg-[#315C4C] group-hover:text-white">
                      <ArrowUpRight className="h-3.5 w-3.5 text-[#24211F] group-hover:text-white" />
                    </div>
                  </div>

                  <h3 className="mt-3 text-xs sm:text-sm font-medium text-[#24211F] group-hover:text-[#315C4C] transition-colors">
                    {occ.name}
                  </h3>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. RANGKAIAN PILIHAN - On Soft Blush Pink Background */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-[#FDF3F1] border-y border-[#F3E3DF]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#C97878]">
                  Koleksi Terbaik
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#24211F] mt-1">
                  Rangkaian Pilihan
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#766F69]">
                  Temukan buket kami yang paling banyak mendatangkan senyuman penerima minggu ini.
                </p>
              </div>

              <Link
                href="/products"
                className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#766F69] hover:text-[#315C4C]"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Filter Pills */}
            <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {filterTabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-5 py-2 text-xs font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? "bg-[#315C4C] text-white shadow-xs font-semibold"
                      : "bg-transparant border border-[#E8E1DC] text-[#315C4C] hover:text-[#24211F] hover:border-[#315C4C]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 4 Products Cards Grid — Reference Design */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {displayedProducts.map((p) => (
                <div
                  key={p.id}
                  className="group relative flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <Link href={`/products/${p.slug}`} className="flex flex-col h-full">
                    {/* Image Area */}
                    <div className="relative aspect-[3/3] w-full overflow-hidden rounded-xl rounded-b-none bg-[#F7F3F0]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Top left badge if any */}
                      {p.badge && (
                        <div className="absolute top-2.5 left-2.5 rounded-full bg-[#C97878] px-3 py-1 text-[10px] font-semibold text-white shadow-sm">
                          {p.badge}
                        </div>
                      )}

                      {/* Top right wishlist heart button */}
                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(p.id, e)}
                        className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md"
                        aria-label="Simpan ke favorit"
                      >
                        <Heart
                          className={`h-4 w-4 transition-colors ${
                            wishlist[p.id] ? "fill-[#C97878] text-[#C97878]" : "text-[#9CA3AF]"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Product Info — below image, no border */}
                    <div className="pt-6 pb-6 px-3">
                      <div className="mb-2 flex items-center gap-1 text-xs text-[#766F69]">
                        <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
                        <span className="font-medium text-[#1C1C1C]">{p.rating}</span>
                        <span className="text-[#9CA3AF]">({p.reviews})</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#1C1C1C] leading-snug group-hover:text-[#315C4C] transition-colors">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-[#1C1C1C]">
                        {p.priceFormatted}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. FLORIST WORKSHOP BANNER - "Rangkaian Sesuai Cerita Kamu" */}
        {/* ========================================================================= */}
        <section className="bg-white">
          <div className="mx-auto">
            <div className="relative min-h-[380px] flex items-center">
              
              {/* Background Image of Florist Arranging */}
              <Image
                src="/img-cta.webp"
                alt="Florist Merangkai Bunga"
                fill
                className="object-cover object-right"
              />

              {/* Dark Gradient Overlay on the Left Side */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />

              {/* Left Content */}
              <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-xl space-y-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-white/80">
                  <Sparkles className="h-3.5 w-3.5 text-[#F4DDD8] animate-spin-slow" />
                  <span>Personalized Flower Experience</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-white">
                  Rangkaian Sesuai <br />
                  Cerita Kamu
                </h2>

                <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-md">
                  Ceritakan ide dan momen spesialmu, kami bantu wujudkan dalam rangkaian bunga yang unik, personal, dan berkesan bagi orang terkasih.
                </p>

                <div className="pt-2">
                  <Link
                    href="/custom-bouquet"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-[#24211F] shadow-sm transition-all hover:bg-[#F7EFE4] hover:shadow-md active:scale-95"
                  >
                    <span>Custom Bouquet</span>
                    <ArrowRight className="h-4 w-4 animate-bounce-x" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. TESTIMONIALS - Infinite Horizontal Marquee */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-white border-t border-[#E8E1DC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto space-y-1 mb-12">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#315C4C]">
                Cerita Bahagia
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#24211F]">
                Dipercaya Ribuan Senyuman
              </h2>
              <p className="text-xs sm:text-sm text-[#766F69]">
                Simak pengalaman nyata pelanggan yang telah mengabadikan momen bersama Florétta.
              </p>
            </div>

          </div>

          {/* Marquee — full-width, overflow hidden */}
          <div className="relative overflow-hidden marquee-wrapper">
            {/* Left fade mask */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
            {/* Right fade mask */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />

            {/* Scrolling track — contains 2× the cards for seamless loop */}
            <div className="flex gap-5 animate-marquee" style={{ width: "max-content" }}>
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-[#E8E1DC] bg-white p-6 shadow-xs w-[300px] sm:w-[340px] shrink-0"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-0.5 text-[#C58A32]">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-[#C58A32]"
                          style={{ animation: `star-pulse 2s ease-in-out ${i * 0.3}s infinite` }}
                        />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-[#24211F] leading-relaxed italic">
                      &ldquo;{t.comment}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-5 mt-4 border-t border-[#E8E1DC]/70">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="h-9 w-9 rounded-full object-cover border border-[#E8E1DC]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#24211F]">{t.name}</p>
                      <p className="text-[10px] text-[#766F69]">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ========================================================================= */}
        {/* 7. FAQ SECTION - On Warm Blush Background with 2-Column Layout */}
        {/* ========================================================================= */}
        <section id="faq" className="relative overflow-hidden py-14 sm:py-20 bg-[#FDF4F2]">

          {/* Decorative illustration — background bottom-left */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-0 w-64 sm:w-80 lg:w-[420px] select-none opacity-[0.16]">
            <Image
              src="/ilustrasi-faq.png"
              alt=""
              width={400}
              height={400}
              className="w-full h-auto object-contain"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
              
              {/* Left Column: Heading & CTA */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#C97878]">
                  <span>Pusat Bantuan</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight text-[#24211F]">
                  Pertanyaan yang <br />
                  Sering Diajukan
                </h2>

                <p className="text-xs sm:text-sm text-[#766F69] leading-relaxed max-w-sm">
                  Semua yang perlu Anda ketahui tentang pemesanan dan pengiriman bunga segar kami.
                </p>

              </div>

              {/* Right Column: 4 Accordion Cards */}
              <div className="lg:col-span-7 space-y-3">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-xl bg-white transition-all shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-[#24211F] hover:text-[#315C4C]"
                      >
                        <span className="pr-4">{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 shrink-0 text-[#315C4C]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0 text-[#766F69]" />
                        )}
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
