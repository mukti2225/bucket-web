"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { 
  ShoppingBag, 
  Search, 
  Camera, 
  Truck, 
  CheckCircle2, 
  Clock, 
  X, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  RotateCcw
} from "lucide-react";
import { formatCurrency } from "@/utils/currency";

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: "MENUNGGU_BAYAR" | "SEDANG_DIRANGKAI" | "DIKIRIM" | "SELESAI" | "BATAL";
  statusLabel: string;
  statusBadgeClass: string;
  recipientName: string;
  deliveryDate: string;
  total: number;
  items: {
    name: string;
    variant: string;
    addon?: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  qcPhoto?: {
    url: string;
    timestamp: string;
    note: string;
  };
}

export default function AccountOrdersPage() {
  const [selectedTab, setSelectedTab] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQcPhoto, setSelectedQcPhoto] = useState<{
    url: string;
    orderNumber: string;
    timestamp: string;
    note: string;
  } | null>(null);

  const tabs = [
    { id: "ALL", label: "Semua" },
    { id: "MENUNGGU_BAYAR", label: "Belum Bayar" },
    { id: "SEDANG_DIRANGKAI", label: "Sedang Dirangkai" },
    { id: "DIKIRIM", label: "Dalam Pengiriman" },
    { id: "SELESAI", label: "Selesai" },
    { id: "BATAL", label: "Dibatalkan" },
  ];

  const orders: OrderItem[] = [
    {
      id: "ord-1",
      orderNumber: "FD250616-00123",
      date: "16 Jun 2025, 10:24",
      status: "SEDANG_DIRANGKAI",
      statusLabel: "Sedang Dirangkai",
      statusBadgeClass: "bg-amber-50 text-amber-700 border-amber-200",
      recipientName: "Cantika Budi Santosa",
      deliveryDate: "16 Jun 2025 (13.00 - 16.00 WIB)",
      total: 629000,
      items: [
        {
          name: "Sweet Blush Hand Bouquet",
          variant: "Regular (10 Mawar Pink Import)",
          addon: "Kartu Ucapan Handwritten",
          price: 599000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
        },
      ],
      qcPhoto: {
        url: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80",
        timestamp: "16 Jun 2025, 11:45 WIB",
        note: "Rangkaian mawar soft pink dan baby breath segar lolos uji QC kelopak mekar dan pita satin rapi.",
      },
    },
    {
      id: "ord-2",
      orderNumber: "FD250520-00891",
      date: "20 Mei 2025, 14:10",
      status: "SELESAI",
      statusLabel: "Selesai & Diterima",
      statusBadgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      recipientName: "Siti Aminah (Ibu)",
      deliveryDate: "20 Mei 2025 (10.00 - 13.00 WIB)",
      total: 799000,
      items: [
        {
          name: "White Serenade Casablanca Lily",
          variant: "Deluxe Edition",
          addon: "Cokelat Artisan Belgia",
          price: 769000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=600&q=80",
        },
      ],
      qcPhoto: {
        url: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=80",
        timestamp: "20 Mei 2025, 09:30 WIB",
        note: "Bunga lily putih mekar sempurna, telah diterima langsung oleh Ibu Siti Aminah.",
      },
    },
    {
      id: "ord-3",
      orderNumber: "FD250412-00445",
      date: "12 Apr 2025, 09:15",
      status: "SELESAI",
      statusLabel: "Selesai & Diterima",
      statusBadgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      recipientName: "Rian Pratama (Wisuda)",
      deliveryDate: "12 Apr 2025 (08.00 - 12.00 WIB)",
      total: 589000,
      items: [
        {
          name: "Sunshine Day Flower Bouquet",
          variant: "Regular",
          addon: "Boneka Teddy Wisuda Toga",
          price: 559000,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80",
        },
      ],
    },
  ];

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (selectedTab !== "ALL" && order.status !== selectedTab) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchNumber = order.orderNumber.toLowerCase().includes(query);
        const matchItem = order.items.some((it) => it.name.toLowerCase().includes(query));
        const matchRecipient = order.recipientName.toLowerCase().includes(query);
        if (!matchNumber && !matchItem && !matchRecipient) return false;
      }
      return true;
    });
  }, [selectedTab, searchQuery, orders]);

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. SHOPEE STYLE STATUS TABS */}
      {/* ========================================================================= */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white shadow-xs overflow-hidden">
        <div className="border-b border-[#E8E1DC] px-4">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-3.5 px-3 sm:px-5 text-xs font-semibold shrink-0 transition-all border-b-2 -mb-[1px] cursor-pointer ${
                    isActive
                      ? "border-[#315C4C] text-[#315C4C]"
                      : "border-transparent text-[#766F69] hover:text-[#24211F]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Bar inside Tab card */}
        <div className="p-4 bg-[#FAF8F5]">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#766F69]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pesanan berdasarkan nama produk, nomor pesanan, atau nama penerima..."
              className="w-full rounded-xl border border-[#E8E1DC] bg-white pl-10 pr-4 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C] focus:ring-1 focus:ring-[#315C4C]"
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ORDERS LIST (SHOPEE STYLE ORDER CARDS) */}
      {/* ========================================================================= */}
      <div className="space-y-5">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white overflow-hidden shadow-xs transition hover:shadow-sm"
            >
              {/* Order Card Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E1DC] bg-[#FAF8F5] px-5 sm:px-6 py-3.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#24211F]">Florétta Workshop</span>
                  <span className="text-[#E8E1DC]">•</span>
                  <span className="text-[#766F69]">{order.orderNumber}</span>
                  <span className="text-[#E8E1DC]">•</span>
                  <span className="text-[#766F69]">{order.date}</span>
                </div>

                <span className={`rounded-full border px-3 py-0.5 text-xs font-semibold ${order.statusBadgeClass}`}>
                  {order.statusLabel}
                </span>
              </div>

              {/* Order Items */}
              <div className="p-5 sm:p-6 space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#F7F3F0] border border-[#E8E1DC]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-base font-semibold text-[#24211F]">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#766F69] mt-0.5">
                          Varian: <span className="text-[#24211F] font-medium">{item.variant}</span>
                        </p>
                        {item.addon && (
                          <p className="text-xs text-[#315C4C]">
                            + {item.addon}
                          </p>
                        )}
                        <p className="text-xs text-[#766F69] mt-0.5">
                          Jumlah: {item.quantity}x
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-sm font-bold text-[#24211F]">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Delivery & Recipient info snippet */}
                <div className="rounded-xl bg-[#FAF8F5] p-3 text-xs text-[#766F69] flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[#E8E1DC]/60">
                  <div>
                    Penerima: <span className="font-semibold text-[#24211F]">{order.recipientName}</span>
                  </div>
                  <div>
                    Jadwal Kirim: <span className="font-semibold text-[#24211F]">{order.deliveryDate}</span>
                  </div>
                </div>

                {/* Total & Action Buttons Bar */}
                <div className="pt-4 border-t border-[#E8E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#766F69]">Total Pesanan:</span>
                    <span className="ml-2 font-serif text-lg font-bold text-[#315C4C]">
                      {formatCurrency(order.total)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {order.qcPhoto && (
                      <button
                        type="button"
                        onClick={() => setSelectedQcPhoto({
                          url: order.qcPhoto!.url,
                          orderNumber: order.orderNumber,
                          timestamp: order.qcPhoto!.timestamp,
                          note: order.qcPhoto!.note,
                        })}
                        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-[#315C4C] bg-white px-3.5 text-xs font-semibold text-[#315C4C] hover:bg-[#F2F6EF] transition cursor-pointer"
                      >
                        <Camera className="h-4 w-4" />
                        <span>Foto QC</span>
                      </button>
                    )}

                    <Link
                      href="/track-order"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-[#E8E1DC] bg-white px-4 text-xs font-semibold text-[#24211F] hover:bg-[#FAF8F5] transition"
                    >
                      <Truck className="h-3.5 w-3.5 text-[#766F69]" />
                      <span>Lacak Pesanan</span>
                    </Link>

                    <Link
                      href="/products"
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#315C4C] px-4 text-xs font-semibold text-white hover:bg-[#284C3F] transition shadow-2xs"
                    >
                      <span>Beli Lagi</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="rounded-3xl border border-[#E8E1DC] bg-white p-12 text-center shadow-xs">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF8F5] border border-[#E8E1DC] text-[#766F69] mx-auto mb-3">
              <ShoppingBag className="h-8 w-8 text-[#C97878]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#24211F]">
              Belum Ada Pesanan di Tab Ini
            </h3>
            <p className="mt-1 text-xs text-[#766F69] max-w-sm mx-auto">
              Semua rangkaian bunga dan hadiah yang Anda pesan akan tercatat rapi di halaman ini.
            </p>
            <Link
              href="/products"
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#315C4C] px-6 text-xs font-semibold text-white hover:bg-[#284C3F] transition shadow-xs"
            >
              <span>Mulai Belanja Bunga</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. QC PHOTO MODAL (Florist Verification Preview) */}
      {/* ========================================================================= */}
      {selectedQcPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-[#315C4C]" />
                <h3 className="font-serif text-base font-bold text-[#24211F]">
                  Foto Asli Quality Check (QC)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQcPhoto(null)}
                className="rounded-full p-1 text-[#766F69] hover:bg-[#FAF8F5] transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#F7F3F0] border border-[#E8E1DC]">
              <Image
                src={selectedQcPhoto.url}
                alt="QC Buket Bunga"
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-4 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-[#766F69]">
                <span>No. Pesanan: <b className="text-[#24211F]">{selectedQcPhoto.orderNumber}</b></span>
                <span>Waktu QC: <b className="text-[#24211F]">{selectedQcPhoto.timestamp}</b></span>
              </div>
              <p className="text-[#766F69] bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E1DC]/60 leading-relaxed">
                🌿 {selectedQcPhoto.note}
              </p>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedQcPhoto(null)}
                className="rounded-full bg-[#315C4C] px-5 py-2 text-xs font-semibold text-white hover:bg-[#284C3F] transition cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
