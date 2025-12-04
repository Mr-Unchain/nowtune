# NowTune

NowTune is a small music-focused social network.  
You can share what you're listening to right now and your favorite tracks as posts, and browse a timeline of your friends' music-related activities.

This project is a personal/portfolio project built with **Next.js** and **PostgreSQL** (e.g., Supabase).

---

## Features (MVP)

- User sign up / sign in
- Timeline mixing:
  - **Posts** (track + comment)
  - **Listening activities** (“now listening”)
- One-click “Start Listening”
- Like posts
- Follow/unfollow users
- User profile page

More details in [`SPEC.md`](./SPEC.md).

---

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **UI**: Tailwind CSS
- **Database**: PostgreSQL (Supabase or Neon)
- **Auth**: Email/password (Supabase Auth recommended)
- **Deployment**: Vercel + managed Postgres

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm / pnpm / yarn
- PostgreSQL instance (Supabase recommended)

---

## 1. Create the project

If not already created:

```bash
npx create-next-app@latest nowtune --typescript
