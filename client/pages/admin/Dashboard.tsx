import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { user, logout, devMode } = useAuth();
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Signed in as {user?.username}. {devMode ? "(dev mode)" : null}
            </p>
          </div>
          <Button variant="outline" onClick={logout} className="w-full sm:w-auto">
            Sign out
          </Button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/admin/blogs"
            className="rounded-xl border p-6 hover:bg-accent/40 transition-colors"
          >
            <h3 className="font-semibold text-lg">Blogs</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create and manage blog posts
            </p>
          </Link>
          <Link
            to="/admin/case-studies"
            className="rounded-xl border p-6 hover:bg-accent/40 transition-colors"
          >
            <h3 className="font-semibold text-lg">Case Studies</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Publish client success stories
            </p>
          </Link>
          <Link
            to="/admin/services"
            className="rounded-xl border p-6 hover:bg-accent/40 transition-colors"
          >
            <h3 className="font-semibold text-lg">Services</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Update offerings and pricing
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
