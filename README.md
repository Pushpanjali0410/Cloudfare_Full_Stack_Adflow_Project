# AdFlow - Multi-Platform Ad Campaign Manager

A comprehensive SaaS platform for managing and optimizing ad campaigns across 8+ platforms from a single dashboard. Built with Next.js 16, React 19, and designed for Cloudflare Workers backend.

## 🚀 Features

### Core Functionality
- **Multi-Platform Support**: Manage campaigns on Meta, Google Ads, TikTok, LinkedIn, Pinterest, Snapchat, Twitter/X, and Reddit
- **Unified Dashboard**: Single interface to view and manage all campaigns
- **Campaign Management**: Create, edit, pause, and archive campaigns
- **Template System**: Save and reuse campaign templates for faster setup
- **Campaign Duplication**: Clone campaigns to quickly create variations

### Intelligence Features
- **AI-Powered Copy Generation**: Generate platform-optimized ad copy with variations
- **Smart Retry Mechanism**: Automatic retry logic with exponential backoff for failed API calls
- **Fallback Platform Support**: Automatically route ads to fallback platforms if primary fails
- **Creative Auto-Formatting**: Adapt media and copy to platform specifications

### Analytics & Reporting
- **Unified Analytics Dashboard**: Track performance across all platforms
- **Platform-Specific Metrics**: CTR, CPC, CPM, Conversion Rate, ROAS
- **Real-Time Performance Data**: Mock data with realistic metrics
- **Campaign Comparison**: Compare performance across platforms and campaigns

### Authentication & Security
- **OAuth Integration**: Connect platforms securely via OAuth
- **JWT-Based Sessions**: Secure authentication with token-based sessions
- **Encrypted Token Storage**: Platform tokens stored securely
- **User Management**: Account settings and profile management

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Vercel (Frontend)               │
│  ┌───────────────────────────────────┐  │
│  │  Next.js 16 App Router            │  │
│  │  React 19 + shadcn/ui Components  │  │
│  │  Tailwind CSS v4                  │  │
│  └───────────────────────────────────┘  │
└────────────┬────────────────────────────┘
             │ HTTPS
             ▼
┌─────────────────────────────────────────┐
│   Cloudflare Workers (Backend API)      │
│  ┌───────────────────────────────────┐  │
│  │  REST API Endpoints                │  │
│  │  Authentication Routes             │  │
│  │  Campaign Management               │  │
│  │  Platform Adapters                 │  │
│  │  Analytics Engine                  │  │
│  └───────────────────────────────────┘  │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│    Cloudflare D1 (SQLite Database)      │
│  ┌───────────────────────────────────┐  │
│  │  Users & Auth                      │  │
│  │  Campaigns & Variants              │  │
│  │  Platform Connections              │  │
│  │  Analytics Data                    │  │
│  │  Templates                         │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

## 🎯 Supported Platforms

| Platform | Icon | Status |
|----------|------|--------|
| Meta (Facebook/Instagram) | 📘 | ✅ Supported |
| Google Ads | 🔍 | ✅ Supported |
| TikTok Ads | 🎵 | ✅ Supported |
| LinkedIn Ads | 💼 | ✅ Supported |
| Pinterest Ads | 📌 | ✅ Supported |
| Snapchat Ads | 👻 | ✅ Supported |
| Twitter/X Ads | 𝕏 | ✅ Supported |
| Reddit Ads | 🤖 | ✅ Supported |

## 📦 Tech Stack

### Frontend
```json
{
  "react": "^19",
  "next": "16.2.0",
  "tailwindcss": "^4.2.0",
  "lucide-react": "^0.564.0",
  "zod": "^3.24.1",
  "react-hook-form": "^7.54.1",
  "swr": "2.4.1",
  "ai": "6.0.168",
  "sonner": "^1.7.1"
}
```

### Backend Stack
- Cloudflare Workers
- Cloudflare D1 (SQLite)
- Cloudflare KV (Caching)
- TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/adflow.git
   cd adflow
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   - Navigate to http://localhost:3000
   - Demo login: `demo@example.com` / `demo123`

### Available Pages

- **Dashboard** (`/dashboard`): Campaign overview and statistics
- **Campaigns** (`/campaigns`): Manage all campaigns
- **Create Campaign** (`/campaigns/new`): Create new campaign
- **Analytics** (`/analytics`): Performance dashboard
- **Templates** (`/templates`): Saved campaign templates
- **Settings** (`/settings`): Platform connections and account settings

## 🔧 API Routes

### Authentication
- `POST /api/auth/login` - Login with credentials

### Campaigns
- `GET /api/campaigns` - Fetch all campaigns (paginated)
- `POST /api/campaigns` - Create new campaign
- `POST /api/campaigns/publish` - Publish campaign with retry logic

### Platform Management
- `GET /api/platforms/accounts` - Fetch connected platforms
- `POST /api/platforms/accounts` - Initiate platform connection

### AI & Copy
- `POST /api/ai/generate-copy` - Generate AI ad copy

### Analytics
- `GET /api/analytics` - Fetch campaign analytics

### Templates
- `GET /api/templates` - Fetch all templates
- `POST /api/templates` - Create new template

## 🎨 UI Components

The project uses shadcn/ui components:
- Buttons, Inputs, Cards
- Badges, Alerts, Dialogs
- Forms, Tabs, Dropdowns
- Charts (via Recharts)
- And more...

## 📊 Data Models

### Campaign
```typescript
{
  id: string;
  userId: string;
  name: string;
  objective: 'awareness' | 'consideration' | 'conversion' | 'engagement';
  budget: number;
  status: 'draft' | 'active' | 'paused' | 'archived' | 'completed';
  platforms: PlatformType[];
  startDate: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

### AdVariant
```typescript
{
  id: string;
  campaignId: string;
  platform: PlatformType;
  headline: string;
  description: string;
  callToAction: string;
  mediaUrl?: string;
  landingUrl: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Quick Deploy to Vercel

```bash
vercel deploy
```

### Deploy Backend to Cloudflare

```bash
wrangler deploy
```

## 🔐 Security Features

- ✅ JWT-based authentication
- ✅ OAuth 2.0 platform integration
- ✅ Encrypted token storage
- ✅ CORS protection
- ✅ Input validation with Zod
- ✅ Rate limiting ready
- ✅ SQL injection prevention

## 📈 Performance Features

- ✅ Server-side rendering with Next.js
- ✅ SWR for client-side caching
- ✅ Cloudflare KV for caching
- ✅ Database query optimization
- ✅ Code splitting
- ✅ Image optimization

## 🛠️ Development

### Project Structure
```
adflow/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Redirect to dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard components
│   ├── campaigns/         # Campaign components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utilities
│   ├── types.ts          # TypeScript types
│   ├── constants.ts      # App constants
│   └── utils.ts          # Helper functions
├── public/               # Static assets
└── styles/               # Additional styles
```

### Scripts
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🧪 Testing

The project includes mock APIs for testing:
- Login with any credentials (demo@example.com for demo)
- Mock campaign data with realistic metrics
- Mock analytics with calculated KPIs
- Mock platform connections

## 📝 TypeScript

The entire codebase is written in TypeScript for type safety:
- Strict mode enabled
- Full type coverage for APIs
- Zod schemas for runtime validation
- Type-safe component props

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)

## 🐛 Troubleshooting

### Dev Server Won't Start
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Port Already in Use
```bash
pnpm dev -p 3001  # Use different port
```

### Build Errors
```bash
pnpm clean
pnpm install
pnpm build
```

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, please open an issue or contact the development team.

---

**Built with ❤️ using Next.js, React, and Cloudflare**
