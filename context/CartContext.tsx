"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Check } from "lucide-react";
import { formatCurrency } from "@/utils/currency";
import { PRODUCTS, ADDONS_LIST } from "@/data/products";

export interface CartLineItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  variantName: string;
  variantPrice: number;
  addons: { id: string; name: string; price: number }[];
  quantity: number;
  floristNote?: string;
}

interface CartContextType {
  items: CartLineItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartLineItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  totalAmount: number;
  totalCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Prepopulate with Sweet Blush matching reference mockup
  const [items, setItems] = useState<CartLineItem[]>([
    {
      id: "cart-item-1",
      productId: "prod-1",
      name: "Sweet Blush",
      image: PRODUCTS[0].images[0],
      variantName: "Regular",
      variantPrice: 599000,
      addons: [
        { id: "addon-card", name: "Kartu Ucapan Premium", price: 10000 },
      ],
      quantity: 1,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addItem = (newItem: Omit<CartLineItem, "id">) => {
    const id = `cart-${Date.now()}`;
    setItems((prev) => [...prev, { ...newItem, id }]);
    setToastMessage(`${newItem.name} ditambahkan ke keranjang`);
    setIsOpen(true);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartLineItem[]
    );
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = items.reduce((sum, item) => {
    const addonsSum = item.addons.reduce((aSum, a) => aSum + a.price, 0);
    return sum + (item.variantPrice + addonsSum) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        totalAmount,
        totalCount,
      }}
    >
      {children}

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-2xl bg-[#315C4C] px-4 py-3 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
          <Check className="h-4 w-4 text-[#F4DDD8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SLIDE-OVER MINI-CART DRAWER */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop overlay */}
          <div
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
          />

          {/* Drawer Panel */}
          <div className="relative flex h-full w-full max-w-md flex-col bg-[#FFFDFC] shadow-2xl transition-transform animate-in slide-in-from-right duration-300 z-10 border-l border-[#E8E1DC]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E8E1DC] p-5">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#315C4C]" />
                <h2 className="font-serif text-lg font-semibold text-[#24211F]">
                  Keranjang ({totalCount})
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-full p-1.5 text-[#766F69] hover:bg-[#F7F3F0] hover:text-[#24211F] transition"
                aria-label="Tutup keranjang"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Delivery Bar Progress */}
            <div className="bg-[#F2F6EF] px-5 py-2.5 text-xs text-[#315C4C] border-b border-[#E8E1DC]/60 flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0 text-[#C97878]" />
              <span>
                {totalAmount >= 500000
                  ? "🎉 Selamat! Pesanan kamu mendapatkan bonus Greeting Card gratis."
                  : `Tambah ${formatCurrency(500000 - totalAmount)} lagi untuk bonus greeting card.`}
              </span>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F7F3F0] text-[#766F69] mb-3">
                    <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#24211F]">
                    Keranjang Kamu Masih Kosong
                  </h3>
                  <p className="mt-1 text-xs text-[#766F69] max-w-xs">
                    Temukan karangan bunga segar yang siap menyempurnakan hari istimewamu.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-5 rounded-full bg-[#315C4C] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#284C3F]"
                  >
                    Lihat Koleksi Bunga
                  </button>
                </div>
              ) : (
                items.map((item) => {
                  const lineTotal =
                    (item.variantPrice +
                      item.addons.reduce((sum, a) => sum + a.price, 0)) *
                    item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-3.5 rounded-2xl border border-[#E8E1DC] bg-white p-3.5 shadow-xs"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F7F3F0]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif text-sm font-semibold text-[#24211F]">
                              {item.name}
                            </h4>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#766F69] hover:text-[#C97878] transition p-0.5"
                              title="Hapus"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#766F69]">
                            {item.variantName}
                          </p>
                          {item.addons.map((a) => (
                            <p key={a.id} className="text-[10px] text-[#315C4C]">
                              + {a.name}
                            </p>
                          ))}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-sans text-xs font-bold text-[#24211F]">
                            {formatCurrency(lineTotal)}
                          </span>

                          <div className="flex h-7 items-center rounded-full border border-[#E8E1DC] bg-[#FFFDFC] px-1.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 text-[#766F69] hover:text-[#24211F]"
                            >
                              <Minus className="h-2.5 w-2.5" />
                            </button>
                            <span className="w-5 text-center text-xs font-semibold text-[#24211F]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 text-[#766F69] hover:text-[#24211F]"
                            >
                              <Plus className="h-2.5 w-2.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer & Checkout Button */}
            {items.length > 0 && (
              <div className="border-t border-[#E8E1DC] bg-white p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#766F69]">
                  <span>Subtotal</span>
                  <span className="text-sm font-bold text-[#24211F]">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
                <p className="text-[11px] text-[#766F69]">
                  Ongkos kirim dan kartu ucapan dihitung saat checkout.
                </p>

                <div className="space-y-2 pt-1">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#315C4C] text-xs font-semibold text-white shadow-md hover:bg-[#284C3F] active:scale-98 transition"
                  >
                    <span>Lanjut ke Pembayaran</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex h-10 w-full items-center justify-center rounded-full border border-[#E8E1DC] bg-white text-xs font-medium text-[#24211F] hover:bg-[#F7F3F0] transition"
                  >
                    Lihat Detail Keranjang
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
