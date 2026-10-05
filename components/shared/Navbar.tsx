"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  User,
  ChevronDown,
  Calendar,
  Users,
  MapPin,
  LogOut,
  ShieldCheck,
  Package
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuthStore } from "@/store/auth.store";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { openCart, totalCount } = useCart();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [wishlistCount] = useState(2);

  const navLinks = [
    { name: "Bunga", href: "/products" },
    { name: "Momen Spesial", href: "/occasions" },
    { name: "Custom Bouquet", href: "/custom-bouquet" },
    { name: "Hadiah", href: "/gifts" },
  ];

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#24211F] transition-colors hover:bg-[#F7F3F0] hover:text-[#315C4C] relative group cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#315C4C] text-[10px] font-bold text-white shadow-xs">
                {totalCount}
              </span>
            )}
          </button>

          {/* SHOPEE-STYLE ACCOUNT DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              aria-label="Menu Akun Pengguna"
              className="flex items-center gap-1.5 rounded-full p-1 sm:px-2.5 sm:py-1 text-[#24211F] transition-colors hover:bg-[#F7F3F0] hover:text-[#315C4C] cursor-pointer"
            >
              {isAuthenticated && user ? (
                <>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#315C4C] text-[#F7EFE4] text-xs font-semibold shadow-2xs">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-[#24211F] max-w-[100px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="h-3 w-3 text-[#766F69]" />
                </>
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-[#24211F]">
                  <User className="h-5 w-5" />
                </div>
              )}
            </button>

            {/* FLOATING DROPDOWN MENU (Shopee Style with top arrow) */}
            {accountDropdownOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-2xl border border-[#E8E1DC] bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150 z-50"
                onMouseLeave={() => setAccountDropdownOpen(false)}
              >
                {/* Shopee-style triangle pointer arrow */}
                <div className="absolute -top-2 right-4 h-4 w-4 rotate-45 border-l border-t border-[#E8E1DC] bg-white" />

                {isAuthenticated && user ? (
                  <>
                    {/* User profile header card */}
                    <div className="relative z-10 flex items-center gap-3 rounded-xl bg-[#FAF8F5] p-3 border border-[#E8E1DC]/60 mb-2">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#315C4C] text-white font-serif font-semibold text-sm shadow-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-[#24211F] truncate">{user.name}</p>
                        <span className="inline-block mt-0.5 rounded-full bg-[#3F7D5A]/15 px-2 py-0.2 text-[10px] font-semibold text-[#3F7D5A]">
                          Member Florétta
                        </span>
                        <p className="text-[10px] text-[#766F69] truncate mt-0.5">{user.email}</p>
                      </div>
                    </div>

                    {/* Menu links list */}
                    <div className="relative z-10 space-y-0.5 text-xs text-[#24211F]">
                      <Link
                        href="/account"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#24211F] hover:bg-[#F2F6EF] hover:text-[#315C4C] transition"
                      >
                        <User className="h-4 w-4 text-[#315C4C]" />
                        <span>Akun Saya</span>
                      </Link>

                      <Link
                        href="/account/orders"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#24211F] hover:bg-[#F2F6EF] hover:text-[#315C4C] transition"
                      >
                        <Package className="h-4 w-4 text-[#315C4C]" />
                        <span>Pesanan Saya</span>
                      </Link>

                      <Link
                        href="/account/recipients"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#24211F] hover:bg-[#F2F6EF] hover:text-[#315C4C] transition"
                      >
                        <Users className="h-4 w-4 text-[#315C4C]" />
                        <span>Penerima Tersimpan</span>
                      </Link>

                      <Link
                        href="/account/reminders"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#24211F] hover:bg-[#F2F6EF] hover:text-[#315C4C] transition"
                      >
                        <Calendar className="h-4 w-4 text-[#315C4C]" />
                        <span>Pengingat Tanggal</span>
                      </Link>

                      <Link
                        href="/account/addresses"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#24211F] hover:bg-[#F2F6EF] hover:text-[#315C4C] transition"
                      >
                        <MapPin className="h-4 w-4 text-[#315C4C]" />
                        <span>Daftar Alamat</span>
                      </Link>

                      {user.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#315C4C] hover:bg-[#F2F6EF] transition"
                        >
                          <ShieldCheck className="h-4 w-4 text-[#315C4C]" />
                          <span>Dashboard Admin</span>
                        </Link>
                      )}

                      {/* Divider & Logout */}
                      <div className="pt-1.5 mt-1.5 border-t border-[#E8E1DC]">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setAccountDropdownOpen(false);
                          }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#B84A4A] hover:bg-[#B84A4A]/10 transition cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Keluar dari Akun</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Logged out state */
                  <div className="relative z-10 p-2 space-y-2">
                    <div className="text-center pb-2 border-b border-[#E8E1DC]">
                      <p className="text-xs font-semibold text-[#24211F]">Selamat Datang di Florétta</p>
                      <p className="text-[10px] text-[#766F69] mt-0.5">Masuk untuk melihat pesanan &amp; penerima</p>
                    </div>

                    <Link
                      href="/login"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex h-9 w-full items-center justify-center rounded-xl bg-[#315C4C] text-xs font-semibold text-white shadow-xs hover:bg-[#284C3F] transition"
                    >
                      Masuk
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setAccountDropdownOpen(false)}
                      className="flex h-9 w-full items-center justify-center rounded-xl border border-[#E8E1DC] bg-white text-xs font-semibold text-[#24211F] hover:bg-[#F7F3F0] transition"
                    >
                      Daftar Akun Baru
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
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
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-[#315C4C] px-3 py-1.5 hover:bg-[#F7F3F0] rounded-lg"
              >
                Akun Saya
              </Link>
              <Link
                href="/account/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#766F69] px-3 py-1.5 hover:text-[#315C4C]"
              >
                Pesanan Saya
              </Link>
              <Link
                href="/track-order"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#766F69] px-3 py-1.5 hover:text-[#315C4C]"
              >
                Lacak Status Pesanan
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-[#766F69] px-3 py-1.5 hover:text-[#315C4C]"
              >
                Admin Portal
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
