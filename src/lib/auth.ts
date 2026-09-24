import crypto from "crypto";
import bcrypt from "bcryptjs";

// Fallback defaults so protected articles work with zero manual setup.
// Override ARTICLE_PASSWORD_HASH / ARTICLE_SESSION_SECRET in Vercel's
// project settings if you ever want to rotate them without a code change.
const PASSWORD_HASH =
  process.env.ARTICLE_PASSWORD_HASH ||
  "$2b$12$b/ocqzUuE.ecPtAh2dOdFemGCVoXm8Bc9gY1FNlW1L5cjGZl4TB1e";

const SESSION_SECRET =
  process.env.ARTICLE_SESSION_SECRET ||
  "8535ce3b8d9b28fe40e5ccc5ade77f4afdbd647824758814f41199d3ffb316b3";

export function verifyPassword(password: string): boolean {
  return bcrypt.compareSync(password, PASSWORD_HASH);
}

// Unlock tokens are held in page memory only (never a cookie), so a refresh,
// new tab or closed window asks for the password again.
const TOKEN_TTL_MS = 12 * 60 * 60 * 1000;

function sign(value: string): string {
  return crypto.createHmac("sha256", SESSION_SECRET).update(value).digest("hex");
}

export function issueToken(): string {
  const expires = String(Date.now() + TOKEN_TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function verifyToken(token: string): boolean {
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = Buffer.from(sign(expires));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}
