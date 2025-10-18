import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  MessageSquare,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { UnicornStudioEmbed } from "@/components/animations/UnicornStudioEmbed";

export default function Contact() {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setContactForm({ name: "", email: "", company: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@codecafe.dev",
      href: "mailto:hello@codecafe.dev",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (234) 567-890",
      href: "tel:+1234567890",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Remote-first, serving clients worldwide",
      href: null,
    },
  ];

  const features = [
    {
      icon: Clock,
      title: "Quick Response",
      description: "We typically respond within 24 hours",
    },
    {
      icon: MessageSquare,
      title: "Free Consultation",
      description: "30-minute discovery call to discuss your needs",
    },
    {
      icon: CheckCircle2,
      title: "No Commitment",
      description: "Get expert advice with no strings attached",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Unicorn Studio Background */}
        <div className="absolute inset-0 z-0">
          <UnicornStudioEmbed 
            projectId="DPg7bjdyVjLLi7iJ2Yca" 
            className="w-full h-full"
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-background pointer-events-none" />
        
        <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white">
              <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
              Get in Touch
            </div>
            <h1 className="mt-6 text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Let's build something amazing together
            </h1>
            <p className="mt-4 sm:mt-5 text-pretty text-sm sm:text-base md:text-lg text-white/80">
              Have a project in mind? We'd love to hear about it. Share your
              vision and we'll help you bring it to life with cutting-edge
              technology and expert craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM & INFO */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="rounded-3xl border bg-card p-6 sm:p-8 md:p-10 shadow-lg">
              <h2 className="text-2xl font-bold tracking-tight">
                Send us a message
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as
                possible.
              </p>

              <form
                onSubmit={handleContactSubmit}
                className="mt-6 space-y-5 md:space-y-6"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Name *
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
                    Email Address *
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
                    htmlFor="company"
                    className="block text-sm font-medium mb-2"
                  >
                    Company (Optional)
                  </label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Your Company Inc."
                    value={contactForm.company}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        company: e.target.value,
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project, goals, timeline, and budget..."
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    required
                    rows={6}
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
            <div className="space-y-6">
              {/* Contact Methods */}
              <div className="rounded-3xl border bg-card p-6 sm:p-8 shadow-lg">
                <h3 className="text-xl font-bold tracking-tight">
                  Contact Information
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Prefer to reach out directly? Here's how to find us.
                </p>
                <div className="mt-6 space-y-5">
                  {contactMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <div key={method.title} className="flex items-start gap-4">
                        <div className="size-11 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 grid place-items-center shrink-0">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{method.title}</p>
                          {method.href ? (
                            <a
                              href={method.href}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {method.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              {method.value}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.title}
                      className="rounded-2xl border bg-card p-5 hover:bg-accent/40 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="size-10 rounded-lg bg-gradient-to-br from-primary/20 to-violet-500/20 grid place-items-center shrink-0">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            {feature.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 md:py-24 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground">
                Quick answers to common questions about working with us.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "What's your typical project timeline?",
                  a: "Project timelines vary based on scope and complexity. A typical web app takes 8-12 weeks, while mobile apps can take 12-16 weeks. We'll provide a detailed timeline during our initial consultation.",
                },
                {
                  q: "Do you offer ongoing support after launch?",
                  a: "Yes! We provide post-launch support and maintenance packages to ensure your product continues to perform optimally. We're here for bug fixes, updates, and feature enhancements.",
                },
                {
                  q: "What's your pricing model?",
                  a: "We offer flexible engagement models including fixed-price projects, time & materials, and dedicated team arrangements. Pricing depends on project scope, timeline, and complexity.",
                },
                {
                  q: "Can you work with our existing team?",
                  a: "Absolutely! We're experienced in collaborating with in-house teams, whether you need additional capacity, specialized expertise, or full project ownership.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border bg-card p-5 md:p-6"
                >
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
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
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 p-8 md:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Not ready to commit yet?
              </h2>
              <p className="mt-3 text-muted-foreground">
                That's okay! Check out our portfolio and case studies to see our
                work in action, or read our blog for insights on building great
                products.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button asChild variant="outline" size="lg">
                  <a href="/portfolio">View Portfolio</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/blog">Read Blog</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
