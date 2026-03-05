"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import { DEPRECIATION_CURVES } from "@/lib/constants";
import Breadcrumb from "@/components/layout/Breadcrumb";

const brands = [
  { value: "toyota", label: "Toyota" },
  { value: "honda", label: "Honda" },
  { value: "mitsubishi", label: "Mitsubishi" },
  { value: "suzuki", label: "Suzuki" },
  { value: "daihatsu", label: "Daihatsu" },
  { value: "wuling", label: "Wuling" },
  { value: "hyundai", label: "Hyundai" },
  { value: "luxury", label: "Luxury (BMW/Mercy/Audi)" },
];

export default function DepresiasiPage() {
  const [hargaBaru, setHargaBaru] = useState(300_000_000);
  const [brand, setBrand] = useState("toyota");

  const curve = DEPRECIATION_CURVES[brand];
  const years: { year: number; value: number; loss: number; cumLoss: number }[] = [];
  let currentValue = hargaBaru;
  let cumLoss = 0;

  for (let y = 1; y <= 10; y++) {
    let rate: number;
    if (y === 1) rate = curve.year1;
    else if (y <= 3) rate = curve.year2to3;
    else if (y <= 5) rate = curve.year4to5;
    else rate = curve.year4to5 * 0.8; // slower after year 5

    const loss = currentValue * rate;
    currentValue -= loss;
    cumLoss += loss;
    years.push({
      year: y,
      value: Math.round(currentValue),
      loss: Math.round(loss),
      cumLoss: Math.round(cumLoss),
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Kalkulator", href: "/kalkulator" },
          { label: "Estimasi Depresiasi" },
        ]}
      />

      <h1 className="text-3xl font-extrabold text-primary mb-2">Estimasi Depresiasi Mobil</h1>
      <p className="text-muted mb-8">
        Estimasi penurunan nilai mobil per tahun berdasarkan merek.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Harga Baru (Rp)</label>
            <input type="number" value={hargaBaru} onChange={(e) => setHargaBaru(Number(e.target.value))}
              className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Merek</label>
            <div className="space-y-1">
              {brands.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setBrand(b.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    brand === b.value
                      ? "bg-primary text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-border p-4 text-center">
              <p className="text-xs text-muted mb-1">Nilai di Tahun 5</p>
              <p className="text-lg font-bold text-primary">{formatRupiah(years[4]?.value ?? 0)}</p>
              <p className="text-xs text-danger">-{formatRupiah(years[4]?.cumLoss ?? 0)}</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-4 text-center">
              <p className="text-xs text-muted mb-1">Nilai di Tahun 7</p>
              <p className="text-lg font-bold text-primary">{formatRupiah(years[6]?.value ?? 0)}</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-4 text-center">
              <p className="text-xs text-muted mb-1">Nilai di Tahun 10</p>
              <p className="text-lg font-bold text-primary">{formatRupiah(years[9]?.value ?? 0)}</p>
            </div>
          </div>

          {/* Visual bar chart */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold mb-4">Estimasi Nilai Per Tahun</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-16 text-right text-muted">Baru</span>
                <div className="flex-1 bg-primary rounded h-6" style={{ width: "100%" }} />
                <span className="w-28 text-right font-medium">{formatRupiah(hargaBaru)}</span>
              </div>
              {years.map((y) => {
                const percent = (y.value / hargaBaru) * 100;
                return (
                  <div key={y.year} className="flex items-center gap-3 text-sm">
                    <span className="w-16 text-right text-muted">Thn {y.year}</span>
                    <div className="flex-1 bg-gray-100 rounded h-6 overflow-hidden">
                      <div
                        className="h-6 rounded transition-all"
                        style={{
                          width: `${percent}%`,
                          backgroundColor: percent > 60 ? "#2ECC71" : percent > 40 ? "#F39C12" : "#E74C3C",
                        }}
                      />
                    </div>
                    <span className="w-28 text-right font-medium">{formatRupiah(y.value)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-muted italic">
            * Kurva depresiasi bersifat estimasi dari observasi umum pasar Indonesia.
            Nilai aktual tergantung kondisi, km, warna, varian, dan demand pasar.
          </p>
        </div>
      </div>
    </div>
  );
}
