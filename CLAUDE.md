# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev          # Start Next.js dev server

# Build & Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint

# Database (Drizzle ORM)
npm run db:generate  # Generate migrations from schema changes
npm run db:migrate   # Apply pending migrations
npm run db:push      # Push schema directly to DB (dev only)
npm run db:studio    # Open Drizzle Studio (visual DB browser)
npm run db:seed      # Seed initial sample data
```

No test framework is currently configured. Vitest + Playwright are planned for Phase 6.

## Architecture

**NowTune** is a music social network MVP where users share what they're currently listening to and post about tracks they love.

### Stack

- **Next.js App Router** (React 19, React Compiler enabled)
- **TypeScript** with strict mode, path alias `@/*` → `./src/*`
- **Tailwind CSS v4** — dark theme (slate-950/slate-900 backgrounds, indigo accents)
- **Drizzle ORM** + **postgres.js** driver against **Supabase PostgreSQL**
- **Supabase Auth** (SSR package) — not yet wired up

### Data Layer Status

The app has two parallel data layers:

| Layer | Location | Status |
|-------|----------|--------|
| In-memory mock | `src/lib/data.ts` | Active (used by all API routes now) |
| Drizzle ORM | `src/lib/db/` | Schema complete, not yet connected to API routes |

The current viewer is hardcoded as `viewerId = "u1"` in `src/lib/data.ts`. When auth is implemented, this must be replaced with the authenticated user's ID from Supabase.

### Key Directories

- `src/app/` — Next.js App Router pages and API routes
- `src/app/api/` — REST API endpoints (timeline, posts, listening, users, likes, follows)
- `src/lib/db/schema.ts` — Complete Drizzle ORM schema (6 tables: users, tracks, posts, listening_activities, likes, follows)
- `src/lib/db/client.ts` — DB client (reads `DATABASE_URL` from `.env.local`)
- `src/lib/data.ts` — In-memory data layer to be replaced with DB queries
- `src/config/strings.ts` — All UI text in Japanese

### UI Language

All user-facing strings are in **Japanese** and centralized in `src/config/strings.ts`. Add new strings there rather than inline.

### API Routes (all currently use in-memory mock)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/timeline` | GET | Mixed posts + listening activities feed |
| `/api/posts` | POST | Create a post (track + comment) |
| `/api/posts/[id]/like` | POST | Toggle like |
| `/api/listening/start` | POST | Start a listening activity |
| `/api/listening/stop` | POST | Stop a listening activity |
| `/api/users/[id]` | GET | User profile with activity history |
| `/api/users/[id]/follow` | POST | Toggle follow/unfollow |

### Environment Variables

Copy `.env.example` to `.env.local`:
```
DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[key]
```

### Development Roadmap (from LAUNCH_PLAN.md)

1. **Phase 1** ✓ — Database schema + Drizzle setup
2. **Phase 2** — Supabase Auth (signup/login)
3. **Phase 3** — Wire API routes to DB (replace `src/lib/data.ts`)
4. **Phase 4** — Frontend forms → API integration (currently 0%)
5. **Phase 5** — UI/UX polish (optimistic updates, relative timestamps, responsive)
6. **Phase 6** — Testing (Vitest + Playwright)
7. **Phase 7** — Deploy to Vercel
