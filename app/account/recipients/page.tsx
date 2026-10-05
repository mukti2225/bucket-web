"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Plus, 
  MapPin, 
  Phone, 
  Heart, 
  Calendar, 
  Trash2, 
  Edit3, 
  Check, 
  X,
  Sparkles,
  ArrowRight,
  Gift
} from "lucide-react";
import { Recipient } from "@/types";

export default function AccountRecipientsPage() {
  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: "rec-1",
      name: "Cantika Budi Santosa",
      phone: "0812-3456-7890",
      relationship: "Pasangan",
      address: "Jl. Melati No. 10, Kebayoran Baru, Jakarta Selatan",
      city: "Jakarta Selatan",
      postalCode: "12140",
      notes: "Suka mawar baby pink, wangi segar lavender, tidak suka wrapping mencolok.",
      importantDates: [
        {
          id: "d-1",
          title: "Ulang Tahun Cantika",
          date: "16 Juni",
          occasion: "Ulang Tahun",
          recipientName: "Cantika Budi Santosa",
        },
        {
          id: "d-2",
          title: "Anniversary Hubungan",
          date: "24 September",
          occasion: "Anniversary",
          recipientName: "Cantika Budi Santosa",
        },
      ],
    },
    {
      id: "rec-2",
      name: "Siti Aminah",
      phone: "0813-8888-7777",
      relationship: "Ibu",
      address: "Jl. Dahlia Blok C3 No. 12, Tebet, Jakarta Selatan",
      city: "Jakarta Selatan",
      postalCode: "12810",
      notes: "Lebih menyukai bunga lily putih bersih atau anggrek anggun.",
      importantDates: [
        {
          id: "d-3",
          title: "Ulang Tahun Ibu",
          date: "12 Oktober",
          occasion: "Ulang Tahun",
          recipientName: "Siti Aminah",
        },
      ],
    },
    {
      id: "rec-3",
      name: "Rian Pratama",
      phone: "0818-1234-5678",
      relationship: "Sahabat",
      address: "Apartemen Sudirman Park Tower B Lt 18, Jakarta Pusat",
      city: "Jakarta Pusat",
      postalCode: "10220",
      notes: "Pilihan terbaik buket bunga matahari segar atau standing flower peresmian.",
      importantDates: [],
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relationship, setRelationship] = useState("Pasangan");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Jakarta Selatan");
  const [notes, setNotes] = useState("");

  const filters = [
    { id: "ALL", label: "Semua" },
    { id: "Pasangan", label: "Pasangan" },
    { id: "Ibu", label: "Orang Tua / Ibu" },
    { id: "Sahabat", label: "Sahabat" },
  ];

  const openAddModal = () => {
    setEditingId(null);
    setName("");
    setPhone("");
    setRelationship("Pasangan");
    setAddress("");
    setCity("Jakarta Selatan");
    setNotes("");
    setIsModalOpen(true);
  };

  const openEditModal = (rec: Recipient) => {
    setEditingId(rec.id);
    setName(rec.name);
    setPhone(rec.phone);
    setRelationship(rec.relationship);
    setAddress(rec.address);
    setCity(rec.city);
    setNotes(rec.notes || "");
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    if (editingId) {
      setRecipients((prev) =>
        prev.map((r) => {
          if (r.id === editingId) {
            return {
              ...r,
              name,
              phone,
              relationship,
              address,
              city,
              notes,
            };
          }
          return r;
        })
      );
    } else {
      const newRec: Recipient = {
        id: `rec-${Date.now()}`,
        name,
        phone,
        relationship,
        address,
        city,
        notes,
        importantDates: [],
      };
      setRecipients((prev) => [newRec, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setRecipients((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredRecipients = recipients.filter((r) => {
    if (selectedFilter === "ALL") return true;
    return r.relationship.toLowerCase() === selectedFilter.toLowerCase();
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E1DC] pb-4 mb-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#24211F]">
              Penerima Hadiah Tersimpan
            </h2>
            <p className="text-xs text-[#766F69] mt-0.5">
              Simpan selera bunga dan data orang tersayang agar proses pengiriman kejutan lebih praktis.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#315C4C] px-5 text-xs font-semibold text-white shadow-xs hover:bg-[#284C3F] transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Penerima</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedFilter(f.id)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition shrink-0 cursor-pointer ${
                selectedFilter === f.id
                  ? "bg-[#315C4C] text-white shadow-2xs"
                  : "bg-[#FAF8F5] text-[#766F69] hover:bg-white hover:text-[#24211F] border border-[#E8E1DC]/80"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recipients Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRecipients.map((rec) => (
          <div
            key={rec.id}
            className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs transition hover:shadow-sm flex flex-col justify-between"
          >
            <div>
              {/* Header Card */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F4DDD8] text-[#C97878] font-serif font-bold text-base shadow-xs">
                    {rec.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif text-base font-bold text-[#24211F]">
                        {rec.name}
                      </h3>
                      <span className="rounded-full bg-[#FAF8F5] border border-[#E8E1DC] px-2.5 py-0.5 text-[10px] font-semibold text-[#315C4C]">
                        {rec.relationship}
                      </span>
                    </div>
                    <p className="text-xs text-[#766F69] mt-0.5 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{rec.phone}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(rec)}
                    className="p-1.5 text-[#766F69] hover:text-[#315C4C] transition"
                    aria-label="Edit Penerima"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(rec.id)}
                    className="p-1.5 text-[#766F69] hover:text-[#B84A4A] transition"
                    aria-label="Hapus Penerima"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Address */}
              <div className="mt-3 text-xs text-[#766F69] flex items-start gap-1.5">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[#315C4C] mt-0.5" />
                <span>{rec.address}</span>
              </div>

              {/* Florist Preference Notes */}
              {rec.notes && (
                <div className="mt-3 rounded-xl bg-[#FAF8F5] p-3 text-xs border border-[#E8E1DC]/70">
                  <span className="font-semibold text-[#24211F] block mb-0.5">Catatan Selera Bunga:</span>
                  <p className="text-[#766F69]">{rec.notes}</p>
                </div>
              )}

              {/* Important Dates Connected */}
              {rec.importantDates && rec.importantDates.length > 0 && (
                <div className="mt-3 space-y-1">
                  <span className="text-[11px] font-semibold text-[#766F69] block">Tanggal Spesial:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.importantDates.map((d) => (
                      <span key={d.id} className="inline-flex items-center gap-1 rounded-lg bg-[#FAF8F5] border border-[#E8E1DC] px-2 py-0.5 text-[10px] text-[#24211F]">
                        <Calendar className="h-3 w-3 text-[#C97878]" />
                        <span>{d.title} ({d.date})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Kirim Bunga */}
            <div className="mt-5 pt-4 border-t border-[#E8E1DC]/70 flex items-center justify-between">
              <span className="text-[11px] text-[#3F7D5A] font-medium flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                Data terhubung ke checkout
              </span>
              <Link
                href="/products"
                className="inline-flex h-8.5 items-center justify-center gap-1.5 rounded-full bg-[#315C4C] px-4 text-xs font-semibold text-white shadow-2xs hover:bg-[#284C3F] transition"
              >
                <Gift className="h-3.5 w-3.5" />
                <span>Kirim Hadiah</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-3 mb-5">
              <h3 className="font-serif text-lg font-bold text-[#24211F]">
                {editingId ? "Ubah Data Penerima" : "Tambah Penerima Baru"}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#24211F] block mb-1">
                    Nama Penerima
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Cantika Budi Santosa"
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24211F] block mb-1">
                    Hubungan
                  </label>
                  <select
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                  >
                    <option value="Pasangan">Pasangan</option>
                    <option value="Ibu">Orang Tua / Ibu</option>
                    <option value="Sahabat">Sahabat</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Rekan Kerja">Rekan Kerja</option>
                  </select>
                </div>
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
                  placeholder="0812-3456-7890"
                  className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24211F] block mb-1">
                  Alamat Lengkap Pengiriman
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, gedung, atau patokan..."
                  className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white p-3 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#24211F] block mb-1">
                  Catatan Selera Bunga / Preferensi
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Contoh: Suka mawar pink, tidak suka wangi terlalu tajam"
                  className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                />
              </div>

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
                  Simpan Penerima
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
