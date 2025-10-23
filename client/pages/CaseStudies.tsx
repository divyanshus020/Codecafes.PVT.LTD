import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { UnicornStudioEmbed } from "@/components/animations/UnicornStudioEmbed";

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

export default function CaseStudies() {
  const [filter, setFilter] = useState<"all" | "web" | "mobile" | "ai">("all");

  // Fetch case studies from backend
  const { data: caseStudies = [] } = useQuery<CaseStudy[]>({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const res = await fetch("/api/case-studies");
      if (!res.ok) throw new Error("Failed to fetch case studies");
      return res.json();
    },
  });

  const filters = [
    { value: "all" as const, label: "All Projects" },
    { value: "web" as const, label: "Web Apps" },
    { value: "mobile" as const, label: "Mobile Apps" },
    { value: "ai" as const, label: "AI Solutions" },
  ];

  const metrics = [
    {
      icon: TrendingUp,
      value: "300%",
      label: "Average ROI increase",
    },
    {
      icon: Users,
      value: "1M+",
      label: "Users impacted",
    },
    {
      icon: Target,
      value: "95%",
      label: "Client satisfaction",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Unicorn Studio Background */}
        <div className="absolute inset-0 z-0">
          <UnicornStudioEmbed 
            projectId="U2QTEetmPXmjy7s8oDmy" 
            className="w-full h-full"
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-background pointer-events-none" />
        
        <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white">
            <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
            Case Studies
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Real results for real businesses
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-base md:text-lg text-white/80">
            Explore how we've helped companies transform their digital presence,
            streamline operations, and achieve measurable growth through
            technology.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="shadow-lg">
              <Link to="/contact">Discuss your project</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/services">Our services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="py-12 sm:py-16 md:py-20 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.label}
                  className="rounded-2xl border bg-card p-6 md:p-8 text-center"
                >
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <p className="mt-4 text-3xl md:text-4xl font-bold">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASE STUDIES GRID */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Featured Projects
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Outcomes over outputs. Here's what we've built.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter(f.value)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.length === 0 ? (
              <div className="col-span-full text-center py-16 text-muted-foreground">
                <p className="text-lg">No case studies available yet.</p>
                <p className="mt-2 text-sm">
                  Add some from the admin panel to showcase your work!
                </p>
              </div>
            ) : (
              caseStudies.map((study) => (
                <article
                  key={study.id}
                  className="group overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 relative overflow-hidden">
                    {study.cover_image ? (
                      <img
                        src={study.cover_image}
                        alt={study.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-7xl font-bold text-primary/20">
                          {study.title.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
                      <span className="size-1.5 rounded-full bg-primary" />
                      Case Study
                    </div>
                    <h3 className="mt-3 font-bold text-xl line-clamp-2">
                      {study.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {study.summary || study.content.substring(0, 150) + "..."}
                    </p>
                    <div className="mt-5 flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      Read full story <ArrowRight className="ml-1 size-4" />
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="py-12 sm:py-16 md:py-24 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-lg">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="size-5 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg md:text-xl font-medium leading-relaxed">
                "Working with DCodeCafe was a game-changer for our business. They
                delivered a beautiful, high-performance platform that exceeded our
                expectations. The team's expertise and dedication were evident
                throughout the entire process."
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="size-12 rounded-full bg-gradient-to-br from-primary to-violet-500" />
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">
                    CEO, TechStart Inc.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="absolute -bottom-24 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-primary/25 blur-3xl" />
        </div>
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Your success story starts here
            </h2>
            <p className="mt-4 text-muted-foreground">
              Let's create measurable impact together. Share your vision and
              we'll help you achieve it.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/contact">Start your project</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/portfolio">View portfolio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
