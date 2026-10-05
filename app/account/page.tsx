"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingBag, 
  Users, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Truck,
  CreditCard,
  Camera,
  Ticket,
  ChevronRight,
  ShieldCheck,
  Star
} from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import { PRODUCTS } from "@/data/products";

export default function AccountOverviewPage() {
  const orderSteps = [
    { label: "Menunggu Bayar", count: 0, icon: CreditCard, href: "/account/orders" },
    { label: "Sedang Dirangkai", count: 1, icon: Sparkles, href: "/account/orders", highlight: true },
    { label: "Quality Check", count: 1, icon: Camera, href: "/account/orders" },
    { label: "Dalam Pengiriman", count: 0, icon: Truck, href: "/account/orders" },
    { label: "Pesanan Selesai", count: 2, icon: CheckCircle2, href: "/account/orders" },
  ];

  const vouchers = [
    { code: "FLORETTAONGKIR", title: "Gratis Ongkir Terjadwal", desc: "Potongan ongkos kirim s/d Rp30.000", valid: "Berlaku s/d 30 Jun 2025" },
    { code: "MOMENSPESIAL50", title: "Diskon Momen Spesial Rp50rb", desc: "Min. belanja Rp500.000 untuk Hand Bouquet", valid: "Berlaku s/d 20 Jun 2025" },
  ];

  const recommendedProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. SHOPEE-STYLE ORDER STATUS PIPELINE */}
      {/* ========================================================================= */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-4 mb-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-[#315C4C]" />
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#24211F]">
              Status Pesanan Saya
            </h2>
          </div>
          <Link
            href="/account/orders"
            className="text-xs font-semibold text-[#315C4C] hover:underline flex items-center gap-1"
          >
            <span>Lihat Riwayat Semua Pesanan</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 5 Step Icons (Shopee Style) */}
        <div className="grid grid-cols-5 gap-2 sm:gap-4 text-center">
          {orderSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Link
                key={idx}
                href={step.href}
                className="group flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-[#FAF8F5] transition"
              >
                <div className="relative">
                  <div className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl transition ${
                    step.highlight
                      ? "bg-[#315C4C] text-white shadow-xs"
                      : "bg-[#F2F6EF] text-[#315C4C] group-hover:scale-105"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  {step.count > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#C97878] text-[10px] font-bold text-white shadow-xs">
                      {step.count}
                    </span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-[#24211F] line-clamp-1">
                  {step.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. UPCOMING REMINDER SPOTLIGHT & ACTIVE VOUCHERS GRID */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Spotlight Pengingat (7 Kolom) */}
        <div className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-[#C97878]/30 bg-gradient-to-br from-[#FFFDFC] via-[#FDF5F3] to-[#FBF0EE] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C97878] px-3 py-0.5 text-xs font-semibold text-white shadow-xs">
                <Sparkles className="h-3 w-3" />
                <span>Pengingat Terdekat • 7 Hari Lagi</span>
              </span>
              <span className="text-xs font-semibold text-[#766F69]">16 Juni 2025</span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#24211F] mt-3">
              Ulang Tahun Cantika Budi Santosa (Pasangan)
            </h3>
            <p className="text-xs text-[#766F69] mt-1.5 leading-relaxed">
              Catatan florist: Cantika menyukai mawar baby pink segar dengan aroma lembut dan baby breath. Rangkaian bunga Sweet Blush siap dipesan lebih awal.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-[#E8E1DC]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-[#3F7D5A] font-medium flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Slot pengiriman hari tersebut masih tersedia
            </span>
            <Link
              href="/products/sweet-blush"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#315C4C] px-5 text-xs font-semibold text-white shadow-xs hover:bg-[#284C3F] transition"
            >
              <span>Kirim Bunga Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Kupon & Voucher Shopee Style (5 Kolom) */}
        <div className="lg:col-span-5 rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-base font-bold text-[#24211F] flex items-center gap-1.5">
                <Ticket className="h-4 w-4 text-[#C97878]" />
                <span>Kupon Spesial Anda</span>
              </h3>
              <span className="text-[11px] font-semibold text-[#315C4C] bg-[#F2F6EF] px-2 py-0.5 rounded-full">
                2 Aktif
              </span>
            </div>

            <div className="space-y-3">
              {vouchers.map((v, i) => (
                <div key={i} className="flex items-center justify-between rounded-xl border border-dashed border-[#C97878]/60 bg-[#FAF8F5] p-3 text-xs">
                  <div>
                    <span className="font-bold text-[#24211F]">{v.title}</span>
                    <p className="text-[11px] text-[#766F69] mt-0.5">{v.desc}</p>
                    <p className="text-[10px] text-[#3F7D5A] font-medium mt-1">{v.valid}</p>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#C97878] bg-white px-2 py-1 rounded-lg border border-[#E8E1DC] shrink-0">
                    GUNAKAN
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-[11px] text-[#766F69] text-center pt-2 border-t border-[#E8E1DC]/60">
            Kupon otomatis diaplikasikan saat checkout pesanan.
          </p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. PESANAN TERAKHIR (SHOPEE STYLE ORDER CARD) */}
      {/* ========================================================================= */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white overflow-hidden shadow-xs">
        {/* Header Toko / Florist */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E1DC] bg-[#FAF8F5] px-6 py-3.5 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#24211F]">Florétta Workshop Jakarta</span>
            <span className="text-[#E8E1DC]">•</span>
            <span className="text-[#766F69]">No. Pesanan: FD250616-00123</span>
          </div>
          <span className="rounded-full bg-amber-50 border border-amber-200 px-3 py-0.5 text-xs font-semibold text-amber-700">
            Sedang Dirangkai oleh Florist
          </span>
        </div>

        {/* Item Content */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#F7F3F0] border border-[#E8E1DC]">
                <Image
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80"
                  alt="Sweet Blush"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="font-serif text-base font-semibold text-[#24211F]">
                  Sweet Blush Hand Bouquet
                </h4>
                <p className="text-xs text-[#766F69] mt-0.5">
                  Varian: <span className="font-medium text-[#24211F]">Regular (10 Mawar Pink Import)</span>
                </p>
                <p className="text-xs text-[#766F69]">
                  Tambahan: <span className="text-[#315C4C] font-medium">Kartu Ucapan Handwritten</span>
                </p>
                <p className="text-[11px] text-[#766F69] mt-1">
                  Penerima: Cantika Budi Santosa • Jadwal: 16 Jun 2025 (13.00 - 16.00)
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <span className="text-xs text-[#766F69]">Total Belanja</span>
              <p className="font-serif text-lg font-bold text-[#315C4C]">
                {formatCurrency(629000)}
              </p>
              <span className="text-[10px] text-[#3F7D5A] font-medium">Sudah Lunas via QRIS</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-4 border-t border-[#E8E1DC] flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#315C4C] font-semibold">
              <Camera className="h-4 w-4" />
              <span>Foto QC Bunga Segar Siap Dipantau</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/track-order"
                className="inline-flex h-9 items-center justify-center rounded-xl border border-[#E8E1DC] bg-white px-4 text-xs font-semibold text-[#24211F] hover:bg-[#FAF8F5] transition"
              >
                Lacak Pengiriman
              </Link>
              <Link
                href="/account/orders"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-[#315C4C] px-4 text-xs font-semibold text-white hover:bg-[#284C3F] transition shadow-2xs"
              >
                Detail Pesanan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. REKOMENDASI UNTUK ANDA (TOKOPEDIA / SHOPEE FEED STYLE) */}
      {/* ========================================================================= */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#24211F]">
              Rekomendasi Rangkaian Bunga untuk Anda
            </h3>
            <p className="text-xs text-[#766F69] mt-0.5">
              Pilihan buket bunga terlaris untuk perayaan momen berikutnya
            </p>
          </div>
          <Link
            href="/products"
            className="text-xs font-semibold text-[#315C4C] hover:underline flex items-center gap-1"
          >
            <span>Katalog Lengkap</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommendedProducts.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-[#E8E1DC]/80 bg-[#FAF8F5] p-3 transition hover:shadow-md hover:bg-white"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white mb-2.5">
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {p.badge && (
                    <span className="absolute top-2 left-2 rounded-full bg-[#C97878] px-2 py-0.5 text-[10px] font-semibold text-white">
                      {p.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-xs font-semibold text-[#24211F] group-hover:text-[#315C4C] transition-colors truncate">
                  {p.name}
                </h4>
                <p className="text-[11px] text-[#766F69] mt-0.5 truncate">{p.category}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#E8E1DC]/60 flex items-center justify-between">
                <span className="text-xs font-bold text-[#315C4C]">
                  {formatCurrency(p.price)}
                </span>
                <span className="flex items-center text-[10px] text-amber-500 font-medium">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-0.5" />
                  {p.rating}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
