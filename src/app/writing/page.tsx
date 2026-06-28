import Link from "next/link";
import type { Metadata } from "next";
import { format } from "date-fns";
import { getAllWriting } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing — Your Name",
};

export default function WritingIndexPage() {
  const posts = getAllWriting();

  return (
    <section className="mx-auto max-w-page px-6 py-16 sm:py-20">
      <p className="label-eyebrow mb-4">Writing</p>
      <h1 className="max-w-2xl font-display text-3xl font-medium text-ink sm:text-4xl">
        Notes on building design teams.
      </h1>
      <p className="mt-4 max-w-xl text-ink/65 leading-relaxed">
        Mostly about design operations, critique, hiring, and the strategy
        underneath the craft.
      </p>

      <div className="mt-14 divide-y divide-line border-t border-line">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/writing/${post.slug}`}
            className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <div className="sm:w-32 shrink-0">
              <p className="font-mono text-xs text-ink/50">
                {format(new Date(post.date), "MMM yyyy")}
              </p>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg text-ink group-hover:text-slate">
                {post.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">
                {post.summary}
              </p>
            </div>
            <p className="shrink-0 font-mono text-xs text-ink/40">
              {post.readingTime}
            </p>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="mt-14 text-ink/60">
          No posts yet. Add MDX files to{" "}
          <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-sm">
            src/content/writing/
          </code>
          .
        </p>
      )}
    </section>
  );
}
