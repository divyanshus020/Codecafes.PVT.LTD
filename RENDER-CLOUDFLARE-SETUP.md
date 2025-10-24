# 🚀 Render + Cloudflare Deployment Guide

Complete guide for deploying your subdomain setup to Render with Cloudflare DNS management.

## 📋 Prerequisites

- ✅ Cloudflare account with your domain added
- ✅ Render account connected to your Git repository
- ✅ Domain name (e.g., `yoursite.com`)

## 🎯 Architecture Overview

```
Cloudflare DNS
    ↓
yoursite.com → Render Web Service (Main Site)
    ↓
admin.yoursite.com → Render Web Service (Admin Panel)
```

---

## Part 1: Cloudflare DNS Configuration

### Step 1: Add Your Domain to Cloudflare

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Add your domain if not already added
3. Update nameservers at your domain registrar to Cloudflare's nameservers

### Step 2: Configure DNS Records

Go to **DNS** → **Records** and add:

#### For Main Website
```
Type: CNAME
Name: @
Target: your-main-app.onrender.com (you'll get this from Render)
Proxy status: Proxied (orange cloud) ✅
TTL: Auto
```

#### For Admin Subdomain
```
Type: CNAME
Name: admin
Target: your-admin-app.onrender.com (you'll get this from Render)
Proxy status: Proxied (orange cloud) ✅
TTL: Auto
```

**Note**: You'll update the Target values after creating Render services.

### Step 3: SSL/TLS Settings (Important!)

1. Go to **SSL/TLS** → **Overview**
2. Set encryption mode to: **Full (strict)** ✅
3. This ensures end-to-end encryption between Cloudflare and Render

### Step 4: Additional Cloudflare Settings (Recommended)

**Security Settings**:
- Go to **Security** → **Settings**
- Enable **Bot Fight Mode** for basic bot protection
- Consider enabling **Rate Limiting** for admin subdomain

**Speed Settings**:
- Go to **Speed** → **Optimization**
- Enable **Auto Minify** (HTML, CSS, JS)
- Enable **Brotli** compression

---

## Part 2: Render Deployment

### Step 1: Create Main Website Service

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **New** → **Web Service**
3. Connect your Git repository
4. Configure:

```yaml
Name: yoursite-main
Environment: Node
Region: Choose closest to your users
Branch: main (or your default branch)
Build Command: npm install && npm run build:main
Start Command: npm start
```

5. **Environment Variables** (click "Advanced"):
```
VITE_DEPLOYMENT_MODE=main
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

6. **Instance Type**: Choose based on your needs (Free tier works for testing)
7. Click **Create Web Service**

### Step 2: Get Main Site URL

1. After deployment completes, you'll see a URL like: `yoursite-main.onrender.com`
2. Copy this URL
3. Go back to **Cloudflare DNS**
4. Update the CNAME record for `@` with target: `yoursite-main.onrender.com`

### Step 3: Add Custom Domain in Render (Main Site)

1. In your Render service, go to **Settings** → **Custom Domains**
2. Click **Add Custom Domain**
3. Enter: `yoursite.com` and `www.yoursite.com`
4. Render will verify the domain (may take a few minutes)
5. SSL certificate will be automatically provisioned

### Step 4: Create Admin Panel Service

1. Go to Render Dashboard
2. Click **New** → **Web Service**
3. Connect the **same** Git repository
4. Configure:

```yaml
Name: yoursite-admin
Environment: Node
Region: Same as main site
Branch: main (or your default branch)
Build Command: npm install && npm run build:admin
Start Command: npm start
```

5. **Environment Variables**:
```
VITE_DEPLOYMENT_MODE=admin
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD_HASH=your_bcrypt_hash
```

6. Click **Create Web Service**

### Step 5: Get Admin Panel URL

1. After deployment, you'll see: `yoursite-admin.onrender.com`
2. Copy this URL
3. Go to **Cloudflare DNS**
4. Update the CNAME record for `admin` with target: `yoursite-admin.onrender.com`

### Step 6: Add Custom Domain in Render (Admin Panel)

1. In your admin service, go to **Settings** → **Custom Domains**
2. Click **Add Custom Domain**
3. Enter: `admin.yoursite.com`
4. Render will verify the domain
5. SSL certificate will be automatically provisioned

---

## Part 3: Render Configuration Files

### Create `render.yaml` (Optional but Recommended)

Create this file in your project root for easier management:

```yaml
services:
  # Main Website
  - type: web
    name: yoursite-main
    env: node
    buildCommand: npm install && npm run build:main
    startCommand: npm start
    envVars:
      - key: VITE_DEPLOYMENT_MODE
        value: main
      - key: NODE_ENV
        value: production
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_SERVICE_KEY
        sync: false
      - key: JWT_SECRET
        sync: false
    
  # Admin Panel
  - type: web
    name: yoursite-admin
    env: node
    buildCommand: npm install && npm run build:admin
    startCommand: npm start
    envVars:
      - key: VITE_DEPLOYMENT_MODE
        value: admin
      - key: NODE_ENV
        value: production
      - key: SUPABASE_URL
        sync: false
      - key: SUPABASE_SERVICE_KEY
        sync: false
      - key: JWT_SECRET
        sync: false
```

**Note**: With `render.yaml`, you can use **Blueprint** feature to deploy both services at once.

---

## Part 4: Testing Your Deployment

### Test Main Website
```bash
# Check DNS resolution
nslookup yoursite.com

# Test HTTPS
curl -I https://yoursite.com

# Visit in browser
https://yoursite.com
```

**Expected Results**:
- ✅ Shows home page
- ✅ All public pages work (/about, /services, /blog, etc.)
- ❌ /admin routes should 404

### Test Admin Panel
```bash
# Check DNS resolution
nslookup admin.yoursite.com

# Test HTTPS
curl -I https://admin.yoursite.com

# Visit in browser
https://admin.yoursite.com
```

**Expected Results**:
- ✅ Redirects to /admin/login
- ✅ Admin login page loads
- ✅ After login, dashboard works
- ❌ Public routes should 404

---

## Part 5: Automatic Deployments

### Enable Auto-Deploy on Render

1. Go to each service → **Settings** → **Build & Deploy**
2. Enable **Auto-Deploy**: Yes
3. Now, when you push to your Git repository, both services will automatically rebuild and deploy

### Deploy Workflow
```
1. Make code changes locally
2. Commit and push to Git
   ↓
3. Render detects changes
   ↓
4. Both services rebuild automatically
   - Main site with: npm run build:main
   - Admin panel with: npm run build:admin
   ↓
5. Services redeploy with zero downtime
   ↓
6. Changes live on both domains
```

---

## Part 6: Monitoring & Logs

### View Logs in Render

1. Go to your service dashboard
2. Click **Logs** tab
3. Monitor real-time logs
4. Filter by severity (Info, Warning, Error)

### Set Up Alerts

1. Go to **Settings** → **Notifications**
2. Add email/Slack for deployment notifications
3. Get notified on:
   - Successful deployments
   - Failed builds
   - Service health issues

---

## Part 7: Performance Optimization

### Cloudflare Optimizations

1. **Caching**:
   - Go to **Caching** → **Configuration**
   - Set caching level: Standard
   - Enable **Always Online**

2. **Page Rules** (for main site):
   ```
   URL: yoursite.com/*
   Settings:
   - Cache Level: Cache Everything
   - Edge Cache TTL: 2 hours
   - Browser Cache TTL: 4 hours
   ```

3. **Page Rules** (for admin - NO caching):
   ```
   URL: admin.yoursite.com/*
   Settings:
   - Cache Level: Bypass
   - Disable Performance features
   ```

### Render Optimizations

1. **Health Checks**:
   - Go to **Settings** → **Health & Alerts**
   - Set health check path: `/` (main) or `/admin/login` (admin)

2. **Scaling** (if needed):
   - Upgrade to paid plan for horizontal scaling
   - Set auto-scaling rules based on traffic

---

## Part 8: Security Hardening

### Cloudflare Security

1. **Firewall Rules** (for admin panel):
   ```
   Rule: Block countries except yours
   Expression: (http.host eq "admin.yoursite.com" and ip.geoip.country ne "YOUR_COUNTRY")
   Action: Block
   ```

2. **Rate Limiting** (for admin login):
   ```
   URL: admin.yoursite.com/api/auth/login
   Requests: 5 per minute
   Action: Block for 1 hour
   ```

3. **Enable DNSSEC**:
   - Go to **DNS** → **Settings**
   - Enable DNSSEC for additional security

### Render Security

1. **Environment Variables**:
   - Never commit secrets to Git
   - Use Render's environment variable management
   - Rotate JWT_SECRET regularly

2. **Access Control**:
   - Consider IP whitelisting for admin panel
   - Use strong passwords
   - Enable 2FA on Render account

---

## Part 9: Troubleshooting

### Issue: "Too many redirects" error

**Solution**:
1. Go to Cloudflare → **SSL/TLS** → **Overview**
2. Change to **Full (strict)**
3. Clear browser cache

### Issue: DNS not resolving

**Solution**:
1. Check Cloudflare DNS records are correct
2. Ensure proxy is enabled (orange cloud)
3. Wait up to 24 hours for DNS propagation
4. Use `nslookup` or `dig` to verify

### Issue: Build failing on Render

**Solution**:
1. Check Render logs for error messages
2. Verify build command is correct
3. Ensure all dependencies are in package.json
4. Test build locally: `npm run build:main` or `npm run build:admin`

### Issue: Environment variables not working

**Solution**:
1. Verify variables are set in Render dashboard
2. Check variable names match exactly (case-sensitive)
3. Redeploy after adding/changing variables
4. Don't use quotes around values in Render

### Issue: Admin routes showing on main site

**Solution**:
1. Verify `VITE_DEPLOYMENT_MODE=main` is set in Render
2. Check build command is `npm run build:main`
3. Clear Cloudflare cache
4. Force redeploy on Render

---

## Part 10: Maintenance & Updates

### Update Your Application

```bash
# 1. Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# 2. Render auto-deploys both services
# 3. Monitor deployment in Render dashboard
# 4. Test both sites after deployment
```

### Rollback if Needed

1. Go to Render service → **Events**
2. Find previous successful deployment
3. Click **Rollback to this version**
4. Service will redeploy previous version

### Clear Cloudflare Cache

After deployment:
1. Go to Cloudflare → **Caching** → **Configuration**
2. Click **Purge Everything**
3. Or use selective purge for specific URLs

---

## 📊 Cost Breakdown

### Cloudflare
- **Free Plan**: ✅ Perfect for most sites
  - Unlimited bandwidth
  - Basic DDoS protection
  - SSL certificates
  - CDN

### Render
- **Free Tier**: Good for testing
  - Services spin down after 15 min of inactivity
  - 750 hours/month free
  
- **Starter Plan** ($7/month per service):
  - Always on
  - No spin down
  - Better performance
  - **Recommended for production**

**Total Cost**: $14/month (2 services) + Cloudflare Free = **$14/month**

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Code tested locally
- [ ] Environment variables documented
- [ ] DNS records planned
- [ ] Render account set up
- [ ] Cloudflare account set up

### Main Site Deployment
- [ ] Render service created
- [ ] Build command: `npm run build:main`
- [ ] Environment variables set
- [ ] Custom domain added in Render
- [ ] Cloudflare DNS CNAME configured
- [ ] SSL certificate verified
- [ ] Site tested and working

### Admin Panel Deployment
- [ ] Render service created
- [ ] Build command: `npm run build:admin`
- [ ] Environment variables set
- [ ] Custom domain added in Render
- [ ] Cloudflare DNS CNAME configured
- [ ] SSL certificate verified
- [ ] Admin panel tested and working

### Post-Deployment
- [ ] Auto-deploy enabled
- [ ] Monitoring set up
- [ ] Cloudflare optimizations applied
- [ ] Security rules configured
- [ ] Backup plan documented

---

## 🎉 You're Done!

Your application is now deployed with:
- ✅ Main website on `yoursite.com`
- ✅ Admin panel on `admin.yoursite.com`
- ✅ Cloudflare CDN and security
- ✅ Automatic deployments from Git
- ✅ SSL certificates
- ✅ Zero-downtime deployments

**Next Steps**:
1. Monitor your deployments
2. Set up analytics (Google Analytics, Plausible, etc.)
3. Configure backups for your database
4. Plan for scaling as traffic grows

**Need Help?**
- Render Docs: https://render.com/docs
- Cloudflare Docs: https://developers.cloudflare.com
- Your deployment logs in Render dashboard

---

**Happy Deploying! 🚀**
