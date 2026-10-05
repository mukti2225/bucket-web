"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Star, ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/utils/currency";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      variantName: product.variants[0]?.name || "Regular",
      variantPrice: product.price,
      addons: [],
      quantity: 1,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white p-3.5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-[#E8E1DC]/80 hover:border-[#315C4C]/40">
      {/* Product Image Box */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#F7F3F0]">
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        </Link>

        {/* Badge (Terlaris / Best Seller) */}
        {product.badge && (
          <div className="absolute left-2.5 top-2.5 rounded-full bg-[#C97878] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-white shadow-xs">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button with Pop Animation */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label="Simpan ke favorit"
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#766F69] backdrop-blur-xs transition-all duration-200 hover:bg-white hover:text-[#C97878] hover:scale-110 shadow-xs"
        >
          <Heart
            className={`h-4 w-4 transition-all duration-200 ${
              isWishlisted ? "fill-[#C97878] text-[#C97878] animate-pop" : "text-[#766F69]"
            }`}
          />
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden lg:flex opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#315C4C]/95 py-2.5 text-xs font-semibold text-white shadow-md backdrop-blur-xs hover:bg-[#284C3F] active:scale-95 transition"
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#F4DDD8]" />
                <span>Ditambahkan!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>Beli Cepat</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="mt-3 flex flex-1 flex-col justify-between">
        <div>
          <Link href={`/products/${product.slug}`} className="group-hover:text-[#315C4C] transition-colors">
            <h3 className="font-serif text-[16px] sm:text-[17px] font-medium text-[#24211F] leading-snug">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-sans text-[15px] font-semibold text-[#24211F]">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[12px] text-[#766F69] line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-[#766F69]">
          <div className="flex items-center text-[#C58A32]">
            <Star className="h-3.5 w-3.5 fill-[#C58A32]" />
            <span className="ml-1 font-medium text-[#24211F]">{product.rating.toFixed(1)}</span>
            <span className="ml-1 text-[#766F69]">({product.reviewsCount})</span>
          </div>

          <span className="text-[11px] text-[#3F7D5A] font-medium">
            Tersedia
          </span>
        </div>
      </div>
    </div>
  );
}
