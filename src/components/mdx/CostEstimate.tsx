"use client";

import { formatRupiah } from "@/lib/utils";
import type { CostEstimateItem } from "@/lib/types";

interface CostEstimateProps {
  items: CostEstimateItem[];
  note?: string;
}

export default function CostEstimate({ items, note }: CostEstimateProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-primary text-white">
            <th className="p-3 text-left">Perbaikan</th>
            <th className="p-3 text-right">Bengkel Resmi</th>
            <th className="p-3 text-right">Bengkel Umum</th>
            <th className="p-3 text-right">DIY</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-3 font-medium">{item.item}</td>
              <td className="p-3 text-right">{formatRupiah(item.bengkelResmi)}</td>
              <td className="p-3 text-right">{formatRupiah(item.bengkelUmum)}</td>
              <td className="p-3 text-right">{formatRupiah(item.diy)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {note && (
        <p className="text-xs text-muted mt-2 italic">{note}</p>
      )}
    </div>
  );
}
