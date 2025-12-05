import type { Metadata } from "next";

type ProfileData = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  followers: number;
  following: number;
  posts: {
    id: string;
    title: string;
    artist: string;
    comment: string;
    createdAt: string;
  }[];
  listening: {
    id: string;
    title: string;
    artist: string;
    startedAt: string;
    endedAt?: string;
  }[];
};

const profiles: Record<string, ProfileData> = {
  you: {
    id: "you",
    name: "NowTune Prototype",
    handle: "nowtune",
    bio: "Building a cozy feed for music lovers.",
    followers: 31,
    following: 26,
    posts: [
      {
        id: "p1",
        title: "Neon Skyline",
        artist: "Shibuya Echo",
        comment: "Rainy night soundtrack. The synths shimmer and the bass line is perfect.",
        createdAt: "2h ago",
      },
      {
        id: "p2",
        title: "Sunset Rollercoaster",
        artist: "Slow Waves",
        comment: "Breezy guitar riffs and city pop vibes.",
        createdAt: "5h ago",
      },
    ],
    listening: [
      {
        id: "l1",
        title: "Blue Monday",
        artist: "New Order",
        startedAt: "just now",
      },
      {
        id: "l2",
        title: "Crystal Dreaming",
        artist: "Night Tempo",
        startedAt: "1d ago",
        endedAt: "1h later",
      },
    ],
  },
};

export function generateMetadata(): Metadata {
  return {
    title: "Profile – NowTune",
  };
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const profile = profiles[params.id] ?? profiles.you;

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-black/30">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/20 text-lg font-semibold text-indigo-200">
              {profile.name.slice(0, 2)}
            </div>
            <div>
              <p className="text-sm text-slate-400">Profile</p>
              <h1 className="text-3xl font-semibold text-white">{profile.name}</h1>
              <p className="text-sm text-slate-500">@{profile.handle}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-200">
            <button className="rounded-full bg-indigo-500 px-4 py-2 font-semibold text-white shadow-lg shadow-indigo-500/30">
              Follow
            </button>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Followers {profile.followers}</span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Following {profile.following}</span>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">{profile.bio}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Recent posts</h2>
              <p className="text-sm text-slate-400">Embed track + comment from `/api/posts`.</p>
            </div>
            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-indigo-200">
              Posts
            </span>
          </div>
          {profile.posts.map((post) => (
            <article
              key={post.id}
              className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/70 p-4"
            >
              <header className="flex items-center justify-between text-xs text-slate-500">
                <span>{post.createdAt}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
                  Comment ready
                </span>
              </header>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Post</p>
                <p className="text-lg font-semibold text-white">{post.title}</p>
                <p className="text-sm text-slate-300">{post.artist}</p>
              </div>
              <p className="text-sm text-slate-200">{post.comment}</p>
            </article>
          ))}
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">Listening history</h3>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Listening</span>
            </div>
            <div className="mt-4 space-y-3">
              {profile.listening.map((activity) => (
                <div
                  key={activity.id}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-200"
                >
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{activity.startedAt}</span>
                    <span className="rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-slate-300">
                      {activity.endedAt ? "Ended" : "Active"}
                    </span>
                  </div>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-400">Listening</p>
                  <p className="text-base font-semibold text-white">{activity.title}</p>
                  <p className="text-sm text-slate-300">{activity.artist}</p>
                  {activity.endedAt ? (
                    <p className="text-xs text-slate-500">Ended: {activity.endedAt}</p>
                  ) : (
                    <p className="text-xs text-emerald-200">Live now</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-indigo-500/50 bg-indigo-500/10 p-5 text-sm text-indigo-50">
            <h4 className="text-base font-semibold text-white">API wiring</h4>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              <li>GET `/api/users/:id` – return user info + recent posts/listening.</li>
              <li>POST `/api/users/:id/follow` – toggle follow status.</li>
              <li>Use the same activity/post cards as the timeline for consistency.</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
