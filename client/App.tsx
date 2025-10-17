import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/layout/Layout";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { AuthProvider } from "@/context/AuthContext";
import RequireAuth from "@/components/route/RequireAuth";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminBlogs from "@/pages/admin/Blogs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route
                path="/services"
                element={
                  <PlaceholderPage
                    title="Our Services"
                    description="Explore how Codecafe delivers websites, apps, DevOps, AI consulting, and intelligent chatbots."
                  />
                }
              />
              <Route
                path="/case-studies"
                element={
                  <PlaceholderPage
                    title="Case Studies"
                    description="Stories about measurable impact we created for our clients."
                  />
                }
              />
              <Route
                path="/portfolio"
                element={
                  <PlaceholderPage
                    title="Portfolio"
                    description="A curated selection of projects showcasing our craft."
                  />
                }
              />
              <Route
                path="/blog"
                element={
                  <PlaceholderPage
                    title="Blog"
                    description="Insights on engineering, design, and AI."
                  />
                }
              />
              <Route
                path="/contact"
                element={
                  <PlaceholderPage
                    title="Contact"
                    description="Tell us about your idea. We'll respond within 24 hours."
                  />
                }
              />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route element={<RequireAuth />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/blogs" element={<AdminBlogs />} />
                <Route
                  path="/admin/case-studies"
                  element={
                    <PlaceholderPage
                      title="Case Studies"
                      description="Manage case studies here."
                    />
                  }
                />
                <Route
                  path="/admin/services"
                  element={
                    <PlaceholderPage
                      title="Services"
                      description="Manage services here."
                    />
                  }
                />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
