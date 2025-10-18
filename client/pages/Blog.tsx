import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { UnicornStudioEmbed } from "@/components/animations/UnicornStudioEmbed";

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

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch blogs from backend
  const { data: blogs = [] } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch("/api/blogs");
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    },
  });

  const categories = [
    { value: "all", label: "All Posts" },
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "ai", label: "AI & ML" },
    { value: "business", label: "Business" },
  ];

  const featuredPost = blogs[0];
  const recentPosts = blogs.slice(1);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Unicorn Studio Background */}
        <div className="absolute inset-0 z-0">
          <UnicornStudioEmbed 
            projectId="f3jfRwi4PQaGtmYO7L6m" 
            className="w-full h-full"
          />
        </div>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-background pointer-events-none" />
        
        <div className="container px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white">
            <span className="size-2 rounded-full bg-gradient-to-r from-primary to-violet-500" />
            Blog
          </div>
          <h1 className="mt-6 max-w-4xl text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Insights on building great products
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-base md:text-lg text-white/80">
            Thoughts on engineering, design, AI, and the craft of building
            lovable digital products. Written by our team and industry experts.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild className="shadow-lg">
              <Link to="/contact">Work with us</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="#subscribe">Subscribe to newsletter</a>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && (
        <section className="py-12 sm:py-16 md:py-20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Featured Article
              </h2>
            </div>
            <article className="group overflow-hidden rounded-3xl border bg-card hover:shadow-2xl transition-all">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-[16/10] md:aspect-auto bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 relative overflow-hidden">
                  {featuredPost.cover_image ? (
                    <img
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-8xl font-bold bg-gradient-to-br from-primary to-violet-500 bg-clip-text text-transparent">
                        {featuredPost.title.charAt(0)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {featuredPost.published_at
                        ? new Date(featuredPost.published_at).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : "Recently"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />5 min read
                    </div>
                  </div>
                  <h3 className="mt-4 text-2xl md:text-3xl font-bold leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    {featuredPost.excerpt ||
                      featuredPost.content.substring(0, 200) + "..."}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                    Read full article <ArrowRight className="ml-1 size-4" />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* BLOG POSTS GRID */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Latest Articles
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.length === 0 ? (
              <div className="col-span-full text-center py-16 text-muted-foreground">
                <p className="text-lg">No blog posts available yet.</p>
                <p className="mt-2 text-sm">
                  Add some from the admin panel to share your insights!
                </p>
              </div>
            ) : (
              recentPosts.map((blog) => (
                <article
                  key={blog.id}
                  className="group rounded-2xl border bg-card hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 relative overflow-hidden rounded-t-2xl">
                    {blog.cover_image ? (
                      <img
                        src={blog.cover_image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-6xl font-bold bg-gradient-to-br from-primary to-violet-500 bg-clip-text text-transparent">
                          {blog.title.charAt(0)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5" />
                        {blog.published_at
                          ? new Date(blog.published_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "Recent"}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3.5" />5 min
                      </div>
                    </div>
                    <h3 className="mt-3 font-bold text-lg line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {blog.excerpt || blog.content.substring(0, 120) + "..."}
                    </p>
                    <div className="mt-5 flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                      Read more <ArrowRight className="ml-1 size-4" />
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section id="subscribe" className="py-12 sm:py-16 md:py-24 bg-accent/30">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 p-8 md:p-12 text-center">
              <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-violet-500/20 mb-6">
                <Tag className="size-7 text-primary" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Subscribe to our newsletter
              </h2>
              <p className="mt-3 text-muted-foreground">
                Get the latest articles, insights, and updates delivered to your
                inbox. No spam, unsubscribe anytime.
              </p>
              <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button type="submit" className="shadow-lg">
                  Subscribe
                </Button>
              </form>
              <p className="mt-4 text-xs text-muted-foreground">
                Join 1,000+ subscribers who get our weekly insights
              </p>
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
              Ready to start your project?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Let's discuss how we can help you build something amazing. Get in
              touch and we'll respond within 24 hours.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/contact">Get in touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">View services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
