"use client";

import { useState } from "react";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  X, 
  Search,
  CheckCircle2,
  Home,
  Building2
} from "lucide-react";
import { Address } from "@/types";

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "addr-1",
      label: "Rumah Utama",
      recipientName: "Budi Santoso",
      phone: "0812-3456-7890",
      addressLine: "Jl. Melati No. 10, RT 02/RW 04, Kebayoran Baru",
      city: "Jakarta Selatan",
      postalCode: "12140",
      isDefault: true,
      notes: "Pagar warna hitam, sebelah minimarket, bisa titip resepsionis.",
    },
    {
      id: "addr-2",
      label: "Kantor Menara",
      recipientName: "Budi Santoso",
      phone: "0812-3456-7890",
      addressLine: "Gedung Menara Sudirman Lantai 15, Jl. Jend. Sudirman Kav 60",
      city: "Jakarta Pusat",
      postalCode: "12190",
      isDefault: false,
      notes: "Kirim saat jam kerja 09.00 - 17.00 WIB. Titip di lobi security lantai 1.",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [label, setLabel] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("Jakarta Selatan");
  const [postalCode, setPostalCode] = useState("");
  const [notes, setNotes] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const openAddModal = () => {
    setEditingId(null);
    setLabel("Rumah");
    setReceiverName("");
    setPhone("");
    setAddressLine("");
    setCity("Jakarta Selatan");
    setPostalCode("");
    setNotes("");
    setIsDefault(addresses.length === 0);
    setIsModalOpen(true);
  };

  const openEditModal = (addr: Address) => {
    setEditingId(addr.id);
    setLabel(addr.label);
    setReceiverName(addr.recipientName);
    setPhone(addr.phone);
    setAddressLine(addr.addressLine);
    setCity(addr.city);
    setPostalCode(addr.postalCode || "");
    setNotes(addr.notes || "");
    setIsDefault(addr.isDefault);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverName || !addressLine) return;

    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => {
          if (a.id === editingId) {
            return {
              ...a,
              label,
              recipientName: receiverName,
              phone,
              addressLine,
              city,
              postalCode,
              notes,
              isDefault: isDefault ? true : a.isDefault,
            };
          }
          return isDefault ? { ...a, isDefault: false } : a;
        })
      );
    } else {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        label: label || "Alamat Tambahan",
        recipientName: receiverName,
        phone,
        addressLine,
        city,
        postalCode,
        notes,
        isDefault: isDefault || addresses.length === 0,
      };

      setAddresses((prev) => {
        if (isDefault) {
          return [newAddr, ...prev.map((a) => ({ ...a, isDefault: false }))];
        }
        return [...prev, newAddr];
      });
    }

    setIsModalOpen(false);
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const filteredAddresses = addresses.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.label.toLowerCase().includes(q) ||
      a.recipientName.toLowerCase().includes(q) ||
      a.addressLine.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. TOP BAR WITH SEARCH & ADD BUTTON (SHOPEE STYLE) */}
      {/* ========================================================================= */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1DC] pb-4 mb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#24211F]">
              Daftar Alamat Pengiriman
            </h2>
            <p className="text-xs text-[#766F69] mt-0.5">
              Simpan beberapa alamat untuk mempercepat pengiriman buket bunga dan kejutan hadiah.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#315C4C] px-5 text-xs font-semibold text-white shadow-xs hover:bg-[#284C3F] transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Alamat Baru</span>
          </button>
        </div>

        {/* Search Alamat */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#766F69]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama jalan, penerima, kota, atau label alamat..."
            className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white pl-10 pr-4 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C] transition"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ADDRESS CARDS LIST */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {filteredAddresses.map((addr) => (
          <div
            key={addr.id}
            className={`rounded-2xl sm:rounded-3xl border p-5 sm:p-6 transition shadow-xs ${
              addr.isDefault
                ? "border-[#315C4C] bg-white ring-1 ring-[#315C4C]/20"
                : "border-[#E8E1DC] bg-white hover:border-[#315C4C]/40"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#24211F]">
                    {addr.label.toLowerCase().includes("kantor") ? (
                      <Building2 className="h-3.5 w-3.5 text-[#315C4C]" />
                    ) : (
                      <Home className="h-3.5 w-3.5 text-[#315C4C]" />
                    )}
                    <span>{addr.label}</span>
                  </div>

                  {addr.isDefault && (
                    <span className="rounded-full bg-[#315C4C] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                      Alamat Utama
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#24211F]">
                  <span>{addr.recipientName}</span>
                  <span className="text-[#E8E1DC]">•</span>
                  <span className="text-[#766F69] font-normal">{addr.phone}</span>
                </div>

                <p className="text-xs text-[#766F69] leading-relaxed max-w-2xl">
                  {addr.addressLine}, {addr.city} {addr.postalCode && `(${addr.postalCode})`}
                </p>

                {addr.notes && (
                  <p className="text-[11px] text-[#315C4C] bg-[#F2F6EF] p-2.5 rounded-xl border border-[#315C4C]/20 inline-block">
                    📍 Patokan: {addr.notes}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8E1DC]/80">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditModal(addr)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#315C4C] hover:underline cursor-pointer"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Ubah</span>
                  </button>

                  {!addr.isDefault && (
                    <button
                      type="button"
                      onClick={() => handleDelete(addr.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#B84A4A] hover:underline cursor-pointer ml-2"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Hapus</span>
                    </button>
                  )}
                </div>

                {!addr.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(addr.id)}
                    className="mt-2 rounded-xl border border-[#E8E1DC] px-3 py-1.5 text-[11px] font-semibold text-[#766F69] hover:border-[#315C4C] hover:text-[#315C4C] transition"
                  >
                    Atur Sebagai Utama
                  </button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 3. MODAL TAMBAH / UBAH ALAMAT */}
      {/* ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-3 mb-5">
              <h3 className="font-serif text-lg font-bold text-[#24211F]">
                {editingId ? "Ubah Alamat Pengiriman" : "Tambah Alamat Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1 text-[#766F69] hover:bg-[#FAF8F5] transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#24211F] block mb-1">
                  Label Alamat (Contoh: Rumah, Kantor, Kos)
                </label>
                <input
                  type="text"
                  required
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="Rumah Utama"
                  className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#24211F] block mb-1">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="Budi Santoso"
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24211F] block mb-1">
                    Nomor WhatsApp / HP
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24211F] block mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  rows={3}
                  required
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                  className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white p-3 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#24211F] block mb-1">
                    Kota / Wilayah
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24211F] block mb-1">
                    Kode Pos
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="12140"
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24211F] block mb-1">
                  Catatan untuk Kurir (Patokan)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Pagar hitam, sebelah minimarket"
                  className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                />
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs text-[#24211F] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="h-4 w-4 rounded text-[#315C4C] focus:ring-[#315C4C]"
                />
                <span>Atur sebagai Alamat Utama</span>
              </label>

              <div className="pt-4 border-t border-[#E8E1DC] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full px-5 py-2 text-xs font-semibold text-[#766F69] hover:bg-[#FAF8F5] transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-[#315C4C] px-6 py-2 text-xs font-semibold text-white hover:bg-[#284C3F] transition shadow-xs"
                >
                  Simpan Alamat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
