"use server";

import { unlockSession, verifyPassword } from "./auth";

export type UnlockState = { error?: string };

export async function unlockArticle(
  _prevState: UnlockState,
  formData: FormData,
): Promise<UnlockState> {
  const password = String(formData.get("password") || "");

  if (!verifyPassword(password)) {
    return { error: "Incorrect password." };
  }

  await unlockSession();
  return {};
}
