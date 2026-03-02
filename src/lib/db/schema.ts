import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

// ─── users ───────────────────────────────────────────────────────────────────
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  handle: text("handle").notNull().unique(),
  display_name: text("display_name"),
  icon_url: text("icon_url"),
  bio: text("bio"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── tracks ──────────────────────────────────────────────────────────────────
export const tracks = pgTable("tracks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  service: text("service"),
  service_track_id: text("service_track_id"),
  url: text("url"),
  thumbnail_url: text("thumbnail_url"),
  duration_ms: integer("duration_ms"),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

// ─── posts ───────────────────────────────────────────────────────────────────
export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    track_id: uuid("track_id")
      .notNull()
      .references(() => tracks.id, { onDelete: "cascade" }),
    comment_text: text("comment_text").notNull(),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("posts_user_id_idx").on(table.user_id),
    index("posts_created_at_idx").on(table.created_at),
  ],
);

// ─── listening_activities ────────────────────────────────────────────────────
export const listeningActivities = pgTable(
  "listening_activities",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    track_id: uuid("track_id")
      .notNull()
      .references(() => tracks.id, { onDelete: "cascade" }),
    started_at: timestamp("started_at", { withTimezone: true }).defaultNow().notNull(),
    ended_at: timestamp("ended_at", { withTimezone: true }),
    source_type: text("source_type").notNull().default("manual"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("listening_user_id_idx").on(table.user_id),
    index("listening_created_at_idx").on(table.created_at),
  ],
);

// ─── likes ───────────────────────────────────────────────────────────────────
export const likes = pgTable(
  "likes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    post_id: uuid("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("likes_user_post_idx").on(table.user_id, table.post_id),
  ],
);

// ─── follows ─────────────────────────────────────────────────────────────────
export const follows = pgTable(
  "follows",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    follower_id: uuid("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followee_id: uuid("followee_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("follows_pair_idx").on(table.follower_id, table.followee_id),
    index("follows_followee_idx").on(table.followee_id),
  ],
);
