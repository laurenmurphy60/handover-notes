import Link from "next/link";
import type { Metadata } from "next";
import { getAllWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Your Name",
};

export default function WorkIndexPage() {
  const work = getAllWork();

  return (
    <section className="mx-auto max-w-page px-6 py-16 sm:py-20">
      <p className="label-eyebrow mb-4">Work</p>
      <h1 className="max-w-2xl font-display text-3xl font-medium text-ink sm:text-4xl">
        Initiatives, not just deliverables.
      </h1>
      <p className="mt-4 max-w-xl text-ink/65 leading-relaxed">
        Case studies here focus on what changed — about a team, a process, or
        a product — and what moved because of it.
      </p>

      <div className="mt-14 divide-y divide-line border-t border-line">
        {work.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group flex flex-col gap-3 py-8 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
          >
            <div className="sm:w-1/4">
              <p className="font-mono text-xs text-ink/50">{item.period}</p>
              <p className="mt-1 text-sm text-ink/70">{item.company}</p>
            </div>
            <div className="flex-1">
              <h2 className="flex items-center gap-2 font-display text-xl text-ink group-hover:text-slate">
                {item.title}
                {item.protected && (
                  <svg
                    aria-label="Password protected"
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 shrink-0 text-ink/40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="5" y="11" width="14" height="9" rx="1.5" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                )}
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
          No work entries yet. Add MDX files to{" "}
          <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-sm">
            src/content/work/
          </code>
          .
        </p>
      )}
    </section>
  );
}
