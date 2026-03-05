"use client";

interface CalloutProps {
  type?: "info" | "warning" | "danger" | "tip";
  title?: string;
  children: React.ReactNode;
}

const styles = {
  info: { bg: "bg-blue-50", border: "border-blue-400", icon: "i", titleColor: "text-blue-800" },
  warning: { bg: "bg-amber-50", border: "border-amber-400", icon: "!", titleColor: "text-amber-800" },
  danger: { bg: "bg-red-50", border: "border-red-400", icon: "x", titleColor: "text-red-800" },
  tip: { bg: "bg-green-50", border: "border-green-400", icon: "v", titleColor: "text-green-800" },
};

export default function Callout({ type = "info", title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`${s.bg} border-l-4 ${s.border} p-4 rounded-r-lg my-4`}>
      {title && <p className={`font-semibold ${s.titleColor} mb-1`}>{title}</p>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
