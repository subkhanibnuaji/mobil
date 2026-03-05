import Link from "next/link";
import type { DomainConfig } from "@/lib/types";

interface DomainCardProps {
  domain: DomainConfig;
  articleCount?: number;
}

export default function DomainCard({ domain, articleCount }: DomainCardProps) {
  return (
    <Link
      href={`/${domain.slug}`}
      className="block bg-white rounded-xl border border-border hover:shadow-lg transition-all p-6 group"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white text-xl font-bold"
        style={{ backgroundColor: domain.color }}
      >
        {domain.name.charAt(0)}
      </div>
      <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors mb-1">
        {domain.name}
      </h3>
      <p className="text-sm text-muted line-clamp-2">{domain.description}</p>
      {articleCount !== undefined && articleCount > 0 && (
        <p className="text-xs text-muted mt-3">{articleCount} artikel</p>
      )}
    </Link>
  );
}
