import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface CaseStudy {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  cover_image: string | null;
  status: string;
  published_at: string | null;
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { data: caseStudy, isLoading, error } = useQuery<CaseStudy>({
    queryKey: ["case-study", slug],
    queryFn: async () => {
      const res = await fetch(`/api/case-studies`);
      if (!res.ok) throw new Error("Failed to fetch case study");
      const studies = await res.json();
      const study = studies.find((s: CaseStudy) => s.slug === slug);
      if (!study) throw new Error("Case study not found");
      return study;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block size-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" />
          <p className="mt-4 text-muted-foreground">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Case study not found
          </p>
          <Button asChild className="mt-6">
            <Link to="/case-studies">
              <ArrowLeft className="mr-2 size-4" />
              Back to Case Studies
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="absolute -top-24 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/20 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />
        </div>

        <div className="container px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <Button asChild variant="ghost" size="sm" className="mb-6">
              <Link to="/case-studies">
                <ArrowLeft className="mr-2 size-4" />
                Back to Case Studies
              </Link>
            </Button>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 rounded-full border bg-accent/50 px-3 py-1 text-xs">
              <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
              Case Study
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="mt-6 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {caseStudy.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="mt-6 max-w-3xl text-pretty text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              {caseStudy.summary}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {caseStudy.published_at && (
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  {new Date(caseStudy.published_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                {Math.ceil(caseStudy.content.split(/\s+/).length / 200)} min read
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* COVER IMAGE */}
      {caseStudy.cover_image && (
        <section className="py-8">
          <div className="container px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <div className="aspect-[21/9] rounded-3xl overflow-hidden border shadow-2xl">
                <img
                  src={caseStudy.cover_image}
                  alt={caseStudy.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <article
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:my-6 prose-li:my-2
                  prose-img:rounded-xl prose-img:shadow-lg"
                dangerouslySetInnerHTML={{ __html: caseStudy.content }}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Ready to start your project?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Let's create something amazing together. Get in touch and tell us
                about your vision.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="shadow-lg">
                  <Link to="/contact">Start a conversation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/case-studies">View more case studies</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
