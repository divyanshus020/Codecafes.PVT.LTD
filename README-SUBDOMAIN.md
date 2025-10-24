# 🚀 Subdomain Deployment - Quick Start

Your application is now configured for subdomain deployment! Here's everything you need to know.

## ✨ What's New?

Your app can now be deployed to two separate domains from the same codebase:
- **yoursite.com** - Main website (public pages only)
- **admin.yoursite.com** - Admin panel (admin pages only)

## 🎯 Quick Commands

```bash
# Development (all routes visible)
npm run dev

# Build for main website
npm run build:main

# Build for admin panel
npm run build:admin

# Test main build locally
npm run build:main
npm start

# Test admin build locally
npm run build:admin
npm start
```

## 📚 Documentation

We've created comprehensive guides for you:

1. **SUBDOMAIN-SETUP.md** - Quick reference guide (START HERE!)
2. **DEPLOYMENT.md** - Detailed deployment instructions
3. **ARCHITECTURE.md** - Technical architecture explanation

## 🎨 Development Mode Indicator

When running `npm run dev`, you'll see a badge in the bottom-right corner:
- 🚀 **Full Mode (Dev)** (Green) - All routes visible

This badge only appears in development and helps you know which mode you're in.

## 🔧 How It Works

The app uses an environment variable `VITE_DEPLOYMENT_MODE` to determine which routes to show:

- `main` → Shows only public routes
- `admin` → Shows only admin routes  
- `full` → Shows all routes (default for development)

## 📋 Deployment Checklist

### For Main Website (yoursite.com)

- [ ] Create deployment project on Vercel/Netlify
- [ ] Set build command: `npm run build:main`
- [ ] Set output directory: `dist/spa`
- [ ] Add environment variable: `VITE_DEPLOYMENT_MODE=main`
- [ ] Add your other environment variables (Supabase, JWT, etc.)
- [ ] Configure custom domain: `yoursite.com`
- [ ] Deploy and test

### For Admin Panel (admin.yoursite.com)

- [ ] Create separate deployment project
- [ ] Set build command: `npm run build:admin`
- [ ] Set output directory: `dist/spa`
- [ ] Add environment variable: `VITE_DEPLOYMENT_MODE=admin`
- [ ] Add your other environment variables (same as main site)
- [ ] Configure custom domain: `admin.yoursite.com`
- [ ] Deploy and test

## 🧪 Testing Your Deployments

### Main Site Should:
✅ Show home page at `/`  
✅ Show all public pages (/about, /services, /blog, etc.)  
❌ NOT show admin routes  
❌ NOT have /admin/login accessible

### Admin Panel Should:
✅ Redirect `/` to `/admin/login`  
✅ Show admin login page  
✅ Show admin dashboard after login  
❌ NOT show public pages  
❌ NOT have public routes accessible

## 🔐 Security Notes

1. **Always use HTTPS** for both domains (especially admin)
2. **Keep JWT_SECRET secure** - use different secrets for dev/prod
3. **Never commit** `.env` files with real credentials
4. **Set environment variables** in your deployment platform, not in code
5. **Consider IP whitelisting** for admin subdomain if needed

## 🆘 Troubleshooting

### Both sites showing same content?
→ Check you're using the correct build command for each deployment

### Admin routes visible on main site?
→ Verify `VITE_DEPLOYMENT_MODE=main` is set in environment variables

### Can't access admin panel?
→ Ensure DNS is configured and `VITE_DEPLOYMENT_MODE=admin` is set

### Routes not working after deployment?
→ Clear browser cache and verify build was successful

## 📞 Next Steps

1. **Read SUBDOMAIN-SETUP.md** for step-by-step deployment instructions
2. **Test locally** with `npm run build:main` and `npm run build:admin`
3. **Set up DNS** records for your domain
4. **Deploy to Vercel/Netlify** (recommended) or your own server
5. **Test both deployments** thoroughly before going live

## 💡 Pro Tips

- Test builds locally before deploying to production
- Use the same environment variables for both deployments (except VITE_DEPLOYMENT_MODE)
- Set up CI/CD for automatic deployments
- Monitor both sites separately
- Keep documentation updated as you make changes

## 🎉 You're Ready!

Your application is now configured for subdomain deployment. Follow the guides in the documentation folder to deploy your sites.

**Happy Deploying! 🚀**

---

**Need Help?**
- Check SUBDOMAIN-SETUP.md for quick reference
- Read DEPLOYMENT.md for detailed instructions
- Review ARCHITECTURE.md to understand how it works
