"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Tag, 
  BarChart3, 
  Settings, 
  Calendar, 
  Bell, 
  Search, 
  ChevronRight, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { formatCurrency } from "@/utils/currency";

export default function AdminDashboardPage() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const sidebarLinks = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Pesanan", icon: ShoppingBag, badge: "12" },
    { name: "Produk", icon: Package },
    { name: "Pelanggan", icon: Users },
    { name: "Promo", icon: Tag },
    { name: "Laporan", icon: BarChart3 },
    { name: "Pengaturan", icon: Settings },
  ];

  // Orders matching reference mockup 6
  const recentOrders = [
    {
      id: "#FD250616-00123",
      customer: "Budi Santoso",
      product: "Sweet Blush",
      total: 629000,
      status: "Sedang Dirangkai",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      time: "10:24",
    },
    {
      id: "#FD250616-00122",
      customer: "Siti Rahma",
      product: "Red Romance",
      total: 799000,
      status: "Menunggu Pembayaran",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      time: "09:15",
    },
    {
      id: "#FD250616-00121",
      customer: "Andi Pratama",
      product: "Lavender Love",
      total: 599000,
      status: "Dikirim",
      statusColor: "bg-purple-50 text-purple-700 border-purple-200",
      time: "08:40",
    },
    {
      id: "#FD250616-00120",
      customer: "Dewi Lestari",
      product: "White Elegance",
      total: 749000,
      status: "Selesai",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      time: "08:12",
    },
    {
      id: "#FD250616-00119",
      customer: "Rina Wijaya",
      product: "Sunshine Day",
      total: 529000,
      status: "Sedang Dirangkai",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      time: "07:50",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F3F0]/60">
      
      {/* LEFT SIDEBAR: Dark Botanical Green (#1B3A2F / #315C4C) - Matching Reference 6 */}
      <aside className="hidden w-64 flex-col bg-[#1E3A2F] text-white lg:flex shrink-0">
        {/* Brand Header */}
        <div className="flex h-20 items-center gap-3 px-6 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#F4DDD8]">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V12m4.5 0a4.5 4.5 0 1 1-4.5 4.5M16.5 12H12m-4.5 0a4.5 4.5 0 1 0 4.5 4.5M7.5 12H12m0 4.5V21" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#F7EFE4]">
              Florétta
            </span>
            <p className="text-[10px] text-white/60 tracking-wider uppercase font-sans">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 space-y-1.5 px-3 py-6">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveMenu(item.name)}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/15 text-white font-semibold shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="rounded-full bg-[#C97878] px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Return to Store Link */}
        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-xs font-semibold text-white/90 hover:bg-white/20 transition"
          >
            <span>Kembali ke Toko Web</span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Bar */}
        <header className="flex h-20 items-center justify-between border-b border-[#E8E1DC] bg-white px-6 lg:px-8">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#24211F]">
              Dashboard
            </h1>
            <p className="text-xs text-[#766F69]">
              Ringkasan performa toko hari ini.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Date Badge */}
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#E8E1DC] bg-[#FFFDFC] px-3.5 py-1.5 text-xs font-medium text-[#24211F]">
              <Calendar className="h-3.5 w-3.5 text-[#315C4C]" />
              <span>Sen, 16 Jun 2025</span>
            </div>

            {/* Notification bell */}
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E1DC] text-[#766F69] hover:bg-[#F7F3F0]"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#C97878]" />
            </button>

            {/* User Profile Avatar */}
            <div className="flex items-center gap-2.5 border-l border-[#E8E1DC] pl-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#315C4C] text-xs font-bold text-white">
                AD
              </div>
              <div className="hidden md:block text-left text-xs">
                <p className="font-semibold text-[#24211F]">Admin Florétta</p>
                <p className="text-[#766F69]">Manager Store</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-6 lg:p-8 space-y-8">
          
          {/* 4 STAT CARDS - Exactly as in Reference 6 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1: Pesanan Hari Ini */}
            <div className="rounded-3xl border border-[#E8E1DC] bg-white p-5 shadow-xs">
              <span className="text-xs font-semibold text-[#766F69]">Pesanan Hari Ini</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-serif text-3xl font-bold text-[#24211F]">28</span>
                <span className="inline-flex items-center text-xs font-semibold text-[#3F7D5A] bg-[#F2F6EF] px-2 py-0.5 rounded-full">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12% dari kemarin
                </span>
              </div>
            </div>

            {/* Card 2: Total Penjualan */}
            <div className="rounded-3xl border border-[#E8E1DC] bg-white p-5 shadow-xs">
              <span className="text-xs font-semibold text-[#766F69]">Total Penjualan</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-sans text-xl font-bold text-[#315C4C]">
                  Rp 24.560.000
                </span>
                <span className="inline-flex items-center text-xs font-semibold text-[#3F7D5A] bg-[#F2F6EF] px-2 py-0.5 rounded-full">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +8% dari kemarin
                </span>
              </div>
            </div>

            {/* Card 3: Pesanan Diproses */}
            <div className="rounded-3xl border border-[#E8E1DC] bg-white p-5 shadow-xs">
              <span className="text-xs font-semibold text-[#766F69]">Pesanan Diproses</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-serif text-3xl font-bold text-[#24211F]">12</span>
                <span className="text-xs font-medium text-[#C58A32]">
                  Dalam pengerjaan
                </span>
              </div>
            </div>

            {/* Card 4: Pesanan Selesai */}
            <div className="rounded-3xl border border-[#E8E1DC] bg-white p-5 shadow-xs">
              <span className="text-xs font-semibold text-[#766F69]">Pesanan Selesai</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-serif text-3xl font-bold text-[#24211F]">14</span>
                <span className="text-xs font-medium text-[#3F7D5A]">
                  Selesai hari ini
                </span>
              </div>
            </div>

          </div>

          {/* RECENT ORDERS TABLE CARD - Exactly as in Reference 6 */}
          <div className="rounded-3xl border border-[#E8E1DC] bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-4 mb-4">
              <div>
                <h2 className="font-serif text-lg font-bold text-[#24211F]">
                  Pesanan Terbaru
                </h2>
                <p className="text-xs text-[#766F69]">
                  Daftar transaksi pesanan bunga yang masuk hari ini.
                </p>
              </div>

              <button
                type="button"
                className="group flex items-center gap-1 text-xs font-semibold text-[#315C4C] hover:underline"
              >
                <span>Lihat Semua</span>
                <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E8E1DC] text-[#766F69]">
                    <th className="pb-3 font-semibold"># Pesanan</th>
                    <th className="pb-3 font-semibold">Pelanggan</th>
                    <th className="pb-3 font-semibold">Produk</th>
                    <th className="pb-3 font-semibold">Total</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E1DC]/60">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-[#F7F3F0]/40 transition">
                      <td className="py-3.5 font-mono font-medium text-[#315C4C]">
                        <Link href="/track-order" className="hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="py-3.5 font-medium text-[#24211F]">
                        {order.customer}
                      </td>
                      <td className="py-3.5 text-[#24211F]">
                        {order.product}
                      </td>
                      <td className="py-3.5 font-semibold text-[#24211F]">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${order.statusColor}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-medium text-[#766F69]">
                        {order.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
