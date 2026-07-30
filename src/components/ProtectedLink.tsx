"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { unlockArticle } from "@/lib/actions";

/**
 * Index-page link for a case study.
 *
 * When the entry is protected and the visitor hasn't unlocked yet, clicking
 * opens the password prompt in place rather than navigating to the article
 * and gating it there. The server-side gate on the article page is still the
 * thing that actually withholds the content — this is purely the nicer path
 * for someone browsing the index.
 */
export function ProtectedLink({
  href,
  locked,
  title,
  className,
  children,
}: {
  href: string;
  locked: boolean;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (!locked) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await unlockArticle({}, formData);

      if (result.error) {
        setError(result.error);
        return;
      }

      setOpen(false);
      // Refresh so other entries on this index drop their lock state too.
      router.refresh();
      router.push(href);
    });
  }

  return (
    <>
      <Link
        href={href}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setError(undefined);
          setOpen(true);
        }}
      >
        {children}
      </Link>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="protected-link-title"
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-ink/50 px-6 py-16 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-line bg-paper p-8 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="label-eyebrow mb-4">Protected</p>
            <h2
              id="protected-link-title"
              className="font-display text-2xl font-medium text-ink"
            >
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/65">
              This write-up is password protected. Enter the password to read it.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
              <input
                ref={inputRef}
                type="password"
                name="password"
                required
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
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 inline-block font-mono text-xs text-ink/50 hover:text-slate"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
