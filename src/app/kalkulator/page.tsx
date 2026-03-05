import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator Otomotif",
  description: "Tools interaktif untuk kalkulasi kredit, TCO, dan depresiasi kendaraan",
};

const tools = [
  {
    title: "Simulasi Kredit Mobil",
    description: "Hitung angsuran bulanan dengan bunga flat atau efektif. Input DP, tenor, dan suku bunga untuk melihat total pembayaran.",
    href: "/kalkulator/kredit",
    color: "#3498DB",
  },
  {
    title: "Kalkulator TCO (Total Cost of Ownership)",
    description: "Kalkulasi total biaya kepemilikan mobil selama 5 tahun: BBM, servis, pajak, asuransi, dan depresiasi.",
    href: "/kalkulator/tco",
    color: "#2ECC71",
  },
  {
    title: "Estimasi Depresiasi",
    description: "Estimasi penurunan nilai mobil per tahun berdasarkan merek, segment, dan harga beli.",
    href: "/kalkulator/depresiasi",
    color: "#FF6B35",
  },
];

export default function KalkulatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-primary mb-2">Kalkulator Otomotif</h1>
      <p className="text-muted text-lg mb-10">
        Tools interaktif untuk membantu keputusan finansial otomotif Anda
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow group"
          >
            <div
              className="w-12 h-12 rounded-lg mb-4"
              style={{ backgroundColor: tool.color + "20" }}
            />
            <h2 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
              {tool.title}
            </h2>
            <p className="text-sm text-muted">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
