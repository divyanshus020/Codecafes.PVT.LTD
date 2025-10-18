import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export default function Portfolio() {
  const [filter, setFilter] = useState<string>("all");

  // Mock portfolio data - in production, this would come from the backend
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "web",
      description:
        "A modern e-commerce solution with real-time inventory, payment processing, and analytics dashboard.",
      image: "",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    },
    {
      id: 2,
      title: "Fitness Tracking App",
      category: "mobile",
      description:
        "Cross-platform mobile app for tracking workouts, nutrition, and health metrics with AI-powered insights.",
      image: "",
      tags: ["React Native", "Firebase", "TensorFlow"],
    },
    {
      id: 3,
      title: "AI Chatbot Platform",
      category: "ai",
      description:
        "Intelligent chatbot platform with natural language processing and multi-channel deployment.",
      image: "",
      tags: ["Python", "OpenAI", "FastAPI", "Redis"],
    },
    {
      id: 4,
      title: "Project Management Tool",
      category: "web",
      description:
        "Collaborative project management platform with real-time updates, task tracking, and team analytics.",
      image: "",
      tags: ["Vue.js", "Express", "MongoDB", "Socket.io"],
    },
    {
      id: 5,
      title: "Food Delivery App",
      category: "mobile",
      description:
        "On-demand food delivery application with real-time tracking, payment integration, and restaurant management.",
      image: "",
      tags: ["Flutter", "Firebase", "Google Maps"],
    },
    {
      id: 6,
      title: "Content Recommendation Engine",
      category: "ai",
      description:
        "Machine learning-powered recommendation system for personalized content discovery.",
      image: "",
      tags: ["Python", "TensorFlow", "AWS", "Docker"],
    },
  ];

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Apps" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "ai", label: "AI & ML" },
  ];

  const filteredItems =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-primary/25 via-violet-500/20 to-fuchsia-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        </div>
        <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
            Portfolio
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Crafting digital experiences that inspire
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-base md:text-lg text-muted-foreground">
            A curated selection of our finest work. Each project represents our
            commitment to excellence, innovation, and delivering exceptional
            results for our clients.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="shadow-lg">
              <Link to="/contact">Start your project</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/case-studies">Read case studies</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PORTFOLIO GRID */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={filter === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Portfolio Items */}
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                className="group overflow-hidden rounded-2xl border bg-card hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 relative overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-7xl font-bold bg-gradient-to-br from-primary to-violet-500 bg-clip-text text-transparent">
                        {index + 1}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.liveUrl && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="shadow-lg"
                        asChild
                      >
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    )}
                    {item.githubUrl && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="shadow-lg"
                        asChild
                      >
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Github className="size-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {item.category === "web"
                      ? "Web App"
                      : item.category === "mobile"
                        ? "Mobile App"
                        : "AI & ML"}
                  </div>
                  <h3 className="mt-3 font-bold text-xl line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    View details <ArrowRight className="ml-1 size-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-12 sm:py-16 md:py-24 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Technologies We Love
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              We use cutting-edge technologies to build scalable, performant, and
              maintainable applications.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "React",
              "Node.js",
              "TypeScript",
              "Python",
              "PostgreSQL",
              "AWS",
              "Docker",
              "TensorFlow",
              "Next.js",
              "React Native",
              "Firebase",
              "GraphQL",
            ].map((tech) => (
              <div
                key={tech}
                className="rounded-xl border bg-card p-4 text-center hover:bg-accent/40 transition-colors"
              >
                <p className="font-semibold text-sm">{tech}</p>
              </div>
            ))}
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
              Let's build your next project together
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you need a web app, mobile app, or AI solution, we're here
              to help bring your vision to life.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/contact">Get started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Explore services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
