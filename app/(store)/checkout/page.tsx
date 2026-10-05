"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  FileText, 
  CreditCard,
  Sparkles,
  Smartphone,
  Monitor,
  ShieldCheck,
  QrCode,
  Building2
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { formatCurrency } from "@/utils/currency";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useCart } from "@/context/CartContext";
import { useCheckoutStore } from "@/store/checkout.store";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalAmount } = useCart();

  // Selected product summary (from cart or default Sweet Blush)
  const displayItem = items[0] || {
    name: "Sweet Blush",
    variantName: "Regular",
    image: PRODUCTS[0].images[0],
    variantPrice: 599000,
  };

  // Flow State
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  // Form Fields matching reference
  const [recipientName, setRecipientName] = useState("Cantika Budi Santosa");
  const [recipientPhone, setRecipientPhone] = useState("0812-3456-7890");
  const [recipientAddress, setRecipientAddress] = useState("Jl. Melati No. 10, Kebayoran Baru, Jakarta Selatan");
  const [deliveryDate, setDeliveryDate] = useState("2025-06-16");
  const [deliverySlot, setDeliverySlot] = useState("13.00 - 16.00");
  const [giftMessage, setGiftMessage] = useState("Selamat ulang tahun yang terindah untukmu! Semoga harimu seharum dan seindah bunga-bunga ini.");
  const [selectedPayment, setSelectedPayment] = useState<string>("qris");
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = totalAmount > 0 ? totalAmount : 599000;
  const shippingFee = 30000;
  const grandTotal = subtotal + shippingFee;

  const paymentMethods = [
    { id: "qris", name: "QRIS Instant (GoPay / OVO / ShopeePay / Dana)", icon: QrCode, badge: "Instan & Otomatis" },
    { id: "bca", name: "BCA Virtual Account", icon: Building2, badge: "Verifikasi Otomatis" },
    { id: "mandiri", name: "Mandiri Livin' Virtual Account", icon: Building2 },
    { id: "cc", name: "Kartu Kredit / Debit Online (Visa/Mastercard)", icon: CreditCard },
  ];

  const { updateRecipient, updateDelivery, updateMessageCard, setPaymentMethod } = useCheckoutStore();

  const handleNextOrSubmit = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as any);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } else {
      setIsProcessing(true);
      updateRecipient({
        name: recipientName,
        phone: recipientPhone,
        address: recipientAddress,
      });
      updateDelivery({
        date: deliveryDate,
        timeSlot: deliverySlot,
      });
      updateMessageCard({
        content: giftMessage,
      });
      setPaymentMethod(selectedPayment);

      setTimeout(() => {
        router.push("/checkout/payment");
      }, 600);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3F0]/50">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Top Bar with Mode Switcher (Mobile Mockup vs Desktop) */}
          <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <Link
                href="/products/sweet-blush"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#766F69] hover:text-[#315C4C]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali ke Detail Produk</span>
              </Link>
              <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#24211F] mt-1">
                Gifting Checkout
              </h1>
            </div>

            {/* Toggle Preview Mode */}
            <div className="flex items-center gap-2 rounded-full border border-[#E8E1DC] bg-white p-1 text-xs shadow-xs">
              <span className="px-2 text-[11px] font-medium text-[#766F69]">Tampilan:</span>
              <button
                type="button"
                onClick={() => setViewMode("mobile")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition ${
                  viewMode === "mobile"
                    ? "bg-[#315C4C] text-white"
                    : "text-[#766F69] hover:text-[#24211F]"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Mobile Frame (Ref #4)</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("desktop")}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition ${
                  viewMode === "desktop"
                    ? "bg-[#315C4C] text-white"
                    : "text-[#766F69] hover:text-[#24211F]"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Desktop Lebar</span>
              </button>
            </div>
          </div>

          {/* MAIN CHECKOUT CONTAINER */}
          <div className="flex justify-center">
            <div
              className={`transition-all duration-300 ${
                viewMode === "mobile"
                  ? "w-full max-w-[430px] rounded-[40px] border-[8px] border-[#24211F] bg-white p-5 shadow-2xl relative"
                  : "w-full max-w-4xl rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-10 shadow-sm"
              }`}
            >
              {/* If Mobile Frame, show phone notch/speaker bar */}
              {viewMode === "mobile" && (
                <div className="mx-auto mb-4 h-4 w-28 rounded-full bg-[#24211F]" />
              )}

              {/* Checkout Header Inside View */}
              <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-4">
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-[#24211F]">
                    Checkout
                  </h2>
                </div>
                <span className="text-xs text-[#766F69]">
                  Langkah {currentStep} dari 3
                </span>
              </div>

              {/* Step Indicator - Exactly as in Reference 4 */}
              <div className="my-5">
                <div className="flex items-center justify-between relative">
                  {/* Connecting line */}
                  <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-[#E8E1DC] -z-0" />

                  {/* Step 1: Penerima */}
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex flex-col items-center gap-1 relative z-10 cursor-pointer"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                        currentStep >= 1
                          ? "bg-[#315C4C] text-white"
                          : "bg-white border border-[#E8E1DC] text-[#766F69]"
                      }`}
                    >
                      {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
                    </div>
                    <span className="text-[11px] font-semibold text-[#24211F]">Penerima</span>
                  </button>

                  {/* Step 2: Pengiriman */}
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex flex-col items-center gap-1 relative z-10 cursor-pointer"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                        currentStep >= 2
                          ? "bg-[#315C4C] text-white"
                          : "bg-white border border-[#E8E1DC] text-[#766F69]"
                      }`}
                    >
                      {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
                    </div>
                    <span className="text-[11px] font-semibold text-[#766F69]">Pengiriman</span>
                  </button>

                  {/* Step 3: Pembayaran */}
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex flex-col items-center gap-1 relative z-10 cursor-pointer"
                  >
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition ${
                        currentStep === 3
                          ? "bg-[#315C4C] text-white"
                          : "bg-white border border-[#E8E1DC] text-[#766F69]"
                      }`}
                    >
                      3
                    </div>
                    <span className="text-[11px] font-semibold text-[#766F69]">Pembayaran</span>
                  </button>
                </div>
              </div>

              {/* STEP 1: Informasi Penerima */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="rounded-2xl border border-[#E8E1DC] bg-[#FFFDFC] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#24211F] flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-[#315C4C]" />
                        <span>Informasi Penerima</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          setRecipientName("Budi Santoso");
                          setRecipientPhone("0812-9988-7766");
                          setRecipientAddress("Jl. Senopati No. 45, Jakarta Selatan");
                        }}
                        className="text-[11px] font-medium text-[#315C4C] hover:underline"
                      >
                        Pilih dari Kontak
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-[#766F69]">Nama Penerima</label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Contoh: Cantika Budi Santosa"
                        className="mt-1 w-full rounded-xl border border-[#E8E1DC] bg-white px-3 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-[#766F69]">Nomor Telepon (WhatsApp)</label>
                      <input
                        type="text"
                        value={recipientPhone}
                        onChange={(e) => setRecipientPhone(e.target.value)}
                        placeholder="08xxxxxxxxxx"
                        className="mt-1 w-full rounded-xl border border-[#E8E1DC] bg-white px-3 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-[#766F69]">Alamat Lengkap</label>
                      <textarea
                        rows={2}
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        placeholder="Contoh: Jl. Melati No. 10, Jakarta Selatan"
                        className="mt-1 w-full rounded-xl border border-[#E8E1DC] bg-white px-3 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Tanggal & Waktu Pengiriman & Pesan */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="rounded-2xl border border-[#E8E1DC] bg-[#FFFDFC] p-4 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#24211F] flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-[#315C4C]" />
                      <span>Tanggal & Waktu Pengiriman</span>
                    </h3>

                    <div>
                      <label className="text-[11px] font-medium text-[#766F69]">Pilih Tanggal Pengiriman</label>
                      <div className="relative mt-1">
                        <input
                          type="date"
                          value={deliveryDate}
                          onChange={(e) => setDeliveryDate(e.target.value)}
                          className="w-full rounded-xl border border-[#E8E1DC] bg-white px-3 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-[#766F69]">Pilih Waktu Pengiriman</label>
                      <div className="mt-1.5 grid grid-cols-3 gap-2">
                        {["08.00 - 12.00", "13.00 - 16.00", "16.00 - 20.00"].map((slot) => {
                          const isSelected = deliverySlot === slot;
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setDeliverySlot(slot)}
                              className={`rounded-xl py-2 px-1 text-[11px] font-medium transition ${
                                isSelected
                                  ? "border-2 border-[#315C4C] bg-[#F2F6EF] text-[#315C4C] font-semibold shadow-xs"
                                  : "border border-[#E8E1DC] bg-white text-[#766F69] hover:border-[#315C4C]/40"
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Pesan untuk Penerima */}
                  <div className="rounded-2xl border border-[#E8E1DC] bg-[#FFFDFC] p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#24211F] flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-[#315C4C]" />
                        <span>Pesan untuk Penerima (Kartu Ucapan)</span>
                      </h3>
                      <span className="text-[10px] text-[#766F69]">
                        {giftMessage.length}/200
                      </span>
                    </div>

                    <textarea
                      rows={2}
                      maxLength={200}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Tulis pesan manis untuk penerima..."
                      className="w-full rounded-xl border border-[#E8E1DC] bg-white p-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Metode Pembayaran */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="rounded-2xl border border-[#E8E1DC] bg-[#FFFDFC] p-4 space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#24211F] flex items-center gap-1.5">
                      <CreditCard className="h-3.5 w-3.5 text-[#315C4C]" />
                      <span>Pilih Metode Pembayaran</span>
                    </h3>

                    <div className="space-y-2 pt-1">
                      {paymentMethods.map((pm) => {
                        const Icon = pm.icon;
                        const isSelected = selectedPayment === pm.id;
                        return (
                          <div
                            key={pm.id}
                            onClick={() => setSelectedPayment(pm.id)}
                            className={`cursor-pointer flex items-center justify-between rounded-xl border p-3 transition ${
                              isSelected
                                ? "border-[#315C4C] bg-[#F2F6EF]/60 shadow-xs"
                                : "border-[#E8E1DC] bg-white hover:border-[#315C4C]/40"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-[#E8E1DC] text-[#315C4C]">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-[#24211F]">{pm.name}</p>
                                {pm.badge && (
                                  <span className="text-[10px] text-[#3F7D5A] font-medium">
                                    {pm.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                            <div
                              className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-[#315C4C] bg-[#315C4C]" : "border-[#E8E1DC]"
                              }`}
                            >
                              {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Section 4: Ringkasan Pesanan (Order Summary) */}
              <div className="mt-5 rounded-2xl border border-[#E8E1DC] bg-white p-4 space-y-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#24211F]">
                  Ringkasan Pesanan
                </h3>

                <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[#F7F3F0]">
                      <Image
                        src={displayItem.image}
                        alt={displayItem.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#24211F]">{displayItem.name}</p>
                      <p className="text-[11px] text-[#766F69]">{displayItem.variantName}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#24211F]">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-[#766F69]">
                  <span>Ongkos Kirim</span>
                  <span>{formatCurrency(shippingFee)}</span>
                </div>

                <div className="flex justify-between border-t border-[#E8E1DC] pt-2 text-sm font-bold text-[#24211F]">
                  <span>Total Pembayaran</span>
                  <span className="text-[#315C4C]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              {/* Bottom Navigation Buttons */}
              <div className="mt-5 space-y-2">
                <button
                  type="button"
                  onClick={handleNextOrSubmit}
                  disabled={isProcessing}
                  className="w-full flex h-12 items-center justify-center gap-2 rounded-full bg-[#315C4C] px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#284C3F] active:scale-98 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Memverifikasi Pembayaran...
                    </span>
                  ) : currentStep === 3 ? (
                    <>
                      <span>Bayar Sekarang ({formatCurrency(grandTotal)})</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Lanjut ke {currentStep === 1 ? "Pengiriman" : "Pembayaran"}</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                    className="w-full text-center text-xs font-semibold text-[#766F69] py-2 hover:text-[#24211F]"
                  >
                    Kembali ke Langkah Sebelumnya
                  </button>
                )}

                <p className="pt-1 text-center text-[10px] text-[#766F69] flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#3F7D5A]" />
                  <span>Pembayaran aman & terenkripsi oleh Midtrans</span>
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
