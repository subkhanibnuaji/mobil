"use client";

import { useState, useMemo } from "react";
import { getAllArticles } from "@/lib/content";
import ArticleCard from "@/components/content/ArticleCard";
import type { Article } from "@/lib/types";

// Static articles loaded at build time via generateStaticParams won't work client-side.
// For static export, we embed search data at build time via a separate approach.
// For now, this is a simple client-side search placeholder.

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-primary mb-6">Cari Artikel</h1>
      <div className="relative mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ketik kata kunci... (contoh: servis berkala, kredit mobil)"
          className="w-full border border-border rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          autoFocus
        />
      </div>
      <div className="text-center text-muted py-12">
        <p className="text-lg mb-2">Fitur pencarian akan tersedia setelah integrasi Pagefind.</p>
        <p className="text-sm">Sementara, gunakan navigasi kategori untuk menemukan artikel.</p>
      </div>
    </div>
  );
}
