import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
}

const difficultyBadge = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

const difficultyLabel = {
  beginner: "Pemula",
  intermediate: "Menengah",
  advanced: "Lanjutan",
};

const contentTypeLabel: Record<string, string> = {
  guide: "Panduan",
  reference: "Referensi",
  comparison: "Perbandingan",
  diagnostic: "Diagnostik",
  calculator: "Kalkulator",
  checklist: "Checklist",
  "deep-dive": "Deep Dive",
  update: "Update",
};

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/${article.domain}/${article.slug}`}
      className="block bg-white rounded-lg border border-border hover:shadow-md transition-shadow p-5 group"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
          {contentTypeLabel[article.contentType] ?? article.contentType}
        </span>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyBadge[article.difficulty]}`}>
          {difficultyLabel[article.difficulty]}
        </span>
      </div>
      <h3 className="font-semibold text-lg text-text group-hover:text-primary transition-colors mb-1">
        {article.title}
      </h3>
      <p className="text-sm text-muted line-clamp-2 mb-3">{article.description}</p>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>{article.readingTime} menit baca</span>
        <span>&#183;</span>
        <span>{formatDate(article.lastUpdated)}</span>
      </div>
    </Link>
  );
}
