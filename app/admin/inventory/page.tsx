"use client";

import { useState } from "react";
import { Boxes, AlertTriangle, Plus, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState([
    { id: "inv-1", name: "Mawar Merah Semi-Holland", type: "Bunga Segar", currentStock: 48, minStock: 30, unit: "Tangkai", status: "Aman" },
    { id: "inv-2", name: "Mawar Soft Pink Import", type: "Bunga Segar", currentStock: 14, minStock: 25, unit: "Tangkai", status: "Menipis" },
    { id: "inv-3", name: "Baby's Breath Putih", type: "Filler Bunga", currentStock: 6, minStock: 10, unit: "Ikat", status: "Menipis" },
    { id: "inv-4", name: "Lily Putih Casablanca", type: "Bunga Segar", currentStock: 32, minStock: 15, unit: "Tangkai", status: "Aman" },
    { id: "inv-5", name: "Eucalyptus Parvifolia", type: "Dedaunan", currentStock: 20, minStock: 10, unit: "Ikat", status: "Aman" },
    { id: "inv-6", name: "Wrapping Paper Matte Cream", type: "Material", currentStock: 80, minStock: 20, unit: "Lembar", status: "Aman" },
    { id: "inv-7", name: "Pita Satin Sage Green 2.5cm", type: "Material", currentStock: 12, minStock: 5, unit: "Roll", status: "Aman" },
  ]);

  const handleRestock = (id: string) => {
    setInventory(
      inventory.map((item) =>
        item.id === id
          ? { ...item, currentStock: item.currentStock + 20, status: "Aman" }
          : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-[#24211F]">
            Inventori & Stok Florist
          </h1>
          <p className="text-xs text-[#766F69] mt-0.5">
            Monitoring ketersediaan tangkai bunga segar, filler, dan bahan pembungkus buket.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border border-[#E8E1DC]">
          <p className="text-xs text-[#766F69]">Total Item Material</p>
          <p className="font-serif text-2xl font-bold text-[#24211F] mt-1">{inventory.length} Jenis</p>
        </Card>
        <Card className="p-4 border border-[#E8E1DC]">
          <p className="text-xs text-[#766F69]">Stok Kritis / Menipis</p>
          <p className="font-serif text-2xl font-bold text-[#B84A4A] mt-1">2 Jenis Bunga</p>
        </Card>
        <Card className="p-4 border border-[#E8E1DC]">
          <p className="text-xs text-[#766F69]">Jadwal Pasokan Petani</p>
          <p className="font-serif text-2xl font-bold text-[#315C4C] mt-1">Besok 06.00 WIB</p>
        </Card>
      </div>

      <Card className="overflow-hidden border border-[#E8E1DC]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#24211F]">
            <thead className="border-b border-[#E8E1DC] bg-[#F7F3F0]/70 font-semibold text-[#766F69]">
              <tr>
                <th className="px-5 py-3.5">Nama Material Bunga</th>
                <th className="px-5 py-3.5">Tipe</th>
                <th className="px-5 py-3.5">Stok Saat Ini</th>
                <th className="px-5 py-3.5">Batas Minimum</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E1DC] bg-white">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-[#F7F3F0]/40 transition">
                  <td className="px-5 py-4 font-semibold text-[#24211F]">
                    {item.name}
                  </td>
                  <td className="px-5 py-4 text-[#766F69]">
                    {item.type}
                  </td>
                  <td className="px-5 py-4 font-medium text-[#24211F]">
                    {item.currentStock} {item.unit}
                  </td>
                  <td className="px-5 py-4 text-[#766F69]">
                    {item.minStock} {item.unit}
                  </td>
                  <td className="px-5 py-4">
                    {item.status === "Menipis" ? (
                      <Badge variant="destructive" className="gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        <span>Menipis</span>
                      </Badge>
                    ) : (
                      <Badge variant="success">Stok Aman</Badge>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 gap-1"
                      onClick={() => handleRestock(item.id)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Restock</span>
                    </Button>
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
