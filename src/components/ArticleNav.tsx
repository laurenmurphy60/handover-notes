import Link from "next/link";

type Section = { href: string; label: string };
type Neighbour = { slug: string; title: string };

export function Breadcrumbs({
  section,
  title,
  className = "",
}: {
  section: Section;
  title: string;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex min-w-0 items-center gap-2 font-mono text-xs text-ink/50">
        <li className="shrink-0">
          <Link href="/" className="hover:text-slate">
            Home
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0">/</li>
        <li className="shrink-0">
          <Link href={section.href} className="hover:text-slate">
            {section.label}
          </Link>
        </li>
        <li aria-hidden="true" className="shrink-0">/</li>
        <li aria-current="page" className="min-w-0 truncate text-ink/70">
          {title}
        </li>
      </ol>
    </nav>
  );
}

// Returns the items either side of `slug`, in listing order.
export function getNeighbours<T extends Neighbour>(items: T[], slug: string) {
  const index = items.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? items[index - 1] : undefined,
    next: index >= 0 && index < items.length - 1 ? items[index + 1] : undefined,
  };
}

export function PrevNext({
  basePath,
  prev,
  next,
  compact = false,
}: {
  basePath: string;
  prev?: Neighbour;
  next?: Neighbour;
  compact?: boolean;
}) {
  if (!prev && !next) return null;

  const linkClass =
    "group flex flex-col gap-1 rounded-lg border border-line p-4 transition-colors hover:border-slate";

  return (
    <nav
      aria-label="More work"
      className={`grid gap-3 ${compact ? "text-left" : "sm:grid-cols-2"}`}
    >
      {prev ? (
        <Link href={`${basePath}/${prev.slug}`} className={linkClass}>
          <span className="font-mono text-xs text-ink/50">← Previous</span>
          <span className="font-display text-ink group-hover:text-slate">
            {prev.title}
          </span>
        </Link>
      ) : (
        !compact && <span aria-hidden="true" />
      )}
      {next && (
        <Link
          href={`${basePath}/${next.slug}`}
          className={`${linkClass} ${compact ? "" : "sm:text-right"}`}
        >
          <span className="font-mono text-xs text-ink/50">Next →</span>
          <span className="font-display text-ink group-hover:text-slate">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
