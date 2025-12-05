"use client";

import { useMemo, useState } from "react";

const activities = [
  {
    id: "p1",
    type: "post" as const,
    user: { name: "Aiko Morita", handle: "aikom", avatar: "AM" },
    track: {
      title: "Neon Skyline",
      artist: "Shibuya Echo",
      service: "YouTube",
      url: "https://youtube.com/watch?v=neon-skyline",
    },
    comment:
      "Rainy night soundtrack. The synths shimmer and the bass line is just perfect for a focus session.",
    likes: 32,
    createdAt: "2h ago",
  },
  {
    id: "l1",
    type: "listening" as const,
    user: { name: "Kenji Yamato", handle: "kenji", avatar: "KY" },
    track: {
      title: "Blue Monday",
      artist: "New Order",
      service: "Spotify",
      url: "https://open.spotify.com/track/bluemonday",
    },
    status: "Listening now",
    createdAt: "just now",
  },
  {
    id: "p2",
    type: "post" as const,
    user: { name: "Sara Ito", handle: "sara", avatar: "SI" },
    track: {
      title: "Sunset Rollercoaster",
      artist: "Slow Waves",
      service: "Apple Music",
      url: "https://music.apple.com/slow-waves",
    },
    comment: "Breezy guitar riffs. Anyone else into city pop this week?",
    likes: 18,
    createdAt: "5h ago",
  },
  {
    id: "l2",
    type: "listening" as const,
    user: { name: "Maya Nishida", handle: "maya", avatar: "MN" },
    track: {
      title: "Crystal Dreaming",
      artist: "Night Tempo",
      service: "YouTube",
      url: "https://youtube.com/watch?v=crystal-dreaming",
    },
    status: "Listening now",
    createdAt: "1d ago",
  },
  {
    id: "p3",
    type: "post" as const,
    user: { name: "Leo Kinoshita", handle: "leo", avatar: "LK" },
    track: {
      title: "Velvet Highway",
      artist: "Tokyo Midnight",
      service: "SoundCloud",
      url: "https://soundcloud.com/velvet-highway",
    },
    comment: "Late drive essential. The sax outro is gorgeous.",
    likes: 12,
    createdAt: "2d ago",
  },
];

const quickActions = [
  {
    title: "Share a post",
    description: "Pick a track, add a comment, and drop it into the timeline.",
    badge: "Post",
  },
  {
    title: "Start listening",
    description: "Tell friends what you're playing right now with one tap.",
    badge: "Listening",
  },
  {
    title: "Update profile",
    description: "Set your display name, avatar, and a short bio to make it yours.",
    badge: "Profile",
  },
];

const filters = [
  { id: "all", label: "All" },
  { id: "post", label: "Posts" },
  { id: "listening", label: "Listening" },
];

type Activity = (typeof activities)[number];

type FilterId = (typeof filters)[number]["id"];

export default function Home() {
  const [filter, setFilter] = useState<FilterId>("all");

  const visibleActivities = useMemo(() => {
    if (filter === "all") return activities;
    return activities.filter((item) => item.type === filter);
  }, [filter]);

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Timeline</p>
            <h1 className="text-3xl font-semibold text-white">NowTune feed</h1>
            <p className="max-w-2xl text-slate-300">
              See what your friends are posting and listening to in one mixed feed. Choose a
              tab to focus on posts or live listening updates.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-indigo-200">
                Posts + Listening activities
              </span>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-emerald-200">
                Likes & follows coming next
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">MVP Routes</p>
            <ul className="mt-2 space-y-1">
              <li>/ – timeline</li>
              <li>/post – create post</li>
              <li>/listening – start/stop listening</li>
              <li>/profile/[id] – user profile</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Activity</h2>
              <p className="text-sm text-slate-400">Mixed feed of posts and listening updates.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-800/70 p-1 text-sm text-slate-200">
              {filters.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFilter(item.id)}
                  className={`rounded-full px-3 py-1 transition ${
                    filter === item.id
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                      : "hover:bg-slate-700/60"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {visibleActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
            <h3 className="text-base font-semibold text-white">Quick actions</h3>
            <p className="text-sm text-slate-400">
              Build out the rest of the spec: posting, listening controls, profile pages, and
              lightweight auth.
            </p>
            <div className="mt-4 space-y-3">
              {quickActions.map((action) => (
                <div
                  key={action.title}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 hover:border-indigo-600/60"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-indigo-200">{action.badge}</p>
                      <p className="text-white">{action.title}</p>
                    </div>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-200">
                      Soon
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{action.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-lg font-semibold text-indigo-200">
                NT
              </div>
              <div>
                <p className="text-sm text-slate-300">Prototype profile</p>
                <p className="text-lg font-semibold text-white">You</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Profiles show your posts, recent listening, and follow controls. Hook up data and
              Supabase auth to complete this step.
            </p>
            <div className="mt-4 flex gap-2 text-xs text-slate-300">
              <span className="rounded-full bg-slate-800 px-3 py-1">Following 26</span>
              <span className="rounded-full bg-slate-800 px-3 py-1">Followers 31</span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  const isPost = activity.type === "post";
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/70 p-5 transition hover:-translate-y-0.5 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10">
      <header className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-200">
            {activity.user.avatar}
          </div>
          <div>
            <p className="text-sm text-slate-200">{activity.user.name}</p>
            <p className="text-xs text-slate-500">@{activity.user.handle}</p>
          </div>
        </div>
        <span className="text-xs text-slate-500">{activity.createdAt}</span>
      </header>

      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              {isPost ? "Post" : "Listening"}
            </p>
            <p className="text-lg font-semibold text-white">{activity.track.title}</p>
            <p className="text-sm text-slate-300">{activity.track.artist}</p>
            <p className="text-xs text-slate-500">{activity.track.service}</p>
          </div>
          <a
            className="rounded-full border border-indigo-500/50 px-4 py-2 text-sm text-indigo-200 transition hover:bg-indigo-500/10"
            href={activity.track.url}
            target="_blank"
            rel="noreferrer"
          >
            Open track
          </a>
        </div>

        {isPost ? (
          <p className="mt-3 text-sm text-slate-300">{activity.comment}</p>
        ) : (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {activity.status ?? "Listening"}
          </div>
        )}
      </div>

      {isPost && activity.likes !== undefined ? (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-indigo-200">
              ♥
            </span>
            <span>
              {activity.likes} like{activity.likes === 1 ? "" : "s"}
            </span>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
            Comment ready
          </span>
        </div>
      ) : null}
    </article>
  );
}
