import { FormEvent, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { UnicornStudioEmbed } from "@/components/animations/UnicornStudioEmbed";

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
    <section className="relative min-h-screen flex items-center justify-center py-20">
      {/* Unicorn Studio Background */}
      <div className="absolute inset-0 z-0">
        <UnicornStudioEmbed 
          projectId="NOw9ISicN1HqJ656KnGn" 
          className="w-full h-full"
        />
      </div>
      {/* Overlay for better readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/50 to-black/60 pointer-events-none" />
      
      <div className="container max-w-md relative z-10">
        <div className="rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Login</h1>
            <p className="mt-1 text-sm text-white/70">
              {devMode
                ? "Dev mode: authenticating locally. Configure VITE_API_BASE_URL to use your PHP backend."
                : "Using server authentication."}
            </p>
          </div>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div>
              <label className="text-sm font-medium text-white">Username</label>
              <input
                className="mt-1 w-full rounded-md border bg-background px-3 py-2 outline-none focus:ring-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white">Password</label>
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
            <Button type="submit" className="w-full">
              Sign in
            </Button>
            <div className="text-center text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">
                ← Back to site
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
