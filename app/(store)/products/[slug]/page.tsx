"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Plus, 
  Minus, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  ChevronRight,
  Share2,
  ChevronDown,
  Info
} from "lucide-react";
import { PRODUCTS, ADDONS_LIST } from "@/data/products";
import { formatCurrency } from "@/utils/currency";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useCart } from "@/context/CartContext";
import { ProductVariant, ProductAddon } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "sweet-blush";
  const { addItem } = useCart();

  // Find product by slug or default to first
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  // Component States
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || { id: "default", name: "Regular", price: product.price }
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [floristNote, setFloristNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"komposisi" | "perawatan" | "pengiriman">("komposisi");

  // Toggle Add-on
  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Calculate current subtotal for this product
  const addonTotal = selectedAddons.reduce((sum, addonId) => {
    const item = ADDONS_LIST.find((a) => a.id === addonId);
    return sum + (item ? item.price : 0);
  }, 0);

  const unitPrice = selectedVariant.price + addonTotal;
  const totalPrice = unitPrice * quantity;

  // Handle Add to Cart
  const handleAddToCart = () => {
    const chosenAddons = selectedAddons
      .map((id) => ADDONS_LIST.find((a) => a.id === id))
      .filter(Boolean) as ProductAddon[];

    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[selectedImageIndex] || product.images[0],
      variantName: selectedVariant.name,
      variantPrice: selectedVariant.price,
      addons: chosenAddons.map((a) => ({ id: a.id, name: a.name, price: a.price })),
      quantity,
      floristNote,
    });
  };

  // Handle Buy Now -> goes straight to checkout
  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 pb-24">
        {/* Breadcrumb */}
        <div className="border-b border-[#E8E1DC] bg-white py-3.5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1.5 text-xs text-[#766F69]">
              <Link href="/" className="hover:text-[#315C4C] transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#A4B494]" />
              <Link href="/products" className="hover:text-[#315C4C] transition-colors">
                Bunga
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#A4B494]" />
              <span className="font-medium text-[#24211F]">{product.name}</span>
            </nav>
          </div>
        </div>

        {/* Main Product Detail Grid - Matching Section 3 of Reference Image */}
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            
            {/* LEFT COLUMN: Product Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Large Display Image with Smooth Fade */}
              <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-3xl border border-[#E8E1DC] bg-[#F7F3F0] shadow-sm group">
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />

                {/* Badge (Best Seller / Terlaris) */}
                <div className="absolute left-4 top-4 rounded-full bg-[#C97878] px-3.5 py-1 text-xs font-semibold tracking-wide text-white shadow-sm">
                  Best Seller
                </div>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert("Tautan produk berhasil disalin!");
                  }}
                  aria-label="Bagikan"
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#24211F] shadow-sm backdrop-blur-xs hover:bg-white transition"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* 4 Thumbnail Selectors - Exactly as in reference */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all ${
                      selectedImageIndex === idx
                        ? "border-[#315C4C] shadow-sm ring-1 ring-[#315C4C] scale-102"
                        : "border-[#E8E1DC] opacity-75 hover:opacity-100 hover:scale-102"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Product Details & Purchase Form */}
            <div className="lg:col-span-6 space-y-6">
              {/* Title & Rating */}
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#24211F]">
                  {product.name}
                </h1>
                
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="flex items-center text-[#C58A32]">
                    <Star className="h-4 w-4 fill-[#C58A32]" />
                    <span className="ml-1 text-sm font-bold text-[#24211F]">
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-xs text-[#766F69]">
                    ({product.reviewsCount} ulasan pelanggan)
                  </span>
                  <span className="text-[#A4B494]">•</span>
                  <span className="inline-flex items-center text-xs font-medium text-[#3F7D5A] bg-[#F2F6EF] px-2 py-0.5 rounded-full">
                    Stok Bunga Segar Hari Ini
                  </span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-[#24211F]">
                    {formatCurrency(unitPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base text-[#766F69] line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="mt-3 text-sm leading-relaxed text-[#766F69]">
                  {product.shortDescription}
                </p>
              </div>

              {/* SECTION: Pilih Ukuran (Variants) */}
              <div className="border-t border-[#E8E1DC] pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#24211F]">
                    Pilih Ukuran
                  </h3>
                  <span className="text-xs text-[#766F69]">
                    Dipilih: <strong className="text-[#315C4C]">{selectedVariant.name}</strong>
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-3">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={`relative flex flex-col items-center justify-center rounded-2xl p-3.5 text-center transition-all ${
                          isSelected
                            ? "border-2 border-[#315C4C] bg-[#F2F6EF]/60 shadow-xs text-[#24211F]"
                            : "border border-[#E8E1DC] bg-white text-[#766F69] hover:border-[#315C4C]/50"
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#315C4C] text-white">
                            <Check className="h-2.5 w-2.5 stroke-[3]" />
                          </div>
                        )}
                        <span className="text-xs font-bold text-[#24211F]">{v.name}</span>
                        <span className="mt-1 text-xs font-medium text-[#766F69]">
                          {formatCurrency(v.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: Tambah Hadiah (Opsional Add-ons) */}
              <div className="border-t border-[#E8E1DC] pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#24211F]">
                  Tambah Hadiah (Opsional)
                </h3>

                <div className="mt-3 space-y-2.5">
                  {ADDONS_LIST.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-all ${
                          isChecked
                            ? "border-[#315C4C] bg-[#F2F6EF]/40 shadow-xs"
                            : "border-[#E8E1DC] bg-white hover:border-[#315C4C]/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-[#F7F3F0]">
                            <Image
                              src={addon.image}
                              alt={addon.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#24211F]">{addon.name}</p>
                            <p className="text-xs font-medium text-[#766F69]">
                              + {formatCurrency(addon.price)}
                            </p>
                          </div>
                        </div>

                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent div
                          className="h-4 w-4 rounded border-[#E8E1DC] text-[#315C4C] accent-[#315C4C]"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SECTION: Pesan untuk Florist (Opsional) */}
              <div className="border-t border-[#E8E1DC] pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#24211F]">
                    Pesan untuk Florist (Opsional)
                  </h3>
                  <span className="text-[11px] text-[#766F69]">
                    {floristNote.length}/200
                  </span>
                </div>

                <div className="mt-2">
                  <textarea
                    rows={2}
                    maxLength={200}
                    value={floristNote}
                    onChange={(e) => setFloristNote(e.target.value)}
                    placeholder="Contoh: warna pita pink muda, tulis nama di kartu, dll."
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#F7F3F0]/40 p-3 text-xs text-[#24211F] placeholder:text-[#766F69] outline-none focus:border-[#315C4C] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Quantity Stepper & Add to Cart Action */}
              <div className="border-t border-[#E8E1DC] pt-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Stepper */}
                  <div className="flex h-12 items-center rounded-full border border-[#E8E1DC] bg-white px-3 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Kurangi kuantitas"
                      className="p-1 text-[#766F69] hover:text-[#24211F]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-[#24211F]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Tambah kuantitas"
                      className="p-1 text-[#766F69] hover:text-[#24211F]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Primary CTA: Tambah ke Keranjang */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 flex h-12 items-center justify-center gap-2 rounded-full bg-[#315C4C] px-6 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#284C3F] hover:shadow-lg active:scale-95"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Tambah ke Keranjang</span>
                    <span className="hidden sm:inline opacity-80 text-xs">
                      • {formatCurrency(totalPrice)}
                    </span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label="Simpan ke favorit"
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#E8E1DC] bg-white text-[#766F69] shadow-xs transition-colors hover:border-[#C97878] hover:text-[#C97878]"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        isWishlisted ? "fill-[#C97878] text-[#C97878] animate-pop" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Direct Buy Now Button */}
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full flex h-11 items-center justify-center gap-2 rounded-full border border-[#315C4C] bg-white text-xs font-semibold text-[#315C4C] hover:bg-[#F2F6EF] transition-colors"
                  >
                    <span>Beli Sekarang (Langsung Checkout)</span>
                  </button>
                </div>
              </div>

              {/* 3 Value Guarantee Badges - Matching reference */}
              <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[#E8E1DC] bg-[#F7EFE4]/40 p-3.5 text-center">
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-[#24211F]">Bunga Segar Pilihan</p>
                  <p className="text-[10px] text-[#766F69]">Tahan 3-5 hari</p>
                </div>
                <div className="border-x border-[#E8E1DC] space-y-1">
                  <p className="text-[11px] font-semibold text-[#24211F]">Pengiriman Hari Sama</p>
                  <p className="text-[10px] text-[#766F69]">Area tertentu</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-semibold text-[#24211F]">Dikemas Aman</p>
                  <p className="text-[10px] text-[#766F69]">Aman sampai tujuan</p>
                </div>
              </div>

            </div>

          </div>

          {/* DETAILED INFORMATION TABS SECTION */}
          <div className="mt-16 rounded-3xl border border-[#E8E1DC] bg-white p-6 sm:p-10 shadow-xs">
            {/* Tab Buttons */}
            <div className="flex border-b border-[#E8E1DC] gap-6 overflow-x-auto pb-1 text-sm font-medium">
              <button
                type="button"
                onClick={() => setActiveTab("komposisi")}
                className={`pb-3 border-b-2 transition ${
                  activeTab === "komposisi"
                    ? "border-[#315C4C] text-[#315C4C] font-semibold"
                    : "border-transparent text-[#766F69] hover:text-[#24211F]"
                }`}
              >
                Komposisi Bunga
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("perawatan")}
                className={`pb-3 border-b-2 transition ${
                  activeTab === "perawatan"
                    ? "border-[#315C4C] text-[#315C4C] font-semibold"
                    : "border-transparent text-[#766F69] hover:text-[#24211F]"
                }`}
              >
                Panduan Perawatan
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("pengiriman")}
                className={`pb-3 border-b-2 transition ${
                  activeTab === "pengiriman"
                    ? "border-[#315C4C] text-[#315C4C] font-semibold"
                    : "border-transparent text-[#766F69] hover:text-[#24211F]"
                }`}
              >
                Pengiriman & Jaminan QC
              </button>
            </div>

            {/* Tab Contents */}
            <div className="pt-6">
              {activeTab === "komposisi" && (
                <div className="space-y-4 text-xs sm:text-sm text-[#766F69] leading-relaxed">
                  <p className="text-[#24211F] font-medium">{product.description}</p>
                  <h4 className="font-bold text-[#24211F] pt-2">Spesifikasi Tangkai:</h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {product.flowerComposition.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-[#A4B494] italic pt-2">
                    * Catatan substitusi: Bila jenis dedaunan musiman habis, kami mengganti dengan varian setara atau lebih bernilai tanpa mengurangi estetika buket.
                  </p>
                </div>
              )}

              {activeTab === "perawatan" && (
                <div className="space-y-3 text-xs sm:text-sm text-[#766F69] leading-relaxed">
                  <h4 className="font-bold text-[#24211F]">Tips Merawat Bunga Tetap Segar 5–7 Hari:</h4>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Potong ujung batang bunga miring 45 derajat kira-kira 1-2 cm sebelum dimasukkan ke dalam vas.</li>
                    <li>Gunakan air dingin bersih dan ganti air vas setiap 1-2 hari sekali.</li>
                    <li>Jauhkan dari paparan sinar matahari langsung, kipas angin kencang, atau buah matang.</li>
                    <li>Gunakan flower food sachet yang disertakan di dalam paket Florétta.</li>
                  </ol>
                </div>
              )}

              {activeTab === "pengiriman" && (
                <div className="space-y-3 text-xs sm:text-sm text-[#766F69] leading-relaxed">
                  <h4 className="font-bold text-[#24211F]">Standar Operasional Pengiriman Florétta:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>SOP Quality Check:</strong> Florist akan mengambil foto hasil akhir buket dan mengunggahnya ke link tracking Anda sebelum diserahkan ke kurir.</li>
                    <li><strong>Packaging Khusus:</strong> Dilengkapi water sponge penahan hidrasi batang dan standing box pelindung anti guncangan.</li>
                    <li><strong>Kurir Terlatih:</strong> Dikirim dengan kurir penanganan khusus bunga dengan motor berpendingin atau mobil ber-AC.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* MOBILE STICKY BOTTOM BAR */}
        <div className="fixed bottom-0 inset-x-0 z-30 lg:hidden border-t border-[#E8E1DC] bg-white/95 backdrop-blur-md p-3.5 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[10px] text-[#766F69]">Total ({quantity}x {selectedVariant.name})</span>
              <p className="font-bold text-sm text-[#315C4C]">{formatCurrency(totalPrice)}</p>
            </div>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#315C4C] text-xs font-bold text-white shadow-sm hover:bg-[#284C3F] active:scale-95 transition"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Tambah ke Keranjang</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
