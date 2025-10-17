import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "@/lib/api";

interface AuthState {
  token: string | null;
  user: { username: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  devMode: boolean;
}

const ADMIN_DEV = {
  username: "sharmadivyanshu281",
  password: "Preksh@2004",
};

const STORAGE_KEY = "codecafe_auth";

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string } | null>(null);
  const devMode = Boolean(import.meta.env.VITE_AUTH_FAKE);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setToken(parsed.token);
        setUser(parsed.user);
      } catch {}
    }
  }, []);

  const persist = (t: string | null, u: { username: string } | null) => {
    if (!t) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: t, user: u }));
    }
  };

  const login = useCallback(
    async (username: string, password: string) => {
      if (!devMode) {
        const resp = await apiFetch<{
          token: string;
          user: { username: string };
        }>("/api/admin/login", {
          method: "POST",
          body: { username, password },
        });
        setToken(resp.token);
        setUser(resp.user);
        persist(resp.token, resp.user);
        return;
      }
      if (username === ADMIN_DEV.username && password === ADMIN_DEV.password) {
        const t = "dev-demo-token";
        const u = { username };
        setToken(t);
        setUser(u);
        persist(t, u);
        return;
      }
      throw new Error("Invalid credentials");
    },
    [devMode],
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    persist(null, null);
  }, []);

  const value = useMemo(
    () => ({ token, user, login, logout, isAuthenticated: !!token, devMode }),
    [token, user, login, logout, devMode],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
