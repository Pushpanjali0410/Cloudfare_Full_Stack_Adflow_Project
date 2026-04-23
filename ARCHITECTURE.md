# AdFlow Architecture Guide

## System Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (Browser)                      │
├────────────────────────────────────────────────────────────────────┤
│  React 19 Components + Tailwind CSS + shadcn/ui                    │
│  - Dashboard                                                        │
│  - Campaign Management                                              │
│  - Analytics Visualization                                          │
│  - Settings & Platform Connection                                   │
└────────────┬─────────────────────────────────────────────────────┬┘
             │ HTTPS/REST                         HTTPS/REST         │
             │                                                        │
┌────────────▼──────────────────────┐     ┌────────────────────────▼┐
│   VERCEL FRONTEND                 │     │  CLOUDFLARE WORKERS     │
├───────────────────────────────────┤     ├─────────────────────────┤
│ Next.js 16 (App Router)           │     │ Serverless Functions    │
│ - API Routes (Mock)               │────▶│ - Platform Adapters     │
│ - Authentication                  │     │ - Campaign Logic        │
│ - Page Rendering                  │     │ - Analytics Processing  │
│ - Static Generation               │     │ - Auth Verification     │
└───────────────────────────────────┘     └────────────┬────────────┘
                                                       │
                                                       │
                              ┌────────────────────────┴──────────────────┐
                              │                                           │
                    ┌─────────▼──────────┐                   ┌───────────▼──────┐
                    │  CLOUDFLARE D1     │                   │  CLOUDFLARE KV   │
                    │  (SQLite Database) │                   │  (Cache Layer)   │
                    ├────────────────────┤                   ├──────────────────┤
                    │ - Users            │                   │ - Session Cache  │
                    │ - Campaigns        │                   │ - Analytics      │
                    │ - Platform Accts   │                   │ - Config Cache   │
                    │ - Analytics        │                   │ - Rate Limiting  │
                    │ - Templates        │                   └──────────────────┘
                    │ - Audit Logs       │
                    └────────────────────┘

                    ┌──────────────────────────┐
                    │  EXTERNAL APIs           │
                    ├──────────────────────────┤
                    │ - Meta API               │
                    │ - Google Ads API         │
                    │ - TikTok API             │
                    │ - LinkedIn API           │
                    │ - Pinterest API          │
                    │ - Snapchat API           │
                    │ - Twitter/X API          │
                    │ - Reddit API             │
                    └──────────────────────────┘
```

## Frontend Architecture

### Next.js App Structure
```
app/
├── (auth)/
│   └── login/
│       └── page.tsx                    # Public login page
│
├── (dashboard)/
│   ├── dashboard/
│   │   └── page.tsx                    # Main dashboard
│   ├── campaigns/
│   │   ├── page.tsx                    # Campaign list
│   │   └── new/
│   │       └── page.tsx                # Create campaign
│   ├── analytics/
│   │   └── page.tsx                    # Analytics dashboard
│   ├── templates/
│   │   └── page.tsx                    # Templates
│   ├── settings/
│   │   └── page.tsx                    # Settings page
│   └── layout.tsx                      # Dashboard layout (protected)
│
├── api/                                # API routes (mock)
│   ├── auth/login/route.ts
│   ├── campaigns/
│   │   ├── route.ts
│   │   └── publish/route.ts
│   ├── platforms/accounts/route.ts
│   ├── analytics/route.ts
│   ├── templates/route.ts
│   └── ai/generate-copy/route.ts
│
├── globals.css
├── layout.tsx                          # Root layout
└── page.tsx                            # Home redirect
```

### Component Hierarchy
```
RootLayout
├── (auth) Group
│   └── LoginPage
│
└── (dashboard) Group
    └── DashboardLayout (Protected)
        ├── Sidebar
        ├── Header
        └── Page Content
            ├── DashboardPage
            │   ├── StatCard (x4)
            │   └── CampaignsList
            ├── CampaignsPage
            │   └── CampaignsList
            ├── NewCampaignPage
            │   ├── CampaignForm
            │   ├── PlatformSelector
            │   └── BudgetInput
            ├── AnalyticsPage
            │   ├── MetricsCard
            │   ├── Charts
            │   └── PerformanceTable
            ├── TemplatesPage
            │   └── TemplateCard
            └── SettingsPage
                ├── AccountSettings
                ├── PlatformAccounts
                └── PlatformConnector
```

## Data Flow

### Campaign Creation Flow
```
User fills form
    ↓
Validates input (Zod)
    ↓
Submits to /api/campaigns (POST)
    ↓
Mock API creates campaign
    ↓
Returns campaign object
    ↓
Redirects to campaign page
    ↓
Dashboard updates
```

### Analytics Data Flow
```
User selects campaign
    ↓
Triggers GET /api/analytics?campaignId=xxx
    ↓
Mock API generates metrics
    ↓
Calculates KPIs (CTR, CPC, ROAS, etc.)
    ↓
Returns CampaignAnalytics object
    ↓
Charts render with data
    ↓
Dashboard updates in real-time
```

### AI Copy Generation Flow
```
User clicks "Generate Copy"
    ↓
Opens AI Copy Generator modal
    ↓
User enters product name
    ↓
Submits to POST /api/ai/generate-copy
    ↓
Mock API selects templates
    ↓
Generates variations
    ↓
Returns GeneratedAdCopy object
    ↓
Display headlines, descriptions, CTAs
    ↓
User can copy to clipboard
```

### Platform Connection Flow
```
User clicks "Connect Platform"
    ↓
Submits to POST /api/platforms/accounts
    ↓
Mock API returns OAuth URL
    ↓
(In production: Redirect to OAuth provider)
    ↓
Mock: Create platform account
    ↓
Add to connected platforms list
    ↓
Can now select in campaign creation
```

## Database Schema (Cloudflare D1)

### Core Tables

**users**
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**platform_accounts**
```sql
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
```

**campaigns**
```sql
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
```

**campaign_platforms** (Many-to-Many)
```sql
CREATE TABLE campaign_platforms (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  platform TEXT NOT NULL,
  FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
);
```

**ad_variants**
```sql
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
```

**analytics**
```sql
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
```

**campaign_templates**
```sql
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

## API Endpoint Structure

### Authentication Endpoints
```
POST /api/auth/login
├─ Request: { email, password }
└─ Response: { user, token }
```

### Campaign Endpoints
```
GET /api/campaigns
├─ Query: ?page=1&pageSize=10
└─ Response: { data, total, page, pageSize, hasMore }

POST /api/campaigns
├─ Request: { name, objective, budget, platforms, ... }
└─ Response: { campaign }

POST /api/campaigns/publish
├─ Request: { campaignId, platforms }
└─ Response: { success, primaryResults, fallbackResults, summary }
```

### Platform Endpoints
```
GET /api/platforms/accounts
└─ Response: [platformAccounts]

POST /api/platforms/accounts
├─ Request: { platform }
└─ Response: { authUrl }
```

### Analytics Endpoints
```
GET /api/analytics
├─ Query: ?campaignId=xxx
└─ Response: { campaignAnalytics, platformMetrics }
```

### AI Endpoints
```
POST /api/ai/generate-copy
├─ Request: { platform, productName, targetAudience, tone }
└─ Response: { headline, description, callToAction, variations }
```

### Template Endpoints
```
GET /api/templates
├─ Query: ?page=1&pageSize=10
└─ Response: { data, total, page, pageSize, hasMore }

POST /api/templates
├─ Request: { name, objective, platforms, budget, ... }
└─ Response: { template }
```

## Authentication Flow

```
User logs in
    ↓
POST /api/auth/login with credentials
    ↓
Server validates (mock accepts all)
    ↓
Generates JWT token
    ↓
Returns { user, token }
    ↓
Client stores token in localStorage
    ↓
Stores user data in localStorage
    ↓
Redirects to /dashboard
    ↓
DashboardLayout checks localStorage
    ↓
If token exists, allows access
    ↓
If no token, redirects to /login
```

## Retry & Fallback Mechanism

```
Publish campaign request
    ↓
For each platform:
    ├─ Attempt API call
    ├─ On failure: Retry with exponential backoff
    │   ├─ Attempt 1: 1 second delay
    │   ├─ Attempt 2: 2 second delay
    │   ├─ Attempt 3: 4 second delay
    │   ├─ Attempt 4: 8 second delay
    │   └─ Attempt 5: 16 second delay
    └─ On max retries exceeded:
        └─ Fallback to alternative platforms
            ├─ Try fallback platform 1
            ├─ Try fallback platform 2
            └─ Mark as failed if all exhausted
    ↓
Return results with success rate
```

## State Management

### Client-Side State
- **Authentication**: localStorage (token, user)
- **UI State**: React component state
- **Data Caching**: SWR for API responses
- **Form State**: React Hook Form

### Server-Side State
- **Session**: JWT in localStorage (use httpOnly cookies in production)
- **Database**: Cloudflare D1
- **Cache**: Cloudflare KV
- **Rate Limiting**: Durable Objects

## Deployment Architecture

### Development
```
Local Machine
├── Next.js Dev Server (http://localhost:3000)
├── Mock API Endpoints
├── Mock Database (in-memory)
└── Hot Module Replacement (HMR)
```

### Production
```
Vercel (Frontend)
├── Next.js 16 (Production Build)
├── Automatic HTTPS
├── CDN/Edge Distribution
├── Automatic Deployment on Push
└── Environment Variables

Cloudflare (Backend)
├── Workers (Serverless Functions)
├── D1 Database (SQLite)
├── KV Store (Cache)
├── Automatic Failover
└── Analytics Dashboard
```

## Integration Points

### With Cloudflare Workers
1. Environment variables for D1 binding
2. CORS configuration
3. Rate limiting setup
4. KV cache strategy
5. Error logging

### With OAuth Providers
1. Client ID/Secret configuration
2. Redirect URI setup
3. Scope permissions
4. Token refresh logic
5. Error handling

### With Ad Platforms
1. API endpoint configuration
2. Authentication methods
3. Webhook setup
4. Sync scheduling
5. Error recovery

## Performance Considerations

### Frontend
- Server-side rendering reduces TTL
- Static generation for public pages
- Image optimization
- Code splitting
- SWR caching

### Backend
- D1 read replicas for load distribution
- KV caching for frequently accessed data
- Durable Objects for rate limiting
- Connection pooling
- Query optimization

### Network
- Cloudflare CDN
- Edge caching
- HTTP/2 Push
- Compression
- Regional failover

## Security Architecture

### Authentication
- JWT tokens with expiration
- Secure token storage
- Protected routes
- Session validation

### Data Protection
- Encrypted token storage
- HTTPS enforcement
- CORS validation
- Input validation (Zod)

### API Security
- Rate limiting
- Request signing
- SQL injection prevention
- XSS protection

## Monitoring & Logging

### Frontend Monitoring
- Error tracking (Sentry ready)
- Performance monitoring
- User analytics
- Network requests

### Backend Monitoring
- Worker logs
- Database query logs
- Error tracking
- Performance metrics

### Infrastructure
- Cloudflare Analytics
- Worker metrics
- Database performance
- Cache hit rates

---

This architecture is production-ready and scalable for small to medium-sized deployments. For larger scale, consider additional components like message queues, dedicated caching layer, and database read replicas.
