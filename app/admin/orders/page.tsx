"use client";

import Image from "next/image";
import { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Camera, 
  Upload, 
  X, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/utils/currency";
import { Order } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ord-1",
      orderNumber: "FD250616-00123",
      createdAt: "2025-06-16T10:24:00Z",
      status: "SEDANG_DIRANGKAI",
      customerName: "Budi Santoso",
      customerPhone: "0812-3456-7890",
      recipient: {
        name: "Cantika Budi Santosa",
        phone: "0812-3456-7890",
        relationship: "Pasangan",
        address: "Jl. Melati No. 10, Kebayoran Baru",
        city: "Jakarta Selatan",
        deliveryNotes: "Titipkan security jika keluar.",
      },
      delivery: {
        date: "Sen, 16 Jun 2025",
        timeSlot: "13.00 - 16.00",
      },
      messageCard: {
        to: "Cantika",
        from: "Budi",
        content: "Selamat ulang tahun yang terindah untukmu! Semoga harimu seharum dan seindah bunga-bunga ini.",
      },
      items: [
        {
          id: "item-1",
          product: {
            id: "prod-1",
            slug: "sweet-blush",
            name: "Sweet Blush",
            category: "Hand Bouquet",
            price: 599000,
            rating: 4.9,
            reviewsCount: 120,
            shortDescription: "Mawar pink dengan baby breath",
            description: "Deskripsi",
            flowerComposition: ["Mawar Soft Pink", "Baby's Breath", "Eucalyptus"],
            images: [
              "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80",
            ],
            color: "pink",
            colorName: "Pink",
            occasions: ["Ulang Tahun"],
            variants: [],
            addons: [],
            stock: 10,
            isFreshGuarantee: true,
            sameDayDelivery: true,
          },
          selectedVariant: { id: "v1", name: "Regular", price: 599000 },
          selectedAddons: [],
          quantity: 1,
        },
      ],
      subtotal: 599000,
      deliveryFee: 30000,
      total: 629000,
      qcPhotoUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
      qcPhotoTimestamp: "16 Jun 2025, 12:15 WIB",
      qcNote: "Mawar segar grade A lolos inspeksi kesegaran.",
    },
    {
      id: "ord-2",
      orderNumber: "FD250616-00122",
      createdAt: "2025-06-16T09:15:00Z",
      status: "MENUNGGU_PEMBAYARAN",
      customerName: "Siti Rahma",
      customerPhone: "0813-9999-8888",
      recipient: {
        name: "Ibu Fatimah",
        phone: "0813-1111-2222",
        relationship: "Ibu",
        address: "Jl. Tebet Barat Dalam No. 45",
        city: "Jakarta Selatan",
      },
      delivery: {
        date: "Sen, 16 Jun 2025",
        timeSlot: "10.00 - 13.00",
      },
      items: [],
      subtotal: 769000,
      deliveryFee: 30000,
      total: 799000,
    },
    {
      id: "ord-3",
      orderNumber: "FD250616-00121",
      createdAt: "2025-06-16T08:40:00Z",
      status: "QUALITY_CHECK",
      customerName: "Andi Pratama",
      customerPhone: "0811-2222-3333",
      recipient: {
        name: "Nadia Utami",
        phone: "0811-4444-5555",
        relationship: "Sahabat",
        address: "Apartemen Sudirman Tower A Unit 1204",
        city: "Jakarta Pusat",
      },
      delivery: {
        date: "Sen, 16 Jun 2025",
        timeSlot: "13.00 - 16.00",
      },
      items: [],
      subtotal: 569000,
      deliveryFee: 30000,
      total: 599000,
    },
    {
      id: "ord-4",
      orderNumber: "FD250616-00120",
      createdAt: "2025-06-16T08:12:00Z",
      status: "SELESAI",
      customerName: "Dewi Lestari",
      customerPhone: "0812-7777-6666",
      recipient: {
        name: "Ibu Dewi",
        phone: "0812-7777-6666",
        relationship: "Diri Sendiri",
        address: "Jl. Senopati No. 88",
        city: "Jakarta Selatan",
      },
      delivery: {
        date: "Sen, 16 Jun 2025",
        timeSlot: "09.00 - 12.00",
      },
      items: [],
      subtotal: 719000,
      deliveryFee: 30000,
      total: 749000,
      qcPhotoUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
      qcPhotoTimestamp: "16 Jun 2025, 08:30 WIB",
      qcNote: "Buket terkirim aman dan diterima resepsionis.",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Status update & QC simulation
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState<Order["status"]>("SEDANG_DIRANGKAI");
  const [qcNoteInput, setQcNoteInput] = useState("");

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === "ALL" || o.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.recipient.name.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "MENUNGGU_PEMBAYARAN":
        return <Badge variant="warning">Menunggu Bayar</Badge>;
      case "SEDANG_DIRANGKAI":
        return <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">Sedang Dirangkai</Badge>;
      case "QUALITY_CHECK":
        return <Badge variant="destructive">Quality Check (QC)</Badge>;
      case "DIKIRIM":
        return <Badge variant="default" className="bg-purple-700">Dikirim</Badge>;
      case "SELESAI":
        return <Badge variant="success">Selesai</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleUpdateStatusSubmit = () => {
    if (!selectedOrder) return;
    setIsUpdatingStatus(true);

    setTimeout(() => {
      setOrders((prev) =>
        prev.map((o) => {
          if (o.id === selectedOrder.id) {
            return {
              ...o,
              status: newStatus,
              ...(newStatus === "QUALITY_CHECK"
                ? {
                    qcPhotoUrl:
                      o.qcPhotoUrl ||
                      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80",
                    qcPhotoTimestamp: "16 Jun 2025, " + new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
                    qcNote: qcNoteInput || "Bunga lolos standar kualitas florist Florétta.",
                  }
                : {}),
            };
          }
          return o;
        })
      );

      setSelectedOrder(null);
      setIsUpdatingStatus(false);
      setQcNoteInput("");
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#24211F]">
            Manajemen Pesanan
          </h1>
          <p className="text-xs text-[#766F69] mt-0.5">
            Perbarui status pengerjaan florist, unggah foto QC, dan konfirmasi pengiriman kurir.
          </p>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <Card className="p-4 border border-[#E8E1DC]">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#766F69]" />
            <input
              type="text"
              placeholder="Cari no. order, pemesan, penerima..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-xl border border-[#E8E1DC] bg-white pl-9 pr-3 text-xs text-[#24211F] outline-none focus:border-[#315C4C]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { label: "Semua", value: "ALL" },
              { label: "Menunggu Bayar", value: "MENUNGGU_PEMBAYARAN" },
              { label: "Dirangkai", value: "SEDANG_DIRANGKAI" },
              { label: "QC", value: "QUALITY_CHECK" },
              { label: "Dikirim", value: "DIKIRIM" },
              { label: "Selesai", value: "SELESAI" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setFilterStatus(tab.value)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  filterStatus === tab.value
                    ? "bg-[#315C4C] text-white"
                    : "bg-[#F7F3F0] text-[#766F69] hover:text-[#24211F]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* ORDERS DATA TABLE (DESIGN.md §38) */}
      <Card className="overflow-hidden border border-[#E8E1DC]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#24211F]">
            <thead className="border-b border-[#E8E1DC] bg-[#F7F3F0]/70 font-semibold text-[#766F69]">
              <tr>
                <th className="px-5 py-3.5">No. Pesanan</th>
                <th className="px-5 py-3.5">Pemesan</th>
                <th className="px-5 py-3.5">Penerima & Alamat</th>
                <th className="px-5 py-3.5">Jadwal Kirim</th>
                <th className="px-5 py-3.5">Total</th>
                <th className="px-5 py-3.5">Status Pesanan</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E1DC] bg-white">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#F7F3F0]/40 transition">
                  <td className="px-5 py-4 font-semibold text-[#315C4C]">
                    <div className="flex items-center gap-1.5">
                      <span>{ord.orderNumber}</span>
                      {ord.qcPhotoUrl && (
                        <span title="Ada foto QC">
                          <Camera className="h-3.5 w-3.5 text-[#3F7D5A]" />
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#24211F]">{ord.customerName}</p>
                    <p className="text-[11px] text-[#766F69]">{ord.customerPhone}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#24211F]">
                      {ord.recipient.name} <span className="text-[10px] text-[#C97878] font-normal">({ord.recipient.relationship || "Penerima"})</span>
                    </p>
                    <p className="text-[11px] text-[#766F69] truncate max-w-xs">{ord.recipient.address}, {ord.recipient.city}</p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-[#24211F] font-medium">{ord.delivery.date}</p>
                    <p className="text-[11px] text-[#766F69]">{ord.delivery.timeSlot}</p>
                  </td>

                  <td className="px-5 py-4 font-semibold text-[#24211F]">
                    {formatCurrency(ord.total)}
                  </td>

                  <td className="px-5 py-4">
                    {getStatusBadge(ord.status)}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 gap-1"
                      onClick={() => {
                        setSelectedOrder(ord);
                        setNewStatus(ord.status);
                        setQcNoteInput(ord.qcNote || "");
                      }}
                    >
                      <span>Kelola</span>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ORDER DETAIL & STATUS UPDATE MODAL (DESIGN.md §39) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-[#E8E1DC] space-y-5">
            <div className="flex items-center justify-between border-b border-[#E8E1DC] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-semibold text-[#24211F]">
                    Detail Pesanan {selectedOrder.orderNumber}
                  </h3>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <p className="text-xs text-[#766F69]">
                  Dibuat pada {new Date(selectedOrder.createdAt).toLocaleString("id-ID")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-1.5 text-[#766F69] hover:bg-[#F7F3F0]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Recipient & Message Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl bg-[#F7F3F0]/60 p-4 border border-[#E8E1DC] space-y-1.5">
                <span className="font-semibold text-[#315C4C] block uppercase tracking-wider text-[10px]">
                  Informasi Penerima
                </span>
                <p className="font-semibold text-[#24211F] text-sm">{selectedOrder.recipient.name}</p>
                <p className="text-[#766F69]">{selectedOrder.recipient.phone}</p>
                <p className="text-[#24211F]">{selectedOrder.recipient.address}, {selectedOrder.recipient.city}</p>
                {selectedOrder.recipient.deliveryNotes && (
                  <p className="italic text-[#766F69] text-[11px] pt-1">
                    Catatan kurir: {selectedOrder.recipient.deliveryNotes}
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-[#F7EFE4]/60 p-4 border border-[#E8E1DC] space-y-1.5">
                <span className="font-semibold text-[#C58A32] block uppercase tracking-wider text-[10px]">
                  Pesan Kartu Ucapan
                </span>
                {selectedOrder.messageCard ? (
                  <>
                    <p className="text-[#766F69]">Kepada: <span className="font-medium text-[#24211F]">{selectedOrder.messageCard.to}</span></p>
                    <p className="text-[#766F69]">Dari: <span className="font-medium text-[#24211F]">{selectedOrder.messageCard.from}</span></p>
                    <p className="font-serif italic text-[#24211F] pt-1 leading-relaxed">
                      &ldquo;{selectedOrder.messageCard.content}&rdquo;
                    </p>
                  </>
                ) : (
                  <p className="text-[#766F69] italic">Tidak ada kartu ucapan khusus.</p>
                )}
              </div>
            </div>

            {/* QC Photo Section in Modal */}
            <div className="rounded-xl border border-[#E8E1DC] p-4 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-[#315C4C]" />
                  <span className="font-semibold text-xs text-[#24211F]">
                    Foto Quality Check (QC Photo)
                  </span>
                </div>
                {selectedOrder.qcPhotoUrl && (
                  <span className="text-[10px] text-[#3F7D5A] bg-[#3F7D5A]/10 px-2 py-0.5 rounded-full font-medium">
                    Foto Tersedia
                  </span>
                )}
              </div>

              {selectedOrder.qcPhotoUrl ? (
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-[#E8E1DC] shrink-0">
                    <Image
                      src={selectedOrder.qcPhotoUrl}
                      alt="Foto QC"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-xs text-[#766F69] space-y-0.5">
                    <p className="font-medium text-[#24211F]">Diunggah: {selectedOrder.qcPhotoTimestamp}</p>
                    <p>{selectedOrder.qcNote || "Rangkaian mawar soft pink segar telah lolos uji kelopak dan wrapping."}</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#E8E1DC] p-4 text-center text-xs text-[#766F69]">
                  <Upload className="h-5 w-5 mx-auto mb-1 text-[#766F69]" />
                  <span>Foto QC otomatis terpasang saat status diubah menjadi Quality Check (QC).</span>
                </div>
              )}
            </div>

            {/* ACTION STATUS CHANGER */}
            <div className="rounded-xl bg-[#F7F3F0] p-4 border border-[#E8E1DC] space-y-3">
              <label className="block text-xs font-semibold text-[#24211F]">
                Perbarui Status Pesanan
              </label>

              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as Order["status"])}
                className="flex h-11 w-full rounded-xl border border-[#E8E1DC] bg-white px-3.5 py-2 text-xs font-medium text-[#24211F] outline-none focus:border-[#315C4C]"
              >
                <option value="MENUNGGU_PEMBAYARAN">MENUNGGU PEMBAYARAN</option>
                <option value="SEDANG_DIRANGKAI">SEDANG DIRANGKAI (Florist)</option>
                <option value="QUALITY_CHECK">QUALITY CHECK (Siap & Foto QC)</option>
                <option value="DIKIRIM">DIKIRIM (Kurir Menuju Alamat)</option>
                <option value="SELESAI">SELESAI (Telah Diterima)</option>
              </select>

              {newStatus === "QUALITY_CHECK" && (
                <Input
                  label="Catatan QC Florist"
                  placeholder="Contoh: Rangkaian mawar pink segar grade A, pita satin rapi."
                  value={qcNoteInput}
                  onChange={(e) => setQcNoteInput(e.target.value)}
                />
              )}

              <div className="flex gap-2.5 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedOrder(null)}
                >
                  Batal
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  className="flex-1"
                  isLoading={isUpdatingStatus}
                  onClick={handleUpdateStatusSubmit}
                >
                  Simpan Status Baru
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
