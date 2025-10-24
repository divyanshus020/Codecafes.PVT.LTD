import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { cn } from "@/lib/utils";
import {
  IconLayoutDashboard,
  IconFileText,
  IconBriefcase,
  IconCode,
  IconBook,
  IconLogout,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const adminNavItems = [
  {
    to: "/admin",
    label: "Dashboard",
    icon: IconLayoutDashboard,
  },
  {
    to: "/admin/blogs",
    label: "Blogs",
    icon: IconFileText,
  },
  {
    to: "/admin/case-studies",
    label: "Case Studies",
    icon: IconBriefcase,
  },
  {
    to: "/admin/services",
    label: "Services",
    icon: IconCode,
  },
  {
    to: "/admin/prompt-course",
    label: "Prompt Course",
    icon: IconBook,
  },
];

export function AdminLayout() {
  const { user, logout, devMode } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r bg-card">
        <div className="flex flex-col flex-1 min-h-0">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto text-foreground" />
            </Link>
          </div>

          {/* User Info */}
          <div className="px-4 py-4 border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.username}</p>
                {devMode && (
                  <p className="text-xs text-muted-foreground">Dev Mode</p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin"}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="p-4 border-t space-y-2">
            <ThemeToggle />
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <IconLogout className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <aside
            className="fixed inset-y-0 left-0 w-64 bg-card border-r z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col flex-1 min-h-0 h-full">
              {/* Logo & Close */}
              <div className="flex items-center justify-between h-16 px-4 border-b">
                <Link to="/" className="flex items-center">
                  <Logo className="h-8 w-auto text-foreground" />
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md hover:bg-accent"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {/* User Info */}
              <div className="px-4 py-4 border-b">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {user?.username}
                    </p>
                    {devMode && (
                      <p className="text-xs text-muted-foreground">Dev Mode</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === "/admin"}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )
                      }
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>

              {/* Footer Actions */}
              <div className="p-4 border-t space-y-2">
                <ThemeToggle />
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <IconLogout className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 flex items-center h-16 px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-accent"
          >
            <IconMenu2 className="h-6 w-6" />
          </button>
          <div className="ml-4">
            <Logo className="h-8 w-auto text-foreground" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
