import { notFound } from "next/navigation";
import { DOMAINS } from "@/lib/constants";
import { getArticle, getArticlesByDomain, getAllDomainSlugs, getArticleSlugsForDomain } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Breadcrumb, { getDomainLabel } from "@/components/layout/Breadcrumb";
import MDXRenderer from "@/components/content/MDXRenderer";
import ArticleCard from "@/components/content/ArticleCard";
import type { Metadata } from "next";

interface ArticlePageProps {
  params: Promise<{ domain: string; slug: string }>;
}

export async function generateStaticParams() {
  const domains = getAllDomainSlugs();
  const paths: { domain: string; slug: string }[] = [];

  for (const domain of domains) {
    const slugs = getArticleSlugsForDomain(domain);
    for (const slug of slugs) {
      paths.push({ domain, slug });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { domain, slug } = await params;
  const article = getArticle(domain, slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
  };
}

const difficultyLabel = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Lanjutan",
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { domain, slug } = await params;
  const article = getArticle(domain, slug);

  if (!article) notFound();

  const domainLabel = getDomainLabel(domain);

  // Get related articles
  const allDomainArticles = getArticlesByDomain(domain);
  const relatedArticles = allDomainArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: domainLabel, href: `/${domain}` },
          { label: article.title },
        ]}
      />

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
          {article.title}
        </h1>
        <p className="text-lg text-muted mb-4">{article.description}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
            {difficultyLabel[article.difficulty]}
          </span>
          <span>{article.readingTime} menit baca</span>
          <span>&#183;</span>
          <span>Diperbarui {formatDate(article.lastUpdated)}</span>
        </div>
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {article.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-muted px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <article className="mb-12">
        <MDXRenderer source={article.content} />
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="border-t border-border pt-8">
          <h2 className="text-xl font-bold mb-4">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
