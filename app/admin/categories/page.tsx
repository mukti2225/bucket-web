"use client";

import { useState } from "react";
import { Layers, Plus, Trash2, Edit3, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([
    { id: "cat-1", name: "Hand Bouquet", count: 8, desc: "Buket pegang tangan klasik untuk kado & wisuda" },
    { id: "cat-2", name: "Flower Box", count: 4, desc: "Kotak rangkaian bunga silinder dan hati premium" },
    { id: "cat-3", name: "Standing Flower", count: 3, desc: "Rangkaian bunga standing untuk pembukaan toko & ucapan selamat" },
    { id: "cat-4", name: "Bunga Meja", count: 5, desc: "Vase bunga segar untuk dekorasi meja kantor & rumah" },
    { id: "cat-5", name: "Hadiah & Hampers", count: 6, desc: "Kombinasi bunga segar dengan cokelat, boneka, dan cake" },
  ]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    setCategories([...categories, { id: `cat-${Date.now()}`, name, count: 0, desc }]);
    setName("");
    setDesc("");
    setIsAddOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#24211F]">
            Kategori Produk
          </h1>
          <p className="text-xs text-[#766F69] mt-0.5">
            Kelola pengelompokan jenis rangkaian bunga dan koleksi gifting.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          className="gap-2"
          onClick={() => setIsAddOpen(true)}
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Kategori</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <Card key={cat.id} className="p-5 border border-[#E8E1DC] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-semibold text-[#24211F]">
                  {cat.name}
                </span>
                <span className="rounded-full bg-[#315C4C]/10 text-[#315C4C] px-2.5 py-0.5 text-xs font-semibold">
                  {cat.count} Produk
                </span>
              </div>
              <p className="text-xs text-[#766F69]">{cat.desc}</p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#E8E1DC] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handleDelete(cat.id)}
                className="text-xs text-[#B84A4A] hover:underline"
              >
                Hapus
              </button>
            </div>
          </Card>
        ))}
      </div>

      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#E8E1DC]">
            <div className="flex items-center justify-between mb-4 border-b border-[#E8E1DC] pb-3">
              <h3 className="font-serif text-lg font-semibold text-[#24211F]">
                Tambah Kategori Baru
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="rounded-lg p-1.5 text-[#766F69] hover:bg-[#F7F3F0]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-4">
              <Input
                label="Nama Kategori"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Bloom Box Spesial"
              />

              <Input
                label="Deskripsi Singkat"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Penjelasan singkat kategori"
              />

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
                  Simpan Kategori
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
