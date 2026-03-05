"use client";

import type { DiagnosticCause } from "@/lib/types";

interface DiagnosticTreeProps {
  problem: string;
  causes: DiagnosticCause[];
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-orange-100 text-orange-800",
  expert: "bg-red-100 text-red-800",
};

const difficultyLabels = {
  easy: "Mudah",
  medium: "Sedang",
  hard: "Sulit",
  expert: "Ahli",
};

export default function DiagnosticTree({ problem, causes }: DiagnosticTreeProps) {
  return (
    <div className="my-6 bg-white rounded-xl border border-border overflow-hidden">
      <div className="bg-danger text-white p-4">
        <h4 className="font-bold text-lg">Problem: {problem}</h4>
      </div>
      <div className="divide-y divide-border">
        {causes.map((c, i) => (
          <div key={i} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-sm text-primary">Penyebab: {c.cause}</p>
                <p className="text-sm text-muted mt-1">Solusi: {c.solution}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${difficultyColors[c.difficulty]}`}>
                {difficultyLabels[c.difficulty]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
