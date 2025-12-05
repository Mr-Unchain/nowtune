"use client";

import { FormEvent, useMemo, useState } from "react";

import { uiText } from "@/config/strings";

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
      title: track.title || uiText.post.fallbackTitle,
      artist: track.artist || uiText.post.fallbackArtist,
      service: track.service,
      url: track.url,
    }),
    [track],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(uiText.post.message);
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{uiText.post.label}</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{uiText.post.title}</h1>
        <p className="mt-2 max-w-2xl text-slate-300">{uiText.post.description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30"
        >
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">{uiText.post.trackSectionTitle}</h2>
              <p className="text-sm text-slate-400">{uiText.post.trackSectionDescription}</p>
            </div>
            <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs uppercase tracking-[0.18em] text-indigo-200">
              {uiText.post.apiReady}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-200">
              <span>{uiText.post.field.title}</span>
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                placeholder={uiText.post.field.titlePlaceholder}
                value={track.title}
                onChange={(event) => setTrack((prev) => ({ ...prev, title: event.target.value }))}
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>{uiText.post.field.artist}</span>
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                placeholder={uiText.post.field.artistPlaceholder}
                value={track.artist}
                onChange={(event) => setTrack((prev) => ({ ...prev, artist: event.target.value }))}
                required
              />
            </label>

            <label className="space-y-2 text-sm text-slate-200">
              <span>{uiText.post.field.service}</span>
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
              <span>{uiText.post.field.url}</span>
              <input
                className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                placeholder={uiText.post.field.urlPlaceholder}
                value={track.url}
                onChange={(event) => setTrack((prev) => ({ ...prev, url: event.target.value }))}
              />
            </label>
          </div>

          <label className="block space-y-2 text-sm text-slate-200">
            <span>{uiText.post.field.comment}</span>
            <textarea
              className="min-h-[140px] w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
              placeholder={uiText.post.field.commentPlaceholder}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm text-slate-300">
            <p>{uiText.post.submitHint}</p>
            <button
              type="submit"
              className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:-translate-y-0.5 hover:shadow-indigo-500/40"
            >
              {uiText.post.saveDraft}
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
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{uiText.post.previewLabel}</p>
                <h3 className="text-lg font-semibold text-white">{uiText.post.previewTitle}</h3>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{uiText.common.postBadge}</span>
            </div>

            <div className="mt-4 space-y-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-slate-200">{uiText.timeline.profileCardTitle}</p>
                  <p className="text-xs text-slate-500">@nowtune</p>
                </div>
                <span className="text-xs text-slate-500">たった今</span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{uiText.common.postBadge}</p>
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
                    {uiText.common.openTrack}
                  </a>
                ) : null}
              </div>
              {comment ? <p className="text-sm text-slate-300">{comment}</p> : null}
            </div>
          </section>

          <section className="rounded-2xl border border-indigo-500/50 bg-indigo-500/10 p-5 text-sm text-indigo-50">
            <h4 className="text-base font-semibold text-white">{uiText.post.howToTitle}</h4>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              {uiText.post.howToSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        </aside>
      </div>
    </div>
  );
}
