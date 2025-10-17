import { FormEvent, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const { login, devMode } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/admin";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <section className="py-20">
      <div className="container max-w-md">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {devMode
                ? "Dev mode: authenticating locally. Configure VITE_API_BASE_URL to use your PHP backend."
                : "Using server authentication."}
            </p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}
            <Button type="submit" className="w-full">Sign in</Button>
            <div className="text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">← Back to site</Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
