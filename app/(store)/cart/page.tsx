"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalAmount } = useCart();
  const shippingEstimate = items.length > 0 ? 30000 : 0;
  const grandTotal = totalAmount + shippingEstimate;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-xs text-[#766F69] mb-4">
            <Link href="/" className="hover:text-[#315C4C]">Beranda</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-[#24211F] font-medium">Keranjang Belanja</span>
          </div>

          <h1 className="font-serif text-3xl font-semibold text-[#24211F]">
            Keranjang Belanja
          </h1>

          {items.length === 0 ? (
            <div className="mt-12 text-center py-20 rounded-3xl border border-[#E8E1DC] bg-white max-w-2xl mx-auto p-8 shadow-xs">
              <div className="h-16 w-16 rounded-full bg-[#F7F3F0] flex items-center justify-center mx-auto text-[#766F69] mb-4">
                <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
              </div>
              <h2 className="font-serif text-xl font-semibold text-[#24211F]">
                Keranjang Belanja Kosong
              </h2>
              <p className="mt-2 text-xs text-[#766F69] max-w-sm mx-auto leading-relaxed">
                Anda belum memilih karangan bunga. Jelajahi katalog bunga segar kami untuk momen spesial Anda.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#315C4C] px-7 py-3 text-xs font-semibold text-white shadow-md hover:bg-[#284C3F] transition"
              >
                <span>Mulai Belanja Bunga</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
              
              {/* Left: Cart Items (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs space-y-4 divide-y divide-[#E8E1DC]/80">
                  {items.map((item) => {
                    const lineTotal =
                      (item.variantPrice +
                        item.addons.reduce((sum, a) => sum + a.price, 0)) *
                      item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
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
                            <span className="text-[10px] font-semibold text-[#C97878] uppercase">
                              Hand Bouquet
                            </span>
                            <h3 className="font-serif text-base font-semibold text-[#24211F]">
                              {item.name}
                            </h3>
                            <p className="text-xs text-[#766F69]">
                              Ukuran: <strong className="text-[#24211F]">{item.variantName}</strong>
                            </p>
                            {item.addons.map((addon) => (
                              <p key={addon.id} className="text-xs text-[#315C4C] mt-0.5">
                                + {addon.name} ({formatCurrency(addon.price)})
                              </p>
                            ))}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                          <span className="font-sans text-base font-bold text-[#24211F]">
                            {formatCurrency(lineTotal)}
                          </span>

                          {/* Stepper & Delete */}
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 items-center rounded-full border border-[#E8E1DC] bg-white px-2">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 text-[#766F69] hover:text-[#24211F]"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-semibold text-[#24211F]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 text-[#766F69] hover:text-[#24211F]"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label="Hapus item"
                              className="p-2 text-[#766F69] hover:text-[#C97878] transition"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div className="pt-4 flex items-center justify-between text-xs text-[#766F69]">
                    <Link href="/products" className="flex items-center gap-1 hover:text-[#315C4C] font-medium">
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Tambah bunga lainnya</span>
                    </Link>
                    <span>Garansi bunga sampai dengan selamat & segar</span>
                  </div>
                </div>
              </div>

              {/* Right: Order Summary (4 cols) */}
              <div className="lg:col-span-4">
                <div className="rounded-3xl border border-[#E8E1DC] bg-white p-6 shadow-xs space-y-4">
                  <h2 className="font-serif text-base font-semibold text-[#24211F]">
                    Ringkasan Belanja
                  </h2>

                  <div className="space-y-2.5 text-xs text-[#766F69] border-b border-[#E8E1DC] pb-4">
                    <div className="flex justify-between">
                      <span>Subtotal Produk</span>
                      <span className="text-[#24211F] font-semibold">{formatCurrency(totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimasi Ongkir</span>
                      <span className="text-[#24211F] font-semibold">{formatCurrency(shippingEstimate)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm font-bold text-[#24211F]">
                    <span>Total Pembayaran</span>
                    <span className="text-base text-[#315C4C]">{formatCurrency(grandTotal)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full flex h-12 items-center justify-center gap-2 rounded-full bg-[#315C4C] px-6 text-sm font-semibold text-white shadow-md hover:bg-[#284C3F] transition active:scale-95"
                  >
                    <span>Lanjut ke Checkout</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <p className="text-center text-[10px] text-[#766F69]">
                    🔒 Pembayaran aman dengan Midtrans Payment Gateway
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
