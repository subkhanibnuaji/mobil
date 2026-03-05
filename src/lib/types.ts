export type ContentType =
  | "guide"
  | "reference"
  | "comparison"
  | "diagnostic"
  | "calculator"
  | "checklist"
  | "deep-dive"
  | "update";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface ArticleFrontmatter {
  title: string;
  description: string;
  domain: string;
  contentType: ContentType;
  tags: string[];
  difficulty: Difficulty;
  order: number;
  lastUpdated: string;
  relatedSlugs: string[];
  coverImage?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
}

export interface DomainConfig {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface CalculatorResult {
  label: string;
  value: number;
  formatted: string;
}

export interface CostEstimateItem {
  item: string;
  bengkelResmi: number;
  bengkelUmum: number;
  diy: number;
}

export interface DiagnosticCause {
  cause: string;
  solution: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
}

export interface DepreciationCurve {
  year1: number;
  year2to3: number;
  year4to5: number;
}
