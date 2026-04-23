# AdsSaaS Platform - Multi-Platform Ad Management System

A comprehensive SaaS platform for managing advertising campaigns across 16+ social media and ad networks with AI-powered optimization.

## 🚀 Features

### Core Features
- **Multi-Platform Support**: Meta, Google Ads, TikTok, LinkedIn, Twitter, Pinterest, Snapchat, Reddit, and more
- **Campaign Management**: Create, edit, duplicate, and delete campaigns across multiple platforms
- **Real-time Analytics**: Track impressions, clicks, conversions, CTR, and ROI
- **Platform Integrations**: Connect real API credentials for live campaign publishing

### AI-Powered Features
- **AI-Generated Ad Copy**: Automatically generate compelling ad copy using OpenAI/Claude
- **Budget Optimization**: AI recommends optimal budget allocation across platforms
- **Best Time-to-Post**: Predict optimal posting times based on audience analytics
- **A/B Testing**: Create and manage variants to test performance
- **Bulk Campaign Creation**: Import and create multiple campaigns at once

### Advanced Capabilities
- **Smart Campaign Duplication**: Copy campaigns and auto-format for different platforms
- **Comprehensive Analytics Dashboard**: Visualize performance across all platforms
- **User Settings & Profile Management**: Manage account and platform credentials
- **Audit Logging**: Track all campaign changes and actions
- **Role-Based Access**: Organize team access to campaigns and platforms

## 📋 Requirements

- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account (for database)
- OpenAI API key (for AI features)
- Platform API credentials (Meta, Google, TikTok, etc.)

## 🛠️ Installation

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd ads-saas
pnpm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AI Configuration
OPENAI_API_KEY=your_openai_key
AI_GATEWAY_API_KEY=your_ai_gateway_key

# Platform API Keys (optional for development)
META_ACCESS_TOKEN=your_meta_token
GOOGLE_ADS_API_KEY=your_google_key
TIKTOK_ACCESS_TOKEN=your_tiktok_token
```

### 3. Database Setup
```bash
# The SQL schema will be created in Supabase
# Use the SQL editor in your Supabase dashboard and paste the content from:
# scripts/01-create-schema.sql
```

### 4. Run Development Server
```bash
pnpm dev
```

Access the app at `http://localhost:3000`

## 📁 Project Structure

```
ads-saas/
├── app/
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── campaigns/      # Campaign management
│   │   ├── platforms/      # Platform integrations
│   │   ├── ai/            # AI features
│   │   └── analytics/     # Analytics endpoints
│   ├── dashboard/          # Dashboard pages
│   │   ├── campaigns/      # Campaign list and details
│   │   ├── create-campaign/ # Campaign creation
│   │   ├── platforms/      # Platform connections
│   │   ├── ai-features/    # AI tools
│   │   ├── ab-testing/     # A/B testing
│   │   ├── analytics/      # Analytics dashboard
│   │   └── settings/       # User settings
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── page.tsx            # Landing page
├── components/
│   ├── sidebar.tsx         # Navigation sidebar
│   ├── top-nav.tsx         # Top navigation bar
│   ├── campaign-card.tsx   # Campaign card component
│   └── ui/                 # shadcn/ui components
├── lib/
│   ├── auth.ts             # Authentication utilities
│   ├── supabase.ts         # Supabase client
│   ├── client-auth.ts      # Client-side auth
│   └── ai-actions.ts       # AI functions
└── scripts/
    └── 01-create-schema.sql # Database schema
```

## 🔑 Key Features Walkthrough

### 1. Authentication
- Sign up with email and password
- JWT-based session management
- Secure cookie storage

### 2. Campaign Management
- **Create**: New campaign with budget, platforms, objectives
- **Edit**: Modify campaign details and settings
- **Publish**: Send campaign to selected platforms
- **Duplicate**: Clone campaigns across platforms
- **Analytics**: View real-time performance metrics
- **Delete**: Remove campaigns safely with confirmation

### 3. Platform Integrations
- Connect OAuth credentials for each platform
- Manage multiple accounts per platform
- View connected platforms status
- Disconnect platforms anytime

### 4. AI Features Page
- **Generate Ad Copy**: Get AI-generated ad variations
- **Optimize Budget**: Receive budget allocation recommendations
- **Best Time to Post**: Identify optimal posting times
- **Bulk Actions**: Create multiple campaigns from templates

### 5. A/B Testing
- Create campaign variants
- Compare performance metrics
- Auto-optimize top performers
- Statistical significance calculations

### 6. Analytics Dashboard
- Platform-wide performance overview
- Campaign comparison charts
- ROI calculations
- Trend analysis

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/update-profile` - Update profile

### Campaigns
- `GET /api/campaigns` - List campaigns
- `POST /api/campaigns` - Create campaign
- `GET /api/campaigns/[id]` - Get campaign details
- `PUT /api/campaigns/[id]` - Update campaign
- `DELETE /api/campaigns/[id]` - Delete campaign
- `POST /api/campaigns/duplicate` - Duplicate campaign
- `POST /api/campaigns/publish` - Publish to platforms
- `POST /api/campaigns/bulk-create` - Create multiple campaigns

### Platforms
- `GET /api/platforms` - List available platforms
- `POST /api/platforms` - Connect new platform

### AI Features
- `POST /api/ai/generate-copy` - Generate ad copy
- `POST /api/ai/optimize-budget` - Get budget recommendations
- `POST /api/ai/best-time` - Get posting time recommendations
- `POST /api/ai/route` - Unified AI endpoint

### Analytics
- `GET /api/analytics` - Get overall analytics
- `GET /api/ab-testing` - Get A/B test results

## 🎨 Design System

- **Colors**: Blue primary, gray neutrals, green accents
- **Typography**: Geist Sans (headings & body), Geist Mono (code)
- **Components**: shadcn/ui with Tailwind CSS
- **Icons**: Lucide React
- **Responsive**: Mobile-first design

## 🧪 Testing

### Development Mode
Mock data is available for testing:
- `/api/campaigns/mock` - Mock campaigns
- `/api/platforms/mock` - Mock platforms

### Mock Campaigns
```json
[
  {
    "id": "camp-001",
    "name": "Summer Promotion 2024",
    "status": "active",
    "budget": 5000,
    "spent": 3200,
    "impressions": 125000,
    "clicks": 4500
  }
]
```

## 📚 Documentation

### Database Schema
See `scripts/01-create-schema.sql` for:
- users table
- campaigns table
- platform_credentials table
- campaign_analytics table
- ab_tests table
- audit_logs table

### Authentication Flow
1. User registers/logs in
2. JWT token issued
3. Token stored in localStorage
4. Included in Authorization header for API calls
5. Session maintained until logout

## 🚀 Deployment

### To Vercel
```bash
# Push to GitHub
git push origin main

# Connect to Vercel and deploy
vercel --prod
```

### Environment Variables
Set these in Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- All platform API keys

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Secure HTTP-only cookies (on production)
- Rate limiting on API endpoints
- SQL injection prevention with parameterized queries
- CORS configuration for API routes
- Row-level security on Supabase tables

## 🐛 Troubleshooting

### "Not authenticated" error
- Check if auth token is in localStorage
- Try logging in again
- Check browser console for errors

### Campaigns not showing
- Verify user is logged in
- Check Supabase connection
- Look at API response in Network tab

### AI features not working
- Verify OpenAI API key is set
- Check API rate limits
- Review error messages in console

### Platform integration failing
- Ensure API credentials are valid
- Check platform-specific rate limits
- Verify OAuth scopes are correct

## 📞 Support

For issues and feature requests, create an issue in the repository or contact support.

## 📄 License

MIT License - See LICENSE file for details

## 🎯 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced reporting and insights
- [ ] Team collaboration features
- [ ] White-label solution
- [ ] Native platform SDKs
- [ ] Advanced scheduling and automation
- [ ] Performance prediction models
- [ ] Influencer network integration
