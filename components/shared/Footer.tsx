import Link from "next/link";
import { ShieldCheck, Truck, Sparkles, Clock, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E1DC] bg-[#FDFBF7] text-[#24211F]">
      {/* Top Value Assurance Banner */}
      <div className="border-b border-[#E8E1DC]/80 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#24211F] sm:text-sm">Bunga Segar Pilihan</h4>
              <p className="text-[11px] text-[#766F69]">Langsung dari petani lokal</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#24211F] sm:text-sm">Pengiriman Tepat Waktu</h4>
              <p className="text-[11px] text-[#766F69]">Same-day & scheduled delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#24211F] sm:text-sm">Custom Sesuai Hati</h4>
              <p className="text-[11px] text-[#766F69]">Disesuaikan momen spesialmu</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F2F6EF] text-[#315C4C]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-[#24211F] sm:text-sm">Pembayaran Aman</h4>
              <p className="text-[11px] text-[#766F69]">100% terenkripsi & terpercaya</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#315C4C] text-white">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V12m4.5 0a4.5 4.5 0 1 1-4.5 4.5M16.5 12H12m-4.5 0a4.5 4.5 0 1 0 4.5 4.5M7.5 12H12m0 4.5V21" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#24211F]">
                Florétta
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#766F69]">
              Florist premium dan studio gifting yang merangkai setiap kuntum bunga menjadi ungkapan rasa dan cerita bermakna. Mengiringi momen terindah di hidup Anda.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs text-[#766F69]">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F6EF] px-3 py-1 font-medium text-[#315C4C]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3F7D5A]"></span>
                Florist Workshop Buka 08:00 - 21:00 WIB
              </span>
            </div>
          </div>

          {/* Kolom 1: Koleksi Bunga */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#24211F]">
              Koleksi Bunga
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#766F69]">
              <li>
                <Link href="/products" className="hover:text-[#315C4C] transition-colors">
                  Hand Bouquet
                </Link>
              </li>
              <li>
                <Link href="/products?category=box" className="hover:text-[#315C4C] transition-colors">
                  Flower Box
                </Link>
              </li>
              <li>
                <Link href="/products?category=standing" className="hover:text-[#315C4C] transition-colors">
                  Standing Flower
                </Link>
              </li>
              <li>
                <Link href="/products?category=table" className="hover:text-[#315C4C] transition-colors">
                  Bunga Meja
                </Link>
              </li>
              <li>
                <Link href="/custom-bouquet" className="hover:text-[#315C4C] transition-colors">
                  Custom Bouquet Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 2: Momen Spesial */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#24211F]">
              Momen Spesial
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#766F69]">
              <li>
                <Link href="/products?occasion=ulang-tahun" className="hover:text-[#315C4C] transition-colors">
                  Ulang Tahun
                </Link>
              </li>
              <li>
                <Link href="/products?occasion=anniversary" className="hover:text-[#315C4C] transition-colors">
                  Anniversary
                </Link>
              </li>
              <li>
                <Link href="/products?occasion=wisuda" className="hover:text-[#315C4C] transition-colors">
                  Kelulusan / Wisuda
                </Link>
              </li>
              <li>
                <Link href="/products?occasion=valentine" className="hover:text-[#315C4C] transition-colors">
                  Valentine Day
                </Link>
              </li>
              <li>
                <Link href="/products?occasion=pernikahan" className="hover:text-[#315C4C] transition-colors">
                  Pernikahan
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Pelanggan */}
          <div>
            <h4 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#24211F]">
              Bantuan & Layanan
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-[#766F69]">
              <li>
                <Link href="/track-order" className="hover:text-[#315C4C] transition-colors font-medium text-[#315C4C]">
                  Lacak Pesanan
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-[#315C4C] transition-colors">
                  Pertanyaan Umum (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/#policy" className="hover:text-[#315C4C] transition-colors">
                  Kebijakan Substitusi Bunga
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#315C4C] transition-colors">
                  Hubungi Florist (WhatsApp)
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#315C4C] transition-colors">
                  Dashboard Internal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-[#E8E1DC] pt-6 sm:flex-row">
          <p className="text-xs text-[#766F69]">
            © {new Date().getFullYear()} Florétta Florist & Gifting. Seluruh hak cipta dilindungi.
          </p>
          <p className="mt-2 text-xs text-[#766F69] sm:mt-0 flex items-center gap-1">
            Dibuat dengan <Heart className="h-3 w-3 fill-[#C97878] text-[#C97878]" /> untuk setiap momen berharga Anda.
          </p>
        </div>
      </div>
    </footer>
  );
}
