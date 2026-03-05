import Link from "next/link";
import { DOMAINS } from "@/lib/constants";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-muted mb-6" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            Beranda
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <span className="text-border">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-text font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function getDomainLabel(slug: string): string {
  const domain = DOMAINS.find((d) => d.slug === slug);
  return domain?.name ?? slug;
}
