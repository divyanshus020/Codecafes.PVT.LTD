import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your website content and settings
          </p>
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
          <Link
            to="/admin/prompt-course"
            className="rounded-xl border p-6 hover:bg-accent/40 transition-colors"
          >
            <h3 className="font-semibold text-lg">Prompt Engineering Course</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete guide to prompt engineering
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
