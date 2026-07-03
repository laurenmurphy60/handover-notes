const socials = [
  { href: "mailto:laurenmurphy60@gmail.com", label: "Email" },
  { href: "https://www.linkedin.com/in/lauren-murphy-designer/", label: "LinkedIn" },
  { href: "https://github.com/laurenmurphy60", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="font-mono text-xs text-ink/60 hover:text-slate"
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="max-w-none font-mono text-xs leading-relaxed text-ink/50 sm:whitespace-nowrap sm:text-right">
          <span className="block">
            I acknowledge the Gadigal people of the Eora Nation, the
            Traditional Custodians of the land on which I live and work.
          </span>
          <span className="block">
            I pay my respects to Elders past, present and emerging.
          </span>
        </p>
      </div>
    </footer>
  );
}
