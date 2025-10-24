import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ShaderAnimation } from "@/components/animations/ShaderAnimation";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number | null;
}

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

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  status: string;
  published_at: string | null;
}

export default function Index() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch services from backend
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch("/api/services");
      if (!res.ok) throw new Error("Failed to fetch services");
      return res.json();
    },
  });

  // Fetch case studies from backend
  const { data: caseStudies = [] } = useQuery<CaseStudy[]>({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const res = await fetch("/api/case-studies");
      if (!res.ok) throw new Error("Failed to fetch case studies");
      return res.json();
    },
  });

  // Fetch blogs from backend
  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setContactForm({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Shader Animation Background */}
        <div className="absolute inset-0 z-0">
          <ShaderAnimation />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/30 to-background pointer-events-none" />
        
        <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white">
            <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
            DCodeCafe — Creative IT Studio
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Build bold digital experiences with a partner obsessed with quality
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-base md:text-lg text-white/80">
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
          <div className="mt-8 sm:mt-10 md:mt-14 grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            {["Websites", "Apps", "DevOps", "AI"].map((k) => (
              <div key={k} className="rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm p-3 sm:p-4">
                <p className="text-sm text-white/70">Expertise</p>
                <p className="mt-1 font-semibold text-white">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
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

          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {services.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No services available yet. Add some from the admin panel!
              </div>
            ) : (
              services.slice(0, 6).map((service) => (
                <div
                  key={service.id}
                  className="group rounded-2xl border p-4 sm:p-5 md:p-6 transition-all hover:bg-accent/40 hover:shadow-lg hover:-translate-y-1"
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
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {service.description}
                  </p>
                  {service.price && (
                    <p className="mt-3 text-lg font-bold text-primary">
                      ${service.price}
                    </p>
                  )}
                  <div className="mt-4 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    Learn more →
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="case-studies" className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                Featured case studies
              </h2>
              <p className="mt-2 max-w-xl text-sm sm:text-base text-muted-foreground">
                Outcomes over outputs. Here are a few recent results were proud
                of.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/case-studies">See all →</Link>
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No case studies available yet. Add some from the admin panel!
              </div>
            ) : (
              caseStudies.slice(0, 3).map((study) => (
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
                      <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-primary/20">
                        {study.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Case Study
                    </p>
                    <h3 className="mt-1 font-semibold text-lg line-clamp-2">
                      {study.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                      {study.summary || study.content.substring(0, 120) + '...'}
                    </p>
                    <div className="mt-4 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      Read case study →
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
                From the blog
              </h2>
              <p className="mt-2 max-w-xl text-sm sm:text-base text-muted-foreground">
                Insights on building lovable products with AI and great
                engineering.
              </p>
            </div>
            <Button asChild variant="ghost" className="hidden md:inline-flex">
              <Link to="/blog">Read more →</Link>
            </Button>
          </div>

          <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No blog posts available yet. Add some from the admin panel!
              </div>
            ) : (
              blogs.slice(0, 3).map((blog) => (
                <article
                  key={blog.id}
                  className="group rounded-2xl border p-4 sm:p-5 md:p-6 hover:bg-accent/40 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  {blog.cover_image && (
                    <div className="-mx-6 -mt-6 mb-4 aspect-[16/9] overflow-hidden rounded-t-2xl">
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {blog.published_at
                      ? new Date(blog.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })
                      : 'Blog Post'}
                  </p>
                  <h3 className="mt-2 font-semibold text-lg line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {blog.excerpt || blog.content.substring(0, 120) + '...'}
                  </p>
                  <div className="mt-3 text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    Read article →
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-12 sm:py-16 md:py-20 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          <div className="absolute -bottom-24 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-primary/25 blur-3xl" />
        </div>
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
              Get in Touch
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can help bring your
              vision to life. We typically respond within 24 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="rounded-2xl sm:rounded-3xl border bg-card p-5 sm:p-6 md:p-8 shadow-sm">
              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project..."
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    required
                    rows={5}
                    className="w-full resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-2xl sm:rounded-3xl border bg-card p-5 sm:p-6 md:p-8 shadow-sm">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Information</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                      <Mail className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:contact@dcodecafe.qzz.io"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        contact@dcodecafe.qzz.io
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                      <Phone className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+1234567890"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                      <MapPin className="size-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        Remote-first, serving clients worldwide
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl sm:rounded-3xl border bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 p-5 sm:p-6 md:p-8">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Quick Response</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  We value your time. Our team reviews all inquiries and
                  typically responds within 24 hours with next steps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
