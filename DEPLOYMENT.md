# AdFlow - Deployment Guide

## Project Overview

AdFlow is a comprehensive multi-platform ad campaign management system built with Next.js 16 frontend and designed for Cloudflare Workers backend integration.

**Key Features:**
- Campaign management across 8+ ad platforms
- AI-powered ad copy generation
- Smart retry & fallback mechanisms
- Unified analytics dashboard
- Campaign templates & duplication
- Creative auto-formatting support
- OAuth-based platform authentication

## Architecture

### Frontend (Vercel)
- **Framework**: Next.js 16 with App Router
- **UI Framework**: React 19 with shadcn/ui components
- **Styling**: Tailwind CSS v4
- **Authentication**: JWT-based session management
- **State Management**: SWR for data fetching and caching

### Backend (Cloudflare Workers)
- **Runtime**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Caching**: Cloudflare KV
- **Real-time**: Durable Objects (optional)

### Supported Platforms
1. Meta (Facebook/Instagram)
2. Google Ads
3. TikTok Ads
4. LinkedIn Ads
5. Pinterest Ads
6. Snapchat Ads
7. Twitter/X Ads
8. Reddit Ads

## Deployment Steps

### Prerequisites
- Node.js 18+ 
- pnpm or npm
- Vercel account (for frontend)
- Cloudflare account (for backend)
- Git repository

### Part 1: Deploy Frontend to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial AdFlow commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select the project root
   - Click "Deploy"

3. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_API_URL` pointing to your Cloudflare Workers URL
   - Add `NEXT_PUBLIC_CLOUDFLARE_API_URL` pointing to your Cloudflare Workers URL

4. **Deploy**
   - Vercel will automatically build and deploy your Next.js app
   - Your site will be live at `https://your-project.vercel.app`

### Part 2: Deploy Backend to Cloudflare Workers

1. **Install Wrangler CLI**
   ```bash
   npm install -g @cloudflare/wrangler
   ```

2. **Initialize Wrangler Project** (in a new directory)
   ```bash
   wrangler init adflow-api
   ```

3. **Create D1 Database**
   ```bash
   wrangler d1 create adflow-db
   ```

4. **Create API Routes** (move API handlers to Cloudflare Workers format)
   - Refactor Next.js API routes to Cloudflare handler format
   - Use Hono or Itty Router for routing

5. **Configure wrangler.toml**
   ```toml
   name = "adflow-api"
   main = "src/index.ts"
   compatibility_date = "2024-04-23"

   [[d1_databases]]
   binding = "DB"
   database_name = "adflow-db"
   database_id = "your-db-id"

   [env.production]
   routes = [
     { pattern = "api.adflow.com/*", zone_name = "your-domain.com" }
   ]
   ```

6. **Deploy to Cloudflare**
   ```bash
   wrangler deploy --env production
   ```

### Part 3: Database Setup

1. **Create D1 Schema**
   ```sql
   -- Users table
   CREATE TABLE users (
     id TEXT PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     name TEXT NOT NULL,
     avatar TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   -- Platform accounts
   CREATE TABLE platform_accounts (
     id TEXT PRIMARY KEY,
     user_id TEXT NOT NULL,
     platform TEXT NOT NULL,
     account_name TEXT NOT NULL,
     external_account_id TEXT NOT NULL,
     access_token TEXT NOT NULL,
     refresh_token TEXT,
     token_expiry DATETIME,
     is_connected BOOLEAN DEFAULT true,
     last_synced_at DATETIME,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );

   -- Campaigns
   CREATE TABLE campaigns (
     id TEXT PRIMARY KEY,
     user_id TEXT NOT NULL,
     name TEXT NOT NULL,
     objective TEXT NOT NULL,
     description TEXT,
     budget REAL NOT NULL,
     start_date DATETIME NOT NULL,
     end_date DATETIME,
     status TEXT NOT NULL,
     template_id TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );

   -- Campaign platforms (many-to-many)
   CREATE TABLE campaign_platforms (
     id TEXT PRIMARY KEY,
     campaign_id TEXT NOT NULL,
     platform TEXT NOT NULL,
     FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
   );

   -- Ad variants
   CREATE TABLE ad_variants (
     id TEXT PRIMARY KEY,
     campaign_id TEXT NOT NULL,
     platform TEXT NOT NULL,
     headline TEXT NOT NULL,
     description TEXT NOT NULL,
     call_to_action TEXT NOT NULL,
     media_url TEXT,
     landing_url TEXT NOT NULL,
     variant_name TEXT NOT NULL,
     status TEXT NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
   );

   -- Analytics
   CREATE TABLE analytics (
     id TEXT PRIMARY KEY,
     campaign_id TEXT NOT NULL,
     platform TEXT NOT NULL,
     impressions INTEGER DEFAULT 0,
     clicks INTEGER DEFAULT 0,
     conversions INTEGER DEFAULT 0,
     spend REAL DEFAULT 0,
     revenue REAL DEFAULT 0,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
   );

   -- Templates
   CREATE TABLE campaign_templates (
     id TEXT PRIMARY KEY,
     user_id TEXT NOT NULL,
     name TEXT NOT NULL,
     description TEXT,
     objective TEXT NOT NULL,
     budget REAL NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (user_id) REFERENCES users(id)
   );
   ```

2. **Run Migrations**
   ```bash
   wrangler d1 execute adflow-db --file=schema.sql
   ```

## Environment Variables

### Vercel (Frontend)
```
NEXT_PUBLIC_API_URL=https://api.adflow.com
NEXT_PUBLIC_CLOUDFLARE_API_URL=https://api.adflow.com
```

### Cloudflare (Backend)
```
DATABASE_URL=cloudflare_d1_binding
KV_CACHE=cloudflare_kv_binding
OAUTH_CLIENT_ID_META=your_meta_oauth_id
OAUTH_CLIENT_SECRET_META=your_meta_oauth_secret
# ... repeat for each platform
```

## Platform OAuth Configuration

### Meta (Facebook/Instagram)
1. Go to https://developers.facebook.com
2. Create an app and configure OAuth
3. Set redirect URI: `https://your-domain.com/api/platforms/callback?platform=meta`

### Google Ads
1. Go to https://console.cloud.google.com
2. Create OAuth 2.0 credentials
3. Set redirect URI: `https://your-domain.com/api/platforms/callback?platform=google_ads`

### Other Platforms
Follow similar OAuth setup for each platform, configuring:
- Client ID and Secret
- Redirect URI
- Required scopes/permissions

## Monitoring & Logging

### Vercel Monitoring
- Real-time logs: `vercel logs`
- Performance: Vercel Analytics Dashboard
- Errors: Sentry integration (optional)

### Cloudflare Monitoring
- Worker logs: `wrangler logs`
- Analytics: Cloudflare Dashboard
- Performance: Cloudflare Analytics

## Scaling Considerations

1. **Database**: D1 has read-only replicas for load balancing
2. **Caching**: Use KV for frequently accessed data (platform configs, user settings)
3. **API Limits**: Implement rate limiting with Durable Objects
4. **Background Jobs**: Use Queues for retry logic and platform syncing

## Security Best Practices

1. **Token Storage**: Store OAuth tokens encrypted in D1
2. **CORS**: Configure CORS policies in Cloudflare
3. **Rate Limiting**: Implement rate limiting on API endpoints
4. **Input Validation**: Validate all user inputs server-side
5. **Authentication**: Use JWT with short expiration times
6. **HTTPS**: Enforce HTTPS on all endpoints

## Troubleshooting

### Common Issues

1. **"API not found" error**
   - Ensure `NEXT_PUBLIC_API_URL` is set correctly
   - Verify Cloudflare Workers URL is deployed
   - Check CORS configuration

2. **Database connection failures**
   - Verify D1 database is created
   - Check D1 binding in `wrangler.toml`
   - Ensure database URL is correct

3. **OAuth failures**
   - Verify client ID/secret are correct
   - Check redirect URIs match exactly
   - Ensure platform OAuth apps are in production mode

4. **Performance issues**
   - Enable KV caching for frequently accessed data
   - Use Cloudflare Analytics to identify bottlenecks
   - Consider database read replicas

## Support & Documentation

- **Next.js**: https://nextjs.org/docs
- **Cloudflare Workers**: https://developers.cloudflare.com/workers/
- **D1 Database**: https://developers.cloudflare.com/d1/
- **Vercel Deployment**: https://vercel.com/docs
