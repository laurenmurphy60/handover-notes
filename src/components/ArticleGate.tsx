"use client";

import { useActionState } from "react";
import { unlockArticle, type UnlockState } from "@/lib/actions";

const initialState: UnlockState = {};

export function ArticleGate({ title, backHref }: { title: string; backHref: string }) {
  const [state, formAction, pending] = useActionState(unlockArticle, initialState);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-gate-title"
      className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-ink/50 px-6 py-16 backdrop-blur-sm"
    >
      <div className="w-full max-w-sm rounded-2xl border border-line bg-paper p-8 text-center shadow-xl">
        <p className="label-eyebrow mb-4">Protected</p>
        <h1 id="article-gate-title" className="font-display text-2xl font-medium text-ink">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/65">
          This write-up is password protected. Enter the password to read it.
        </p>
        <form action={formAction} className="mt-8 flex flex-col gap-3">
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
          {state.error && <p className="font-mono text-xs text-amber">{state.error}</p>}
        </form>
        <a
          href={backHref}
          className="mt-6 inline-block font-mono text-xs text-ink/50 hover:text-slate"
        >
          ← Back
        </a>
      </div>
    </div>
  );
}
