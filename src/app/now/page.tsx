import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import type { NowFrontmatter } from "@/lib/types";

export const metadata: Metadata = {
  title: "Now — Your Name",
};

const tagColor: Record<string, string> = {
  shipped: "text-amber",
  wrote: "text-slate",
  spoke: "text-slate",
  joined: "text-amber",
  learned: "text-ink/50",
  other: "text-ink/50",
};

function getNowEntries() {
  const dir = path.join(process.cwd(), "src/content/now");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf-8");
      const { data, content } = matter(raw);
      return {
        ...(data as NowFrontmatter),
        slug: f.replace(/\.mdx$/, ""),
        body: content.trim(),
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default function NowPage() {
  const entries = getNowEntries();

  return (
    <section className="mx-auto max-w-page px-6 py-16 sm:py-20">
      <p className="label-eyebrow mb-4">Now</p>
      <h1 className="max-w-2xl font-display text-3xl font-medium text-ink sm:text-4xl">
        A running log, not a résumé.
      </h1>
      <p className="mt-4 max-w-xl text-ink/65 leading-relaxed">
        Updated as things happen rather than rewritten before interviews.
        Think of it as a commit history for a career.
      </p>

      <div className="relative mt-14 max-w-2xl border-l border-line">
        {entries.map((entry) => (
          <div key={entry.slug} className="relative py-6 pl-8 first:pt-0">
            <div
              className="absolute left-0 top-[1.7rem] h-2 w-2 -translate-x-1/2 rounded-full bg-slate"
              aria-hidden
            />
            <p className="font-mono text-xs text-ink/45">
              {format(new Date(entry.date), "MMM d, yyyy")}{" "}
              <span className={tagColor[entry.tag] ?? "text-ink/50"}>
                · {entry.tag}
              </span>
            </p>
            <p className="mt-1.5 max-w-xl leading-relaxed text-ink/85">
              {entry.body}
            </p>
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <p className="mt-14 text-ink/60">
          No entries yet. Add MDX files to{" "}
          <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-sm">
            src/content/now/
          </code>
          . Keep each one to a sentence or two.
        </p>
      )}
    </section>
  );
}
