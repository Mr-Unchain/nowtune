# NowTune – Music Activity SNS

NowTune is a small social network for music lovers.  
Users can:

- Share **posts** about tracks (with comments).
- Share lightweight **listening activities** (“I'm now listening to this track”).
- Browse a **timeline** that mixes posts and listening activities from people they follow.

This document defines the initial MVP specification.

---

## 1. Goals

- Provide a simple feed of what friends are listening to and posting about.
- Make it easy to share “now playing” without requiring a full post.
- Keep the architecture simple enough for a solo developer project.

Non-goals for the MVP:

- No full-featured chat.
- No complex recommendation engines.
- No deep integration with multiple external music services (Spotify/Apple Music/etc).
  - MVP only supports manual track input or simple URL-based track registration.

---

## 2. Core Concepts

There are two main types of activities:

1. **Post**
   - Track + comment.
   - Example: “This is my rainy-day City Pop pick of the day.”

2. **Listening Activity**
   - “I'm currently listening to this track.”
   - Lightweight, can be created with one click.
   - Times out automatically after a period (e.g., 1 hour).

The timeline mixes these two activity types in reverse chronological order.

---

## 3. Tech Stack (MVP)

- **Framework**: Next.js (App Router, TypeScript)
- **UI**: React + Tailwind CSS
- **Database**: PostgreSQL (Supabase or Neon recommended)
- **Auth**: Email/password (Supabase Auth or simple custom solution)
- **Deployment**: Vercel + managed PostgreSQL
- **ORM**: Drizzle ORM (recommended) or raw SQL

The implementation details (folder structure, ORM choice, etc.) may be adjusted by the implementer as long as behavior matches this spec.

---

## 4. Entities & Data Model

### 4.1 User

Fields:

- `id` (PK)
- `name` (string, unique)
- `display_name` (string, optional)
- `icon_url` (string, optional)
- `bio` (string, optional)
- `created_at`
- `updated_at`

### 4.2 Track

Fields:

- `id` (PK)
- `title` (string)
- `artist` (string)
- `service` (string; optional — e.g., "youtube", "spotify")
- `service_track_id` (string; optional)
- `url` (string; optional)
- `thumbnail_url` (string; optional)
- `duration_ms` (integer; optional)
- `created_at`

### 4.3 Post

Fields:

- `id` (PK)
- `user_id` (FK → users.id)
- `track_id` (FK → tracks.id)
- `comment_text` (string)
- `created_at`

### 4.4 ListeningActivity

Fields:

- `id` (PK)
- `user_id` (FK → users.id)
- `track_id` (FK → tracks.id)
- `started_at`
- `ended_at` (nullable)
- `source_type` (default: `"manual"`)
- `created_at`

Rules:

- A user can have many historical listening activities.
- Only one active listening activity at a time (i.e., only one row with `ended_at = NULL`).
- Backend may auto-end old activities (e.g., after 1 hour).

### 4.5 Like

Fields:

- `id` (PK)
- `user_id` (FK)
- `post_id` (FK)
- `created_at`

### 4.6 Follow

Fields:

- `id` (PK)
- `follower_id` (FK → users.id)
- `followee_id` (FK → users.id)
- `created_at`

---

## 5. API Endpoints (MVP)

Authentication: all endpoints assume a signed-in user (via Supabase Auth or custom session).

### 5.1 Timeline

**GET `/api/timeline`**

Query:

- `type`: `"all"` | `"post"` | `"listening"` (default: `"all"`)
- Pagination params (`limit`, `cursor` etc.) as needed

Returns mixed list of:

- post items
- listening activity items

Ordered by `created_at DESC`.

### 5.2 Posts

**POST `/api/posts`**

Body:

- `track`:
  - either `track_id`, or
  - track payload to create new track
- `comment_text`

Behavior:

- Create track if needed.
- Create post.
- Return created post with embedded user & track.

### 5.3 Listening Activities

**POST `/api/listening/start`**

Body:

- `track`: same format as posts

Behavior:

- End any existing active listening activity.
- Create a new one with `ended_at = NULL`.

**POST `/api/listening/stop`**

- Ends current active listening activity (if any).
- Returns updated activity or success.

### 5.4 Likes

**POST `/api/posts/:id/like`**

- Toggle like state.
- Return new like count and user’s like status.

### 5.5 Follow

**POST `/api/users/:id/follow`**

- Toggle follow/unfollow.
- Return the new following status.

### 5.6 Profile

**GET `/api/users/:id`**

Returns:

- Basic user info
- Recent posts
- Recent listening activities (compact list)

---

## 6. Pages / UI (MVP)

### 6.1 `/` – Timeline

- Mixed feed of posts + listening activities  
- Tabs:
  - All
  - Posts
  - Listening
- Each item card shows:
  - User info
  - Track info
  - Comment (if post)
  - Timestamp
  - Like button (for posts)

### 6.2 `/post` – Create Post

- Track selector (manual or URL input)
- Comment text area

### 6.3 `/listening` – Listening Controls

- Start Listening (choose track)
- Stop Listening (if active)

### 6.4 `/profile/[id]`

- User info
- Follow button
- Recent posts
- Recent listening activities

---

## 7. Milestones

1. User auth & session
2. Models & DB schema
3. Core API endpoints
4. Timeline page
5. Post & Listening creation pages
6. Profile page
7. Basic Tailwind styling

---

