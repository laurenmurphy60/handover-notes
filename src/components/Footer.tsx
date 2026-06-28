const socials = [
  { href: "mailto:you@example.com", label: "Email" },
  { href: "https://linkedin.com/in/yourhandle", label: "LinkedIn" },
  { href: "https://github.com/yourhandle", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-page flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-ink/50">
          © {new Date().getFullYear()} — Built with Next.js, MDX, and Tailwind.
        </p>
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
      </div>
    </footer>
  );
}
