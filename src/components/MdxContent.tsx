import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  // Add custom MDX components here as you need them, e.g.:
  // Callout: (props: any) => <div className="rounded-lg bg-slate/10 p-4">{props.children}</div>
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-custom">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
