"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Layers, 
  Boxes, 
  Users, 
  Settings, 
  ArrowLeft,
  Bell,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const sidebarLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Pesanan", href: "/admin/orders", icon: ShoppingBag, badge: "12" },
    { name: "Produk", href: "/admin/products", icon: Package },
    { name: "Kategori", href: "/admin/categories", icon: Layers },
    { name: "Inventori", href: "/admin/inventory", icon: Boxes, badge: "Perlu Cek" },
    { name: "Pelanggan", href: "/admin/customers", icon: Users },
    { name: "Pengaturan", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F3F0]/60">
      
      {/* LEFT SIDEBAR: Botanical Dark Green (#1E3A2F) */}
      <aside className="hidden w-64 flex-col bg-[#1E3A2F] text-white lg:flex shrink-0">
        {/* Brand Header */}
        <div className="flex h-20 items-center gap-3 px-6 border-b border-white/10">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-[#F4DDD8]">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V12m4.5 0a4.5 4.5 0 1 1-4.5 4.5M16.5 12H12m-4.5 0a4.5 4.5 0 1 0 4.5 4.5M7.5 12H12m0 4.5V21" />
            </svg>
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-tight text-[#F7EFE4]">
              Florétta
            </span>
            <p className="text-[10px] text-white/60 tracking-wider uppercase font-sans">
              Admin Portal
            </p>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 space-y-1.5 px-3 py-6">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white/15 text-white font-semibold shadow-sm"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                    item.badge === "Perlu Cek" ? "bg-[#C58A32] text-white" : "bg-[#C97878] text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Return to Store Link */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl bg-white/10 py-2.5 text-xs font-semibold text-white/90 hover:bg-white/20 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Lihat Toko Pelanggan</span>
          </Link>
          <div className="px-2 pt-1 text-[11px] text-white/50 text-center">
            Logged in as {user?.email || "admin@floretta.id"}
          </div>
        </div>
      </aside>

      {/* RIGHT CONTENT COLUMN */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#E8E1DC] bg-white px-6 sm:px-8">
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg font-semibold text-[#24211F]">
              Pusat Operasional Florist & Gifting
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#766F69] hover:text-[#315C4C]"
            >
              <span>Live Website</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <div className="h-4 w-[1px] bg-[#E8E1DC] hidden sm:block" />

            {/* Admin Avatar */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#315C4C] text-[#F7EFE4] text-xs font-serif font-bold">
                AD
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-[#24211F]">Admin Florétta</p>
                <p className="text-[10px] text-[#766F69]">Florist Lead & Fulfillment</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Outlet */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
