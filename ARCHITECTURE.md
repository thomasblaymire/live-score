# Live Score Application Architecture

> **Last Updated:** 2025-11-15
> **Status:** v2.0 TurboRepo Refactor - In Progress (40% Complete)

## Table of Contents
- [Overview](#overview)
- [Architecture Diagram](#architecture-diagram)
- [Technology Stack](#technology-stack)
- [Data Flow](#data-flow)
- [Monorepo Structure](#monorepo-structure)
- [API Design Decisions](#api-design-decisions)
- [Authentication](#authentication)
- [Caching Strategy](#caching-strategy)
- [Deployment](#deployment)

---

## Overview

Live Score is a full-stack football live score application built with modern web technologies. The application provides real-time football scores, league standings, team information, user predictions, and live chat features.

**Live URL:** https://currentscore.live/

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js 15)                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  • App Router (Server Components)                            │  │
│  │  • Tailwind CSS                                              │  │
│  │  • TypeScript                                                │  │
│  │  • Vitest (Unit Tests)                                       │  │
│  │  • Playwright (E2E Tests - 5 browsers)                       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  Components:                                                        │
│  • Competitions List                                                │
│  • ScoreBoard (Live/Finished/Upcoming)                             │
│  • News Feed                                                        │
│  • League Standings                                                 │
│  • Search                                                           │
│  • Auth Modal                                                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             │ API Client
                             │ (Type-safe HTTP)
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      API Layer (Express.js)                         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Middleware:                                                  │  │
│  │  • CORS                                                       │  │
│  │  • Helmet (Security)                                         │  │
│  │  • Rate Limiting                                             │  │
│  │  • Supabase JWT Verification                                 │  │
│  │  • Error Tracking (Sentry)                                   │  │
│  │  • In-Memory Cache (5-15 min TTL)                            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  Routes:                                                            │
│  • /api/fixtures         (proxies API-Football)                    │
│  • /api/leagues          (proxies API-Football)                    │
│  • /api/teams            (proxies API-Football)                    │
│  • /api/search           (proxies API-Football)                    │
│  • /api/news             (proxies NewsAPI)                         │
│  • /api/predictions      (Prisma - protected)                      │
│  • /api/favourites       (Prisma - protected)                      │
└──────────────┬────────────────────────────┬─────────────────────────┘
               │                            │
               │                            │
               ▼                            ▼
┌──────────────────────────┐   ┌───────────────────────────────────┐
│   Database (PostgreSQL)  │   │      External APIs                │
│   via Prisma ORM         │   │                                   │
│                          │   │  ┌─────────────────────────────┐ │
│  User Data Only:         │   │  │  API-Football (RapidAPI)    │ │
│  ┌────────────────────┐  │   │  │  ─────────────────────────  │ │
│  │ • Users            │  │   │  │  • Live Scores              │ │
│  │ • Predictions      │  │   │  │  • Fixtures                 │ │
│  │ • Favorites        │  │   │  │  • League Standings         │ │
│  │ • Chat Messages    │  │   │  │  • Team/Player Info         │ │
│  └────────────────────┘  │   │  │  • Head-to-Head Stats       │ │
│                          │   │  │  • Odds                     │ │
│  Auth handled by:        │   │  └─────────────────────────────┘ │
│  Supabase Auth           │   │                                   │
│  (External Service)      │   │  ┌─────────────────────────────┐ │
│                          │   │  │  NewsAPI                    │ │
└──────────────────────────┘   │  │  ─────────────────────────  │ │
                               │  │  • Football News            │ │
                               │  │  • Team News                │ │
                               │  └─────────────────────────────┘ │
                               └───────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     Real-Time Layer (Socket.io)                     │
│  • WebSocket connections                                            │
│  • Room management (match-specific)                                 │
│  • Score update broadcasting                                        │
│  • Live chat functionality                                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend (`apps/web`)
| Layer | Technology | Reason |
|-------|------------|--------|
| **Framework** | Next.js 15 + React 19 | Modern, App Router, Server Components, better performance |
| **Styling** | Tailwind CSS | Smaller bundle vs Chakra UI, utility-first |
| **Type Safety** | TypeScript | Full type safety across codebase |
| **Unit Testing** | Vitest | Fast, modern, ESM-native |
| **E2E Testing** | Playwright | Cross-browser (Chrome, Firefox, Safari, Edge, Mobile) |
| **Fonts** | DM Sans (Google Fonts) | Clean, readable |

### Backend (`apps/api`)
| Layer | Technology | Reason |
|-------|------------|--------|
| **Framework** | Express.js + TypeScript | Lightweight, flexible, proven |
| **Database ORM** | Prisma | Type-safe queries, migrations, excellent DX |
| **Database** | PostgreSQL | Reliable, scalable, rich feature set |
| **Auth** | Supabase Auth | Free tier, built-in OAuth, JWT verification |
| **Security** | Helmet + CORS | Standard security headers |
| **Error Tracking** | Sentry | Production error monitoring |
| **Build Tool** | esbuild | Fast production bundling |
| **Real-time** | Socket.io | WebSocket support, room management |

### Shared Packages (`packages/`)
- **`@repo/database`** - Prisma client, schemas, migrations
- **`@repo/eslint-config`** - Shared ESLint + Prettier rules
- **`@repo/typescript-config`** - Shared TypeScript configuration

### Infrastructure
| Component | Technology |
|-----------|------------|
| **Monorepo** | TurboRepo + pnpm | Fast builds, efficient caching |
| **CI/CD** | GitHub Actions (planned) | Automated testing & deployment |
| **Hosting - Web** | Vercel (planned) | Next.js optimized |
| **Hosting - API** | Fly.io | Low latency, global edge |
| **Database Host** | Supabase / Railway | Managed PostgreSQL |

---

## Data Flow

### Live Scores Flow
```
1. User visits homepage
2. Next.js Server Component fetches from /api/fixtures
3. API checks in-memory cache (5 min TTL)
4. If cache miss → fetch from API-Football
5. Transform response to frontend format
6. Cache response
7. Return to frontend
8. Client-side updates via Socket.io (future)
```

### User Prediction Flow
```
1. User makes prediction (authenticated)
2. Supabase JWT verified by API middleware
3. Prediction stored in PostgreSQL via Prisma
4. Response returned to user
5. Real-time update via Socket.io (future)
```

---

## Monorepo Structure

```
live-score/
├── apps/
│   ├── web/              # Next.js 15 frontend
│   │   ├── app/          # App Router pages
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities, API client
│   │   ├── tests/        # Vitest unit tests
│   │   └── e2e/          # Playwright E2E tests
│   │
│   ├── api/              # Express.js backend
│   │   ├── src/
│   │   │   ├── routes/   # API endpoints
│   │   │   ├── services/ # Business logic (API-Football, etc.)
│   │   │   ├── middleware/ # Auth, rate limiting
│   │   │   └── helpers/  # Utilities
│   │   └── dist/         # Built output
│   │
│   ├── admin/            # Admin dashboard (archived)
│   ├── cli/              # CLI tools (archived)
│   └── legacy/           # Legacy code (archived)
│
├── packages/
│   ├── database/         # Prisma schema, client
│   ├── eslint-config/    # Shared linting
│   └── typescript-config/ # Shared TS config
│
├── turbo.json            # TurboRepo config
├── pnpm-workspace.yaml   # pnpm workspaces
├── ARCHITECTURE.md       # This file
└── REFACTOR_PLAN.md      # Detailed refactor plan
```

---

## API Design Decisions

### Why Not Store Live Data in Database?

**Problem with Database Approach:**
- ❌ Constantly out of sync (scores change every minute)
- ❌ Requires complex sync jobs/webhooks
- ❌ Database maintenance overhead
- ❌ Still need external API to update it
- ❌ Stale data issues

**Direct API Proxy Approach (Current):**
- ✅ Always fresh data
- ✅ Simpler architecture
- ✅ No sync jobs needed
- ✅ API layer provides caching, auth, transformation
- ✅ Database reserved for user-specific data

### What Goes in Database vs API Proxy?

| Data Type | Storage | Reason |
|-----------|---------|--------|
| **Live Scores** | API Proxy | Changes constantly, always needs fresh data |
| **Fixtures** | API Proxy | Updated frequently, external source of truth |
| **League Standings** | API Proxy | Updated after matches, no custom logic needed |
| **Team/Player Info** | API Proxy | Rarely changes, easy to cache |
| **News** | API Proxy | Always fresh from NewsAPI |
| **User Predictions** | Database | User-specific, needs persistence |
| **Favorites** | Database | User-specific, needs querying |
| **Chat Messages** | Database | User-generated, needs history |
| **User Accounts** | Supabase | Managed auth service |

---

## Authentication

### Supabase Auth Flow

```
1. User signs up/logs in (Google OAuth, GitHub, Email)
2. Supabase returns JWT access token
3. Frontend stores token in httpOnly cookie
4. All protected requests include JWT in Authorization header
5. API middleware verifies JWT with Supabase public key
6. User ID extracted from JWT for database queries
```

**Protected Endpoints:**
- `/api/predictions` - User predictions
- `/api/favourites` - User favorites

**Public Endpoints:**
- `/api/fixtures` - Live scores
- `/api/leagues` - Standings
- `/api/teams` - Team info
- `/api/news` - Football news
- `/api/search` - Search functionality

---

## Caching Strategy

### In-Memory Cache (Current)
- **Implementation:** Simple JavaScript Map/Object
- **TTL:** 5-15 minutes (varies by endpoint)
- **Cache Keys:** URL-based
- **Invalidation:** Time-based expiration

**Cache Durations:**
| Endpoint | TTL | Reason |
|----------|-----|--------|
| `/api/fixtures` (live) | 2 min | Scores change frequently |
| `/api/fixtures` (finished) | 15 min | Historical data |
| `/api/leagues` | 10 min | Standings update after matches |
| `/api/teams` | 30 min | Rarely changes |
| `/api/news` | 15 min | Updated regularly |

### Future: Redis Cache (Planned)
- Shared cache across API instances
- Pub/Sub for cache invalidation
- Better memory management
- Persistence across restarts

---

## Deployment

### Current Setup
- **Development:** Local development with pnpm
- **Staging:** Not yet configured
- **Production:** Currently on currentscore.live (legacy)

### Planned Deployment (v2.0)

**Frontend (apps/web):**
- **Platform:** Vercel
- **URL:** currentscore.live
- **Features:**
  - Automatic deployments from main branch
  - Preview deployments for PRs
  - Edge runtime for Server Components
  - Image optimization

**Backend (apps/api):**
- **Platform:** Fly.io
- **URL:** api.currentscore.live
- **Features:**
  - Global edge locations
  - Auto-scaling
  - Health checks
  - Zero-downtime deployments

**Database:**
- **Platform:** Supabase or Railway
- **Type:** Managed PostgreSQL
- **Backups:** Daily automated backups
- **Connection Pooling:** PgBouncer

---

## Development Workflow

### Commands

**Root level (runs all):**
```bash
pnpm dev           # Start all dev servers
pnpm build         # Build all apps
pnpm test          # Run unit tests
pnpm test:e2e      # Run E2E tests
pnpm lint          # Lint all apps
pnpm type-check    # TypeScript check
```

**Web app:**
```bash
cd apps/web
pnpm dev           # Start Next.js dev server
pnpm test          # Run Vitest tests
pnpm test:e2e      # Run Playwright tests
```

**API app:**
```bash
cd apps/api
pnpm dev           # Start Express dev server
pnpm build:prod    # Production build with esbuild
```

**Database:**
```bash
pnpm db:generate   # Generate Prisma client
pnpm db:push       # Push schema to DB (dev)
pnpm db:migrate    # Run migrations (prod)
pnpm db:studio     # Open Prisma Studio GUI
```

---

## Performance Considerations

### Frontend Optimizations
- ✅ Server Components for zero JS bundle (where possible)
- ✅ Image optimization with Next.js Image
- ✅ Font optimization with next/font
- ✅ Tailwind CSS JIT compilation (smaller CSS)
- 🔜 Code splitting per route
- 🔜 Lazy loading for heavy components

### Backend Optimizations
- ✅ In-memory caching (reduces API calls)
- ✅ esbuild for fast production builds
- ✅ Helmet security headers (cached by browser)
- 🔜 Redis caching (multi-instance support)
- 🔜 Database connection pooling
- 🔜 CDN for static assets

### API Rate Limiting
- **API-Football Free Tier:** 100 requests/day
- **API-Football Paid Tier:** 10,000 requests/month ($10)
- **Current Strategy:** Aggressive caching to stay within limits
- **Future:** Upgrade to paid tier for production

---

## Security

### Current Measures
- ✅ Helmet.js (security headers)
- ✅ CORS configuration (whitelist only)
- ✅ Supabase JWT verification
- ✅ Rate limiting middleware
- ✅ Environment variables for secrets
- ✅ Sentry error tracking (no sensitive data logged)

### Planned Improvements
- 🔜 Request validation (Zod)
- 🔜 SQL injection prevention (Prisma handles this)
- 🔜 XSS protection (React handles this)
- 🔜 CSRF tokens for mutations
- 🔜 API key rotation strategy

---

## Testing Strategy

### Unit Tests (Vitest)
- Component rendering
- Utility functions
- API client methods
- **Current:** 26 tests passing

### E2E Tests (Playwright)
- User authentication flows
- Navigation
- Form submissions
- Cross-browser compatibility (5 browsers)
- Mobile viewport testing
- **Current:** 70 tests passing

### Integration Tests (Planned)
- API endpoint testing
- Database operations
- External API mocking

---

## Known Issues & Technical Debt

1. **API Endpoints Still Using Mocky.io**
   - Status: Being replaced with API-Football
   - Priority: High
   - ETA: Current sprint

2. **No Redis Caching**
   - Status: Using in-memory cache (single instance only)
   - Priority: Medium
   - ETA: Phase 6

3. **Legacy Code in Archive**
   - Status: Moved to `apps/legacy/`
   - Priority: Low
   - ETA: Delete after v2.0 launch

4. **Socket.io Needs Refactor**
   - Status: Basic implementation, no room management
   - Priority: High
   - ETA: Phase 6

---

## Future Enhancements

### Phase 1: Core Features (Current)
- ✅ TurboRepo monorepo setup
- ✅ Next.js 15 migration
- ✅ Supabase authentication
- 🔄 API-Football integration
- 🔜 Search functionality

### Phase 2: Real-Time Features
- 🔜 Live score updates (Socket.io)
- 🔜 Live chat per match
- 🔜 User presence indicators

### Phase 3: Advanced Features
- 🔜 User predictions leaderboard
- 🔜 Match notifications
- 🔜 Personalized news feed
- 🔜 Team/player statistics pages

### Phase 4: Performance & Scale
- 🔜 Redis caching
- 🔜 Database connection pooling
- 🔜 CDN integration
- 🔜 API response compression

---

## Architecture Decision Records (ADRs)

### ADR-001: TurboRepo vs Nx
**Decision:** Use TurboRepo
**Reason:** Simpler configuration, better Next.js integration, faster local builds, smaller learning curve
**Date:** 2024-11-10

### ADR-002: Tailwind CSS vs Chakra UI
**Decision:** Migrate to Tailwind CSS
**Reason:** Smaller bundle size, better performance, more control, modern utility-first approach
**Date:** 2024-11-10

### ADR-003: Prisma for User Data Only (Not Live Scores)
**Decision:** Use Prisma only for user-generated data, proxy external APIs for live data
**Reason:** Live scores change too frequently, database would be constantly stale, simpler to proxy
**Date:** 2025-11-15

### ADR-004: API-Football as Primary Data Source
**Decision:** Use API-Football (RapidAPI) for all football data
**Reason:** Most comprehensive, excellent docs, reliable, good free tier (100 req/day)
**Date:** 2025-11-15

### ADR-005: Supabase Auth
**Decision:** Use Supabase for authentication
**Reason:** Free tier, built-in OAuth, JWT verification, no vendor lock-in, easy integration
**Date:** 2024-11-12

---

## Contributing

When updating this architecture:
1. Update the relevant section
2. Update "Last Updated" date at the top
3. Add ADR if it's a major decision
4. Update diagrams if structure changes
5. Commit with message: `docs: update architecture - [what changed]`

---

## Questions / Clarifications

For questions about architectural decisions, see:
- `REFACTOR_PLAN.md` - Detailed implementation plan
- GitHub Issues - Ongoing discussions
- Team Slack - Quick questions

---

**Maintained by:** Development Team
**Review Frequency:** Every major release
**Next Review:** v2.0 Launch
