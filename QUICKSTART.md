# AdFlow Quick Start Guide

Get up and running with AdFlow in 5 minutes!

## Step 1: Install Dependencies

```bash
pnpm install
```

## Step 2: Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 3: Login

Use the demo account credentials:
- **Email**: `demo@example.com`
- **Password**: `demo123`

Or click "Try Demo Account" button for quick access.

## Step 4: Explore the Dashboard

You're now in the main dashboard! Here's what you can do:

### Dashboard Tab (`/dashboard`)
- View campaign statistics
- See active campaigns
- Monitor overall performance
- Quick start actions

### Campaigns Tab (`/campaigns`)
- View all campaigns
- Search and filter
- Create new campaigns
- Manage existing campaigns

### Create Campaign (`/campaigns/new`)
1. Enter campaign name
2. Select objective (awareness, consideration, conversion, engagement)
3. Choose target platforms (8+ supported)
4. Set budget and dates
5. Click "Create Campaign"

### Analytics Tab (`/analytics`)
- Select a campaign to analyze
- View performance metrics
- See platform-specific data
- Track conversions and ROAS

### Templates Tab (`/templates`)
- Browse saved templates
- Create campaigns from templates
- Duplicate templates for quick setup

### Settings Tab (`/settings`)
- Connect ad platforms (via OAuth mock)
- Manage account settings
- View connected platforms

## Key Features to Try

### 1. AI Ad Copy Generation
When creating a campaign, use the **"Generate Copy"** button to:
- Auto-generate headlines, descriptions, and CTAs
- Create platform-specific variations
- Copy text directly to clipboard

### 2. Campaign Management
In the campaigns list:
- Edit draft campaigns
- Pause active campaigns
- Delete campaigns
- View campaign details

### 3. Smart Retry & Fallback
When publishing a campaign:
- Automatic retry with exponential backoff
- Fallback to alternative platforms
- Real-time status updates

### 4. Analytics Dashboard
View comprehensive metrics:
- Total impressions, clicks, conversions
- Spend and revenue tracking
- Platform-by-platform comparison
- ROAS (Return on Ad Spend)

## Project Structure

```
app/                          # Next.js App Router
├── (auth)/login/            # Login page
├── (dashboard)/             # Protected dashboard routes
│   ├── dashboard/           # Main dashboard
│   ├── campaigns/           # Campaign management
│   ├── analytics/           # Analytics dashboard
│   ├── templates/           # Campaign templates
│   └── settings/            # Account settings
└── api/                     # API routes
    ├── auth/                # Authentication
    ├── campaigns/           # Campaign endpoints
    ├── platforms/           # Platform management
    ├── analytics/           # Analytics data
    ├── templates/           # Template endpoints
    └── ai/                  # AI features

components/
├── dashboard/               # Dashboard components
├── campaigns/               # Campaign components
└── ui/                      # shadcn/ui components

lib/
├── types.ts                 # TypeScript types
└── constants.ts             # Constants and configs
```

## Available Routes

| Route | Purpose |
|-------|---------|
| `/` | Redirects to dashboard |
| `/login` | Login page |
| `/dashboard` | Main dashboard |
| `/campaigns` | Campaign list |
| `/campaigns/new` | Create campaign |
| `/analytics` | Analytics dashboard |
| `/templates` | Campaign templates |
| `/settings` | Account settings |

## Environment Variables

For local development, no env vars are required. The app uses mock data by default.

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## Common Tasks

### Create a Campaign
1. Go to `/campaigns`
2. Click "New Campaign"
3. Fill in details
4. Select platforms
5. Click "Create Campaign"

### Generate Ad Copy
1. In campaign creation
2. Click "Generate Copy" button
3. Enter product name
4. Click "Generate Copy"
5. Copy and use generated text

### View Campaign Analytics
1. Go to `/analytics`
2. Select campaign from dropdown
3. View metrics and charts
4. Analyze platform performance

### Connect a Platform
1. Go to `/settings`
2. Scroll to "Connect New Platforms"
3. Click platform icon
4. Follow OAuth flow (mocked)

### Save as Template
1. Create a campaign with good settings
2. Go to `/templates`
3. Click "Use Template" to duplicate
4. Modify and save new template

## API Endpoints

All endpoints are mocked with realistic data. Here are the key endpoints:

### Authentication
```
POST /api/auth/login
Body: { email, password }
Returns: { user, token }
```

### Campaigns
```
GET /api/campaigns?page=1&pageSize=10
Returns: { data, total, page, pageSize, hasMore }

POST /api/campaigns
Body: { name, objective, budget, platforms, ... }
Returns: { campaign }

POST /api/campaigns/publish
Body: { campaignId, platforms }
Returns: { success, primaryResults, fallbackResults }
```

### Analytics
```
GET /api/analytics?campaignId=camp_1
Returns: { campaignAnalytics, platformMetrics }
```

### AI Copy
```
POST /api/ai/generate-copy
Body: { platform, productName, targetAudience }
Returns: { headline, description, callToAction, variations }
```

### Platforms
```
GET /api/platforms/accounts
Returns: [platformAccounts]

POST /api/platforms/accounts
Body: { platform }
Returns: { authUrl }
```

### Templates
```
GET /api/templates?page=1&pageSize=10
Returns: { data, total, page, pageSize, hasMore }

POST /api/templates
Body: { name, objective, platforms, budget, ... }
Returns: { template }
```

## Troubleshooting

### Login not working
- Clear browser cache and cookies
- Check browser console for errors
- Ensure localStorage is enabled

### Campaign creation fails
- Verify all required fields are filled
- Check at least one platform is selected
- Check browser console for error details

### Analytics not loading
- Ensure campaign ID is valid
- Check network tab for API errors
- Try selecting different campaign

### AI copy generation failing
- Enter a product name (required)
- Check network connectivity
- Try regenerating

## Next Steps

1. **Explore the Dashboard**: Familiarize yourself with all features
2. **Create Test Campaigns**: Try creating campaigns on different platforms
3. **Review Analytics**: Check out the analytics dashboard
4. **Read Documentation**: See [README.md](./README.md) for full documentation
5. **Deploy**: When ready, see [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment instructions

## Support

- Check the [README.md](./README.md) for detailed documentation
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Check browser console for error messages
- Verify all environment variables are set correctly

## Performance Tips

1. **Use Templates**: Save time by creating campaigns from templates
2. **Batch Operations**: Create multiple campaigns at once
3. **Analytics Caching**: Analytics data is cached for performance
4. **Local Storage**: Login tokens are cached in browser

## Security Notes

- Demo credentials are for testing only
- In production, implement real OAuth flows
- Store tokens securely (use httpOnly cookies)
- Implement rate limiting on API endpoints
- Validate all inputs server-side

## What's Next?

After exploring the app:
1. Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
2. Set up real Cloudflare Workers backend
3. Configure real OAuth providers
4. Connect real ad platform APIs
5. Set up production database

Happy creating! 🚀
