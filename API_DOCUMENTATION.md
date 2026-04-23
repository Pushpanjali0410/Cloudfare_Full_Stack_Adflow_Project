# AdsSaaS Platform - Complete Developer Documentation

## 📋 Project Overview

This is a comprehensive multi-platform advertising SaaS application built with Next.js 16, Supabase, and AI integration. It enables users to manage, optimize, and analyze advertising campaigns across 16+ platforms simultaneously.

### Key Technologies
- **Frontend**: Next.js 16 with React 19, Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: JWT-based custom auth
- **AI**: OpenAI integration via AI SDK 6
- **Charts**: Recharts
- **State Management**: React hooks with SWR
- **Validation**: Zod
- **Notifications**: React Hot Toast

## 🚀 Quick Start

### Installation
```bash
# Clone and setup
cd /vercel/share/v0-project
pnpm install

# Configure environment
cp .env.example .env.local
# Fill in required variables

# Setup database
# Paste scripts/01-create-schema.sql into Supabase SQL Editor

# Start development
pnpm dev
# Visit http://localhost:3001
```

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
POSTGRES_URL=your_postgres_connection_string
OPENAI_API_KEY=your_openai_key
```

## 📁 Project Structure

```
/vercel/share/v0-project/
├── app/                           # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── campaigns/           # Campaign management
│   │   ├── ai/                  # AI feature endpoints
│   │   ├── platforms/           # Platform integration
│   │   ├── analytics/           # Analytics data
│   │   └── ab-testing/          # A/B test endpoints
│   ├── dashboard/               # Protected dashboard pages
│   │   ├── campaigns/           # Campaign list and detail
│   │   ├── create-campaign/     # New campaign form
│   │   ├── ai-features/         # AI tools hub
│   │   ├── ab-testing/          # A/B testing interface
│   │   ├── analytics/           # Analytics dashboard
│   │   ├── platforms/           # Platform management
│   │   ├── settings/            # User settings
│   │   └── layout.tsx           # Dashboard layout
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── page.tsx                 # Landing page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # shadcn UI components
│   ├── sidebar.tsx              # Navigation sidebar
│   ├── top-nav.tsx              # Top navigation
│   ├── campaign-card.tsx        # Campaign card
│   ├── copy-generator.tsx       # AI copy generator
│   ├── budget-optimizer.tsx     # Budget optimizer
│   └── best-time-poster.tsx     # Time predictor
├── lib/                          # Utilities and helpers
│   ├── auth.ts                  # Authentication utilities
│   ├── supabase.ts              # Supabase client
│   ├── ai-actions.ts            # AI service functions
│   ├── client-auth.ts           # Client-side auth
│   ├── types.ts                 # TypeScript types
│   ├── validation.ts            # Zod schemas
│   ├── error-handler.ts         # Error handling
│   └── utils.ts                 # General utilities
├── middleware.ts                 # Route protection
├── scripts/                      # Database scripts
│   └── 01-create-schema.sql     # Database schema
├── public/                       # Static assets
├── README.md                     # Main documentation
├── FEATURES.md                   # Feature list
├── TESTING_GUIDE.md             # Testing instructions
└── package.json                  # Dependencies

```

## 🔐 Authentication System

### JWT-Based Authentication
- Session tokens stored in HTTP-only cookies
- Automatic token refresh
- Protected routes via middleware

### Routes
```
POST   /api/auth/register        # Create account
POST   /api/auth/login           # Login user
POST   /api/auth/logout          # Logout
GET    /api/auth/me              # Get current user
POST   /api/auth/update-profile  # Update profile
```

## 📊 Campaign Management

### Campaign Lifecycle
1. **Draft** - Initial creation
2. **Active** - Published and running
3. **Paused** - Temporarily stopped
4. **Completed** - Finished/archived

### API Routes
```
GET    /api/campaigns              # List user's campaigns
POST   /api/campaigns              # Create campaign
GET    /api/campaigns/[id]         # Get campaign details
PUT    /api/campaigns/[id]         # Update campaign
DELETE /api/campaigns/[id]         # Delete campaign
POST   /api/campaigns/duplicate    # Copy campaign
POST   /api/campaigns/bulk-create  # Bulk import
POST   /api/campaigns/publish      # Launch campaign
```

## 🤖 AI Features

### 1. Copy Generation
**Endpoint**: `POST /api/ai/generate-copy`
```json
{
  "topic": "Product description",
  "tone": "professional" | "casual" | "funny" | "urgent"
}
```

### 2. Budget Optimization
**Endpoint**: `POST /api/ai/optimize-budget`
```json
{
  "totalBudget": 5000,
  "campaignId": "optional"
}
```

### 3. Best Time Prediction
**Endpoint**: `POST /api/ai/best-time`
```json
{
  "audience": "target_audience",
  "timezone": "UTC"
}
```

## 🌐 Platform Support

Supported advertising platforms:
- Meta (Facebook, Instagram)
- Google Ads
- TikTok Ads
- LinkedIn Ads
- X (Twitter) Ads
- Pinterest Ads
- Snapchat Ads
- Reddit Ads
- Amazon Advertising
- YouTube Ads
- Quora Ads
- Programmatic Display
- Native Networks
- Video Platforms
- Influencer Networks
- Email Marketing

## 📈 Analytics

### Metrics Tracked
- Impressions
- Clicks
- Click-Through Rate (CTR)
- Conversions
- Cost per Click (CPC)
- Cost per Conversion
- Return on Investment (ROI)

### Analytics Endpoints
```
GET /api/analytics              # Overall analytics
GET /api/analytics/[campaignId] # Campaign-specific
```

## 🧪 A/B Testing

### Testing Features
- Multi-variant campaigns
- Performance comparison
- Statistical significance
- Winner determination
- Real-time tracking

### API
```
GET    /api/ab-testing              # List tests
POST   /api/ab-testing              # Create test
GET    /api/ab-testing/[id]         # Test details
PUT    /api/ab-testing/[id]         # Update test
DELETE /api/ab-testing/[id]         # End test
```

## 🎯 Key Components

### Pages & Routes

**Public**
- `/` - Landing page with features overview
- `/login` - User authentication
- `/register` - Account creation

**Protected**
- `/dashboard` - Main dashboard
- `/dashboard/campaigns` - Campaign management
- `/dashboard/campaigns/[id]` - Campaign details
- `/dashboard/create-campaign` - New campaign
- `/dashboard/platforms` - Platform integrations
- `/dashboard/ai-features` - AI tools
- `/dashboard/ab-testing` - A/B testing
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/settings` - User settings

### Key Components

**UI Components** (from shadcn/ui)
- Button, Card, Input, Textarea
- Dialog, Alert Dialog, Dropdown Menu
- Tabs, Badge, Spinner
- Charts (Recharts integration)

**Custom Components**
- `Sidebar` - Navigation menu
- `TopNav` - User menu and header
- `CampaignCard` - Campaign display card
- `CopyGenerator` - AI copy tool
- `BudgetOptimizer` - Budget allocation
- `BestTimePoster` - Timing predictor

## 🔧 Utility Functions

### Authentication
```typescript
// lib/auth.ts
getSession()            // Get current session
createToken()          // Generate JWT
verifyToken()          // Validate JWT
hashPassword()         // Hash passwords
comparePasswords()     // Verify passwords
```

### Client Auth
```typescript
// lib/client-auth.ts
useAuth()              // Client-side auth hook
isAuthenticated()      // Check auth status
```

### AI Actions
```typescript
// lib/ai-actions.ts
generateAdCopy()       // AI copy generation
optimizeBudget()       // Budget optimization
predictBestTime()      // Time prediction
```

### Validation
```typescript
// lib/validation.ts
createCampaignSchema   // Campaign validation
creativeSchema         // Creative validation
platformCredentialSchema  // Credentials validation
```

## 🚨 Error Handling

### Error Classes
```typescript
APIError - Custom API errors with status codes
```

### Error Handler
```typescript
handleError(error)     // Unified error handling
```

### Validation
- Zod schema validation on all inputs
- Clear error messages
- Type-safe request/response

## 📱 Responsive Design

- **Mobile First** approach
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Touch-friendly** controls
- **Adaptive** layouts

## 🔍 Development Tools

### Debugging
```typescript
console.log('[v0] Debug message', data)  // Tagged logs
```

### Build
```bash
pnpm build        # Production build
pnpm dev          # Development server
pnpm lint         # Code quality
```

## 📦 Deployment

### Vercel Deployment
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Auto-deploys on push

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build
CMD ["pnpm", "start"]
```

## 🔒 Security

### Implemented
- JWT authentication
- HTTP-only cookies
- Input validation (Zod)
- Protected API routes
- Environment variable isolation
- XSS protection
- CSRF protection ready

### Recommended for Production
- HTTPS enforcement
- Rate limiting
- API key rotation
- Database backups
- Error tracking (Sentry)
- User audit logs

## 📚 Database Schema

Key tables:
- `users` - User accounts
- `campaigns` - Ad campaigns
- `creatives` - Ad assets
- `platform_credentials` - API credentials
- `ab_tests` - Test configurations
- `campaign_analytics` - Performance data
- `audit_logs` - Activity logs

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Guide](https://supabase.com/docs)
- [AI SDK Documentation](https://sdk.vercel.ai)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

## 🤝 Contributing

Guidelines for contributors:
1. Follow existing code patterns
2. Use TypeScript for type safety
3. Validate all inputs with Zod
4. Write descriptive commit messages
5. Test changes before pushing

## 📞 Support

For issues or questions:
1. Check TESTING_GUIDE.md for troubleshooting
2. Review FEATURES.md for capabilities
3. Check API documentation above
4. Review console logs for errors

## 📄 License

This project is proprietary and confidential.
