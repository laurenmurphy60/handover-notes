import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPreviousWork, getPreviousWorkBySlug } from "@/lib/content";
import { MdxContent } from "@/components/MdxContent";

export async function generateStaticParams() {
  return getAllPreviousWork().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getPreviousWorkBySlug(slug);
    return { title: `${meta.title} — Your Name` };
  } catch {
    return { title: "Previous work — Your Name" };
  }
}

export default async function PreviousWorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = getAllPreviousWork();
  const exists = items.some((item) => item.slug === slug);

  if (!exists) {
    notFound();
  }

  const { meta, content } = getPreviousWorkBySlug(slug);

  return (
    <article className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <p className="label-eyebrow mb-4">{meta.company} · {meta.period}</p>
      <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">
        {meta.title}
      </h1>
      <p className="mt-3 text-lg text-ink/65">{meta.role}</p>

      {meta.metric && (
        <p className="mt-6 inline-block rounded-full bg-ink px-4 py-1.5 font-mono text-sm text-amber">
          {meta.metric}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {meta.tags.map((tag: string) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-ink/55"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-12">
        <MdxContent source={content} />
      </div>
    </article>
  );
}
