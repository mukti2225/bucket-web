"use client";

import { useState } from "react";
import { Settings, Save, Check, Bell, Shield, Clock, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Florétta Florist & Gifting");
  const [cutoffTime, setCutoffTime] = useState("15:00");
  const [deliveryFee, setDeliveryFee] = useState("30000");
  const [announcement, setAnnouncement] = useState("Lebih dari sekadar bunga, untuk setiap cerita berharga. | Pengiriman Hari yang Sama Tersedia");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-[#24211F]">
          Pengaturan Toko & Operasional
        </h1>
        <p className="text-xs text-[#766F69] mt-0.5">
          Atur jam operasional pesanan same-day, ongkos kirim standar, dan pengumuman banner website.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {saved && (
          <div className="flex items-center gap-2 rounded-xl bg-[#3F7D5A]/10 border border-[#3F7D5A]/20 p-3 text-xs text-[#3F7D5A]">
            <Check className="h-4 w-4" />
            <span>Pengaturan operasional berhasil disimpan.</span>
          </div>
        )}

        <Card className="border border-[#E8E1DC]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#315C4C]" />
              <span>Jam Operasional & Batas Pengiriman (Cut-off Time)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Nama Toko / Brand"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
              <Input
                label="Batas Jam Pemesanan Hari yang Sama (Same-Day Cut-off)"
                type="time"
                value={cutoffTime}
                onChange={(e) => setCutoffTime(e.target.value)}
                helperText="Pesanan lewat jam ini otomatis dialihkan ke slot pengiriman besok pagi."
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#E8E1DC]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="h-4 w-4 text-[#315C4C]" />
              <span>Tarif Pengiriman Kurir Chilled</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tarif Pengiriman Flat Jabodetabek (Rp)"
                type="number"
                value={deliveryFee}
                onChange={(e) => setDeliveryFee(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-[#E8E1DC]">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#315C4C]" />
              <span>Teks Banner Pengumuman Header</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Isi Pengumuman Header Bar"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
          </CardContent>
        </Card>

        <Button type="submit" variant="primary" size="lg">
          Simpan Pengaturan
        </Button>
      </form>
    </div>
  );
}
