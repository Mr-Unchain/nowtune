import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  users,
  tracks,
  posts,
  listeningActivities,
  likes,
  follows,
} from "./schema";

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set. Copy .env.example to .env.local and fill in values.");
    process.exit(1);
  }

  const client = postgres(url, { max: 1 });
  const db = drizzle(client);

  console.log("Seeding database...");

  // ── Users ────────────────────────────────────────────────────────────────
  const [u1, u2, u3, u4] = await db
    .insert(users)
    .values([
      {
        handle: "nowtune",
        display_name: "NowTune Prototype",
        bio: "Building a cozy feed for music lovers.",
      },
      { handle: "aikom", display_name: "Aiko Morita" },
      { handle: "kenji", display_name: "Kenji Yamato" },
      { handle: "sara", display_name: "Sara Ito" },
    ])
    .returning();

  console.log(`  Created ${4} users`);

  // ── Tracks ───────────────────────────────────────────────────────────────
  const [t1, t2, t3] = await db
    .insert(tracks)
    .values([
      {
        title: "Neon Skyline",
        artist: "Shibuya Echo",
        service: "YouTube",
        url: "https://youtube.com/watch?v=neon-skyline",
      },
      {
        title: "Blue Monday",
        artist: "New Order",
        service: "Spotify",
        url: "https://open.spotify.com/track/bluemonday",
      },
      {
        title: "Sunset Rollercoaster",
        artist: "Slow Waves",
        service: "Apple Music",
        url: "https://music.apple.com/slow-waves",
      },
    ])
    .returning();

  console.log(`  Created ${3} tracks`);

  // ── Posts ─────────────────────────────────────────────────────────────────
  const [p1] = await db
    .insert(posts)
    .values([
      {
        user_id: u2.id,
        track_id: t1.id,
        comment_text:
          "Rainy night soundtrack. The synths shimmer and the bass line is just perfect for a focus session.",
      },
      {
        user_id: u4.id,
        track_id: t3.id,
        comment_text: "Breezy guitar riffs. Anyone else into city pop this week?",
      },
    ])
    .returning();

  console.log(`  Created ${2} posts`);

  // ── Listening Activities ─────────────────────────────────────────────────
  await db.insert(listeningActivities).values([
    {
      user_id: u3.id,
      track_id: t2.id,
      source_type: "manual",
    },
  ]);

  console.log(`  Created ${1} listening activity`);

  // ── Likes ────────────────────────────────────────────────────────────────
  await db.insert(likes).values([{ user_id: u1.id, post_id: p1.id }]);

  console.log(`  Created ${1} like`);

  // ── Follows ──────────────────────────────────────────────────────────────
  await db.insert(follows).values([{ follower_id: u1.id, followee_id: u2.id }]);

  console.log(`  Created ${1} follow`);

  console.log("Seed complete!");
  await client.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
