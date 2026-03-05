import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./utils";
import type { Article, ArticleFrontmatter } from "./types";

const contentDirectory = path.join(process.cwd(), "content");

export function getArticlesByDomain(domain: string): Article[] {
  const domainPath = path.join(contentDirectory, domain);

  if (!fs.existsSync(domainPath)) return [];

  const files = getAllMdxFiles(domainPath);

  return files
    .map((filePath) => parseArticle(filePath, domain))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => a.order - b.order);
}

export function getArticle(
  domain: string,
  slug: string
): Article | null {
  const domainPath = path.join(contentDirectory, domain);
  const filePath = path.join(domainPath, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    // Check in subdirectories
    const subPath = findMdxFile(domainPath, slug);
    if (!subPath) return null;
    return parseArticle(subPath, domain);
  }

  return parseArticle(filePath, domain);
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const domains = fs
    .readdirSync(contentDirectory)
    .filter((f) => {
      const fullPath = path.join(contentDirectory, f);
      return fs.statSync(fullPath).isDirectory();
    });

  return domains.flatMap((domain) => getArticlesByDomain(domain));
}

export function getAllDomainSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];

  return fs
    .readdirSync(contentDirectory)
    .filter((f) => {
      const fullPath = path.join(contentDirectory, f);
      return fs.statSync(fullPath).isDirectory();
    });
}

export function getArticleSlugsForDomain(domain: string): string[] {
  const articles = getArticlesByDomain(domain);
  return articles.map((a) => a.slug);
}

function getAllMdxFiles(dir: string): string[] {
  const results: string[] = [];

  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx") && !entry.name.startsWith("_")) {
      results.push(fullPath);
    }
  }

  return results;
}

function findMdxFile(dir: string, slug: string): string | null {
  const files = getAllMdxFiles(dir);
  return files.find((f) => path.basename(f, ".mdx") === slug) ?? null;
}

function parseArticle(filePath: string, domain: string): Article | null {
  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const frontmatter = data as ArticleFrontmatter;
    const slug = path.basename(filePath, ".mdx");

    return {
      ...frontmatter,
      slug,
      domain,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}
