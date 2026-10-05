"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { 
  Check, 
  Clock, 
  Share2, 
  Truck, 
  Sparkles, 
  Package, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  MapPin,
  Camera,
  X,
  Phone
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/currency";

export default function OrderTrackingDetailPage() {
  const params = useParams();
  const orderNumber = (params?.orderNumber as string) || "FD250616-00123";
  const [copied, setCopied] = useState(false);
  const [showQcModal, setShowQcModal] = useState(false);

  // 8-stage timeline conforming strictly to AGENTS.md §18
  const timelineStages = [
    {
      title: "Pesanan Diterima (Order Received)",
      time: "16 Jun 2025, 10:20 WIB",
      desc: "Pesanan telah masuk ke sistem operasional Florétta.",
      isDone: true,
      isActive: false,
    },
    {
      title: "Pembayaran Dikonfirmasi (Payment Confirmed)",
      time: "16 Jun 2025, 10:24 WIB",
      desc: "Pembayaran terverifikasi via QRIS Instant Midtrans.",
      isDone: true,
      isActive: false,
    },
    {
      title: "Persiapan Batang Segar (Preparing)",
      time: "16 Jun 2025, 11:00 WIB",
      desc: "Tangkai mawar soft pink dan dedaunan eucalyptus dipersiapkan dari pendingin bunga.",
      isDone: true,
      isActive: false,
    },
    {
      title: "Sedang Dirangkai (Arrangement in Progress)",
      time: "16 Jun 2025, 11:30 WIB",
      desc: "Florist ahli kami sedang merangkai buket bunga dengan wrapping kertas matte cream.",
      isDone: true,
      isActive: false,
    },
    {
      title: "Quality Check & Foto QC",
      time: "16 Jun 2025, 12:15 WIB",
      desc: "Rangkaian telah melewati standar kualitas florist dan foto QC siap dilihat.",
      isDone: true,
      isActive: true,
      hasQcPhoto: true,
    },
    {
      title: "Siap Diserahkan ke Kurir (Ready for Delivery)",
      time: "Estimasi 12:45 WIB",
      desc: "Buket dikemas dalam gift box pelindung kedap guncangan.",
      isDone: false,
      isActive: false,
    },
    {
      title: "Dalam Pengiriman Kurir Chilled (Out for Delivery)",
      time: "Estimasi 13.00 - 15.00 WIB",
      desc: "Kurir Florétta Express sedang dalam perjalanan menuju lokasi penerima.",
      isDone: false,
      isActive: false,
    },
    {
      title: "Pesanan Tiba & Diterima (Delivered)",
      time: "Estimasi 15.30 WIB",
      desc: "Hadiah bunga diterima dengan senyuman hangat oleh penerima.",
      isDone: false,
      isActive: false,
    },
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 bg-[#F7F3F0]/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Link
                href="/account/orders"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#766F69] hover:text-[#315C4C]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Riwayat Pesanan</span>
              </Link>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F] mt-1">
                Lacak Status Pesanan
              </h1>
              <p className="text-xs text-[#766F69] mt-0.5">
                Pantau proses perangkaian florist dan perjalanan kurir pengantar secara langsung.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs"
              onClick={handleShare}
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copied ? "Tautan Tersalin" : "Bagikan Status"}</span>
            </Button>
          </div>

          <div className="space-y-6">
            
            {/* ORDER OVERVIEW CARD */}
            <Card className="p-6 border border-[#E8E1DC] bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1DC] pb-4">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#766F69]">
                    Nomor Pesanan
                  </span>
                  <p className="font-mono text-xl font-bold text-[#315C4C]">
                    #{orderNumber}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="warning" className="px-3 py-1">
                    Tahap: Quality Check (QC)
                  </Badge>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#766F69]">
                <div>
                  <span className="font-semibold text-[#24211F] block mb-0.5">Penerima Hadiah:</span>
                  <p className="text-[#24211F]">Cantika Budi Santosa (Pasangan)</p>
                  <p>0812-3456-7890</p>
                </div>

                <div>
                  <span className="font-semibold text-[#24211F] block mb-0.5">Alamat Tujuan:</span>
                  <p className="text-[#24211F] line-clamp-2">Jl. Melati No. 10, Kebayoran Baru, Jakarta Selatan</p>
                </div>

                <div>
                  <span className="font-semibold text-[#24211F] block mb-0.5">Jadwal Kirim:</span>
                  <p className="text-[#315C4C] font-semibold">Sen, 16 Jun 2025</p>
                  <p>Slot Siang (13.00 - 16.00 WIB)</p>
                </div>
              </div>
            </Card>

            {/* QC PHOTO SPOTLIGHT (AGENTS.md §19 & DESIGN.md §32) */}
            <div className="relative overflow-hidden rounded-2xl border border-[#315C4C]/30 bg-gradient-to-r from-[#F4DDD8]/40 via-[#FFFDFC] to-white p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#315C4C]/10 px-3 py-1 text-xs font-semibold text-[#315C4C]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Quality Check Telah Selesai</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#24211F]">
                    Foto Rangkaian Asli Buket Anda (QC Photo)
                  </h3>
                  <p className="text-xs text-[#766F69] max-w-md leading-relaxed">
                    Florist kami telah selesai merangkai buket mawar segar pilihanmu. Lihat hasil aslinya sebelum bunga diserahkan kepada kurir pengantar.
                  </p>
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      className="gap-2"
                      onClick={() => setShowQcModal(true)}
                    >
                      <Camera className="h-4 w-4" />
                      <span>Lihat Foto QC Resolusi Penuh</span>
                    </Button>
                  </div>
                </div>

                <div
                  onClick={() => setShowQcModal(true)}
                  className="relative h-36 w-36 cursor-pointer overflow-hidden rounded-2xl border-2 border-white shadow-md transition-transform hover:scale-105 shrink-0"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80"
                    alt="QC Photo Sweet Blush"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-[11px] font-semibold text-white bg-black/60 px-2 py-1 rounded-md">
                      Perbesar
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* VERTICAL TIMELINE - AGENTS.md §18 & DESIGN.md §31 */}
            <Card className="p-6 sm:p-8 border border-[#E8E1DC] bg-white">
              <h2 className="font-serif text-lg font-semibold text-[#24211F] mb-6">
                Riwayat Garis Waktu Pengiriman
              </h2>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8E1DC]">
                {timelineStages.map((stage, idx) => (
                  <div key={stage.title} className="relative">
                    {/* Node indicator */}
                    <div
                      className={`absolute -left-[27px] top-1 flex h-6 w-6 items-center justify-center rounded-full text-white text-[11px] transition-all ${
                        stage.isActive
                          ? "bg-[#315C4C] ring-4 ring-[#315C4C]/20 ring-offset-1"
                          : stage.isDone
                          ? "bg-[#3F7D5A]"
                          : "bg-white border-2 border-[#DFD7CE] text-[#766F69]"
                      }`}
                    >
                      {stage.isDone ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h4 className={`text-sm font-semibold ${stage.isActive ? "text-[#315C4C] font-bold" : "text-[#24211F]"}`}>
                          {stage.title}
                        </h4>
                        <span className="text-[11px] text-[#766F69]">
                          {stage.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#766F69] leading-relaxed">
                        {stage.desc}
                      </p>

                      {stage.hasQcPhoto && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setShowQcModal(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#315C4C] hover:underline"
                          >
                            <Camera className="h-3.5 w-3.5" />
                            <span>Buka Foto Pengecekan Kualitas</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

          </div>
        </div>
      </main>

      {/* QC PHOTO FULLSCREEN MODAL */}
      {showQcModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-[#E8E1DC]">
            <div className="flex items-center justify-between border-b border-[#E8E1DC] p-4">
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#24211F]">
                  Foto Pengecekan Kualitas (QC Photo)
                </h4>
                <p className="text-[11px] text-[#766F69]">
                  Pesanan #{orderNumber} • 16 Jun 2025, 12:15 WIB
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowQcModal(false)}
                className="rounded-lg p-1.5 text-[#766F69] hover:bg-[#F7F3F0]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-4/3 w-full bg-[#F7F3F0]">
              <Image
                src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80"
                alt="QC Photo Sweet Blush Full"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-5 bg-[#FFFDFC] space-y-3">
              <div className="rounded-xl bg-[#F7EFE4] p-3 text-xs text-[#24211F] border border-[#E8E1DC]">
                <span className="font-semibold text-[#315C4C] block mb-0.5">
                  Laporan Florist Florétta:
                </span>
                Buket Sweet Blush (Regular) dirangkai dengan 12 mawar soft pink segar, baby&apos;s breath import pilihan, dan eucalyptus parvifolia. Kartu ucapan telah disematkan rapi.
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => setShowQcModal(false)}
              >
                Tutup Pratinjau
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
