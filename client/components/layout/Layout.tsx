import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { FloatingNav } from "./FloatingNav";

export default function Layout() {
  return (
    <div className="min-h-dvh flex flex-col bg-background text-foreground">
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <FloatingNav />
    </div>
  );
}
