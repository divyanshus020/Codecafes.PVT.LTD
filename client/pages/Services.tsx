import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { 
  Code2, 
  Smartphone, 
  Cloud, 
  Bot, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import unicornVideo from "@/components/unicorn.webm?url";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number | null;
}

const serviceIcons = [Code2, Smartphone, Cloud, Bot, Zap, Shield];

export default function Services() {
  // Fetch services from backend
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      return res.json();
    },
  });

  const benefits = [
    "End-to-end product development",
    "Agile sprints & dedicated teams",
    "Modern tech stack & best practices",
    "Transparent communication",
    "Post-launch support & maintenance",
    "Scalable architecture",
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src={unicornVideo}
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-background pointer-events-none" />
        
        <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white">
              <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
              Our Services
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Full-stack solutions for modern digital products
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-base md:text-lg text-white/80">
              From web and mobile apps to cloud infrastructure and AI integration,
              we deliver end-to-end product development with a focus on quality,
              speed, and scalability.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="shadow-lg">
                <Link to="/contact">Start a project</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/case-studies">View case studies</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                What We Offer
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Comprehensive services to take your product from concept to launch
                and beyond.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No services available yet. Add some from the admin panel!
              </div>
            ) : (
              services.map((service, index) => {
                const Icon = serviceIcons[index % serviceIcons.length];
                return (
                  <ScrollReveal key={service.id} delay={index * 0.1}>
                    <div className="group rounded-2xl border p-5 sm:p-6 md:p-8 transition-all hover:bg-accent/40 hover:shadow-xl hover:-translate-y-1">
                    <div className="size-14 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 grid place-items-center">
                      <Icon className="size-7 text-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    {service.price && (
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Starting at
                        </p>
                        <p className="mt-1 text-2xl font-bold text-primary">
                          ${service.price.toLocaleString()}
                        </p>
                      </div>
                    )}
                    <div className="mt-5 flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      Learn more <ArrowRight className="ml-1 size-4" />
                    </div>
                  </div>
                  </ScrollReveal>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-12 sm:py-16 md:py-24 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  Why partner with DCodeCafe?
                </h2>
              <p className="mt-4 text-muted-foreground">
                We combine technical excellence with a deep understanding of
                product strategy. Our team has delivered successful projects
                across industries, from startups to enterprises.
              </p>
              <div className="mt-6 space-y-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
                <Button asChild className="mt-8">
                  <Link to="/contact">
                    Get started <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="rounded-3xl border bg-card p-8 shadow-lg">
              <div className="space-y-6">
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 p-6">
                  <p className="text-4xl font-bold">100+</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Projects delivered
                  </p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-primary/10 p-6">
                  <p className="text-4xl font-bold">50+</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Happy clients worldwide
                  </p>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 via-primary/10 to-fuchsia-500/10 p-6">
                  <p className="text-4xl font-bold">24h</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Average response time
                  </p>
                </div>
              </div>
            </div>
            </ScrollReveal>
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
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Ready to build something amazing?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Let's discuss your project and explore how we can help bring your
              vision to life. We typically respond within 24 hours.
            </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="shadow-lg">
                  <Link to="/contact">Start a conversation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/portfolio">View our work</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
