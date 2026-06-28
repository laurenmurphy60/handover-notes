import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { format } from "date-fns";
import { getAllWriting, getWritingBySlug } from "@/lib/content";
import { MdxContent } from "@/components/MdxContent";

export async function generateStaticParams() {
  return getAllWriting().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = getWritingBySlug(slug);
    return { title: `${meta.title} — Your Name` };
  } catch {
    return { title: "Writing — Your Name" };
  }
}

export default async function WritingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getAllWriting();
  const matchedPost = posts.find((p) => p.slug === slug);

  if (!matchedPost) {
    notFound();
  }

  const { meta, content } = getWritingBySlug(slug);

  return (
    <article className="mx-auto max-w-prose px-6 py-16 sm:py-20">
      <p className="label-eyebrow mb-4">
        {format(new Date(meta.date), "MMMM d, yyyy")} · {matchedPost.readingTime}
      </p>
      <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">
        {meta.title}
      </h1>

      <div className="mt-4 flex flex-wrap gap-2">
        {meta.tags?.map((tag: string) => (
          <span
            key={tag}
            className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-ink/55"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-10">
        <MdxContent source={content} />
      </div>
    </article>
  );
}
