"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  ShoppingBag, 
  Users, 
  Calendar, 
  MapPin, 
  ShieldCheck,
  Sparkles,
  Ticket,
  Coins,
  Package
} from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useAuthStore } from "@/store/auth.store";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const navItems = [
    { name: "Ringkasan", href: "/account", icon: User },
    { name: "Pesanan Saya", href: "/account/orders", icon: ShoppingBag },
    { name: "Profil Saya", href: "/account/profile", icon: User },
    { name: "Daftar Alamat", href: "/account/addresses", icon: MapPin },
    { name: "Penerima Hadiah", href: "/account/recipients", icon: Users },
    { name: "Pengingat Tanggal", href: "/account/reminders", icon: Calendar },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      <main className="flex-1 py-6 sm:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          
          {/* ========================================================================= */}
          {/* SHOPEE / TOKOPEDIA STYLE USER MEMBER CARD */}
          {/* ========================================================================= */}
          <div className="mb-6 overflow-hidden rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white shadow-xs">
            <div className="p-5 sm:p-7 bg-gradient-to-r from-white via-[#FFFDFC] to-[#FAF8F5]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#315C4C] text-[#F7EFE4] text-2xl font-serif font-bold shadow-md ring-4 ring-[#F2F6EF]">
                      {user?.name?.charAt(0) || "B"}
                    </div>
                    <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[#3F7D5A] ring-2 ring-white" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#24211F]">
                        {user?.name || "Pelanggan Terhormat"}
                      </h1>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#315C4C]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#315C4C]">
                        <Sparkles className="h-3 w-3 text-[#C97878]" />
                        Member Gold Florétta
                      </span>
                      {user?.role === "ADMIN" && (
                        <span className="rounded-full bg-[#C97878]/15 px-2 py-0.5 text-[10px] font-bold text-[#C97878]">
                          ADMIN
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#766F69] mt-1">
                      {user?.email || "budi.santoso@example.com"} • {user?.phone || "0812-3456-7890"}
                    </p>
                  </div>
                </div>

                {/* Shopee / Tokopedia Loyalty & Quick Badges */}
                <div className="flex items-center gap-3 sm:gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-[#E8E1DC]/80">
                  <div className="flex items-center gap-2.5 bg-[#FAF8F5] px-3.5 py-2 rounded-2xl border border-[#E8E1DC]/60">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <Coins className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#766F69] font-medium">Florétta Poin</p>
                      <p className="text-xs font-bold text-[#24211F]">1.250 Poin</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 bg-[#FAF8F5] px-3.5 py-2 rounded-2xl border border-[#E8E1DC]/60">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-[#C97878]">
                      <Ticket className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-[#766F69] font-medium">Voucher Aktif</p>
                      <p className="text-xs font-bold text-[#24211F]">3 Kupon</p>
                    </div>
                  </div>

                  {user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="hidden sm:inline-flex items-center gap-1.5 rounded-2xl bg-[#315C4C] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#284C3F] transition shadow-xs"
                    >
                      <ShieldCheck className="h-4 w-4 text-[#F4DDD8]" />
                      <span>Admin Portal</span>
                    </Link>
                  )}
                </div>

              </div>
            </div>

            {/* HORIZONTAL SUB-NAVIGATION TABS (Shopee / Tokopedia Style) */}
            <div className="border-t border-[#E8E1DC] bg-white px-3 sm:px-6">
              <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2 scrollbar-none">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition relative ${
                        isActive
                          ? "bg-[#315C4C] text-white shadow-xs"
                          : "text-[#766F69] hover:bg-[#FAF8F5] hover:text-[#24211F]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MAIN PAGE CONTENT (Full Width & Spacious, No Aside) */}
          {/* ========================================================================= */}
          <div className="w-full">
            {children}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
