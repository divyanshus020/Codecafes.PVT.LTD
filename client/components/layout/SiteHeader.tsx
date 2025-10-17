import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/services", label: "Services" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-md bg-gradient-to-br from-primary to-violet-500" />
          <span className="font-extrabold tracking-tight text-xl">
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">Codecafe</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  isActive && "text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button asChild size="sm" className="shadow-sm">
            <Link to="/contact">Get a quote</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "text-base font-medium text-muted-foreground hover:text-foreground",
                    isActive && "text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Button asChild size="sm" className="mt-2 w-full">
              <Link to="/contact">Get a quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
