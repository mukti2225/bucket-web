"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Gift, 
  ChevronRight, 
  ChevronDown,
  PackageCheck
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { formatCurrency } from "@/utils/currency";
import { useCart } from "@/context/CartContext";

interface GiftItem {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  description: string;
}

interface GiftBundle {
  id: string;
  name: string;
  includes: string[];
  price: number;
  originalPrice: number;
  image: string;
  badge: string;
  description: string;
}

export default function GiftsPage() {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const categories = [
    "Semua",
    "Cokelat Artisan",
    "Boneka Teddy",
    "Vas Keramik",
    "Lilin & Kartu",
    "Gift Set",
  ];

  const giftBundles: GiftBundle[] = [
    {
      id: "bundle-sweet-celebration",
      name: "Sweet Celebration Set",
      includes: ["Buket Mawar Pink Segar", "Cokelat Artisan Belgia", "Kartu Ucapan Kaligrafi"],
      price: 669000,
      originalPrice: 720000,
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=700&q=80",
      badge: "Paling Populer",
      description: "Paduan harmonis bunga mawar segar dengan cokelat artisan import untuk momen ulang tahun atau anniversary.",
    },
    {
      id: "bundle-graduation-joy",
      name: "Graduation Joy Set",
      includes: ["Buket Bunga Matahari", "Boneka Teddy Wisuda Toga", "Kartu Ucapan Khusus"],
      price: 589000,
      originalPrice: 640000,
      image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=700&q=80",
      badge: "Best Value",
      description: "Hadiah kelulusan komplit dan ceria untuk menyambut masa depan yang gemilang.",
    },
    {
      id: "bundle-romantic-luxury",
      name: "Romantic Luxury Hamper",
      includes: ["Flower Box Mawar Merah", "Cokelat Praline Box", "Scented Candle Lavender"],
      price: 849000,
      originalPrice: 950000,
      image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=700&q=80",
      badge: "Eksklusif",
      description: "Paket mewah dalam hardbox magnetik pita satin untuk kejutan romantis yang tak terlupakan.",
    },
  ];

  const individualGifts: GiftItem[] = [
    {
      id: "gift-choco-artisan",
      name: "Cokelat Premium Artisan",
      category: "Cokelat Artisan",
      price: 75000,
      originalPrice: 85000,
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80",
      badge: "Terlaris",
      description: "Cokelat batangan artisan dark & milk chocolate dengan taburan kacang almond panggang.",
    },
    {
      id: "gift-teddy-mini",
      name: "Boneka Teddy Mini Soft Cream",
      category: "Boneka Teddy",
      price: 59000,
      image: "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=600&q=80",
      description: "Boneka beruang bulu halus 15cm dengan pita satin, pelengkap manis di samping buket.",
    },
    {
      id: "gift-teddy-wisuda",
      name: "Boneka Teddy Wisuda Bertoga",
      category: "Boneka Teddy",
      price: 69000,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80",
      badge: "Wisuda",
      description: "Teddy bear berpakaian toga lengkap dengan ijazah gulung, siap merayakan kelulusan.",
    },
    {
      id: "gift-nordic-vase",
      name: "Vas Keramik Nordic Minimalis",
      category: "Vas Keramik",
      price: 89000,
      originalPrice: 110000,
      image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=600&q=80",
      badge: "Estetik",
      description: "Vas keramik matte bertekstur lembut untuk merawat bunga potong di meja kerja atau ruang tamu.",
    },
    {
      id: "gift-candle-lavender",
      name: "Scented Candle French Lavender",
      category: "Lilin & Kartu",
      price: 65000,
      image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80",
      description: "Lilin aromaterapi lilin kedelai alami dengan aroma lavender Prancis yang menenangkan jiwa.",
    },
    {
      id: "gift-greeting-hardcover",
      name: "Kartu Ucapan Hardcover Handwritten",
      category: "Lilin & Kartu",
      price: 15000,
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
      description: "Kertas bertekstur linen tebal dengan amplop segel lilin wax seal bergaya vintage.",
    },
    {
      id: "gift-ferrero-box",
      name: "Ferrero Rocher Praline (8 pcs)",
      category: "Cokelat Artisan",
      price: 95000,
      image: "https://images.unsplash.com/photo-1548848221-0c2e497ed557?auto=format&fit=crop&w=600&q=80",
      badge: "Favorit",
      description: "Cokelat hazelnut klasik berbalut emas yang selalu cocok untuk segala perayaan.",
    },
    {
      id: "gift-foil-balloon",
      name: "Balon Foil Kaligrafi Love / Birthday",
      category: "Lilin & Kartu",
      price: 35000,
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
      description: "Balon foil helium dengan tulisan kaligrafi emas elegan penambah kemeriahan kejutan.",
    },
  ];

  const filteredGifts = selectedCategory === "Semua" 
    ? individualGifts 
    : individualGifts.filter((g) => g.category === selectedCategory);

  const handleAddToCart = (gift: GiftItem) => {
    addItem({
      productId: gift.id,
      name: gift.name,
      image: gift.image,
      variantName: "Standard",
      variantPrice: gift.price,
      addons: [],
      quantity: 1,
    });

    setAddedItemIds((prev) => ({ ...prev, [gift.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [gift.id]: false }));
    }, 1500);
  };

  const handleAddBundleToCart = (bundle: GiftBundle) => {
    addItem({
      productId: bundle.id,
      name: bundle.name,
      image: bundle.image,
      variantName: "Gift Set",
      variantPrice: bundle.price,
      addons: [],
      quantity: 1,
    });

    setAddedItemIds((prev) => ({ ...prev, [bundle.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [bundle.id]: false }));
    }, 1500);
  };

  const faqs = [
    {
      q: "Apakah item hadiah bisa dibeli terpisah tanpa buket bunga?",
      a: "Tentu bisa! Anda dapat memesan gift set atau hadiah satuan secara langsung, atau memadukannya dengan pesanan buket bunga segar Anda.",
    },
    {
      q: "Bagaimana cara pengemasan hadiah agar tetap aman saat diantar?",
      a: "Setiap hadiah dikemas dalam kotak pelindung khusus berlabel Florétta, lengkap dengan kantong anti benturan agar kue, cokelat, atau vas tiba dalam kondisi mulus sempurna.",
    },
    {
      q: "Apakah cokelat akan meleleh selama proses pengantaran?",
      a: "Kami menggunakan kurir berpendingin khusus untuk pesanan yang mencakup cokelat atau cake, sehingga suhu tetap terjaga stabil hingga tiba di tangan penerima.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. GIFT HERO (Section 8: "Lengkapi hadiah mereka") */}
        {/* ========================================================================= */}
        <section className="border-b border-[#E8E1DC] bg-[#FAF8F5] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-[#766F69] mb-4">
              <Link href="/" className="hover:text-[#315C4C] transition">Beranda</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#24211F] font-semibold">Hadiah &amp; Pelengkap</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F1D8D4] bg-[#F9ECE9] px-3.5 py-1 text-xs font-medium text-[#C97878] mb-4 shadow-xs">
                  <Gift className="h-3.5 w-3.5" />
                  <span>Koleksi Hadiah &amp; Personal Add-ons</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#24211F] leading-[1.18]">
                  Lengkapi hadiah mereka
                </h1>
                <p className="mt-3 text-sm sm:text-base text-[#766F69] leading-relaxed max-w-lg">
                  Tambahkan sesuatu yang kecil, personal, dan berarti — dari cokelat artisan, boneka teddy berbulu lembut, hingga vas keramik estetik.
                </p>
              </div>

              {/* Quick highlight banner */}
              <div className="rounded-2xl border border-[#E8E1DC] bg-white p-4 sm:p-5 shadow-xs max-w-sm">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#315C4C] mb-2">
                  <PackageCheck className="h-4 w-4" />
                  <span>Kemasan Hadiah Eksklusif</span>
                </div>
                <p className="text-xs text-[#766F69] leading-relaxed">
                  Semua hadiah dikemas dalam gift box elegan dengan pita kain satin dan disatukan rapi bersama buket pilihan Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FEATURED GIFT SETS (Bundles) */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 border-b border-[#E8E1DC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#315C4C]/10 px-3 py-1 text-xs font-semibold text-[#315C4C] mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Paket Hemat Terpadu</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                Featured Gift Sets
              </h2>
              <p className="text-xs sm:text-sm text-[#766F69] mt-1">
                Kombinasi buket bunga segar dan hadiah manis siap kirim dalam satu paket
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {giftBundles.map((bundle) => {
                const isAdded = addedItemIds[bundle.id];
                return (
                  <div
                    key={bundle.id}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-[#E8E1DC] bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#315C4C]/40"
                  >
                    <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#F7F3F0]">
                      <Image
                        src={bundle.image}
                        alt={bundle.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />
                      <span className="absolute top-3 left-3 rounded-full bg-[#C97878] px-3 py-0.5 text-xs font-semibold text-white shadow-xs">
                        {bundle.badge}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[#24211F] group-hover:text-[#315C4C] transition-colors">
                          {bundle.name}
                        </h3>
                        <p className="mt-1.5 text-xs text-[#766F69] leading-relaxed">
                          {bundle.description}
                        </p>

                        {/* Bundle Inclusions */}
                        <div className="mt-4 pt-3 border-t border-[#E8E1DC]/60">
                          <p className="text-[11px] font-semibold text-[#24211F] mb-1.5">Termasuk dalam paket:</p>
                          <ul className="space-y-1 text-xs text-[#766F69]">
                            {bundle.includes.map((inc, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#315C4C]" />
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#E8E1DC]/80 flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-bold text-[#315C4C]">
                              {formatCurrency(bundle.price)}
                            </span>
                            {bundle.originalPrice && (
                              <span className="text-xs text-[#766F69] line-through">
                                {formatCurrency(bundle.originalPrice)}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#3F7D5A] font-medium">Hemat {formatCurrency(bundle.originalPrice - bundle.price)}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddBundleToCart(bundle)}
                          className={`flex h-10 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-semibold transition active:scale-95 cursor-pointer ${
                            isAdded
                              ? "bg-[#3F7D5A] text-white"
                              : "bg-[#315C4C] text-white hover:bg-[#284C3F] shadow-sm"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="h-4 w-4" />
                              <span>Ditambahkan</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="h-4 w-4" />
                              <span>Tambah Set</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INDIVIDUAL GIFTS & ADD-ONS CATALOG */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
                  Koleksi Hadiah Pelengkap
                </h2>
                <p className="text-xs sm:text-sm text-[#766F69] mt-1">
                  Pilih item favorit untuk diselipkan bersama buket bunga Anda
                </p>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition shrink-0 cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#315C4C] text-white shadow-xs"
                        : "bg-white border border-[#E8E1DC] text-[#766F69] hover:border-[#315C4C]/40 hover:text-[#24211F]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Gift Items Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredGifts.map((gift) => {
                const isAdded = addedItemIds[gift.id];
                return (
                  <div
                    key={gift.id}
                    className="group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-3.5 sm:p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#315C4C]/40"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#F7F3F0]">
                        <Image
                          src={gift.image}
                          alt={gift.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-106"
                        />
                        {gift.badge && (
                          <span className="absolute top-2.5 left-2.5 rounded-full bg-[#C97878] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
                            {gift.badge}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="mt-3">
                        <span className="text-[10px] font-medium text-[#766F69] uppercase tracking-wider">
                          {gift.category}
                        </span>
                        <h3 className="font-serif text-sm sm:text-base font-semibold text-[#24211F] line-clamp-1 mt-0.5 group-hover:text-[#315C4C] transition-colors">
                          {gift.name}
                        </h3>
                        <p className="mt-1 text-xs text-[#766F69] line-clamp-2 leading-relaxed">
                          {gift.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action & Price */}
                    <div className="mt-4 pt-3 border-t border-[#E8E1DC]/60 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold text-[#24211F]">
                          {formatCurrency(gift.price)}
                        </span>
                        {gift.originalPrice && (
                          <span className="block text-[10px] text-[#766F69] line-through">
                            {formatCurrency(gift.originalPrice)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(gift)}
                        aria-label={`Tambah ${gift.name}`}
                        className={`flex h-8.5 items-center justify-center gap-1.5 rounded-full px-3.5 text-xs font-semibold transition active:scale-95 cursor-pointer ${
                          isAdded
                            ? "bg-[#3F7D5A] text-white"
                            : "bg-[#F2F6EF] text-[#315C4C] hover:bg-[#315C4C] hover:text-white"
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Masuk</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-3.5 w-3.5" />
                            <span>Tambah</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. FLOWERS + GIFTS CTA (Section 8) */}
        {/* ========================================================================= */}
        <section className="py-14 sm:py-20 bg-[#FAF8F5] border-y border-[#E8E1DC]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#F1D8D4] bg-[#F9ECE9] px-3.5 py-1 text-xs font-medium text-[#C97878] mb-3">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Paduan Sempurna</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-semibold text-[#24211F] leading-snug">
                  Padukan Hadiah Anda dengan Rangkaian Bunga Segar
                </h2>
                <p className="mt-3 text-sm text-[#766F69] leading-relaxed max-w-xl">
                  Bunga menyampaikan rasa, hadiah melengkapi cerita. Temukan buket bunga mawar, matahari, atau flower box yang paling sesuai untuk penerima hadiah Anda.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#315C4C] px-6 text-xs font-semibold text-white shadow-md transition hover:bg-[#284C3F]"
                  >
                    <span>Jelajahi Buket Bunga</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/occasions"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#E8E1DC] bg-white px-6 text-xs font-semibold text-[#24211F] transition hover:bg-[#FAF8F5]"
                  >
                    <span>Pilih Berdasarkan Momen</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
                    alt="Buket Mawar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm mt-6">
                  <Image
                    src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80"
                    alt="Cokelat & Hadiah"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TRUST & DELIVERY NOTE */}
        {/* ========================================================================= */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#24211F]">Kurir Terkontrol Suhu</h4>
                  <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                    Cokelat dan makanan pendamping diantar dalam ruang pendingin steril agar tidak meleleh.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#24211F]">Kualitas Bahan Premium</h4>
                  <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                    Kami hanya bekerja sama dengan chocolatier dan artisan teruji untuk menjamin rasa terbaik.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#24211F]">Kartu Ucapan Gratis</h4>
                  <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                    Setiap paket hadiah telah mencakup kartu ucapan eksklusif yang dicetak dengan kata-kata pilihan Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FAQ SECTION */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 border-t border-[#E8E1DC] bg-[#FAF8F5]">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#24211F] text-center mb-6">
              Pertanyaan Seputar Hadiah Pelengkap
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
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
