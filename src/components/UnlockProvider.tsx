"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Holds the unlock token in memory for this tab only. It survives clicking
// between pages, but a refresh, new tab or closed window clears it.
const UnlockContext = createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
}>({ token: null, setToken: () => {} });

export function UnlockProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  return (
    <UnlockContext.Provider value={{ token, setToken }}>
      {children}
    </UnlockContext.Provider>
  );
}

export function useUnlock() {
  return useContext(UnlockContext);
}
