import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPreviousWork, getPreviousWorkBySlug } from "@/lib/content";
import { ArticleBody } from "@/components/ArticleBody";
import { ProtectedArticle } from "@/components/ProtectedArticle";
import { Breadcrumbs, PrevNext, getNeighbours } from "@/components/ArticleNav";

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
    return { title: `${meta.title} — Lauren Murphy` };
  } catch {
    return { title: "Previous work — Lauren Murphy" };
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

  const section = { href: "/writing", label: "Previous work" };
  const { prev, next } = getNeighbours(items, slug);

  return (
    <article className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <Breadcrumbs section={section} title={meta.title} className="mb-10" />

      {meta.protected ? (
        <ProtectedArticle
          kind="writing"
          slug={slug}
          title={meta.title}
          breadcrumbs={<Breadcrumbs section={section} title={meta.title} />}
        >
          <PrevNext basePath="/writing" prev={prev} next={next} compact />
        </ProtectedArticle>
      ) : (
        <ArticleBody meta={meta} content={content} />
      )}

      <div className="mt-16 border-t border-line pt-10">
        <PrevNext basePath="/writing" prev={prev} next={next} />
      </div>
    </article>
  );
}
