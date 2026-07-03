import Link from "next/link";
import type { Metadata } from "next";
import { getAllPreviousWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Previous work — Your Name",
};

export default function PreviousWorkIndexPage() {
  const work = getAllPreviousWork();

  return (
    <section className="mx-auto max-w-page px-6 py-16 sm:py-20">
      <p className="label-eyebrow mb-4">Previous work</p>
      <h1 className="max-w-2xl font-display text-3xl font-medium text-ink sm:text-4xl">
        Case studies from earlier chapters.
      </h1>
      <p className="mt-4 max-w-xl text-ink/65 leading-relaxed">
        Complete initiatives from previous roles — what changed, and what I'd
        do differently.
      </p>

      <div className="mt-14 divide-y divide-line border-t border-line">
        {work.map((item) => (
          <Link
            key={item.slug}
            href={`/writing/${item.slug}`}
            className="group flex flex-col gap-3 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <div className="sm:w-1/4">
              <p className="font-mono text-xs text-ink/50">{item.period}</p>
              <p className="mt-1 text-sm text-ink/70">{item.company}</p>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg text-ink group-hover:text-slate">
                {item.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-ink/65">
                {item.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-ink/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {work.length === 0 && (
        <p className="mt-14 text-ink/60">
          No entries yet. Add MDX files to{" "}
          <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-sm">
            src/content/current-work/
          </code>
          .
        </p>
      )}
    </section>
  );
}
