# Deployment Guide - Subdomain Setup

This guide explains how to deploy your application to two separate domains:
- **Main Website**: `yoursite.com` (public pages only)
- **Admin Panel**: `admin.yoursite.com` (admin pages only)

## Overview

The application uses environment-based routing to show different routes based on the deployment mode:
- `VITE_DEPLOYMENT_MODE=main` - Shows only public website routes
- `VITE_DEPLOYMENT_MODE=admin` - Shows only admin panel routes
- `VITE_DEPLOYMENT_MODE=full` - Shows all routes (default for development)

## Quick Start

### Development (Local)
```bash
# Run in full mode (all routes available)
pnpm dev
```
Access at: `http://localhost:8080`

### Build for Production

#### Build Main Website
```bash
# Build for main site deployment (yoursite.com)
pnpm run build:main
```

#### Build Admin Panel
```bash
# Build for admin subdomain (admin.yoursite.com)
pnpm run build:admin
```

## Deployment Options

### Option 1: Deploy to Vercel/Netlify (Recommended)

#### Main Website Deployment

1. **Create a new project** on Vercel/Netlify for your main site
2. **Configure build settings**:
   - Build command: `pnpm run build:main`
   - Output directory: `dist/spa`
3. **Set environment variables**:
   ```
   VITE_DEPLOYMENT_MODE=main
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_service_key
   JWT_SECRET=your_jwt_secret
   ```
4. **Configure custom domain**: `yoursite.com`

#### Admin Panel Deployment

1. **Create a separate project** on Vercel/Netlify for admin panel
2. **Configure build settings**:
   - Build command: `pnpm run build:admin`
   - Output directory: `dist/spa`
3. **Set environment variables**:
   ```
   VITE_DEPLOYMENT_MODE=admin
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_service_key
   JWT_SECRET=your_jwt_secret
   ```
4. **Configure custom domain**: `admin.yoursite.com`

### Option 2: Deploy to Your Own Server

#### Using PM2 (Node.js Process Manager)

1. **Build both versions**:
   ```bash
   # On your server
   pnpm run build:main
   # Save the dist folder as dist-main
   
   pnpm run build:admin
   # Save the dist folder as dist-admin
   ```

2. **Create PM2 ecosystem file** (`ecosystem.config.js`):
   ```javascript
   module.exports = {
     apps: [
       {
         name: 'main-site',
         script: './dist-main/server/node-build.mjs',
         env: {
           PORT: 3000,
           NODE_ENV: 'production',
           VITE_DEPLOYMENT_MODE: 'main'
         }
       },
       {
         name: 'admin-panel',
         script: './dist-admin/server/node-build.mjs',
         env: {
           PORT: 3001,
           NODE_ENV: 'production',
           VITE_DEPLOYMENT_MODE: 'admin'
         }
       }
     ]
   };
   ```

3. **Start with PM2**:
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx reverse proxy**:
   ```nginx
   # Main site
   server {
       server_name yoursite.com www.yoursite.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   
   # Admin panel
   server {
       server_name admin.yoursite.com;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Setup SSL with Certbot**:
   ```bash
   sudo certbot --nginx -d yoursite.com -d www.yoursite.com
   sudo certbot --nginx -d admin.yoursite.com
   ```

### Option 3: Docker Deployment

1. **Create Dockerfile for each deployment**:

   **Dockerfile.main**:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build:main
   EXPOSE 3000
   CMD ["node", "dist/server/node-build.mjs"]
   ```

   **Dockerfile.admin**:
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build:admin
   EXPOSE 3001
   CMD ["node", "dist/server/node-build.mjs"]
   ```

2. **Create docker-compose.yml**:
   ```yaml
   version: '3.8'
   services:
     main-site:
       build:
         context: .
         dockerfile: Dockerfile.main
       ports:
         - "3000:3000"
       environment:
         - VITE_DEPLOYMENT_MODE=main
         - NODE_ENV=production
       restart: unless-stopped
     
     admin-panel:
       build:
         context: .
         dockerfile: Dockerfile.admin
       ports:
         - "3001:3001"
       environment:
         - VITE_DEPLOYMENT_MODE=admin
         - NODE_ENV=production
       restart: unless-stopped
   ```

3. **Deploy**:
   ```bash
   docker-compose up -d
   ```

## DNS Configuration

Configure your DNS records to point to your server:

```
A Record:
yoursite.com → Your Server IP

A Record:
admin.yoursite.com → Your Server IP
```

Or if using Vercel/Netlify, follow their custom domain setup instructions.

## Environment Files

The project includes three environment files:

- `.env` - Default (development, full mode)
- `.env.main` - Main website configuration
- `.env.admin` - Admin panel configuration

These are used automatically by the build scripts, but you should set environment variables directly in your deployment platform for production.

## Testing Deployments

### Test Main Site Build Locally
```bash
pnpm run build:main
pnpm start
# Visit http://localhost:8080 - should only show public pages
```

### Test Admin Build Locally
```bash
pnpm run build:admin
pnpm start
# Visit http://localhost:8080 - should redirect to /admin/login
```

## Security Notes

1. **Never commit** `.env` files with real credentials to version control
2. **Use environment variables** in your deployment platform for sensitive data
3. **Enable HTTPS** for both domains (especially admin panel)
4. **Consider IP whitelisting** for admin panel if needed
5. **Use strong JWT secrets** in production

## Troubleshooting

### Routes not showing correctly
- Check `VITE_DEPLOYMENT_MODE` environment variable is set correctly
- Verify the build was done with the correct command (`build:main` or `build:admin`)
- Clear browser cache and rebuild

### Admin panel accessible on main site
- Ensure you're using the correct build command for each deployment
- Verify environment variables are set in your deployment platform

### Both sites showing same content
- Make sure you're deploying different builds to different domains
- Check that environment variables are different for each deployment

## Support

For issues or questions, refer to the main README.md or create an issue in the repository.
