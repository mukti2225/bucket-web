"use client";

import Link from "next/link";
import { 
  ShoppingBag, 
  Clock, 
  Truck, 
  AlertCircle, 
  ArrowUpRight, 
  Boxes, 
  TrendingUp, 
  Sparkles,
  ChevronRight,
  Camera,
  CheckCircle2
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/utils/currency";

export default function AdminDashboardPage() {
  // Operational Metrics matching DESIGN.md §37
  const metrics = [
    {
      title: "Pesanan Hari Ini",
      value: "28 Pesanan",
      change: "+14% vs kemarin",
      icon: ShoppingBag,
      color: "bg-[#315C4C]/10 text-[#315C4C]",
    },
    {
      title: "Pendapatan Hari Ini",
      value: formatCurrency(14850000),
      change: "18 transaksi lunas",
      icon: TrendingUp,
      color: "bg-[#3F7D5A]/10 text-[#3F7D5A]",
    },
    {
      title: "Perlu Dirangkai",
      value: "6 Rangkaian",
      change: "Prioritas slot siang",
      icon: Clock,
      color: "bg-blue-50 text-blue-700",
    },
    {
      title: "Siap Dikirim / Jalan",
      value: "9 Pesanan",
      change: "Kurir pendingin aktif",
      icon: Truck,
      color: "bg-purple-50 text-purple-700",
    },
    {
      title: "Menunggu Pembayaran",
      value: "3 Pesanan",
      change: "Auto-expire dalam 2 jam",
      icon: AlertCircle,
      color: "bg-amber-50 text-amber-700",
    },
    {
      title: "Stok Menipis (Low Stock)",
      value: "2 Varian Bunga",
      change: "Mawar Peach & Baby Breath",
      icon: Boxes,
      color: "bg-rose-50 text-[#C97878]",
    },
  ];

  const urgentOrders = [
    {
      orderNumber: "FD250616-00123",
      customer: "Budi Santoso",
      recipient: "Cantika Budi Santosa",
      product: "Sweet Blush (Regular)",
      slot: "13.00 - 16.00 WIB",
      status: "SEDANG_DIRANGKAI",
      statusLabel: "Sedang Dirangkai",
      statusVariant: "warning" as const,
      total: 629000,
    },
    {
      orderNumber: "FD250616-00121",
      customer: "Andi Pratama",
      recipient: "Nadia Utami",
      product: "Lavender Love Box",
      slot: "13.00 - 16.00 WIB",
      status: "QUALITY_CHECK",
      statusLabel: "Perlu Foto QC",
      statusVariant: "destructive" as const,
      total: 599000,
    },
    {
      orderNumber: "FD250616-00119",
      customer: "Rina Wijaya",
      recipient: "Dimas Suryo",
      product: "Sunshine Sunflower",
      slot: "10.00 - 13.00 WIB",
      status: "DIKIRIM",
      statusLabel: "Dalam Perjalanan",
      statusVariant: "default" as const,
      total: 529000,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F]">
            Ringkasan Operasional Hari Ini
          </h1>
          <p className="text-xs text-[#766F69] mt-1">
            Pantau status perangkaian, QC photo buket, dan pengiriman kurir secara langsung.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/admin/orders">
            <Button variant="primary" size="md" className="gap-2 text-xs">
              <ShoppingBag className="h-4 w-4" />
              <span>Kelola Semua Pesanan</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* OPERATIONAL METRICS GRID (DESIGN.md §37) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.title} className="p-5 border border-[#E8E1DC] transition-all hover:shadow-xs">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-[#766F69]">{m.title}</p>
                  <p className="font-serif text-2xl font-bold text-[#24211F] mt-1">
                    {m.value}
                  </p>
                  <p className="text-[11px] text-[#766F69] mt-1">
                    {m.change}
                  </p>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${m.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* URGENT FULFILLMENT QUEUE */}
      <Card className="border border-[#E8E1DC]">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[#E8E1DC]">
          <div>
            <CardTitle>Antrean Perangkaian & QC Mendesak</CardTitle>
            <p className="text-xs text-[#766F69] mt-0.5">
              Pesanan dengan jadwal kirim terdekat yang membutuhkan tindakan florist
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-[#315C4C] hover:underline inline-flex items-center gap-1"
          >
            <span>Buka Tabel Pesanan</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>

        <CardContent className="p-0 divide-y divide-[#E8E1DC]">
          {urgentOrders.map((ord) => (
            <div
              key={ord.orderNumber}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 hover:bg-[#F7F3F0]/40 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-semibold text-xs text-[#24211F]">
                    {ord.orderNumber}
                  </span>
                  <Badge variant={ord.statusVariant}>
                    {ord.statusLabel}
                  </Badge>
                  <span className="text-xs text-[#766F69] bg-[#F7F3F0] px-2 py-0.5 rounded-md">
                    Slot: {ord.slot}
                  </span>
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#24211F]">
                  {ord.product}
                </h4>
                <p className="text-xs text-[#766F69]">
                  Pemesan: <span className="font-medium text-[#24211F]">{ord.customer}</span> • Penerima: <span className="font-medium text-[#24211F]">{ord.recipient}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm text-[#315C4C] mr-2">
                  {formatCurrency(ord.total)}
                </span>
                <Link href="/admin/orders">
                  <Button variant="secondary" size="sm" className="text-xs h-9">
                    Perbarui Status
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* QUICK OPERATIONAL SHORTCUTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border border-[#E8E1DC]">
          <h4 className="font-serif text-sm font-semibold text-[#24211F] mb-1">
            Katalog Bunga & Produk
          </h4>
          <p className="text-xs text-[#766F69] mb-4">
            Atur ketersediaan buket, harga varian, dan foto tampilan katalog produk.
          </p>
          <Link href="/admin/products">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Kelola Produk
            </Button>
          </Link>
        </Card>

        <Card className="p-5 border border-[#E8E1DC]">
          <h4 className="font-serif text-sm font-semibold text-[#24211F] mb-1">
            Inventori Batang & Kertas Wrapping
          </h4>
          <p className="text-xs text-[#766F69] mb-4">
            Catat stok harian mawar impor, lily, pita satin, dan kartu ucapan.
          </p>
          <Link href="/admin/inventory">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Cek Inventori
            </Button>
          </Link>
        </Card>

        <Card className="p-5 border border-[#E8E1DC]">
          <h4 className="font-serif text-sm font-semibold text-[#24211F] mb-1">
            Pengaturan Toko & Jadwal Kirim
          </h4>
          <p className="text-xs text-[#766F69] mb-4">
            Kelola batasan jam order same-day, ongkos kirim per zona, dan teks banner pengumuman.
          </p>
          <Link href="/admin/settings">
            <Button variant="outline" size="sm" className="w-full text-xs">
              Pengaturan Toko
            </Button>
          </Link>
        </Card>
      </div>

    </div>
  );
}
