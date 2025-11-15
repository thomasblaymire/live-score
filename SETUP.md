# Live Score Setup Guide

## Prerequisites

- **Node.js** 18+ and **pnpm** installed
- **PostgreSQL** database (optional - only for predictions/favorites)
- **API Keys** (required):
  - API-Football (RapidAPI)
  - NewsAPI
  - Supabase

---

## Quick Start (5 minutes)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Get API Keys

#### API-Football (Required)
1. Go to https://rapidapi.com/api-sports/api/api-football
2. Sign up for free (100 requests/day)
3. Subscribe to the free tier
4. Copy your RapidAPI key

#### NewsAPI (Required)
1. Go to https://newsapi.org/
2. Sign up for free (100 requests/day)
3. Copy your API key

#### Supabase (Required for Auth)
1. Go to https://supabase.com/
2. Create a new project
3. Go to Settings → API
4. Copy the URL and anon key

### 3. Configure Environment Variables

#### Backend (apps/api)

```bash
cd apps/api
cp .env.example .env
```

Edit `apps/api/.env`:

```bash
PORT=3001

# Database (optional - only for predictions/favorites)
DATABASE_URL="postgresql://user:password@localhost:5432/livescore"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_KEY="your-service-role-key"

# API-Football (RapidAPI) - REQUIRED
FOOTBALL_API_TOKEN="your-rapidapi-key-here"
FOOTBALL_API_URL="https://api-football-v1.p.rapidapi.com/v3"
FOOTBALL_API_HOST="api-football-v1.p.rapidapi.com"

# NewsAPI - REQUIRED
FOOTBALL_NEWS_API_KEY="your-newsapi-key-here"

# Sentry (optional)
SENTRY_DSN=""

# CORS
CLIENT_URL="http://localhost:3000"
```

#### Frontend (apps/web)

```bash
cd apps/web
cp .env.example .env.local
```

Edit `apps/web/.env.local`:

```bash
# API Backend
NEXT_PUBLIC_API_URL="http://localhost:3001"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

### 4. Start Development Servers

#### Option 1: Start All Services (Recommended)

From the root directory:

```bash
pnpm dev
```

This starts:
- Web app: http://localhost:3000
- API server: http://localhost:3001

#### Option 2: Start Services Individually

**Terminal 1 - API:**
```bash
cd apps/api
pnpm dev
```

**Terminal 2 - Web:**
```bash
cd apps/web
pnpm dev
```

### 5. Open the App

Visit: http://localhost:3000

---

## Testing the Integration

### Test API Endpoints Directly

```bash
# Test leagues endpoint
curl http://localhost:3001/api/leagues

# Test news endpoint
curl http://localhost:3001/api/news

# Test fixtures endpoint (today's matches)
curl "http://localhost:3001/api/fixtures-all/date?start=$(date -u +%Y-%m-%dT00:00:00.000Z)&end=$(date -u +%Y-%m-%dT23:59:59.999Z)"
```

### Expected Behavior

1. **Homepage** should load showing:
   - Top Competitions (left sidebar)
   - Latest News (right sidebar)
   - Today's Fixtures (center)

2. **If no data shows:**
   - Check browser console for errors
   - Check API logs in terminal
   - Verify API keys are correct

3. **Common Issues:**
   - **Empty news**: Check `FOOTBALL_NEWS_API_KEY`
   - **Empty leagues**: Check `FOOTBALL_API_TOKEN`
   - **CORS errors**: Verify `CLIENT_URL` in API `.env`

---

## Database Setup (Optional)

Only needed if you want predictions and favorites features.

### 1. Create PostgreSQL Database

```bash
createdb livescore
```

### 2. Update DATABASE_URL

Edit `apps/api/.env`:

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/livescore"
```

### 3. Run Migrations

```bash
cd apps/api
pnpm db:push
```

---

## Useful Commands

### Development

```bash
pnpm dev              # Start all dev servers
pnpm build            # Build all apps
pnpm lint             # Lint all apps
pnpm type-check       # TypeScript check
pnpm test             # Run unit tests
pnpm test:e2e         # Run E2E tests
```

### Database

```bash
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to DB (dev)
pnpm db:migrate       # Run migrations (prod)
pnpm db:studio        # Open Prisma Studio GUI
```

### Individual Apps

```bash
# Web app
cd apps/web
pnpm dev              # Start Next.js dev server
pnpm test             # Run Vitest tests
pnpm test:e2e         # Run Playwright tests

# API app
cd apps/api
pnpm dev              # Start Express dev server
pnpm build:prod       # Production build
```

---

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed system design.

**Key Points:**
- **Frontend**: Next.js 15 (Server Components)
- **Backend**: Express.js API proxy
- **Data Sources**:
  - API-Football → Live scores, fixtures, leagues, teams
  - NewsAPI → Football news
  - PostgreSQL → User predictions, favorites (optional)
- **Caching**: In-memory cache (5-15 min TTL)

---

## API Rate Limits

### Free Tiers

| API | Free Tier | Notes |
|-----|-----------|-------|
| API-Football | 100 req/day | Enough for development |
| NewsAPI | 100 req/day | Enough for development |

### Caching Strategy

The API uses aggressive caching to stay within free tier limits:

- Live scores: 2 min cache
- Fixtures: 5 min cache
- Leagues: 10 min cache
- Teams: 30 min cache
- News: 15 min cache

### For Production

Consider upgrading to paid tiers:
- **API-Football**: $10/month for 10,000 requests
- **NewsAPI**: $449/month for commercial use

---

## Troubleshooting

### "No API key" Error

**Problem:** API returns 401/403 errors

**Solution:**
1. Check `FOOTBALL_API_TOKEN` in `apps/api/.env`
2. Verify you've subscribed to API-Football on RapidAPI
3. Check RapidAPI dashboard for remaining quota

### "No data showing" on Homepage

**Problem:** Components show "No data available"

**Solution:**
1. Check browser console for errors
2. Check API terminal for request logs
3. Test API endpoints directly (see Testing section)
4. Verify both servers are running

### CORS Errors

**Problem:** Browser shows CORS policy errors

**Solution:**
1. Check `CLIENT_URL` in `apps/api/.env` matches frontend URL
2. Restart API server after changing `.env`

### Database Connection Errors

**Problem:** Prisma errors on startup

**Solution:**
1. Database is **optional** for basic functionality
2. If not using predictions/favorites, ignore these errors
3. If using, verify PostgreSQL is running and `DATABASE_URL` is correct

---

## Next Steps

1. ✅ Get API keys configured
2. ✅ Start both servers
3. ✅ Verify data loads on homepage
4. 🔜 Implement search functionality
5. 🔜 Add league standings page
6. 🔜 Implement real-time score updates

---

## Need Help?

- **Architecture Questions**: See [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Refactor Plan**: See [REFACTOR_PLAN.md](./REFACTOR_PLAN.md)
- **Issues**: Create a GitHub issue
