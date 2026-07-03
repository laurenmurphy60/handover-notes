import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { ContentMeta, WorkFrontmatter, NowFrontmatter } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

function getSlugs(dir: string): string[] {
  const full = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

function readFile(dir: string, slug: string) {
  const full = path.join(CONTENT_DIR, dir, `${slug}.mdx`);
  const raw = fs.readFileSync(full, "utf-8");
  return matter(raw);
}

const isProd = process.env.NODE_ENV === "production";

function notDraft(draft?: boolean) {
  return isProd ? !draft : true;
}

// ---------- Work ----------

export function getAllWork(): ContentMeta<WorkFrontmatter>[] {
  return getSlugs("work")
    .map((slug) => {
      const { data, content } = readFile("work", slug);
      return {
        ...(data as WorkFrontmatter),
        slug,
        readingTime: readingTime(content).text,
      };
    })
    .filter((item) => notDraft(item.draft))
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
}

export function getWorkBySlug(slug: string) {
  const { data, content } = readFile("work", slug);
  return { meta: data as WorkFrontmatter, content, slug };
}

// ---------- Previous work ----------

export function getAllPreviousWork(): ContentMeta<WorkFrontmatter>[] {
  return getSlugs("current-work")
    .map((slug) => {
      const { data, content } = readFile("current-work", slug);
      return {
        ...(data as WorkFrontmatter),
        slug,
        readingTime: readingTime(content).text,
      };
    })
    .filter((item) => notDraft(item.draft))
    .sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
}

export function getPreviousWorkBySlug(slug: string) {
  const { data, content } = readFile("current-work", slug);
  return { meta: data as WorkFrontmatter, content, slug };
}

// ---------- Now / changelog ----------

export function getAllNowEntries(): ContentMeta<NowFrontmatter>[] {
  return getSlugs("now")
    .map((slug) => {
      const { data, content } = readFile("now", slug);
      return {
        ...(data as NowFrontmatter),
        slug,
        readingTime: readingTime(content).text,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
