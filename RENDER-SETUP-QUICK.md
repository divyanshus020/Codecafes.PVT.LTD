# 🚀 Quick Setup: Render + Cloudflare

## Visual Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Your Git Repository                      │
│                  (GitHub/GitLab/Bitbucket)                  │
└────────────┬────────────────────────────┬───────────────────┘
             │                            │
             │ Auto-deploy on push        │ Auto-deploy on push
             │                            │
    ┌────────▼────────┐          ┌───────▼────────┐
    │  Render Service │          │ Render Service │
    │   (Main Site)   │          │ (Admin Panel)  │
    │                 │          │                │
    │ Build:          │          │ Build:         │
    │ npm run         │          │ npm run        │
    │ build:main      │          │ build:admin    │
    │                 │          │                │
    │ ENV:            │          │ ENV:           │
    │ MODE=main       │          │ MODE=admin     │
    └────────┬────────┘          └───────┬────────┘
             │                            │
             │ yoursite-main              │ yoursite-admin
             │ .onrender.com              │ .onrender.com
             │                            │
    ┌────────▼────────────────────────────▼────────┐
    │           Cloudflare DNS + CDN               │
    │                                              │
    │  CNAME: @ → yoursite-main.onrender.com      │
    │  CNAME: admin → yoursite-admin.onrender.com │
    │                                              │
    │  ✓ SSL/TLS (Full Strict)                    │
    │  ✓ DDoS Protection                           │
    │  ✓ CDN Caching                               │
    │  ✓ Bot Protection                            │
    └────────┬────────────────────────────┬────────┘
             │                            │
             │                            │
    ┌────────▼────────┐          ┌───────▼────────┐
    │  yoursite.com   │          │ admin.yoursite │
    │                 │          │     .com       │
    │  Public Pages   │          │  Admin Panel   │
    └─────────────────┘          └────────────────┘
```

## Step-by-Step (5 Minutes)

### 1️⃣ Cloudflare DNS (2 min)

Go to Cloudflare → DNS → Add records:

```
Type: CNAME | Name: @     | Target: [will add after Render]
Type: CNAME | Name: admin | Target: [will add after Render]
```

### 2️⃣ Render - Main Site (2 min)

**New Web Service**:
- Repository: Your Git repo
- Build: `npm install && npm run build:main`
- Start: `npm start`
- Add env vars (click Advanced):
  ```
  VITE_DEPLOYMENT_MODE=main
  NODE_ENV=production
  [Your other env vars]
  ```

**After deploy**:
- Copy URL: `yoursite-main.onrender.com`
- Go to Cloudflare → Update CNAME `@` target
- In Render: Settings → Custom Domains → Add `yoursite.com`

### 3️⃣ Render - Admin Panel (2 min)

**New Web Service** (same repo):
- Repository: Same Git repo
- Build: `npm install && npm run build:admin`
- Start: `npm start`
- Add env vars:
  ```
  VITE_DEPLOYMENT_MODE=admin
  NODE_ENV=production
  [Your other env vars]
  ```

**After deploy**:
- Copy URL: `yoursite-admin.onrender.com`
- Go to Cloudflare → Update CNAME `admin` target
- In Render: Settings → Custom Domains → Add `admin.yoursite.com`

### 4️⃣ Cloudflare SSL (30 sec)

- Go to SSL/TLS → Overview
- Set to: **Full (strict)** ✅

### 5️⃣ Test (1 min)

```bash
# Main site
curl -I https://yoursite.com
# Should return 200 OK

# Admin panel
curl -I https://admin.yoursite.com
# Should return 200 OK or redirect to /admin/login
```

## Environment Variables You Need

```bash
# Required for both services
VITE_DEPLOYMENT_MODE=main  # or admin
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
JWT_SECRET=your_jwt_secret

# Optional
ADMIN_USERNAME=your_username
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

## Auto-Deploy Setup

In each Render service:
1. Settings → Build & Deploy
2. Auto-Deploy: **Yes** ✅

Now every Git push automatically deploys both sites! 🎉

## Quick Commands

```bash
# Test builds locally before pushing
npm run build:main   # Test main site
npm run build:admin  # Test admin panel

# Push to deploy
git add .
git commit -m "Update"
git push origin main
# Both Render services auto-deploy!
```

## Troubleshooting

**"Too many redirects"**
→ Cloudflare SSL/TLS → Set to "Full (strict)"

**Build failing**
→ Check Render logs, verify build command

**DNS not working**
→ Wait 5-10 minutes, check CNAME targets are correct

**Wrong routes showing**
→ Verify VITE_DEPLOYMENT_MODE is set correctly

## Cost

- Cloudflare: **Free** ✅
- Render Free Tier: **Free** (spins down after 15 min)
- Render Starter: **$7/month per service** (always on)

**Recommended**: Start with free tier, upgrade to Starter ($14/month total) when ready for production.

## Next Steps

1. ✅ Deploy both services
2. ✅ Configure DNS
3. ✅ Test thoroughly
4. 📊 Add analytics
5. 🔒 Configure security rules
6. 📈 Monitor performance

**Full Guide**: See `RENDER-CLOUDFLARE-SETUP.md` for detailed instructions.

---

**You're ready to deploy! 🚀**
