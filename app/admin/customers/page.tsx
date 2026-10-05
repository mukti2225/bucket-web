"use client";

import { useState } from "react";
import { Users, Search, Phone, Mail, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/currency";

export default function AdminCustomersPage() {
  const [customers] = useState([
    { id: "c-1", name: "Budi Santoso", email: "budi.santoso@example.com", phone: "0812-3456-7890", ordersCount: 3, totalSpend: 1980000, lastOrder: "16 Jun 2025" },
    { id: "c-2", name: "Siti Rahma", email: "siti.rahma@example.com", phone: "0813-9999-8888", ordersCount: 2, totalSpend: 1450000, lastOrder: "16 Jun 2025" },
    { id: "c-3", name: "Andi Pratama", email: "andi.pratama@example.com", phone: "0811-2222-3333", ordersCount: 5, totalSpend: 3820000, lastOrder: "16 Jun 2025" },
    { id: "c-4", name: "Dewi Lestari", email: "dewi.lestari@example.com", phone: "0812-7777-6666", ordersCount: 4, totalSpend: 2600000, lastOrder: "16 Jun 2025" },
    { id: "c-5", name: "Priska Anindya", email: "priska.a@example.com", phone: "0812-5555-4444", ordersCount: 1, totalSpend: 599000, lastOrder: "10 Jun 2025" },
  ]);

  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-[#24211F]">
          Data Pelanggan
        </h1>
        <p className="text-xs text-[#766F69] mt-0.5">
          Daftar akun pembeli, riwayat total belanja, dan aktivitas pemesanan terakhir.
        </p>
      </div>

      <Card className="p-4 border border-[#E8E1DC]">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#766F69]" />
          <input
            type="text"
            placeholder="Cari nama, email, atau no HP..."
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
                <th className="px-5 py-3.5">Pelanggan</th>
                <th className="px-5 py-3.5">Kontak</th>
                <th className="px-5 py-3.5">Total Pesanan</th>
                <th className="px-5 py-3.5">Total Transaksi</th>
                <th className="px-5 py-3.5">Pesanan Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E1DC] bg-white">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7F3F0]/40 transition">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#24211F]">{c.name}</p>
                    <p className="text-[11px] text-[#766F69]">ID: {c.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[#24211F]">{c.email}</p>
                    <p className="text-[11px] text-[#766F69]">{c.phone}</p>
                  </td>
                  <td className="px-5 py-4 font-medium text-[#24211F]">
                    {c.ordersCount} Pesanan
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#315C4C]">
                    {formatCurrency(c.totalSpend)}
                  </td>
                  <td className="px-5 py-4 text-[#766F69]">
                    {c.lastOrder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
