import Link from "next/link";

const links = [
  { href: "/current-work", label: "Current work" },
  { href: "/previous", label: "Previous handover notes" },
  { href: "/now", label: "Timeline" },
  { href: "/about", label: "About" },
];

export function Nav() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="font-display text-lg font-medium tracking-tight text-ink"
        >
          Lauren Murphy
        </Link>
        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-sm text-ink/70 transition-colors hover:text-slate"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
