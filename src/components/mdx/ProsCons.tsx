"use client";

interface ProsConsProps {
  pros: string[];
  cons: string[];
}

export default function ProsCons({ pros, cons }: ProsConsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">+</span>
          Kelebihan
        </h4>
        <ul className="space-y-1.5">
          {pros.map((pro, i) => (
            <li key={i} className="text-sm text-green-900 flex items-start gap-2">
              <span className="text-green-500 mt-0.5">&#10003;</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
        <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
          <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">-</span>
          Kekurangan
        </h4>
        <ul className="space-y-1.5">
          {cons.map((con, i) => (
            <li key={i} className="text-sm text-red-900 flex items-start gap-2">
              <span className="text-red-500 mt-0.5">&#10007;</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
