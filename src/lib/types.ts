export type WorkFrontmatter = {
  title: string;
  role: string;
  company: string;
  period: string; // e.g. "2023 — Present"
  summary: string; // one-line, shows on the index card
  tags: string[]; // e.g. ["design systems", "0→1", "team building"]
  metric?: string; // the one number that matters, e.g. "Grew team 3 → 14"
  featured?: boolean;
  draft?: boolean;
  protected?: boolean; // require the site-wide password before showing the full write-up
};

export type NowFrontmatter = {
  date: string; // ISO format
  tag: "shipped" | "wrote" | "spoke" | "joined" | "learned" | "other";
};

export type ContentMeta<F> = F & {
  slug: string;
  readingTime: string;
};
