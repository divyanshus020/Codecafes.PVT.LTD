import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { UnicornStudioEmbed } from "@/components/animations/UnicornStudioEmbed";
import {
  Target,
  Heart,
  Zap,
  Users,
  Award,
  TrendingUp,
  Globe,
  Code2,
  Lightbulb,
  Shield,
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
} from "lucide-react";

export default function About() {
  const stats = [
    { value: "100+", label: "Projects Delivered", icon: Award },
    { value: "50+", label: "Happy Clients", icon: Users },
    { value: "5+", label: "Years Experience", icon: TrendingUp },
    { value: "15+", label: "Team Members", icon: Globe },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence First",
      description:
        "We're obsessed with quality. Every line of code, every design decision, every user interaction is crafted with care.",
    },
    {
      icon: Heart,
      title: "Client Success",
      description:
        "Your success is our success. We partner with you to understand your goals and deliver solutions that drive real results.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We stay ahead of the curve, leveraging cutting-edge technologies and methodologies to build future-proof solutions.",
    },
    {
      icon: Shield,
      title: "Transparency",
      description:
        "Open communication, honest timelines, and clear pricing. No surprises, just straightforward collaboration.",
    },
    {
      icon: Lightbulb,
      title: "Creative Problem Solving",
      description:
        "We don't just write code—we solve problems. Our team brings creativity and strategic thinking to every challenge.",
    },
    {
      icon: Code2,
      title: "Technical Excellence",
      description:
        "From architecture to deployment, we follow best practices and write clean, maintainable, scalable code.",
    },
  ];

  const timeline = [
    {
      year: "2019",
      title: "The Beginning",
      description:
        "Founded with a vision to help businesses transform through technology. Started with a small team of passionate developers.",
    },
    {
      year: "2020",
      title: "Growth & Expansion",
      description:
        "Expanded our services to include mobile development and cloud solutions. Grew our team to 10+ talented professionals.",
    },
    {
      year: "2021",
      title: "AI Integration",
      description:
        "Pioneered AI and machine learning solutions for our clients. Delivered 50+ successful projects across industries.",
    },
    {
      year: "2022",
      title: "Global Reach",
      description:
        "Expanded to serve clients worldwide. Established partnerships with leading tech companies and startups.",
    },
    {
      year: "2023",
      title: "Innovation Hub",
      description:
        "Launched our innovation lab focused on emerging technologies. Achieved 100+ project milestone with 95% client satisfaction.",
    },
    {
      year: "2024",
      title: "Future Forward",
      description:
        "Continuing to push boundaries with cutting-edge solutions. Building the next generation of digital products.",
    },
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "",
      bio: "10+ years building products that people love",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "",
      bio: "Tech visionary with expertise in scalable systems",
      social: { linkedin: "#", github: "#" },
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Design",
      image: "",
      bio: "Creating beautiful, intuitive user experiences",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Emily Watson",
      role: "Lead Developer",
      image: "",
      bio: "Full-stack engineer passionate about clean code",
      social: { linkedin: "#", github: "#" },
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Unicorn Studio Background */}
        <div className="absolute inset-0 z-0">
          <UnicornStudioEmbed 
            projectId="T7MtQffMpIHVMRdQ45OB" 
            className="w-full h-full"
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-background pointer-events-none" />
        
        <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white">
              <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
              About Us
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              We build digital products that make a difference
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-base md:text-lg text-white/80">
              Codecafe is a creative technology studio dedicated to crafting
              exceptional digital experiences. We combine technical expertise
              with design thinking to help businesses thrive in the digital age.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild className="shadow-lg">
                <Link to="/contact">Work with us</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/portfolio">View our work</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 sm:py-16 md:py-20 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <ScrollReveal key={stat.label} delay={index * 0.1}>
                  <div className="rounded-2xl border bg-card p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
                    <div className="inline-flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 mb-4">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <ScrollReveal direction="left">
              <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 p-8 md:p-10 h-full">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/20 grid place-items-center mb-6">
                  <Target className="size-7 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Our Mission
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  To empower businesses with innovative technology solutions that
                  drive growth, enhance user experiences, and create lasting
                  value. We believe in building products that not only meet
                  today's needs but anticipate tomorrow's challenges.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rounded-3xl border bg-gradient-to-br from-fuchsia-500/10 via-violet-500/10 to-primary/10 p-8 md:p-10 h-full">
                <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/20 grid place-items-center mb-6">
                  <Lightbulb className="size-7 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Our Vision
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  To be the most trusted technology partner for businesses
                  worldwide, known for our commitment to excellence, innovation,
                  and client success. We envision a future where technology
                  seamlessly enhances every aspect of business and life.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-12 sm:py-16 md:py-24 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Our Core Values
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <ScrollReveal key={value.title} delay={index * 0.1}>
                  <div className="rounded-2xl border bg-card p-6 md:p-8 hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="size-12 rounded-xl bg-gradient-to-br from-primary/20 to-violet-500/20 grid place-items-center">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <h3 className="mt-5 text-xl font-bold">{value.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Our Journey
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                From humble beginnings to industry leaders
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-ml-px" />

              <div className="space-y-8 md:space-y-12">
                {timeline.map((item, index) => (
                  <ScrollReveal
                    key={item.year}
                    delay={index * 0.1}
                    direction={index % 2 === 0 ? "left" : "right"}
                  >
                    <div
                      className={`relative flex items-start gap-6 md:gap-8 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-4 md:left-1/2 size-8 md:-ml-4 rounded-full border-4 border-background bg-primary flex items-center justify-center z-10">
                        <div className="size-2 rounded-full bg-background" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 ml-14 md:ml-0">
                        <div
                          className={`rounded-2xl border bg-card p-6 md:p-8 hover:shadow-lg transition-shadow ${
                            index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                          }`}
                        >
                          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {item.year}
                          </div>
                          <h3 className="mt-3 text-xl font-bold">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-12 sm:py-16 md:py-24 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Meet Our Team
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                The talented people behind our success
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <div className="group rounded-2xl border bg-card overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 relative overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl font-bold bg-gradient-to-br from-primary to-violet-500 bg-clip-text text-transparent">
                          {member.name.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">
                      {member.role}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {member.bio}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          className="size-8 rounded-lg border bg-background hover:bg-accent flex items-center justify-center transition-colors"
                        >
                          <Linkedin className="size-4" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          className="size-8 rounded-lg border bg-background hover:bg-accent flex items-center justify-center transition-colors"
                        >
                          <Twitter className="size-4" />
                        </a>
                      )}
                      {member.social.github && (
                        <a
                          href={member.social.github}
                          className="size-8 rounded-lg border bg-background hover:bg-accent flex items-center justify-center transition-colors"
                        >
                          <Github className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
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
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Ready to start your journey with us?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Let's create something amazing together. Get in touch and we'll
                respond within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="shadow-lg">
                  <Link to="/contact">
                    Get in touch <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/services">Our services</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
