import type { DomainConfig, DepreciationCurve } from "./types";

export const SITE_CONFIG = {
  name: "Otomotif Nexus",
  description:
    "Personal Automotive Knowledge Hub — Panduan lengkap otomotif Indonesia",
  url: "https://otomotif-nexus.vercel.app",
  author: "Ibnu",
};

export const DOMAINS: DomainConfig[] = [
  {
    name: "Panduan Beli Mobil",
    slug: "panduan-beli",
    description:
      "Tips membeli mobil baru & bekas, inspeksi, negosiasi, dan red flags",
    icon: "ShoppingCart",
    color: "#FF6B35",
    order: 1,
  },
  {
    name: "Perawatan & Perbaikan",
    slug: "perawatan",
    description:
      "Servis berkala, troubleshooting, common problems per brand, emergency guide",
    icon: "Wrench",
    color: "#2ECC71",
    order: 2,
  },
  {
    name: "Finansial & Kalkulasi",
    slug: "finansial",
    description:
      "Simulasi kredit, TCO, depresiasi, asuransi, pajak kendaraan, BBM vs listrik",
    icon: "Calculator",
    color: "#3498DB",
    order: 3,
  },
  {
    name: "Jenis & Kategori Mobil",
    slug: "jenis-mobil",
    description:
      "Klasifikasi by fuel, body type, segment, dan mobil populer Indonesia",
    icon: "Car",
    color: "#9B59B6",
    order: 4,
  },
  {
    name: "Sistem & Komponen Mesin",
    slug: "mesin",
    description:
      "Cara kerja mesin, fuel system, cooling, turbo, hybrid/EV powertrain",
    icon: "Cog",
    color: "#E67E22",
    order: 5,
  },
  {
    name: "Transmisi & Drivetrain",
    slug: "transmisi",
    description: "Manual vs matic, CVT, DCT, AMT, FWD/RWD/AWD explained",
    icon: "Settings",
    color: "#1ABC9C",
    order: 6,
  },
  {
    name: "Suspensi & Ban",
    slug: "suspensi-ban",
    description: "Jenis suspensi, panduan ban, alignment & balancing",
    icon: "Circle",
    color: "#E74C3C",
    order: 7,
  },
  {
    name: "Sistem Rem",
    slug: "rem",
    description: "Disc brake, drum brake, ABS, EBD, ESP, parking brake",
    icon: "OctagonAlert",
    color: "#C0392B",
    order: 8,
  },
  {
    name: "Kelistrikan & Elektronik",
    slug: "kelistrikan",
    description: "Aki, alternator, AC, ADAS, infotainment, OBD-II diagnostic",
    icon: "Zap",
    color: "#F1C40F",
    order: 9,
  },
  {
    name: "Body, Interior & Eksterior",
    slug: "body-interior",
    description: "Body structure, paint, detailing, aftermarket modification",
    icon: "Paintbrush",
    color: "#8E44AD",
    order: 10,
  },
  {
    name: "Regulasi & Administrasi",
    slug: "administrasi",
    description: "STNK, BPKB, pajak tahunan, balik nama, mutasi, uji emisi",
    icon: "FileText",
    color: "#2C3E50",
    order: 11,
  },
  {
    name: "Market & Tren",
    slug: "market-tren",
    description: "Data penjualan, tren EV Indonesia, prediksi market otomotif",
    icon: "TrendingUp",
    color: "#16A085",
    order: 12,
  },
];

export const DEPRECIATION_CURVES: Record<string, DepreciationCurve> = {
  toyota: { year1: 0.12, year2to3: 0.08, year4to5: 0.07 },
  honda: { year1: 0.14, year2to3: 0.09, year4to5: 0.08 },
  mitsubishi: { year1: 0.15, year2to3: 0.1, year4to5: 0.09 },
  suzuki: { year1: 0.16, year2to3: 0.1, year4to5: 0.09 },
  daihatsu: { year1: 0.15, year2to3: 0.1, year4to5: 0.09 },
  wuling: { year1: 0.2, year2to3: 0.12, year4to5: 0.1 },
  hyundai: { year1: 0.18, year2to3: 0.11, year4to5: 0.09 },
  luxury: { year1: 0.25, year2to3: 0.15, year4to5: 0.1 },
};

export const BBM_PRICES: Record<string, number> = {
  pertalite: 10000,
  pertamax: 13300,
  pertamax_turbo: 15200,
  solar: 6800,
  dexlite: 14500,
};

export const ELECTRICITY_RATE = 1444.7; // Rp/kWh (golongan R1 2200VA+)
