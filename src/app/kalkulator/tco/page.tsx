"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function TCOCalculatorPage() {
  const [hargaBeli, setHargaBeli] = useState(250_000_000);
  const [konsumsi, setKonsumsi] = useState(12); // km/liter
  const [jarakBulan, setJarakBulan] = useState(1500); // km/month
  const [hargaBBM, setHargaBBM] = useState(10_000); // Rp/liter
  const [servisTahun, setServisTahun] = useState(3_000_000);
  const [pajakTahun, setPajakTahun] = useState(3_500_000);
  const [asuransiTahun, setAsuransiTahun] = useState(6_000_000);
  const [depresiasiRate, setDepresiasiRate] = useState(12); // % year 1

  const bbmBulan = (jarakBulan / konsumsi) * hargaBBM;
  const bbm5tahun = bbmBulan * 60;
  const servis5tahun = servisTahun * 5;
  const pajak5tahun = pajakTahun * 5;
  const asuransi5tahun = asuransiTahun * 5;

  // Simple depreciation calc
  let nilaiMobil = hargaBeli;
  let totalDepresiasi = 0;
  for (let y = 1; y <= 5; y++) {
    const rate = y === 1 ? depresiasiRate / 100 : (depresiasiRate - 2) / 100;
    const loss = nilaiMobil * rate;
    totalDepresiasi += loss;
    nilaiMobil -= loss;
  }

  const tco5tahun = bbm5tahun + servis5tahun + pajak5tahun + asuransi5tahun + totalDepresiasi;
  const costPerMonth = tco5tahun / 60;
  const costPerKm = tco5tahun / (jarakBulan * 60);

  const breakdown = [
    { label: "BBM / Energi", value: bbm5tahun, color: "#FF6B35" },
    { label: "Servis & Perawatan", value: servis5tahun, color: "#2ECC71" },
    { label: "Pajak Kendaraan", value: pajak5tahun, color: "#3498DB" },
    { label: "Asuransi", value: asuransi5tahun, color: "#9B59B6" },
    { label: "Depresiasi", value: totalDepresiasi, color: "#E74C3C" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Kalkulator", href: "/kalkulator" },
          { label: "TCO Calculator" },
        ]}
      />

      <h1 className="text-3xl font-extrabold text-primary mb-2">Total Cost of Ownership (5 Tahun)</h1>
      <p className="text-muted mb-8">
        Kalkulasi total biaya kepemilikan mobil selama 5 tahun.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5 bg-white rounded-xl border border-border p-6">
          <div>
            <label className="block text-sm font-medium mb-1">Harga Beli (Rp)</label>
            <input type="number" value={hargaBeli} onChange={(e) => setHargaBeli(Number(e.target.value))}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Konsumsi (km/L)</label>
              <input type="number" value={konsumsi} onChange={(e) => setKonsumsi(Number(e.target.value))}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Jarak/bulan (km)</label>
              <input type="number" value={jarakBulan} onChange={(e) => setJarakBulan(Number(e.target.value))}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harga BBM (Rp/L)</label>
            <input type="number" value={hargaBBM} onChange={(e) => setHargaBBM(Number(e.target.value))}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Servis/tahun (Rp)</label>
              <input type="number" value={servisTahun} onChange={(e) => setServisTahun(Number(e.target.value))}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pajak/tahun (Rp)</label>
              <input type="number" value={pajakTahun} onChange={(e) => setPajakTahun(Number(e.target.value))}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Asuransi/tahun (Rp)</label>
              <input type="number" value={asuransiTahun} onChange={(e) => setAsuransiTahun(Number(e.target.value))}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Depresiasi thn 1 (%)</label>
              <input type="number" value={depresiasiRate} onChange={(e) => setDepresiasiRate(Number(e.target.value))}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-primary text-white rounded-xl p-6">
            <p className="text-sm text-gray-300 mb-1">TCO 5 Tahun</p>
            <p className="text-3xl font-extrabold">{formatRupiah(Math.round(tco5tahun))}</p>
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-gray-300">Per bulan</p>
                <p className="font-bold text-lg">{formatRupiah(Math.round(costPerMonth))}</p>
              </div>
              <div>
                <p className="text-gray-300">Per km</p>
                <p className="font-bold text-lg">{formatRupiah(Math.round(costPerKm))}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold mb-4">Breakdown Biaya</h3>
            <div className="space-y-3">
              {breakdown.map((item) => {
                const percent = (item.value / tco5tahun) * 100;
                return (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{item.label}</span>
                      <span className="font-medium">{formatRupiah(Math.round(item.value))}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ width: `${percent}%`, backgroundColor: item.color }}
                      />
                    </div>
                    <p className="text-xs text-muted mt-0.5">{percent.toFixed(1)}%</p>
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-xs text-muted italic">
            * Perhitungan bersifat estimasi. Biaya aktual bervariasi.
          </p>
        </div>
      </div>
    </div>
  );
}
