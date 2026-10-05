"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  QrCode, 
  Building2, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/currency";
import { useCart } from "@/context/CartContext";
import { useCheckoutStore } from "@/store/checkout.store";

export default function CheckoutPaymentPage() {
  const router = useRouter();
  const { totalAmount, items } = useCart();
  const { recipient, delivery, messageCard, paymentMethod } = useCheckoutStore();
  
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod || "qris");
  const [isVerifying, setIsVerifying] = useState(false);
  const [copied, setCopied] = useState(false);

  const orderNumber = "FD250616-00123";
  const subtotal = totalAmount > 0 ? totalAmount : 599000;
  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  const handleCopyVa = (vaNumber: string) => {
    navigator.clipboard?.writeText(vaNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      router.push(`/checkout/success?orderNumber=${orderNumber}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12 bg-[#F7F3F0]/40">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          
          <div className="mb-6">
            <Link
              href="/checkout"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#766F69] hover:text-[#315C4C]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Informasi Pengiriman</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F] mt-1">
              Pembayaran Aman
            </h1>
            <p className="text-xs text-[#766F69] mt-0.5">
              Pesanan #{orderNumber} • Selesaikan pembayaran dalam 2 jam agar bunga dapat dirangkai tepat waktu.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* TOTAL BILL SUMMARY CARD */}
            <Card className="p-6 border border-[#E8E1DC] bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1DC] pb-4">
                <div>
                  <span className="text-xs text-[#766F69]">Total Tagihan Pembayaran</span>
                  <p className="font-serif text-3xl font-bold text-[#315C4C] mt-0.5">
                    {formatCurrency(total)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#C58A32] animate-ping" />
                  <Badge variant="warning">Menunggu Pembayaran</Badge>
                </div>
              </div>

              {/* PAYMENT METHOD SELECTOR */}
              <div className="pt-4 space-y-3">
                <p className="text-xs font-semibold text-[#24211F]">
                  Pilih Saluran Pembayaran:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("qris")}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                      selectedMethod === "qris"
                        ? "border-[#315C4C] bg-[#315C4C]/5 ring-1 ring-[#315C4C]"
                        : "border-[#E8E1DC] bg-white hover:border-[#315C4C]/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#315C4C]/10 text-[#315C4C]">
                        <QrCode className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-[#24211F]">QRIS Instant</p>
                        <p className="text-[10px] text-[#766F69]">GoPay, OVO, ShopeePay, Dana</p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod("bca_va")}
                    className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                      selectedMethod === "bca_va"
                        ? "border-[#315C4C] bg-[#315C4C]/5 ring-1 ring-[#315C4C]"
                        : "border-[#E8E1DC] bg-white hover:border-[#315C4C]/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-[#24211F]">BCA Virtual Account</p>
                        <p className="text-[10px] text-[#766F69]">Verifikasi Otomatis 24 Jam</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* PAYMENT DETAILS VIEW */}
              <div className="mt-5 rounded-2xl bg-[#F7F3F0] p-6 border border-[#E8E1DC]">
                {selectedMethod === "qris" ? (
                  <div className="flex flex-col items-center text-center space-y-4">
                    <p className="text-xs font-semibold text-[#24211F]">
                      Pindai Kode QRIS di bawah ini dengan aplikasi perbankan atau e-wallet Anda:
                    </p>
                    
                    {/* QR Code Container */}
                    <div className="p-4 bg-white rounded-2xl shadow-sm border border-[#E8E1DC]">
                      <div className="relative h-48 w-48 mx-auto flex items-center justify-center bg-white">
                        <svg className="w-full h-full text-[#24211F]" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M0 0h30v30H0zm5 5h20v20H5zm5 5h10v10H10zM70 0h30v30H70zm5 5h20v20H75zm5 5h10v10H80zM0 70h30v30H0zm5 5h20v20H5zm5 5h10v10H10zM40 10h10v10H40zm10 10h10v10H50zm-10 20h10v10H40zm20 0h10v10H60zm10 10h10v10H70zm10-10h10v10H80zm-40 20h10v10H40zm20 0h10v10H60zm-10 10h10v10H50zm20 0h10v10H70zm10 10h10v10H80zm-20 10h10v10H60z" />
                        </svg>
                      </div>
                      <p className="text-[10px] text-[#766F69] mt-2 font-mono">NMID: ID102008899201991</p>
                    </div>

                    <p className="text-xs text-[#766F69] max-w-sm">
                      Sistem akan mendeteksi pembayaran secara instan tanpa perlu unggah bukti transfer.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-[#24211F]">
                      Nomor Rekening Virtual Account BCA:
                    </p>
                    <div className="flex items-center justify-between rounded-xl bg-white p-4 border border-[#E8E1DC]">
                      <div>
                        <span className="text-[11px] text-[#766F69] block">Nomor Virtual Account</span>
                        <span className="font-mono text-xl font-bold tracking-wider text-[#315C4C]">
                          8801 2506 1600 1234
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="gap-1.5"
                        onClick={() => handleCopyVa("8801250616001234")}
                      >
                        {copied ? <Check className="h-4 w-4 text-[#3F7D5A]" /> : <Copy className="h-4 w-4" />}
                        <span>{copied ? "Tersalin" : "Salin No VA"}</span>
                      </Button>
                    </div>
                    <p className="text-[11px] text-[#766F69]">
                      Dapat dibayar melalui BCA Mobile, myBCA, KlikBCA, atau ATM BCA.
                    </p>
                  </div>
                )}
              </div>

              {/* ACTION PAY SIMULATION */}
              <div className="mt-6 pt-4 border-t border-[#E8E1DC] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#766F69]">
                  <ShieldCheck className="h-4 w-4 text-[#315C4C]" />
                  <span>Diverifikasi otomatis oleh Payment Gateway Midtrans</span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto min-w-[220px] gap-2"
                  isLoading={isVerifying}
                  onClick={handleSimulatePayment}
                >
                  <span>Saya Sudah Bayar</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
