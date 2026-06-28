import Link from "next/link";
import { getAllWork } from "@/lib/content";

const principles = [
  {
    title: "Systems over heroics",
    body: "A team that depends on one brilliant save is one bad week from falling over. I build the process, critique culture, and tooling so good work is the default outcome, not the exception.",
  },
  {
    title: "Design is a P&L lever",
    body: "I translate craft into the language a business actually moves on: velocity, retention, cost of rework. If a design decision can't be argued in those terms, I keep working until it can.",
  },
  {
    title: "Hire for trajectory, not résumé",
    body: "The best designers I've grown weren't the most polished on day one. I look for people who improve fast in public, then build the room that lets them.",
  },
  {
    title: "Ship the smallest true thing",
    body: "Strategy decks don't ship. I push every initiative toward the smallest version that proves the idea in production, then scale what's working.",
  },
];

export default function HomePage() {
  const work = getAllWork().filter((w) => w.featured).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-page px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <p className="label-eyebrow mb-5">Design leadership · Strategy · Systems</p>
        <h1 className="max-w-3xl font-display text-4xl font-medium leading-[1.1] tracking-tight text-ink sm:text-5xl md:text-6xl">
          I build the rooms where good design becomes{" "}
          <span className="italic text-slate">inevitable</span>, not lucky.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
          Design leader with a decade on the tools and several years now
          building the teams, systems, and decisions around them. Previously
          shipped as an IC; now I scale the conditions that let other
          designers do their best work.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link
            href="/work"
            className="rounded-full bg-ink px-6 py-3 font-mono text-sm text-paper transition-colors hover:bg-slate-deep"
          >
            See the work →
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-line px-6 py-3 font-mono text-sm text-ink transition-colors hover:border-slate hover:text-slate"
          >
            How I think about design
          </Link>
        </div>
      </section>

      {/* Operating principles */}
      <section className="border-t border-line bg-ink">
        <div className="mx-auto max-w-page px-6 py-16 sm:py-20">
          <p className="label-eyebrow mb-8 text-amber">Operating principles</p>
          <div className="grid gap-10 sm:grid-cols-2">
            {principles.map((p) => (
              <div key={p.title}>
                <h3 className="font-display text-xl text-paper">{p.title}</h3>
                <p className="mt-2 text-paper/65 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
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
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
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
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
