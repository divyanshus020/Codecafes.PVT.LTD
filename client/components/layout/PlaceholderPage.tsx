import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <section className="py-24">
      <div className="container text-center">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
          Work in progress
        </div>
        <h1 className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
          {description || "This page will be tailored to your needs. Tell me what content and layout you want here and I'll build it next."}
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <a href="#contact">Contact us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
