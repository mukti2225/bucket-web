"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { 
  ChevronRight, 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  RotateCcw,
  Sparkles
} from "lucide-react";
import { PRODUCTS, OCCASIONS_LIST } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ProductCategory, ProductOccasion } from "@/types";

export default function ProductListingPage() {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>("Hand Bouquet");
  const [maxPrice, setMaxPrice] = useState<number>(2000000);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"terlaris" | "termurah" | "termahal" | "rating">("terlaris");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: { name: ProductCategory; count: number }[] = [
    { name: "Hand Bouquet", count: 32 },
    { name: "Flower Box", count: 18 },
    { name: "Standing Flower", count: 12 },
    { name: "Bunga Meja", count: 15 },
    { name: "Hadiah & Hampers", count: 14 },
  ];

  const colorSwatches = [
    { id: "pink", name: "Blush", hex: "#F4DDD8" },
    { id: "red", name: "Red", hex: "#C97878" },
    { id: "cream", name: "Cream", hex: "#F7EFE4" },
    { id: "yellow", name: "Yellow", hex: "#F3D06F" },
    { id: "purple", name: "Purple", hex: "#C8B6DB" },
    { id: "white", name: "White", hex: "#EAEAEA" },
  ];

  // Filter products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      if (selectedColor && item.color !== selectedColor) return false;
      if (selectedOccasion && !item.occasions.includes(selectedOccasion as ProductOccasion)) return false;
      if (item.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "termurah") return a.price - b.price;
      if (sortBy === "termahal") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      // Default: terlaris
      return b.reviewsCount - a.reviewsCount;
    });
  }, [selectedColor, selectedOccasion, maxPrice, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("Hand Bouquet");
    setMaxPrice(2000000);
    setSelectedColor(null);
    setSelectedOccasion(null);
    setSortBy("terlaris");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Breadcrumb & Header Banner - Matching Section 2 */}
        <div className="border-b border-[#E8E1DC] bg-[#F7EFE4]/40 py-6 sm:py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-[#766F69]">
              <Link href="/" className="hover:text-[#315C4C] transition-colors">
                Beranda
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[#A4B494]" />
              <span className="font-medium text-[#24211F]">Bunga</span>
            </nav>

            <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#24211F]">
                  Hand Bouquet
                </h1>
                <p className="mt-1 max-w-xl text-sm text-[#766F69]">
                  Rangkaian bunga segar dengan sentuhan istimewa untuk setiap momen berharga.
                </p>
              </div>

              {/* Decorative handwritten quote matching reference */}
              <div className="hidden lg:block text-right">
                <p className="font-serif italic text-sm text-[#315C4C] font-light max-w-xs leading-relaxed">
                  &quot;Setiap momen, selalu lebih indah dengan bunga.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            
            {/* Left Filter Sidebar (Desktop) */}
            <aside className="hidden lg:block space-y-6 rounded-2xl border border-[#E8E1DC] bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-4">
                <h3 className="font-serif text-base font-semibold text-[#24211F]">
                  Filter Produk
                </h3>
                {(selectedColor || selectedOccasion || maxPrice < 2000000) && (
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-1 text-xs text-[#C97878] hover:underline"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Reset
                  </button>
                )}
              </div>

              {/* Kategori Filter */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#766F69]">
                  Kategori
                </h4>
                <div className="mt-3 space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat.name}
                      className="flex cursor-pointer items-center justify-between text-sm text-[#24211F] hover:text-[#315C4C] transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedCategory === cat.name}
                          onChange={() => setSelectedCategory(cat.name)}
                          className="h-4 w-4 rounded border-[#E8E1DC] text-[#315C4C] accent-[#315C4C]"
                        />
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-xs text-[#766F69]">({cat.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Harga Slider */}
              <div className="border-t border-[#E8E1DC] pt-5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#766F69]">
                    Harga Maksimal
                  </h4>
                  <span className="text-xs font-semibold text-[#315C4C]">
                    Rp {maxPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="mt-3">
                  <input
                    type="range"
                    min="100000"
                    max="2000000"
                    step="50000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#315C4C] cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between text-[11px] text-[#766F69]">
                    <span>Rp 100.000</span>
                    <span>Rp 2.000.000</span>
                  </div>
                </div>
              </div>

              {/* Warna Swatches */}
              <div className="border-t border-[#E8E1DC] pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#766F69]">
                  Warna Rangkaian
                </h4>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {colorSwatches.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() =>
                        setSelectedColor(selectedColor === color.id ? null : color.id)
                      }
                      title={color.name}
                      style={{ backgroundColor: color.hex }}
                      className={`relative flex h-7 w-7 items-center justify-center rounded-full border border-black/10 transition-all ${
                        selectedColor === color.id
                          ? "ring-2 ring-[#315C4C] ring-offset-2 scale-110"
                          : "hover:scale-105"
                      }`}
                    >
                      {selectedColor === color.id && (
                        <Check className="h-3.5 w-3.5 text-[#24211F]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion Filter */}
              <div className="border-t border-[#E8E1DC] pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#766F69]">
                  Momen (Occasion)
                </h4>
                <div className="mt-3 space-y-2">
                  {OCCASIONS_LIST.map((occ) => (
                    <label
                      key={occ.id}
                      className="flex cursor-pointer items-center justify-between text-sm text-[#24211F] hover:text-[#315C4C] transition"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedOccasion === occ.id}
                          onChange={() =>
                            setSelectedOccasion(selectedOccasion === occ.id ? null : occ.id)
                          }
                          className="h-4 w-4 rounded border-[#E8E1DC] text-[#315C4C] accent-[#315C4C]"
                        />
                        <span>{occ.name}</span>
                      </div>
                      <span className="text-xs text-[#766F69]">({occ.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Product Grid Area */}
            <div className="lg:col-span-3">
              {/* Toolbar: Counter, Mobile Filter Button, Sort Dropdown */}
              <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-4">
                <div className="flex items-center gap-3">
                  {/* Mobile filter toggle */}
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                    className="flex items-center gap-1.5 rounded-xl border border-[#E8E1DC] bg-white px-3 py-1.5 text-xs font-medium text-[#24211F] lg:hidden"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5 text-[#315C4C]" />
                    <span>Filter</span>
                  </button>

                  <span className="text-sm font-medium text-[#766F69]">
                    <strong className="text-[#24211F]">{filteredProducts.length}</strong> produk tersedia
                  </span>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="hidden sm:inline text-[#766F69]">Urutkan:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="appearance-none rounded-xl border border-[#E8E1DC] bg-white py-1.5 pl-3 pr-8 text-xs sm:text-sm font-medium text-[#24211F] outline-none focus:border-[#315C4C] cursor-pointer"
                    >
                      <option value="terlaris">Terlaris</option>
                      <option value="rating">Rating Tertinggi</option>
                      <option value="termurah">Harga: Rendah ke Tinggi</option>
                      <option value="termahal">Harga: Tinggi ke Rendah</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-[#766F69]" />
                  </div>
                </div>
              </div>

              {/* Mobile Filter Drawer / Collapsible */}
              {mobileFilterOpen && (
                <div className="mt-4 rounded-2xl border border-[#E8E1DC] bg-white p-4 lg:hidden shadow-md animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-3">
                    <h3 className="font-semibold text-sm">Filter Cepat</h3>
                    <button
                      onClick={() => setMobileFilterOpen(false)}
                      className="text-xs text-[#315C4C] font-semibold"
                    >
                      Tutup
                    </button>
                  </div>
                  <div className="pt-3 space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-[#766F69]">Pilih Warna</h4>
                      <div className="mt-2 flex gap-2">
                        {colorSwatches.map((color) => (
                          <button
                            key={color.id}
                            type="button"
                            onClick={() =>
                              setSelectedColor(selectedColor === color.id ? null : color.id)
                            }
                            style={{ backgroundColor: color.hex }}
                            className={`h-7 w-7 rounded-full border border-black/10 ${
                              selectedColor === color.id ? "ring-2 ring-[#315C4C]" : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Grid - Matching 6 items in reference image */}
              {filteredProducts.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="mt-12 text-center py-16 rounded-2xl border border-dashed border-[#E8E1DC] bg-white">
                  <p className="text-base font-medium text-[#24211F]">
                    Tidak ada produk yang sesuai dengan filter Anda.
                  </p>
                  <p className="mt-1 text-sm text-[#766F69]">
                    Coba sesuaikan range harga atau pilih warna yang berbeda.
                  </p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 rounded-full bg-[#315C4C] px-5 py-2 text-xs font-semibold text-white"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
