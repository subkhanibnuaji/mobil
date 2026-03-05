import Link from "next/link";
import { DOMAINS, SITE_CONFIG } from "@/lib/constants";
import { getAllArticles } from "@/lib/content";
import DomainCard from "@/components/content/DomainCard";
import ArticleCard from "@/components/content/ArticleCard";

export default function HomePage() {
  const allArticles = getAllArticles();
  const recentArticles = allArticles
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 6);

  const domainArticleCounts = DOMAINS.map((d) => ({
    domain: d,
    count: allArticles.filter((a) => a.domain === d.slug).length,
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-secondary">Otomotif</span> Nexus
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Personal Automotive Knowledge Hub — Panduan lengkap otomotif Indonesia,
            dari beli mobil hingga perawatan dan kalkulasi finansial.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/panduan-beli"
              className="bg-secondary hover:bg-secondary-light text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Panduan Beli Mobil
            </Link>
            <Link
              href="/kalkulator"
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-white/20"
            >
              Kalkulator Otomotif
            </Link>
          </div>
        </div>
      </section>

      {/* Domain Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          12 Domain Pengetahuan
        </h2>
        <p className="text-center text-muted mb-10">
          Eksplorasi pengetahuan otomotif dari berbagai aspek
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {domainArticleCounts.map(({ domain, count }) => (
            <DomainCard key={domain.slug} domain={domain} articleCount={count} />
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold mb-6">Artikel Terbaru</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentArticles.map((article) => (
              <ArticleCard key={`${article.domain}/${article.slug}`} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Calculator Tools CTA */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Tools Interaktif</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/kalkulator/kredit" className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#128179;</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Simulasi Kredit</h3>
              <p className="text-sm text-muted">Hitung angsuran bulanan, total bunga, dan perbandingan bunga flat vs efektif</p>
            </Link>
            <Link href="/kalkulator/tco" className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#128200;</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Kalkulator TCO</h3>
              <p className="text-sm text-muted">Total Cost of Ownership 5 tahun — BBM, servis, pajak, asuransi, depresiasi</p>
            </Link>
            <Link href="/kalkulator/depresiasi" className="bg-white rounded-xl p-6 border border-border hover:shadow-lg transition-shadow text-center">
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">&#128201;</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Estimasi Depresiasi</h3>
              <p className="text-sm text-muted">Estimasi penurunan nilai mobil per tahun berdasarkan merek dan segment</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
