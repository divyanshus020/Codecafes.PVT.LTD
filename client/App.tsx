import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/layout/Layout";
import { AdminLayout } from "@/components/layout/AdminLayout";
import About from "./pages/About";
import Services from "./pages/Services";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import { AuthProvider } from "@/context/AuthContext";
import RequireAuth from "@/components/route/RequireAuth";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminBlogs from "@/pages/admin/Blogs";
import AdminCaseStudies from "@/pages/admin/CaseStudies";
import AdminServices from "@/pages/admin/Services";
import AdminPromptCourse from "@/pages/admin/PromptCourse";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { isMainSite, isAdminSite, getHomeRoute } from "@/config/deployment";
import { DeploymentBadge } from "@/components/layout/DeploymentBadge";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              {/* Main Website Routes - Only shown on main deployment */}
              {isMainSite() && (
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogDetail />} />
                  <Route path="/contact" element={<Contact />} />
                </Route>
              )}

              {/* Admin Routes - Only shown on admin deployment */}
              {isAdminSite() && (
                <>
                  {/* Admin Login - No Layout */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/" element={<Navigate to="/admin/login" replace />} />

                  {/* Admin Routes with Admin Layout */}
                  <Route element={<RequireAuth />}>
                    <Route element={<AdminLayout />}>
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin/blogs" element={<AdminBlogs />} />
                      <Route path="/admin/case-studies" element={<AdminCaseStudies />} />
                      <Route path="/admin/services" element={<AdminServices />} />
                      <Route path="/admin/prompt-course" element={<AdminPromptCourse />} />
                    </Route>
                  </Route>
                </>
              )}

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <DeploymentBadge />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
