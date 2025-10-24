# ✅ Deployment Checklist - Render + Cloudflare

Use this checklist to deploy your subdomain setup to Render with Cloudflare DNS.

## 📋 Pre-Deployment

### Local Testing
- [ ] Run `npm run dev` - verify app works in development
- [ ] Run `npm run build:main` - verify main site builds successfully
- [ ] Run `npm run build:admin` - verify admin panel builds successfully
- [ ] Test main build locally: `npm start` after build:main
- [ ] Test admin build locally: `npm start` after build:admin

### Environment Variables Ready
- [ ] `SUPABASE_URL` - from Supabase dashboard
- [ ] `SUPABASE_SERVICE_KEY` - from Supabase dashboard
- [ ] `JWT_SECRET` - generate a strong secret
- [ ] `ADMIN_USERNAME` - your admin username
- [ ] `ADMIN_PASSWORD_HASH` - bcrypt hash of your password

### Accounts Setup
- [ ] Cloudflare account created
- [ ] Domain added to Cloudflare
- [ ] Nameservers updated at domain registrar
- [ ] Render account created
- [ ] Git repository connected to Render

---

## 🌐 Cloudflare Configuration

### DNS Records (Initial Setup)
- [ ] Go to Cloudflare → DNS → Records
- [ ] Add CNAME record:
  - Name: `@`
  - Target: `temp.example.com` (will update after Render)
  - Proxy: ✅ Enabled (orange cloud)
- [ ] Add CNAME record:
  - Name: `admin`
  - Target: `temp.example.com` (will update after Render)
  - Proxy: ✅ Enabled (orange cloud)

### SSL/TLS Settings
- [ ] Go to SSL/TLS → Overview
- [ ] Set encryption mode: **Full (strict)** ✅
- [ ] Go to SSL/TLS → Edge Certificates
- [ ] Verify "Always Use HTTPS" is enabled
- [ ] Verify "Automatic HTTPS Rewrites" is enabled

### Security Settings (Optional but Recommended)
- [ ] Go to Security → Settings
- [ ] Enable "Bot Fight Mode"
- [ ] Set Security Level to "Medium" or "High"
- [ ] Consider enabling "Challenge Passage" for admin subdomain

---

## 🚀 Render - Main Website Deployment

### Create Service
- [ ] Go to Render Dashboard
- [ ] Click "New" → "Web Service"
- [ ] Connect your Git repository
- [ ] Select the repository and branch

### Configure Service
- [ ] **Name**: `yoursite-main` (or your preferred name)
- [ ] **Environment**: Node
- [ ] **Region**: Choose closest to your users
- [ ] **Branch**: `main` (or your default branch)
- [ ] **Build Command**: `npm install && npm run build:main`
- [ ] **Start Command**: `npm start`

### Environment Variables
Click "Advanced" and add:
- [ ] `VITE_DEPLOYMENT_MODE` = `main`
- [ ] `NODE_ENV` = `production`
- [ ] `SUPABASE_URL` = `your_supabase_url`
- [ ] `SUPABASE_SERVICE_KEY` = `your_service_key`
- [ ] `JWT_SECRET` = `your_jwt_secret`
- [ ] `ADMIN_USERNAME` = `your_username` (optional)
- [ ] `ADMIN_PASSWORD_HASH` = `your_hash` (optional)

### Deploy & Configure
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete (5-10 minutes)
- [ ] Copy the Render URL (e.g., `yoursite-main.onrender.com`)
- [ ] Go to Cloudflare → Update CNAME `@` target to Render URL
- [ ] In Render: Settings → Custom Domains → Add `yoursite.com`
- [ ] In Render: Settings → Custom Domains → Add `www.yoursite.com`
- [ ] Wait for SSL certificate to provision (5-10 minutes)

### Test Main Site
- [ ] Visit `https://yoursite.com`
- [ ] Verify home page loads
- [ ] Test navigation to /about, /services, /blog
- [ ] Verify /admin routes return 404
- [ ] Check SSL certificate is valid (green padlock)

---

## 🔐 Render - Admin Panel Deployment

### Create Service
- [ ] Go to Render Dashboard
- [ ] Click "New" → "Web Service"
- [ ] Connect the **same** Git repository
- [ ] Select the repository and branch

### Configure Service
- [ ] **Name**: `yoursite-admin` (or your preferred name)
- [ ] **Environment**: Node
- [ ] **Region**: Same as main site
- [ ] **Branch**: `main` (or your default branch)
- [ ] **Build Command**: `npm install && npm run build:admin`
- [ ] **Start Command**: `npm start`

### Environment Variables
Click "Advanced" and add:
- [ ] `VITE_DEPLOYMENT_MODE` = `admin`
- [ ] `NODE_ENV` = `production`
- [ ] `SUPABASE_URL` = `your_supabase_url` (same as main)
- [ ] `SUPABASE_SERVICE_KEY` = `your_service_key` (same as main)
- [ ] `JWT_SECRET` = `your_jwt_secret` (same as main)
- [ ] `ADMIN_USERNAME` = `your_username` (same as main)
- [ ] `ADMIN_PASSWORD_HASH` = `your_hash` (same as main)

### Deploy & Configure
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete (5-10 minutes)
- [ ] Copy the Render URL (e.g., `yoursite-admin.onrender.com`)
- [ ] Go to Cloudflare → Update CNAME `admin` target to Render URL
- [ ] In Render: Settings → Custom Domains → Add `admin.yoursite.com`
- [ ] Wait for SSL certificate to provision (5-10 minutes)

### Test Admin Panel
- [ ] Visit `https://admin.yoursite.com`
- [ ] Verify redirects to `/admin/login`
- [ ] Test login with your credentials
- [ ] Verify dashboard loads after login
- [ ] Test admin pages (blogs, case studies, services)
- [ ] Verify public routes return 404
- [ ] Check SSL certificate is valid (green padlock)

---

## 🔄 Auto-Deploy Configuration

### Main Site
- [ ] Go to Render → yoursite-main service
- [ ] Settings → Build & Deploy
- [ ] Auto-Deploy: **Yes** ✅
- [ ] Deploy Hook: Copy URL (optional, for manual triggers)

### Admin Panel
- [ ] Go to Render → yoursite-admin service
- [ ] Settings → Build & Deploy
- [ ] Auto-Deploy: **Yes** ✅
- [ ] Deploy Hook: Copy URL (optional, for manual triggers)

### Test Auto-Deploy
- [ ] Make a small change in your code
- [ ] Commit and push to Git
- [ ] Verify both services rebuild automatically
- [ ] Check deployment logs in Render
- [ ] Verify changes are live on both sites

---

## 📊 Monitoring & Alerts

### Render Notifications
- [ ] Go to Account Settings → Notifications
- [ ] Add email for deployment notifications
- [ ] Enable notifications for:
  - Deploy succeeded
  - Deploy failed
  - Service health issues

### Cloudflare Analytics
- [ ] Go to Analytics → Traffic
- [ ] Review traffic patterns
- [ ] Set up email reports (optional)

### Health Checks
- [ ] Render → yoursite-main → Settings → Health & Alerts
- [ ] Health Check Path: `/`
- [ ] Render → yoursite-admin → Settings → Health & Alerts
- [ ] Health Check Path: `/admin/login`

---

## 🔒 Security Hardening

### Cloudflare Firewall (Admin Panel)
- [ ] Go to Security → WAF → Firewall rules
- [ ] Create rule for admin subdomain:
  ```
  Rule name: Block non-essential countries for admin
  Expression: (http.host eq "admin.yoursite.com" and ip.geoip.country ne "YOUR_COUNTRY")
  Action: Block
  ```

### Rate Limiting (Admin Login)
- [ ] Go to Security → WAF → Rate limiting rules
- [ ] Create rule:
  ```
  Rule name: Admin login rate limit
  Expression: (http.host eq "admin.yoursite.com" and http.request.uri.path eq "/api/auth/login")
  Requests: 5 per minute
  Action: Block for 1 hour
  ```

### Render Environment Variables
- [ ] Verify no secrets in Git repository
- [ ] Rotate JWT_SECRET regularly (every 90 days)
- [ ] Use strong admin password
- [ ] Enable 2FA on Render account
- [ ] Enable 2FA on Cloudflare account

---

## 🎨 Performance Optimization

### Cloudflare Caching
- [ ] Go to Caching → Configuration
- [ ] Caching Level: Standard
- [ ] Browser Cache TTL: 4 hours
- [ ] Enable "Always Online"

### Cloudflare Page Rules (Main Site)
- [ ] Go to Rules → Page Rules
- [ ] Create rule:
  ```
  URL: yoursite.com/*
  Settings:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 2 hours
  ```

### Cloudflare Page Rules (Admin - No Cache)
- [ ] Create rule:
  ```
  URL: admin.yoursite.com/*
  Settings:
  - Cache Level: Bypass
  ```

### Cloudflare Speed Optimizations
- [ ] Go to Speed → Optimization
- [ ] Enable Auto Minify: HTML, CSS, JS
- [ ] Enable Brotli compression
- [ ] Enable Early Hints
- [ ] Enable Rocket Loader (test first)

---

## 📱 Additional Configuration

### Cloudflare Network
- [ ] Go to Network
- [ ] Enable HTTP/3 (QUIC)
- [ ] Enable 0-RTT Connection Resumption
- [ ] Enable WebSockets

### Render Instance Type
- [ ] Review current plan (Free tier spins down after 15 min)
- [ ] Consider upgrading to Starter ($7/month per service) for:
  - Always-on services
  - No spin down
  - Better performance
  - Priority support

---

## 🧪 Final Testing

### Functionality Tests
- [ ] Main site home page loads
- [ ] All public pages accessible
- [ ] Navigation works correctly
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Admin routes not accessible on main site

### Admin Panel Tests
- [ ] Admin login page loads
- [ ] Login works with correct credentials
- [ ] Dashboard displays correctly
- [ ] Can create/edit/delete content
- [ ] All admin pages accessible
- [ ] Public routes not accessible on admin site

### Performance Tests
- [ ] Run PageSpeed Insights on main site
- [ ] Run PageSpeed Insights on admin panel
- [ ] Check load times (should be < 3 seconds)
- [ ] Test on mobile devices
- [ ] Test on different browsers

### Security Tests
- [ ] HTTPS works on both domains
- [ ] SSL certificates valid
- [ ] Security headers present
- [ ] Admin panel not indexed by search engines
- [ ] Rate limiting works on admin login

---

## 📝 Documentation

### Update Documentation
- [ ] Document deployment process
- [ ] Save environment variables securely
- [ ] Document custom domain setup
- [ ] Create rollback procedure
- [ ] Document monitoring setup

### Team Access
- [ ] Add team members to Render (if applicable)
- [ ] Add team members to Cloudflare (if applicable)
- [ ] Share deployment documentation
- [ ] Set up communication channels

---

## 🎉 Launch Checklist

### Pre-Launch
- [ ] All tests passing
- [ ] Performance optimized
- [ ] Security configured
- [ ] Monitoring enabled
- [ ] Backups configured
- [ ] Documentation complete

### Launch
- [ ] Announce to team
- [ ] Monitor for first 24 hours
- [ ] Check error logs
- [ ] Verify analytics tracking
- [ ] Test user flows

### Post-Launch
- [ ] Set up regular backups
- [ ] Schedule security audits
- [ ] Plan for scaling
- [ ] Monitor costs
- [ ] Gather user feedback

---

## 🆘 Emergency Contacts

### Service Status Pages
- Render Status: https://status.render.com
- Cloudflare Status: https://www.cloudflarestatus.com

### Support
- Render Support: https://render.com/support
- Cloudflare Support: https://support.cloudflare.com

### Rollback Procedure
If something goes wrong:
1. Go to Render → Service → Events
2. Find last working deployment
3. Click "Rollback to this version"
4. Monitor deployment
5. Clear Cloudflare cache

---

## ✅ Completion

- [ ] Main website deployed and tested
- [ ] Admin panel deployed and tested
- [ ] DNS configured correctly
- [ ] SSL certificates active
- [ ] Auto-deploy enabled
- [ ] Monitoring configured
- [ ] Security hardened
- [ ] Performance optimized
- [ ] Documentation complete
- [ ] Team notified

**Congratulations! Your subdomain deployment is complete! 🎉**

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Main Site URL**: https://yoursite.com
**Admin Panel URL**: https://admin.yoursite.com
