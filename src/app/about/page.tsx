import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Your Name",
};

const trajectory = [
  {
    period: "2024 — Present",
    role: "Head of Design",
    place: "Company Name",
    note: "Own design strategy and team for the core product line.",
  },
  {
    period: "2021 — 2024",
    role: "Senior / Lead Product Designer",
    place: "Company Name",
    note: "Shipped 0→1 products; started mentoring informally, then formally.",
  },
  {
    period: "2018 — 2021",
    role: "Product Designer",
    place: "Company Name",
    note: "Cut my teeth on craft — interaction design, systems, research.",
  },
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-page px-6 py-16 sm:py-20">
      <div className="grid gap-16 sm:grid-cols-5">
        <div className="sm:col-span-2">
          <p className="label-eyebrow mb-4">About</p>
          <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">
            A designer who went looking for leverage.
          </h1>
          <p className="mt-5 text-ink/70 leading-relaxed">
            Replace this paragraph with two or three sentences on your actual
            path — what you used to make, what made you move toward
            leadership, and what kind of teams or problems you want next.
            Keep it specific: a sentence about a real moment beats a sentence
            of adjectives.
          </p>

          <h2 className="mt-12 font-display text-xl text-ink">Trajectory</h2>
          <div className="mt-6 space-y-6 border-t border-line pt-6">
            {trajectory.map((t) => (
              <div key={t.period}>
                <p className="font-mono text-xs text-ink/45">{t.period}</p>
                <p className="mt-1 font-medium text-ink">
                  {t.role} <span className="text-ink/50">· {t.place}</span>
                </p>
                <p className="mt-1 text-sm text-ink/65">{t.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-3 sm:border-l sm:border-line sm:pl-12">
          <h2 className="font-display text-xl text-ink">
            How I think about design leadership
          </h2>
          <div className="prose-custom mt-6">
            <p>
              Replace this section with your actual point of view. The goal
              isn&apos;t to sound impressive — it&apos;s to give a hiring
              manager a fast, accurate read on how you&apos;ll operate. A few
              prompts to write from:
            </p>
            <ul>
              <li>
                What&apos;s a decision you made as a leader that an IC
                designer wouldn&apos;t have had to make?
              </li>
              <li>
                What do you believe about design that most design leaders
                get wrong?
              </li>
              <li>
                How do you decide what your team works on when everything
                feels urgent?
              </li>
              <li>
                What&apos;s a time you were wrong about a strategic call, and
                what changed your mind?
              </li>
            </ul>
            <p>
              Answer two or three of these in your own voice, in a few
              paragraphs. That&apos;s this section.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
