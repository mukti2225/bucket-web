"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ProductCard from "@/components/product/ProductCard";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";

export default function CategoryDetailPage() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || "hand-bouquet";

  const categoryMap: Record<string, { title: string; subtitle: string; categoryName: string }> = {
    "hand-bouquet": {
      title: "Koleksi Hand Bouquet",
      subtitle: "Buket bunga pegang tangan dengan desain wrapping kontemporer dan kesegaran bunga terjamin.",
      categoryName: "Hand Bouquet",
    },
    "flower-box": {
      title: "Koleksi Bloom Box & Flower Box",
      subtitle: "Rangkaian bunga elegan di dalam kotak mewah silinder atau hati, siap pajang tanpa perlu vas.",
      categoryName: "Flower Box",
    },
    "standing-flower": {
      title: "Koleksi Standing Flower",
      subtitle: "Ucapan megah nan anggun untuk peresmian usaha, pernikahan, atau duka cita.",
      categoryName: "Standing Flower",
    },
    "bunga-meja": {
      title: "Koleksi Bunga Meja",
      subtitle: "Vase bunga meja untuk mempercantik sudut rumah, ruang tamu, atau meja kerja.",
      categoryName: "Bunga Meja",
    },
    "hadiah": {
      title: "Koleksi Hadiah & Hampers",
      subtitle: "Perpaduan bunga segar dengan cokelat artisan, boneka teddy, dan kue lezat.",
      categoryName: "Hadiah & Hampers",
    },
  };

  const currentCat = categoryMap[rawSlug.toLowerCase()] || {
    title: `Kategori ${rawSlug.replace(/-/g, " ")}`,
    subtitle: "Rangkaian bunga terbaik Florétta untuk momen istimewa Anda.",
    categoryName: "Hand Bouquet",
  };

  const matchingProducts = PRODUCTS.filter(
    (p) => p.category.toLowerCase() === currentCat.categoryName.toLowerCase()
  );

  const displayedProducts = matchingProducts.length > 0 ? matchingProducts : PRODUCTS;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFC]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#766F69] hover:text-[#315C4C] transition-colors mb-3"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Semua Koleksi Bunga</span>
            </Link>

            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#315C4C]/10 px-3 py-1 text-xs font-semibold text-[#315C4C] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Katalog Kategori Rangkaian</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#24211F]">
              {currentCat.title}
            </h1>
            <p className="mt-2 text-sm text-[#766F69] max-w-2xl leading-relaxed">
              {currentCat.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#E8E1DC] mb-8">
            {[
              { slug: "hand-bouquet", name: "Hand Bouquet" },
              { slug: "flower-box", name: "Flower Box" },
              { slug: "standing-flower", name: "Standing Flower" },
              { slug: "bunga-meja", name: "Bunga Meja" },
              { slug: "hadiah", name: "Hadiah & Hampers" },
            ].map((tab) => (
              <Link key={tab.slug} href={`/categories/${tab.slug}`}>
                <Button
                  variant={rawSlug === tab.slug ? "primary" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {tab.name}
                </Button>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
