# Subdomain Architecture

## 🏗️ Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Codebase                           │
│                  (Single Repository)                        │
└─────────────────┬───────────────────────────┬───────────────┘
                  │                           │
                  │                           │
        ┌─────────▼─────────┐       ┌────────▼─────────┐
        │  Build: Main      │       │  Build: Admin    │
        │  pnpm build:main  │       │  pnpm build:admin│
        └─────────┬─────────┘       └────────┬─────────┘
                  │                           │
                  │                           │
        ┌─────────▼─────────┐       ┌────────▼─────────┐
        │ VITE_DEPLOYMENT   │       │ VITE_DEPLOYMENT  │
        │ _MODE=main        │       │ _MODE=admin      │
        └─────────┬─────────┘       └────────┬─────────┘
                  │                           │
                  │                           │
        ┌─────────▼─────────┐       ┌────────▼─────────┐
        │  yoursite.com     │       │ admin.yoursite   │
        │                   │       │     .com         │
        │  Routes:          │       │  Routes:         │
        │  ✓ /              │       │  ✓ /admin/login  │
        │  ✓ /about         │       │  ✓ /admin/*      │
        │  ✓ /services      │       │  ✗ Public routes │
        │  ✓ /blog          │       │                  │
        │  ✓ /contact       │       │  / → redirects   │
        │  ✗ /admin/*       │       │  to /admin/login │
        └───────────────────┘       └──────────────────┘
```

## 🔄 Routing Flow

### Main Site (yoursite.com)
```
User visits yoursite.com
    ↓
App checks VITE_DEPLOYMENT_MODE
    ↓
Mode = "main"
    ↓
isMainSite() returns true
    ↓
Render public routes only
    ↓
User sees: Home, About, Services, Blog, etc.
```

### Admin Panel (admin.yoursite.com)
```
User visits admin.yoursite.com
    ↓
App checks VITE_DEPLOYMENT_MODE
    ↓
Mode = "admin"
    ↓
isAdminSite() returns true
    ↓
Render admin routes only
    ↓
Root (/) redirects to /admin/login
    ↓
User sees: Login, Dashboard, Admin pages
```

### Development (localhost)
```
Developer runs: pnpm dev
    ↓
No VITE_DEPLOYMENT_MODE set
    ↓
Mode defaults to "full"
    ↓
isMainSite() AND isAdminSite() both return true
    ↓
Render ALL routes
    ↓
Developer sees: Everything
```

## 📦 Build Process

### Main Site Build
```bash
pnpm run build:main
    ↓
Vite reads .env.main
    ↓
Sets VITE_DEPLOYMENT_MODE=main
    ↓
Bundles only main site code
    ↓
Output: dist/spa (optimized for public pages)
```

### Admin Panel Build
```bash
pnpm run build:admin
    ↓
Vite reads .env.admin
    ↓
Sets VITE_DEPLOYMENT_MODE=admin
    ↓
Bundles only admin code
    ↓
Output: dist/spa (optimized for admin pages)
```

## 🗂️ File Structure

```
project/
├── .env                    # Development (full mode)
├── .env.main              # Main site config
├── .env.admin             # Admin panel config
├── DEPLOYMENT.md          # Full deployment guide
├── SUBDOMAIN-SETUP.md     # Quick setup guide
│
├── client/
│   ├── config/
│   │   └── deployment.ts  # Mode detection logic
│   │
│   ├── components/
│   │   └── layout/
│   │       ├── Layout.tsx         # Public site layout
│   │       ├── AdminLayout.tsx    # Admin panel layout
│   │       └── DeploymentBadge.tsx # Dev mode indicator
│   │
│   ├── pages/
│   │   ├── Index.tsx      # Public pages
│   │   ├── About.tsx
│   │   └── admin/
│   │       ├── Login.tsx  # Admin pages
│   │       └── Dashboard.tsx
│   │
│   └── App.tsx            # Conditional routing
│
└── package.json           # Build scripts
```

## 🎯 Deployment Modes

| Mode   | Public Routes | Admin Routes | Use Case                    |
|--------|---------------|--------------|----------------------------|
| `main` | ✅ Visible    | ❌ Hidden    | Main website deployment    |
| `admin`| ❌ Hidden     | ✅ Visible   | Admin panel deployment     |
| `full` | ✅ Visible    | ✅ Visible   | Local development          |

## 🔐 Security Benefits

1. **Separation of Concerns**: Admin panel completely isolated from public site
2. **Reduced Attack Surface**: Admin routes not exposed on main domain
3. **Independent Scaling**: Scale admin and public sites separately
4. **Easier Monitoring**: Track admin access separately
5. **Subdomain Security**: Can apply different security rules per subdomain

## 🚀 Deployment Workflow

### Initial Setup (One Time)
```bash
1. Configure DNS records
   - A record: @ → yoursite.com
   - A record: admin → admin.yoursite.com

2. Create two deployment projects
   - Project 1: Main Site
   - Project 2: Admin Panel
```

### Deploy Main Site
```bash
1. Build: pnpm run build:main
2. Set env: VITE_DEPLOYMENT_MODE=main
3. Deploy to: yoursite.com
4. Test: Visit yoursite.com
```

### Deploy Admin Panel
```bash
1. Build: pnpm run build:admin
2. Set env: VITE_DEPLOYMENT_MODE=admin
3. Deploy to: admin.yoursite.com
4. Test: Visit admin.yoursite.com
```

### Update Both Sites
```bash
1. Make code changes
2. Commit to repository
3. Both deployments auto-build (if CI/CD enabled)
4. Or manually trigger builds on each platform
```

## 🧪 Testing Strategy

### Local Testing
```bash
# Test main site
pnpm run build:main && pnpm start
→ Visit localhost:8080 (should show public pages only)

# Test admin panel
pnpm run build:admin && pnpm start
→ Visit localhost:8080 (should redirect to /admin/login)

# Development (all routes)
pnpm dev
→ Visit localhost:8080 (shows everything)
```

### Production Testing
```bash
# Main site
curl -I https://yoursite.com
curl -I https://yoursite.com/admin (should 404)

# Admin panel
curl -I https://admin.yoursite.com
curl -I https://admin.yoursite.com/admin/login (should 200)
```

## 💡 Key Concepts

### Environment-Based Routing
- Routes are conditionally rendered based on `VITE_DEPLOYMENT_MODE`
- Same codebase, different builds, different routes
- No code duplication, maximum flexibility

### Build-Time Configuration
- Mode is set at build time (not runtime)
- Vite optimizes bundle based on mode
- Unused routes are tree-shaken out

### Single Source of Truth
- One codebase for both deployments
- Shared components, utilities, and logic
- Easy to maintain and update

## 🎨 Visual Indicators

In development, a badge appears showing current mode:
- 🚀 **Main Site** (Blue) - Public routes only
- 🚀 **Admin Panel** (Purple) - Admin routes only
- 🚀 **Full Mode** (Green) - All routes (development)

This helps developers know which mode they're testing.

## 📝 Summary

This architecture allows you to:
- ✅ Deploy same code to two domains
- ✅ Show different routes on each domain
- ✅ Maintain single codebase
- ✅ Secure admin panel on separate subdomain
- ✅ Scale independently
- ✅ Test locally before deploying
- ✅ Easy to maintain and update

The key is the `VITE_DEPLOYMENT_MODE` environment variable that controls which routes are rendered at build time.
