"use server";

import type { ReactNode } from "react";
import { issueToken, verifyPassword, verifyToken } from "./auth";
import {
  getAllPreviousWork,
  getAllWork,
  getPreviousWorkBySlug,
  getWorkBySlug,
} from "./content";
import { ArticleBody } from "@/components/ArticleBody";

export type ArticleKind = "work" | "writing";

export async function unlock(
  password: string,
): Promise<{ token?: string; error?: string }> {
  if (!verifyPassword(password)) {
    return { error: "Incorrect password." };
  }
  return { token: issueToken() };
}

// Returns the rendered article only when the token is valid, so protected
// content never reaches the browser before the password is entered.
export async function loadArticle(
  kind: ArticleKind,
  slug: string,
  token: string,
): Promise<ReactNode | null> {
  if (!verifyToken(token)) return null;

  const items = kind === "work" ? getAllWork() : getAllPreviousWork();
  if (!items.some((item) => item.slug === slug)) return null;

  const { meta, content } =
    kind === "work" ? getWorkBySlug(slug) : getPreviousWorkBySlug(slug);
  return <ArticleBody meta={meta} content={content} />;
}
