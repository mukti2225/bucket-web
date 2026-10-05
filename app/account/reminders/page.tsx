"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar, 
  Plus, 
  Sparkles, 
  ArrowRight, 
  Trash2, 
  Edit3,
  Heart, 
  Gift, 
  Clock, 
  Bell,
  X,
  CheckCircle2
} from "lucide-react";

interface ReminderItem {
  id: string;
  dayMonth: string;
  dateRaw: string;
  title: string;
  recipientName: string;
  relationship: string;
  daysRemaining: number;
  occasion: string;
  recommendation: string;
}

export default function AccountRemindersPage() {
  const [reminders, setReminders] = useState<ReminderItem[]>([
    {
      id: "rem-1",
      dayMonth: "16 JUN",
      dateRaw: "2025-06-16",
      title: "Ulang Tahun Cantika",
      recipientName: "Cantika Budi Santosa",
      relationship: "Pasangan",
      daysRemaining: 7,
      occasion: "Ulang Tahun",
      recommendation: "Buket Mawar Pink Sweet Blush atau Rosy Dream",
    },
    {
      id: "rem-2",
      dayMonth: "24 SEP",
      dateRaw: "2025-09-24",
      title: "Anniversary Pacaran",
      recipientName: "Cantika Budi Santosa",
      relationship: "Pasangan",
      daysRemaining: 107,
      occasion: "Anniversary",
      recommendation: "Red Romance 20 Tangkai Mawar Beludru",
    },
    {
      id: "rem-3",
      dayMonth: "12 OKT",
      dateRaw: "2025-10-12",
      title: "Ulang Tahun Ibu",
      recipientName: "Siti Aminah",
      relationship: "Ibu",
      daysRemaining: 125,
      occasion: "Ulang Tahun",
      recommendation: "Buket White Serenade Casablanca Lily",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [relationship, setRelationship] = useState("Pasangan");
  const [occasion, setOccasion] = useState("Ulang Tahun");
  const [date, setDate] = useState("2025-06-16");

  const openAddModal = () => {
    setEditingId(null);
    setTitle("");
    setRecipientName("");
    setRelationship("Pasangan");
    setOccasion("Ulang Tahun");
    setDate("2025-06-16");
    setIsModalOpen(true);
  };

  const openEditModal = (rem: ReminderItem) => {
    setEditingId(rem.id);
    setTitle(rem.title);
    setRecipientName(rem.recipientName);
    setRelationship(rem.relationship);
    setOccasion(rem.occasion);
    setDate(rem.dateRaw);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !recipientName) return;

    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const months = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN", "JUL", "AGU", "SEP", "OKT", "NOV", "DES"];
    const monthStr = months[dateObj.getMonth()];
    const dayMonth = `${day} ${monthStr}`;

    if (editingId) {
      setReminders((prev) =>
        prev.map((r) => {
          if (r.id === editingId) {
            return {
              ...r,
              title,
              recipientName,
              relationship,
              occasion,
              dateRaw: date,
              dayMonth,
            };
          }
          return r;
        })
      );
    } else {
      const newRem: ReminderItem = {
        id: `rem-${Date.now()}`,
        title,
        recipientName,
        relationship,
        occasion,
        dateRaw: date,
        dayMonth,
        daysRemaining: 30,
        recommendation: "Buket Bunga Segar Pilihan Florist",
      };
      setReminders((prev) => [newRem, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="rounded-2xl sm:rounded-3xl border border-[#E8E1DC] bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#24211F]">
              Pengingat Tanggal Penting
            </h2>
            <p className="text-xs text-[#766F69] mt-0.5">
              Jangan lewatkan ulang tahun, anniversary, dan momen spesial orang terdekat Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#315C4C] px-5 text-xs font-semibold text-white shadow-xs hover:bg-[#284C3F] transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Pengingat Baru</span>
          </button>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-4">
        {reminders.map((rem) => {
          const isSoon = rem.daysRemaining <= 14;
          return (
            <div
              key={rem.id}
              className={`rounded-2xl sm:rounded-3xl border p-5 sm:p-6 transition shadow-xs ${
                isSoon 
                  ? "border-[#C97878]/40 bg-gradient-to-r from-white via-[#FDF5F3] to-[#FFFDFC] ring-1 ring-[#C97878]/20" 
                  : "border-[#E8E1DC] bg-white"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                
                {/* Left Date block + info */}
                <div className="flex items-center gap-4">
                  <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border text-center shadow-xs ${
                    isSoon 
                      ? "bg-[#C97878] text-white border-[#C97878]" 
                      : "bg-[#FAF8F5] text-[#24211F] border-[#E8E1DC]"
                  }`}>
                    <span className="text-lg font-serif font-bold leading-none">
                      {rem.dayMonth.split(" ")[0]}
                    </span>
                    <span className="text-[10px] font-bold tracking-wider uppercase mt-0.5">
                      {rem.dayMonth.split(" ")[1]}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-[#24211F]">
                        {rem.title}
                      </h3>
                      {isSoon ? (
                        <span className="rounded-full bg-[#C97878] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                          {rem.daysRemaining} Hari Lagi!
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#FAF8F5] border border-[#E8E1DC] px-2.5 py-0.5 text-[10px] font-semibold text-[#766F69]">
                          {rem.daysRemaining} hari lagi
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#766F69] mt-0.5">
                      Untuk: <span className="font-semibold text-[#24211F]">{rem.recipientName}</span> ({rem.relationship}) • Momen: {rem.occasion}
                    </p>

                    <p className="text-[11px] text-[#315C4C] mt-1.5 flex items-center gap-1 font-medium">
                      <Sparkles className="h-3 w-3" />
                      <span>Saran Bunga: {rem.recommendation}</span>
                    </p>
                  </div>
                </div>

                {/* Right Action CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8E1DC]/80">
                  <Link
                    href="/products"
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#315C4C] px-4 text-xs font-semibold text-white shadow-2xs hover:bg-[#284C3F] transition"
                  >
                    <Gift className="h-3.5 w-3.5" />
                    <span>Pesan Sekarang</span>
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(rem)}
                      className="text-xs font-semibold text-[#766F69] hover:text-[#315C4C] transition"
                    >
                      Ubah
                    </button>
                    <span className="text-[#E8E1DC]">•</span>
                    <button
                      type="button"
                      onClick={() => handleDelete(rem.id)}
                      className="text-xs font-semibold text-[#B84A4A] hover:underline transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-3 mb-5">
              <h3 className="font-serif text-lg font-bold text-[#24211F]">
                {editingId ? "Ubah Pengingat Tanggal" : "Buat Pengingat Baru"}
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
                  Nama Acara / Pengingat
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Ulang Tahun Cantika"
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
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
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
                    <option value="Ibu">Ibu / Orang Tua</option>
                    <option value="Sahabat">Sahabat</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Rekan Kerja">Rekan Kerja</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#24211F] block mb-1">
                    Kategori Momen
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                  >
                    <option value="Ulang Tahun">Ulang Tahun</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Wisuda">Wisuda</option>
                    <option value="Hari Ibu">Hari Ibu</option>
                    <option value="Valentine">Valentine</option>
                    <option value="Kustom">Momen Khusus</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#24211F] block mb-1">
                    Tanggal Penting
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-[#E8E1DC] bg-[#FAF8F5] focus:bg-white px-3.5 py-2.5 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
                  />
                </div>
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
                  Simpan Pengingat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
