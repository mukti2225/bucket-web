"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  CheckCircle2, 
  Sparkles, 
  Truck, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  ShoppingBag,
  ExternalLink,
  Camera,
  Heart
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCheckoutStore } from "@/store/checkout.store";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "FD250616-00123";
  const { recipient, delivery } = useCheckoutStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 bg-[#F7F3F0]/40">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <Card className="p-8 sm:p-10 border border-[#E8E1DC] bg-white text-center shadow-sm">
            
            {/* Success Reassuring Indicator (DESIGN.md §30) */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#3F7D5A]/10 text-[#3F7D5A]">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#3F7D5A]/10 px-3 py-1 text-xs font-semibold text-[#3F7D5A] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Pembayaran Berhasil Dikonfirmasi</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#24211F]">
              Terima kasih. <br />
              Pesananmu sudah kami terima.
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-[#766F69] max-w-md mx-auto leading-relaxed">
              Florist ahli kami sedang bersiap merangkai bunga segar terbaik untuk orang spesial Anda. Foto QC akan kami kirimkan sebelum pesanan meluncur.
            </p>

            {/* ORDER ESSENTIAL DETAILS - DESIGN.md §30 */}
            <div className="mt-8 rounded-2xl bg-[#F7F3F0] p-6 border border-[#E8E1DC] text-left space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E1DC]">
                <span className="text-[#766F69]">Nomor Pesanan</span>
                <span className="font-mono font-semibold text-sm text-[#315C4C]">
                  #{orderNumber}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#766F69]">Penerima Hadiah</span>
                <span className="font-semibold text-[#24211F]">
                  {recipient.name || "Cantika Budi Santosa"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#766F69]">Jadwal Pengiriman</span>
                <span className="font-medium text-[#24211F]">
                  {delivery.date || "Sen, 16 Jun 2025"} ({delivery.timeSlot || "13.00 - 16.00"})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#766F69]">Status Terkini</span>
                <Badge variant="warning">
                  Menunggu Pengerjaan Florist
                </Badge>
              </div>

              <div className="flex items-start justify-between pt-1">
                <span className="text-[#766F69] shrink-0">Alamat Tujuan</span>
                <span className="text-[#24211F] text-right truncate max-w-xs">
                  {recipient.address || "Jl. Melati No. 10, Kebayoran Baru, Jakarta Selatan"}
                </span>
              </div>
            </div>

            {/* QC Photo Reassurance notice */}
            <div className="mt-4 rounded-xl bg-[#F7EFE4] p-3 text-xs text-[#24211F] border border-[#E8E1DC] flex items-center gap-2.5 text-left">
              <Camera className="h-5 w-5 text-[#315C4C] shrink-0" />
              <span>
                <strong>Jaminan Foto QC:</strong> Begitu buket selesai dirangkai, foto asli akan tersedia di halaman pelacakan.
              </span>
            </div>

            {/* ACTION BUTTONS (DESIGN.md §30) */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/track/${orderNumber}`} className="flex-1">
                <Button variant="primary" size="lg" className="w-full gap-2">
                  <span>Lacak Pesanan Realtime</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/account/orders" className="flex-1">
                <Button variant="outline" size="lg" className="w-full">
                  Lihat Riwayat Pesanan
                </Button>
              </Link>
            </div>

          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
