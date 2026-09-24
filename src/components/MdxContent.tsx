import { MDXRemote } from "next-mdx-remote/rsc";

// Renders an image with a caption. Without `src` it shows a placeholder box at
// the given aspect ratio, so visuals can be dropped in later by adding `src`.
function Figure({
  src,
  alt,
  caption,
  ratio = "16/9",
  size,
}: {
  src?: string;
  alt: string;
  caption?: string;
  ratio?: string;
  size?: string;
}) {
  return (
    <figure className="not-prose my-10">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="w-full rounded-lg border border-line" />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder: ${alt}`}
          style={{ aspectRatio: ratio }}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-ink/[0.03] p-6 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-wide text-ink/45">
            Visual placeholder{size ? ` · ${size}` : ""}
          </span>
          <span className="max-w-md text-sm text-ink/60">{alt}</span>
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-sm text-ink/55">{caption}</figcaption>
      )}
    </figure>
  );
}

const components = {
  Figure,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
