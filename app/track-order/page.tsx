"use client";

import Image from "next/image";
import Link from "next/link";
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
  ExternalLink,
  Maximize2,
  X
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { formatCurrency } from "@/utils/currency";

export default function TrackOrderPage() {
  const [copied, setCopied] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Quality Check (QC) by default
  const [showQcModal, setShowQcModal] = useState(false);

  const orderNumber = "FD250616-00123";
  const orderTime = "16 Jun 2025, 10:24";

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Timeline Steps matching reference 5
  const timelineSteps = [
    {
      title: "Pesanan Dikonfirmasi",
      time: "16 Jun 2025, 10:24",
      desc: "Pembayaran telah berhasil diverifikasi oleh sistem.",
    },
    {
      title: "Sedang Dirangkai",
      time: "16 Jun 2025, 11:30",
      desc: "Florist ahli kami sedang merangkai kuntum bunga mawar segar pilihanmu.",
    },
    {
      title: "Quality Check (QC)",
      time: "16 Jun 2025, 12:15",
      desc: "Rangkaian telah diperiksa ketat dan siap diserahkan ke kurir pengantar.",
      hasQcPhoto: true,
    },
    {
      title: "Dalam Pengiriman",
      time: "Estimasi 13:30 - 15:00",
      desc: "Kurir Florétta Express sedang meluncur menuju alamat penerima.",
    },
    {
      title: "Pesanan Selesai",
      time: "Estimasi 15:30",
      desc: "Bunga telah diterima dengan selamat dan senyuman hangat oleh penerima.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          
          {/* Page Heading - Exactly as in Reference 5 */}
          <div className="text-center sm:text-left">
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#24211F]">
              Lacak Pesanan
            </h1>
            <p className="mt-1 text-sm text-[#766F69]">
              Pantau status pesanan kamu secara real-time.
            </p>
          </div>

          {/* Order Header Summary Card */}
          <div className="mt-8 rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E8E1DC] pb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#766F69]">
                  No. Pesanan
                </span>
                <p className="font-mono text-lg font-bold text-[#315C4C]">
                  #{orderNumber}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#766F69]">
                  Pesanan Diterima
                </span>
                <p className="text-sm font-semibold text-[#24211F]">
                  {orderTime}
                </p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 rounded-full border border-[#E8E1DC] bg-[#FFFDFC] px-4 py-2 text-xs font-semibold text-[#24211F] hover:border-[#315C4C] hover:text-[#315C4C] transition"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  <span>{copied ? "Link Tersalin!" : "Bagikan"}</span>
                </button>
              </div>
            </div>

            {/* Recipient & Courier Quick Info */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#766F69]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#315C4C] shrink-0" />
                <span>Penerima: <strong className="text-[#24211F]">Cantika Budi Santosa</strong> (Kebayoran Baru)</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#315C4C] shrink-0" />
                <span>Slot: <strong className="text-[#24211F]">Sen, 16 Jun 2025 (13.00 - 16.00)</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#315C4C] shrink-0" />
                <span>Metode: <strong className="text-[#24211F]">Florétta Same-Day Chilled Courier</strong></span>
              </div>
            </div>
          </div>

          {/* TWO COLUMN GRID: Left = Timeline, Right = QC Photo */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Timeline Status (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-lg font-semibold text-[#24211F]">
                  Progres Rangkaian & Pengiriman
                </h2>
                <span className="text-[11px] text-[#766F69]">
                  Live Tracking
                </span>
              </div>

              <div className="relative pl-6 space-y-8">
                {/* Continuous Vertical Timeline Line */}
                <div className="absolute left-[35px] top-4 bottom-4 w-0.5 bg-[#E8E1DC] -z-0" />

                {timelineSteps.map((step, idx) => {
                  const isCompleted = idx < activeStepIndex;
                  const isActive = idx === activeStepIndex;

                  return (
                    <div
                      key={idx}
                      onClick={() => setActiveStepIndex(idx)}
                      className="relative flex items-start gap-4 z-10 cursor-pointer group"
                    >
                      {/* Node Icon Circle */}
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isCompleted
                            ? "bg-[#3F7D5A] text-white"
                            : isActive
                            ? "bg-[#315C4C] text-white ring-4 ring-[#F2F6EF] scale-110 shadow-sm"
                            : "bg-[#F7F3F0] border border-[#E8E1DC] text-[#766F69] group-hover:border-[#315C4C]"
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="h-4 w-4 stroke-[2.5]" />
                        ) : isActive ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-[#E8E1DC]" />
                        )}
                      </div>

                      {/* Step Text Info */}
                      <div className="flex-1 pt-0.5">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h3
                            className={`text-sm font-bold transition-colors ${
                              isActive
                                ? "text-[#315C4C]"
                                : isCompleted
                                ? "text-[#24211F]"
                                : "text-[#766F69] group-hover:text-[#24211F]"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <span className="text-[11px] font-medium text-[#766F69]">
                            {step.time}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-[#766F69] leading-relaxed">
                          {step.desc}
                        </p>

                        {/* Active QC Message Card */}
                        {isActive && (
                          <div className="mt-2.5 rounded-xl border border-[#315C4C]/20 bg-[#F2F6EF] p-2.5 text-xs text-[#315C4C] font-medium flex items-center gap-2 animate-in fade-in duration-200">
                            <Sparkles className="h-4 w-4 shrink-0 text-[#3F7D5A]" />
                            <span>Status terkini: {step.title}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Simulator Hint */}
              <div className="mt-8 pt-4 border-t border-[#E8E1DC] flex items-center justify-between text-[11px] text-[#766F69]">
                <span>💡 Tip: Klik setiap tahapan di atas untuk menguji update status.</span>
              </div>
            </div>

            {/* RIGHT COLUMN: Foto Quality Check (5 cols) - Exactly as in Reference 5 */}
            <div className="lg:col-span-5 rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-3 mb-4">
                  <h2 className="font-serif text-base font-semibold text-[#24211F] flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#C97878]" />
                    <span>Foto Quality Check</span>
                  </h2>
                  <span className="rounded-full bg-[#F2F6EF] px-2.5 py-0.5 text-[10px] font-bold text-[#315C4C]">
                    QC PASSED
                  </span>
                </div>

                {/* Photo Display Card with Zoom preview */}
                <div
                  onClick={() => setShowQcModal(true)}
                  className="relative aspect-[4/4.2] w-full overflow-hidden rounded-2xl border border-[#E8E1DC] bg-[#F7F3F0] cursor-pointer group"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
                    alt="Foto Hasil Quality Check Sweet Blush Florétta"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 right-2.5 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-mono text-white backdrop-blur-xs">
                    QC: 16 Jun 2025, 12:15 WIB
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-semibold gap-1.5 backdrop-blur-xs">
                    <Maximize2 className="h-4 w-4" />
                    <span>Perbesar Foto</span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-[#766F69]">
                  Rangkaian kamu sudah selesai dan telah melalui proses quality check. Siap dikirim!
                </p>
              </div>

              {/* Florist Signature Touch */}
              <div className="mt-6 border-t border-[#E8E1DC] pt-4 flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-[#24211F]">Dirangkai oleh:</p>
                  <p className="text-[#766F69]">Florist Lead Sarah • Florétta Studio</p>
                </div>
                <div className="font-serif italic text-xs text-[#315C4C]">
                  Florétta Certified
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* QC PHOTO FULL LIGHTBOX MODAL */}
        {showQcModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative max-w-2xl w-full rounded-3xl overflow-hidden bg-white shadow-2xl p-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E1DC]">
                <h3 className="font-serif font-semibold text-sm text-[#24211F]">
                  Foto Asli Quality Check — #FD250616-00123
                </h3>
                <button
                  onClick={() => setShowQcModal(false)}
                  className="p-1 rounded-full text-[#766F69] hover:bg-[#F7F3F0]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative aspect-[4/4] w-full mt-3 rounded-2xl overflow-hidden bg-[#F7F3F0]">
                <Image
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=90"
                  alt="Full QC Photo"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-[#766F69]">
                <span>Status: Telah disetujui Quality Lead Florétta</span>
                <span>16 Jun 2025, 12:15 WIB</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
