import { DEPLOYMENT_MODE } from "@/config/deployment";

/**
 * Development-only badge to show current deployment mode
 * Only visible in development environment
 */
export function DeploymentBadge() {
  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  const modeColors = {
    main: "bg-blue-500",
    admin: "bg-purple-500",
    full: "bg-green-500",
  };

  const modeLabels = {
    main: "Main Site",
    admin: "Admin Panel",
    full: "Full Mode (Dev)",
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <div
        className={`${modeColors[DEPLOYMENT_MODE]} text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg`}
      >
        🚀 {modeLabels[DEPLOYMENT_MODE]}
      </div>
    </div>
  );
}
