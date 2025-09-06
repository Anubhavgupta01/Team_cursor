import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

export type User = { id: string; name: string; email: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signup: (opts: { name: string; email: string; password: string }) => Promise<void>;
  login: (opts: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

const LS_KEY = "sv:user";

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) setUser(JSON.parse(raw));
    setLoading(false);
  }, []);

  const signup: AuthCtx["signup"] = async ({ name, email }) => {
    const newUser: User = { id: crypto.randomUUID(), name, email };
    localStorage.setItem(LS_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const login: AuthCtx["login"] = async ({ email }) => {
    let raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      const newUser: User = { id: crypto.randomUUID(), name: email.split("@")[0], email };
      raw = JSON.stringify(newUser);
      localStorage.setItem(LS_KEY, raw);
    }
    setUser(JSON.parse(raw));
  };

  const logout: AuthCtx["logout"] = async () => {
    localStorage.removeItem(LS_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, loading, signup, login, logout }), [user, loading]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
