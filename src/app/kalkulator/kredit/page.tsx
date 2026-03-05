"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function KreditCalculatorPage() {
  const [hargaOTR, setHargaOTR] = useState(250_000_000);
  const [dpPercent, setDpPercent] = useState(20);
  const [tenor, setTenor] = useState(5);
  const [bunga, setBunga] = useState(5);
  const [tipeBunga, setTipeBunga] = useState<"flat" | "efektif">("flat");

  const dpAmount = hargaOTR * (dpPercent / 100);
  const pinjaman = hargaOTR - dpAmount;
  const months = tenor * 12;

  let angsuran: number;
  let totalBayar: number;
  let totalBunga: number;

  if (tipeBunga === "flat") {
    totalBunga = pinjaman * (bunga / 100) * tenor;
    totalBayar = pinjaman + totalBunga;
    angsuran = totalBayar / months;
  } else {
    const monthlyRate = bunga / 100 / 12;
    if (monthlyRate === 0) {
      angsuran = pinjaman / months;
    } else {
      angsuran =
        (pinjaman * (monthlyRate * Math.pow(1 + monthlyRate, months))) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }
    totalBayar = angsuran * months;
    totalBunga = totalBayar - pinjaman;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "Kalkulator", href: "/kalkulator" },
          { label: "Simulasi Kredit" },
        ]}
      />

      <h1 className="text-3xl font-extrabold text-primary mb-2">Simulasi Kredit Mobil</h1>
      <p className="text-muted mb-8">
        Hitung angsuran bulanan, total bunga, dan total pembayaran kredit mobil Anda.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6 bg-white rounded-xl border border-border p-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Harga OTR: {formatRupiah(hargaOTR)}
            </label>
            <input
              type="range"
              min={100_000_000}
              max={1_000_000_000}
              step={10_000_000}
              value={hargaOTR}
              onChange={(e) => setHargaOTR(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>Rp 100jt</span><span>Rp 1M</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              DP: {dpPercent}% ({formatRupiah(dpAmount)})
            </label>
            <input
              type="range"
              min={10}
              max={50}
              step={5}
              value={dpPercent}
              onChange={(e) => setDpPercent(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>10%</span><span>50%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tenor: {tenor} tahun</label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenor(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    tenor === t
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-text border-border hover:border-primary"
                  }`}
                >
                  {t} thn
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Suku Bunga: {bunga}% / tahun
            </label>
            <input
              type="range"
              min={2}
              max={12}
              step={0.5}
              value={bunga}
              onChange={(e) => setBunga(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted mt-1">
              <span>2%</span><span>12%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tipe Bunga</label>
            <div className="flex gap-2">
              {(["flat", "efektif"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTipeBunga(t)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                    tipeBunga === t
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-text border-border hover:border-primary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-primary text-white rounded-xl p-6">
            <p className="text-sm text-gray-300 mb-1">Angsuran / Bulan</p>
            <p className="text-3xl font-extrabold">{formatRupiah(Math.round(angsuran))}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-border p-5">
              <p className="text-sm text-muted mb-1">DP</p>
              <p className="text-xl font-bold text-text">{formatRupiah(dpAmount)}</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <p className="text-sm text-muted mb-1">Jumlah Pinjaman</p>
              <p className="text-xl font-bold text-text">{formatRupiah(pinjaman)}</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <p className="text-sm text-muted mb-1">Total Bunga</p>
              <p className="text-xl font-bold text-danger">{formatRupiah(Math.round(totalBunga))}</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-5">
              <p className="text-sm text-muted mb-1">Total Bayar</p>
              <p className="text-xl font-bold text-text">{formatRupiah(Math.round(totalBayar + dpAmount))}</p>
            </div>
          </div>
          <p className="text-xs text-muted italic">
            * Perhitungan bersifat estimasi. Angka aktual dapat berbeda tergantung kebijakan leasing.
            Tipe bunga {tipeBunga === "flat" ? "flat" : "efektif"} digunakan.
          </p>
        </div>
      </div>
    </div>
  );
}
