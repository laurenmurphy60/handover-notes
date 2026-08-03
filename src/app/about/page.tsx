import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Lauren Murphy",
};

const experience = [
  {
    company: "ASX — Australian Securities Exchange",
    roles: [
      { title: "Product & Service Design Manager", period: "Aug 2024 — Present" },
      { title: "Experience Design, Team Lead", period: "Dec 2023 — Aug 2024" },
      { title: "Product Designer", period: "Nov 2022 — Dec 2023" },
    ],
    notes: [
      "Leading product and service design across a complex, regulated environment, shaping the operating model and end-to-end journeys",
      "Product owner for the data subscription channel — setting direction, prioritising the backlog and shaping a roadmap around business value, while partnering with engineering and QA to deliver",
      "Establishing behavioural analytics capability, building reporting and insight practice",
      "Building the design system from the ground up with a token-driven structure to enable AI-assisted workflows",
      "Coaching designers and product owners, building capability and maturity across the team",
    ],
  },
  {
    company: "Marsh McLennan",
    roles: [{ title: "Experience Designer", period: "Nov 2018 — Oct 2022" }],
    notes: [
      "Implementation of single domain strategy and digital experience across the integration of acquired businesses into Marsh",
      "Design system development for external digital insurance platform",
      "Research and development of internal tools to enhance broker workflows and systems integrations",
      "Development of end to end journeys for online products",
      "Guiding strategic design decisions related to core and new functions",
    ],
  },
  {
    company: "AFK Agency",
    roles: [{ title: "Designer", period: "Nov 2017 — Nov 2018" }],
    clients: "Mini Cooper, BMW, Ernst & Young",
    notes: [
      "User interface design across multiple brands",
      "Facilitating workshops, prototyping, user testing and delivering insights",
      "UAT testing and development reviews",
    ],
  },
  {
    company: "Love Agency",
    roles: [{ title: "Designer", period: "Jul 2016 — Oct 2016" }],
    clients: "Crown, Crownbet (now part of SportsBet), miRunners",
    notes: [
      "UX solutions across iOS and Android devices",
      "Working to deliver incremental improvements and optimising assets",
    ],
  },
];

const education = [
  {
    qualification: "Graduate Diploma in UX/UI",
    place: "Billy Blue College of Design",
    period: "2018 — 2019",
  },
  {
    qualification: "Bachelor of Arts (Media) / Fine Arts (Photomedia)",
    place: "UNSW",
    period: "2010 — 2014",
  },
];

const skills = [
  "Design leadership across product and service",
  "Establishing design practice, standards and operating models",
  "AI-enabled practices across product workflows",
  "Product ownership, driving delivery end-to-end",
  "Behavioural analytics and CRM-integrated insight",
  "Hands-on user research and usability testing",
  "WCAG-compliant delivery and accessibility practice across design and engineering",
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-page px-6 py-16 sm:py-20">
      <p className="label-eyebrow mb-4">About</p>
      <h1 className="max-w-2xl font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
        Currently shaping a multidisciplinary team spanning design, product and
        behavioural analytics.
      </h1>

      <div className="mt-16 grid gap-16 sm:grid-cols-5">
        <div className="sm:col-span-3">
          <h2 className="font-display text-xl text-ink">Experience</h2>
          <div className="mt-6 space-y-10 border-t border-line pt-8">
            {experience.map((job) => (
              <div key={job.company}>
                <h3 className="font-display text-lg text-ink">{job.company}</h3>

                <div className="mt-2 space-y-1">
                  {job.roles.map((role) => (
                    <p key={role.title} className="text-sm text-ink">
                      {role.title}{" "}
                      <span className="font-mono text-xs text-ink/45">
                        {role.period}
                      </span>
                    </p>
                  ))}
                </div>

                {job.clients && (
                  <p className="mt-3 text-sm italic text-ink/55">
                    Clients included: {job.clients}
                  </p>
                )}

                <ul className="mt-4 space-y-2">
                  {job.notes.map((note) => (
                    <li key={note} className="text-sm leading-relaxed text-ink/65">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2 sm:border-l sm:border-line sm:pl-12">
          <h2 className="font-display text-xl text-ink">Skills</h2>
          <ul className="mt-6 space-y-3 border-t border-line pt-6">
            {skills.map((skill) => (
              <li key={skill} className="text-sm leading-relaxed text-ink/65">
                {skill}
              </li>
            ))}
          </ul>

          <h2 className="mt-12 font-display text-xl text-ink">Education</h2>
          <div className="mt-6 space-y-6 border-t border-line pt-6">
            {education.map((item) => (
              <div key={item.qualification}>
                <p className="font-mono text-xs text-ink/45">{item.period}</p>
                <p className="mt-1 text-sm text-ink">{item.qualification}</p>
                <p className="mt-0.5 text-sm text-ink/55">{item.place}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
