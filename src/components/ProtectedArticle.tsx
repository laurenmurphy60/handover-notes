"use client";

import { useEffect, useState, useTransition, type ReactNode } from "react";
import { loadArticle, unlock, type ArticleKind } from "@/lib/actions";
import { useUnlock } from "@/components/UnlockProvider";

export function ProtectedArticle({
  kind,
  slug,
  title,
  breadcrumbs,
  children,
}: {
  kind: ArticleKind;
  slug: string;
  title: string;
  breadcrumbs?: ReactNode;
  children?: ReactNode;
}) {
  const { token, setToken } = useUnlock();
  const [body, setBody] = useState<ReactNode | null>(null);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    loadArticle(kind, slug, token).then((result) => {
      if (cancelled) return;
      if (result === null) {
        // Expired or invalid token: ask for the password again.
        setToken(null);
        return;
      }
      setBody(result);
    });
    return () => {
      cancelled = true;
    };
  }, [kind, slug, token, setToken]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") || "");

    startTransition(async () => {
      const result = await unlock(password);
      if (result.error || !result.token) {
        setError(result.error ?? "Something went wrong.");
        return;
      }
      setError(undefined);
      setToken(result.token);
    });
  }

  if (body) return <>{body}</>;

  if (token) {
    return <p className="font-mono text-sm text-ink/50">Loading…</p>;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-gate-title"
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-y-auto bg-ink/50 px-6 py-16 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-2xl border border-line bg-paper p-8 text-center shadow-xl">
        {breadcrumbs && <div className="mb-6 text-left">{breadcrumbs}</div>}
        <p className="label-eyebrow mb-4">Protected</p>
        <h1 id="article-gate-title" className="font-display text-2xl font-medium text-ink">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          This write-up is password protected. Enter the password to read it.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Password"
            className="rounded-full border border-line bg-transparent px-4 py-2.5 text-center font-mono text-sm text-ink outline-none focus:border-slate"
          />
          <button
            type="submit"
            disabled={pending}
            className="rounded-full bg-ink px-6 py-2.5 font-mono text-sm text-paper transition-colors hover:bg-slate-deep disabled:opacity-50"
          >
            {pending ? "Checking…" : "Unlock"}
          </button>
          {error && <p className="font-mono text-xs text-amber">{error}</p>}
        </form>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
