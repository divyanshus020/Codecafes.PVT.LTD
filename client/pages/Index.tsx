import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Websites",
    desc: "Marketing sites, SaaS, landing pages that convert.",
    icon: "M4 6h16M4 12h16M4 18h16",
  },
  {
    title: "Mobile & Web Apps",
    desc: "React, React Native, performant full‑stack apps.",
    icon: "M12 2v20M2 12h20",
  },
  {
    title: "DevOps & Cloud",
    desc: "Scalable infra on AWS, GCP, CI/CD, Observability.",
    icon: "M4 14s1-1 4-1 5 2 8 2 4-1 4-1v4H4z",
  },
  {
    title: "AI Consulting",
    desc: "Strategy, RAG systems, assistants, copilots.",
    icon: "M12 3l2.5 7.5L22 12l-7.5 1.5L12 21l-2.5-7.5L2 12l7.5-1.5z",
  },
  {
    title: "AI Agents & Chatbots",
    desc: "Sales, support, ops – reliable multi‑tool agents.",
    icon: "M12 12a5 5 0 100-10 5 5 0 000 10z M2 22a10 10 0 0120 0",
  },
  {
    title: "More",
    desc: "Design systems, audits, migrations, performance.",
    icon: "M12 6v12M6 12h12",
  },
];

export default function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        </div>
        <div className="container py-20 md:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
            Codecafe — Creative IT Studio
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-extrabold tracking-tight md:text-6xl">
            Build bold digital experiences with a partner obsessed with quality
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-muted-foreground md:text-lg">
            We craft websites, apps, and AI products that feel effortless and
            look stunning. From strategy to ship, our team delivers end‑to‑end.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="shadow-lg">
              <Link to="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="https://www.aura.build/share/sharper-creative"
                target="_blank"
                rel="noreferrer"
              >
                View reference
              </a>
            </Button>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Websites", "Apps", "DevOps", "AI"].map((k) => (
              <div key={k} className="rounded-xl border bg-card p-4">
                <p className="text-sm text-muted-foreground">Expertise</p>
                <p className="mt-1 font-semibold">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                What we do
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Full‑stack product development across web, mobile, cloud and AI.
                Flexible engagement from sprints to dedicated pods.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/services">Explore services →</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border p-6 transition-colors hover:bg-accent/40"
              >
                <div className="size-12 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 grid place-items-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={s.icon} />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-4 text-sm font-medium text-primary">
                  Learn more →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Featured case studies
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Outcomes over outputs. Here are a few recent results were proud
                of.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/case-studies">See all →</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="group overflow-hidden rounded-2xl border bg-card"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-muted to-accent" />
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">
                    Fintech · Platform Engineering
                  </p>
                  <h3 className="mt-1 font-semibold text-lg">
                    Scaling payments to millions of users
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Modernized architecture and CI/CD, improving deploy lead
                    time by 78%.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                From the blog
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Insights on building lovable products with AI and great
                engineering.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/blog">Read more →</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="group rounded-2xl border p-6 hover:bg-accent/40 transition-colors"
              >
                <p className="text-xs text-muted-foreground">AI Engineering</p>
                <h3 className="mt-2 font-semibold text-lg">
                  Production‑ready AI agents: patterns that work
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Hard‑won lessons designing reliable multi‑tool agents that
                  deliver ROI.
                </p>
                <div className="mt-3 text-sm font-medium text-primary">
                  Read →
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative py-20 md:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="absolute -bottom-24 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-primary/25 blur-3xl" />
        </div>
        <div className="container">
          <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-sm">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Have an idea? Lets build it.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Tell us about your goals and well propose an approach, timeline,
                and estimate. Typically within 24 hours.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild>
                  <Link to="/contact">Get a quote</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="mailto:hello@codecafe.dev">Email us</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
