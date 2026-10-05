"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Sparkles,
  ChevronRight
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { openCart, totalCount } = useCart();
  const [wishlistCount, setWishlistCount] = useState(2);

  const navLinks = [
    { name: "Bunga", href: "/products" },
    { name: "Hadiah", href: "/products?category=Hadiah+%26+Hampers" },
    { name: "Custom Bouquet", href: "/custom-bouquet" },
    { name: "Occasion", href: "/products#occasions" },
    { name: "Lacak Pesanan", href: "/track-order" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E1DC]/80 bg-[#FFFDFC]/95 backdrop-blur-md">
      {/* Top Banner / Announcement bar matching reference design slogan */}
      <div className="bg-[#315C4C] px-4 py-2 text-center text-xs font-medium text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="hidden sm:inline italic text-[#F4DDD8] font-serif text-[11px]">
            Florétta Florist & Gifting
          </span>
          <p className="flex-1 text-center font-normal tracking-wide text-white/95 text-[11px] sm:text-xs">
            <span className="italic font-serif font-light text-[#F4DDD8]">Lebih dari sekadar bunga,</span> untuk setiap cerita berharga. 
            <span className="hidden md:inline ml-2 text-white/70">| Pengiriman Hari yang Sama Tersedia</span>
          </p>
          <div className="hidden lg:flex items-center gap-3 text-[11px] text-white/80">
            <Link href="/track-order" className="hover:text-[#F4DDD8] transition-colors">
              Lacak Pesanan
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-[#24211F] lg:hidden hover:bg-[#F7F3F0] transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#315C4C] text-[#F7EFE4] shadow-xs transition-transform duration-300 group-hover:scale-110">
            <svg
              className="h-4.5 w-4.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V12m4.5 0a4.5 4.5 0 1 1-4.5 4.5M16.5 12H12m-4.5 0a4.5 4.5 0 1 0 4.5 4.5M7.5 12H12m0 4.5V21" />
            </svg>
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight text-[#24211F] group-hover:text-[#315C4C] transition-colors">
            Florétta
          </span>
        </Link>

        {/* Desktop Menu Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[14px] font-medium text-[#766F69] hover:text-[#315C4C] transition-colors relative py-1 hover:font-semibold"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Cari produk"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#24211F] transition-colors hover:bg-[#F7F3F0] hover:text-[#315C4C]"
            >
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-11 z-50 w-72 sm:w-80 rounded-2xl border border-[#E8E1DC] bg-white p-3.5 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari mawar, birthday, wisuda..."
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#F7F3F0]/60 px-3.5 py-2 pl-9 text-xs text-[#24211F] outline-none focus:border-[#315C4C] focus:bg-white transition-all"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#766F69]" />
                </div>
                <div className="mt-2.5 text-[11px] text-[#766F69]">
                  Populer: <Link href="/products?q=mawar" className="underline hover:text-[#315C4C] mr-2">Mawar</Link>
                  <Link href="/products?q=wisuda" className="underline hover:text-[#315C4C] mr-2">Wisuda</Link>
                  <Link href="/products?q=tulip" className="underline hover:text-[#315C4C]">Tulip</Link>
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <Link
            href="/products"
            aria-label="Daftar Favorit"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#24211F] transition-colors hover:bg-[#F7F3F0] hover:text-[#C97878] relative group"
          >
            <Heart className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#C97878] text-[10px] font-bold text-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon with Live Drawer Trigger */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Keranjang Belanja"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#24211F] transition-colors hover:bg-[#F7F3F0] hover:text-[#315C4C] relative group"
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#315C4C] text-[10px] font-bold text-white shadow-xs">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-[#E8E1DC] bg-white px-4 py-5 lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-base font-medium text-[#24211F] hover:bg-[#F7F3F0] hover:text-[#315C4C]"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#E8E1DC]/80 flex flex-col gap-2">
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#766F69] px-3 py-1.5 hover:text-[#315C4C]"
              >
                Lacak Status Pesanan
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
