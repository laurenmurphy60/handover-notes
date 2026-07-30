import Link from "next/link";
import { getAllWork } from "@/lib/content";
import { ProtectedLink } from "@/components/ProtectedLink";
import { isSessionUnlocked } from "@/lib/auth";

export default async function HomePage() {
  const work = getAllWork().filter((w) => w.featured).slice(0, 3);
  const unlocked = await isSessionUnlocked();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-page px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="label-eyebrow mb-5">Design leadership · Strategy · Systems</p>
        <h1 className="max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
          I&apos;m Lauren. I love creating{" "}
          <span className="italic text-slate">experiences</span>, so to help
          me do that I&apos;ve been building and leading a multi-functional
          team across design, product and behavioural analytics
        </h1>
        <p className="mt-4 max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl md:text-4xl">
          — helping shape strategy and practices that make good work feel
          easy.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="rounded-full bg-ink px-6 py-3 font-mono text-sm text-paper transition-colors hover:bg-slate-deep"
          >
            See the work →
          </Link>
        </div>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-page px-6 py-20">
        <div className="mb-10 flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-ink">Selected work</h2>
          <Link href="/work" className="font-mono text-sm text-slate hover:underline">
            View all →
          </Link>
        </div>

        {work.length === 0 ? (
          <p className="text-ink/60">
            Add MDX files to{" "}
            <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-sm">
              src/content/work
            </code>{" "}
            with <code className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-sm">featured: true</code> to show them here.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-3">
            {work.map((item) => (
              <ProtectedLink
                key={item.slug}
                href={`/work/${item.slug}`}
                locked={Boolean(item.protected) && !unlocked}
                title={item.title}
                className="group block border-t border-line pt-5"
              >
                <p className="font-mono text-xs text-ink/50">{item.period}</p>
                <h3 className="mt-2 font-display text-lg text-ink group-hover:text-slate">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {item.summary}
                </p>
                {item.metric && (
                  <p className="mt-3 font-mono text-xs text-amber">{item.metric}</p>
                )}
              </ProtectedLink>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
