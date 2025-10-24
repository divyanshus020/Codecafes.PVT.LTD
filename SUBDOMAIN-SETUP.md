# Quick Subdomain Setup Guide

## 🎯 Goal
Deploy the same codebase to two different domains:
- **yoursite.com** → Main website (public pages)
- **admin.yoursite.com** → Admin panel only

## 📋 Prerequisites
- A domain name (e.g., `yoursite.com`)
- Access to DNS settings
- Deployment platform account (Vercel/Netlify recommended)

## 🚀 Step-by-Step Setup

### Step 1: Configure DNS
Add these DNS records in your domain registrar:

```
Type: A Record
Name: @
Value: [Your server IP or point to deployment platform]

Type: A Record  
Name: admin
Value: [Your server IP or point to deployment platform]
```

### Step 2: Deploy Main Website

#### On Vercel:
1. Go to [vercel.com](https://vercel.com) and create new project
2. Import your repository
3. **Build Settings**:
   - Build Command: `pnpm run build:main`
   - Output Directory: `dist/spa`
4. **Environment Variables**:
   ```
   VITE_DEPLOYMENT_MODE=main
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_key
   JWT_SECRET=your_secret
   ```
5. Deploy
6. Add custom domain: `yoursite.com`

#### On Netlify:
1. Go to [netlify.com](https://netlify.com) and create new site
2. Import your repository
3. **Build Settings**:
   - Build Command: `pnpm run build:main`
   - Publish Directory: `dist/spa`
4. **Environment Variables**: (Same as Vercel above)
5. Deploy
6. Add custom domain: `yoursite.com`

### Step 3: Deploy Admin Panel

Repeat the same process but with these changes:

1. Create a **separate** project/site
2. **Build Command**: `pnpm run build:admin`
3. **Environment Variable**: `VITE_DEPLOYMENT_MODE=admin`
4. **Custom Domain**: `admin.yoursite.com`

### Step 4: Test Your Deployments

**Main Site** (`yoursite.com`):
- ✅ Should show: Home, About, Services, Blog, Case Studies, Contact
- ❌ Should NOT show: Admin routes

**Admin Panel** (`admin.yoursite.com`):
- ✅ Should show: Login page, Admin dashboard
- ❌ Should NOT show: Public pages
- Root URL (`/`) should redirect to `/admin/login`

## 🧪 Testing Locally

### Test Main Site Mode
```bash
# Terminal 1
pnpm run build:main
pnpm start
```
Visit `http://localhost:8080` - should only show public pages

### Test Admin Mode
```bash
# Terminal 2 (stop previous server first)
pnpm run build:admin
pnpm start
```
Visit `http://localhost:8080` - should redirect to admin login

### Development (All Routes)
```bash
pnpm dev
```
Visit `http://localhost:8080` - shows everything (full mode)

## 📁 Project Structure

```
.env              → Development (full mode)
.env.main         → Main site config
.env.admin        → Admin panel config

client/
  config/
    deployment.ts → Deployment mode logic
  App.tsx         → Conditional routing based on mode

package.json      → Build scripts
```

## 🔧 Build Commands

```bash
# Development (all routes)
pnpm dev

# Build main website
pnpm run build:main

# Build admin panel
pnpm run build:admin

# Build both (full mode)
pnpm run build
```

## 🎨 Visual Indicator

In development, you'll see a badge in the bottom-right corner showing:
- 🚀 **Main Site** (blue) - Only public routes
- 🚀 **Admin Panel** (purple) - Only admin routes  
- 🚀 **Full Mode (Dev)** (green) - All routes

This badge only appears in development and is hidden in production.

## ⚠️ Common Issues

### Issue: Both sites showing same content
**Solution**: Make sure you're using different build commands:
- Main: `pnpm run build:main`
- Admin: `pnpm run build:admin`

### Issue: Admin routes visible on main site
**Solution**: Check environment variable `VITE_DEPLOYMENT_MODE=main` is set

### Issue: Can't access admin panel
**Solution**: 
1. Verify DNS is pointing correctly
2. Check `VITE_DEPLOYMENT_MODE=admin` is set
3. Ensure you built with `pnpm run build:admin`

## 🔐 Security Checklist

- [ ] Enable HTTPS on both domains
- [ ] Set strong JWT_SECRET in production
- [ ] Never commit `.env` files with real credentials
- [ ] Use environment variables in deployment platform
- [ ] Consider IP whitelisting for admin subdomain
- [ ] Enable rate limiting on login endpoints

## 📚 Additional Resources

- Full deployment guide: See `DEPLOYMENT.md`
- Main README: See `README.md`
- Deployment config: `client/config/deployment.ts`

## 🆘 Need Help?

1. Check `DEPLOYMENT.md` for detailed instructions
2. Verify environment variables are set correctly
3. Test builds locally before deploying
4. Check browser console for errors

---

**Quick Tip**: Always test your builds locally before deploying to production!
