"use client";

import { FormEvent, useMemo, useState } from "react";

const emptyTrack = {
  title: "",
  artist: "",
  service: "YouTube",
  url: "",
};

export default function CreatePostPage() {
  const [track, setTrack] = useState(emptyTrack);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const trackPreview = useMemo(
    () => ({
      title: track.title || "Untitled track",
      artist: track.artist || "Unknown artist",
      service: track.service,
      url: track.url,
    }),
    [track],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Post ready! Hook this form to the API to publish to the timeline.");
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Create Post</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Share a track with a comment</h1>
        <p className="mt-2 max-w-2xl text-slate-300">
          Posts pair a track with your thoughts. Fill out the track details, add a quick comment,
          and connect this UI to the `/api/posts` endpoint to store new posts.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Track</h2>
              <p className="text-sm text-slate-400">Manual entry or URL — wire to track creation.</p>
            </div>
            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-indigo-200">
              API ready
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              <span>Title</span>
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                placeholder="Neon Skyline"
                value={track.title}
                onChange={(event) => setTrack((prev) => ({ ...prev, title: event.target.value }))}
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>Artist</span>
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                placeholder="Shibuya Echo"
                value={track.artist}
                onChange={(event) => setTrack((prev) => ({ ...prev, artist: event.target.value }))}
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>Service</span>
              <select
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                value={track.service}
                onChange={(event) => setTrack((prev) => ({ ...prev, service: event.target.value }))}
              >
                <option value="YouTube">YouTube</option>
                <option value="Spotify">Spotify</option>
                <option value="Apple Music">Apple Music</option>
                <option value="SoundCloud">SoundCloud</option>
              </select>
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>Track URL</span>
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                placeholder="https://..."
                value={track.url}
                onChange={(event) => setTrack((prev) => ({ ...prev, url: event.target.value }))}
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm text-slate-200">
            <span>Comment</span>
            <textarea
              className="min-h-[140px] w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
              placeholder="Why this track? Mood? Story?"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
            <p>Submit to post + create track if needed.</p>
            <button
              type="submit"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40"
            >
              Save draft
            </button>
          </div>

          {message ? (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
              {message}
            </div>
          ) : null}
        </form>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Preview</p>
                <h3 className="text-lg font-semibold text-white">Timeline card</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">Post</span>
            </div>

            <div className="mt-4 space-y-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-200">You</p>
                  <p className="text-xs text-slate-500">@nowtune</p>
                </div>
                <span className="text-xs text-slate-500">just now</span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Post</p>
                <p className="text-lg font-semibold text-white">{trackPreview.title}</p>
                <p className="text-sm text-slate-300">{trackPreview.artist}</p>
                <p className="text-xs text-slate-500">{trackPreview.service}</p>
                {trackPreview.url ? (
                  <a
                    className="mt-3 inline-block rounded-full border border-indigo-500/40 px-4 py-2 text-xs text-indigo-200 hover:bg-indigo-500/10"
                    href={trackPreview.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open track
                  </a>
                ) : null}
              </div>
              {comment ? <p className="text-sm text-slate-300">{comment}</p> : null}
            </div>
          </section>

          <section className="rounded-2xl border border-indigo-500/50 bg-indigo-500/10 p-5 text-sm text-indigo-50">
            <h4 className="text-base font-semibold text-white">How to wire this</h4>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Call `/api/posts` with a track payload or `track_id`.</li>
              <li>Create a track first if the user entered fresh details.</li>
              <li>Return the created post with embedded user + track to render.</li>
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}
