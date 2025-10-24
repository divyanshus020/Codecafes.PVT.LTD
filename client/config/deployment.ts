/**
 * Deployment Configuration
 * 
 * This module determines which deployment mode the app is running in:
 * - 'main': Main website (yoursite.com) - shows public pages only
 * - 'admin': Admin panel (admin.yoursite.com) - shows admin pages only
 * - 'full': Development mode - shows all routes (default for local dev)
 */

export type DeploymentMode = 'main' | 'admin' | 'full';

/**
 * Get the current deployment mode from environment variables
 */
export function getDeploymentMode(): DeploymentMode {
  const mode = import.meta.env.VITE_DEPLOYMENT_MODE as DeploymentMode | undefined;
  
  // Default to 'full' in development for convenience
  if (!mode || import.meta.env.DEV) {
    return 'full';
  }
  
  return mode;
}

/**
 * Check if we should show main website routes
 */
export function isMainSite(): boolean {
  const mode = getDeploymentMode();
  return mode === 'main' || mode === 'full';
}

/**
 * Check if we should show admin panel routes
 */
export function isAdminSite(): boolean {
  const mode = getDeploymentMode();
  return mode === 'admin' || mode === 'full';
}

/**
 * Check if running in full mode (development)
 */
export function isFullMode(): boolean {
  return getDeploymentMode() === 'full';
}

/**
 * Get the appropriate home route based on deployment mode
 */
export function getHomeRoute(): string {
  const mode = getDeploymentMode();
  
  if (mode === 'admin') {
    return '/admin/login';
  }
  
  return '/';
}

// Export current mode for debugging
export const DEPLOYMENT_MODE = getDeploymentMode();
