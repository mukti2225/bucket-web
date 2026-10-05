"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus, Search, Edit3, Trash2, CheckCircle2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PRODUCTS } from "@/data/products";
import { formatCurrency } from "@/utils/currency";
import { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Hand Bouquet");
  const [price, setPrice] = useState("450000");
  const [stock, setStock] = useState("15");

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      category: category as any,
      price: Number(price) || 350000,
      stock: Number(stock) || 10,
      rating: 5.0,
      reviewsCount: 1,
      shortDescription: "Buket bunga segar pilihan dengan kualitas terbaik.",
      description: "Dirangkai dengan tangan oleh florist ahli Florétta.",
      flowerComposition: ["Mawar Premium", "Baby Breath"],
      images: [
        "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80",
      ],
      color: "pink",
      colorName: "Pink",
      occasions: ["Ulang Tahun", "Anniversary"],
      variants: [{ id: "v1", name: "Regular", price: Number(price) || 350000 }],
      addons: [],
      isFreshGuarantee: true,
      sameDayDelivery: true,
    };

    setProducts([newProd, ...products]);
    setIsAddOpen(false);
    setName("");
  };

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#24211F]">
            Manajemen Produk & Katalog
          </h1>
          <p className="text-xs text-[#766F69] mt-0.5">
            Daftar buket bunga, hampers, harga varian, dan status ketersediaan.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          className="gap-2"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Produk Baru</span>
        </Button>
      </div>

      <Card className="p-4 border border-[#E8E1DC]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#766F69]" />
          <input
            type="text"
            placeholder="Cari nama produk atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-xl border border-[#E8E1DC] bg-white pl-9 pr-3 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
          />
        </div>
      </Card>

      <Card className="overflow-hidden border border-[#E8E1DC]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#24211F]">
            <thead className="border-b border-[#E8E1DC] bg-[#F7F3F0]/70 font-semibold text-[#766F69]">
              <tr>
                <th className="px-5 py-3.5">Produk</th>
                <th className="px-5 py-3.5">Kategori</th>
                <th className="px-5 py-3.5">Harga Dasar</th>
                <th className="px-5 py-3.5">Stok Fisik</th>
                <th className="px-5 py-3.5">Varian</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E1DC] bg-white">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#F7F3F0]/40 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-[#F7F3F0] shrink-0 border border-[#E8E1DC]">
                        <Image
                          src={prod.images[0]}
                          alt={prod.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-[#24211F]">{prod.name}</p>
                        <p className="text-[11px] text-[#766F69]">/{prod.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Badge variant="cream">{prod.category}</Badge>
                  </td>

                  <td className="px-5 py-4 font-semibold text-[#315C4C]">
                    {formatCurrency(prod.price)}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`font-medium ${prod.stock <= 5 ? "text-[#B84A4A] font-bold" : "text-[#24211F]"}`}>
                      {prod.stock} unit
                    </span>
                  </td>

                  <td className="px-5 py-4 text-[#766F69]">
                    {prod.variants.length} Varian
                  </td>

                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleDelete(prod.id)}
                        className="rounded-lg p-1.5 text-[#766F69] hover:bg-[#B84A4A]/10 hover:text-[#B84A4A] transition"
                        title="Hapus produk"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ADD PRODUCT MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#E8E1DC]">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8E1DC] pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#24211F]">
                Tambah Produk Buket
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="rounded-lg p-1.5 text-[#766F69] hover:bg-[#F7F3F0]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <Input
                label="Nama Produk Bunga"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Autumn Bliss Bouquet"
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#24211F]">
                  Kategori
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="flex h-11 w-full rounded-xl border border-[#E8E1DC] bg-white px-3.5 py-2 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                >
                  <option value="Hand Bouquet">Hand Bouquet</option>
                  <option value="Flower Box">Flower Box</option>
                  <option value="Standing Flower">Standing Flower</option>
                  <option value="Bunga Meja">Bunga Meja</option>
                  <option value="Hadiah & Hampers">Hadiah & Hampers</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Harga (Rp)"
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                  label="Stok Tersedia"
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsAddOpen(false)}
                >
                  Batal
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Simpan Produk
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
