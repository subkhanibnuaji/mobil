import { notFound } from "next/navigation";
import { DOMAINS } from "@/lib/constants";
import { getArticlesByDomain } from "@/lib/content";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleCard from "@/components/content/ArticleCard";
import type { Metadata } from "next";

interface DomainPageProps {
  params: Promise<{ domain: string }>;
}

export async function generateStaticParams() {
  return DOMAINS.map((d) => ({ domain: d.slug }));
}

export async function generateMetadata({ params }: DomainPageProps): Promise<Metadata> {
  const { domain: domainSlug } = await params;
  const domain = DOMAINS.find((d) => d.slug === domainSlug);
  if (!domain) return {};
  return {
    title: domain.name,
    description: domain.description,
  };
}

export default async function DomainPage({ params }: DomainPageProps) {
  const { domain: domainSlug } = await params;
  const domain = DOMAINS.find((d) => d.slug === domainSlug);

  if (!domain) notFound();

  const articles = getArticlesByDomain(domainSlug);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: domain.name }]} />

      <div className="mb-8">
        <div
          className="w-14 h-14 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4"
          style={{ backgroundColor: domain.color }}
        >
          {domain.name.charAt(0)}
        </div>
        <h1 className="text-3xl font-extrabold text-primary mb-2">{domain.name}</h1>
        <p className="text-muted text-lg">{domain.description}</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted">
          <p className="text-lg mb-2">Belum ada artikel di kategori ini.</p>
          <p className="text-sm">Konten sedang dalam pengembangan.</p>
        </div>
      )}
    </div>
  );
}
