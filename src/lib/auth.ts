import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

// Fallback defaults so protected articles work with zero manual setup.
// Override ARTICLE_PASSWORD_HASH / ARTICLE_SESSION_SECRET in Vercel's
// project settings if you ever want to rotate them without a code change.
const PASSWORD_HASH =
  process.env.ARTICLE_PASSWORD_HASH ||
  "$2b$12$ldxTh9qbV0E16GtoDL8waOtwLEUyUIX5m4i/2CH5/HjxbsUYdfH8m";

const SESSION_SECRET =
  process.env.ARTICLE_SESSION_SECRET ||
  "8535ce3b8d9b28fe40e5ccc5ade77f4afdbd647824758814f41199d3ffb316b3";

const COOKIE_NAME = "article_unlocked";

function signedToken(): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(COOKIE_NAME).digest("hex");
}

export function verifyPassword(password: string): boolean {
  return bcrypt.compareSync(password, PASSWORD_HASH);
}

export async function unlockSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, signedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    // No maxAge/expires: a session cookie, cleared when the browser closes.
  });
}

export async function isSessionUnlocked(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === signedToken();
}
