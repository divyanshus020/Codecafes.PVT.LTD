import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2, User } from "lucide-react";
import { Blog } from "@shared/api";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Fetch single blog by slug
  const { data: blog, isLoading, error } = useQuery<Blog>({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const res = await fetch(`/api/blogs/${slug}`);
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("Blog not found");
        }
        throw new Error("Failed to fetch blog");
      }
      return res.json();
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="size-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 size-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const readingTime = Math.ceil(blog.content.length / 1000);

  return (
    <>
      {/* Back Navigation */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/blog")}
            className="gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Button>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12 sm:py-16 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="size-4" />
                {blog.published_at
                  ? new Date(blog.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : new Date(blog.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                {readingTime} min read
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              {blog.title}
            </h1>

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                {blog.excerpt}
              </p>
            )}

            {/* Author Info */}
            {blog.author_name && (
              <div className="flex items-center gap-4 mb-8 pb-8 border-b">
                <div className="size-12 sm:size-14 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center overflow-hidden">
                  {blog.author_image ? (
                    <img
                      src={blog.author_image}
                      alt={blog.author_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="size-6 text-primary" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    Written by
                  </p>
                  <p className="text-base sm:text-lg font-bold">
                    {blog.author_name}
                  </p>
                </div>
              </div>
            )}

            {/* Cover Image */}
            {blog.cover_image && (
              <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                <img
                  src={blog.cover_image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: blog.content }}
                className="leading-relaxed"
              />
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">Share this article</h3>
                  <p className="text-sm text-muted-foreground">
                    Help others discover this content
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: blog.title,
                        text: blog.excerpt || blog.title,
                        url: window.location.href,
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }
                  }}
                >
                  <Share2 className="mr-2 size-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Author Card at Bottom */}
            {blog.author_name && (
              <div className="mt-12 p-6 sm:p-8 rounded-2xl border bg-accent/30">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="size-16 sm:size-20 rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {blog.author_image ? (
                      <img
                        src={blog.author_image}
                        alt={blog.author_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="size-8 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-1">
                      Article by
                    </p>
                    <h4 className="text-xl sm:text-2xl font-bold mb-2">
                      {blog.author_name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Passionate about building great products and sharing
                      insights with the community.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-accent/30 border-t">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to start your project?
            </h2>
            <p className="text-muted-foreground mb-8">
              Let's discuss how we can help you build something amazing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="shadow-lg">
                <Link to="/contact">Get in touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/blog">Read more articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
