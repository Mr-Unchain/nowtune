"use client";

import { useMemo, useState } from "react";

import { uiText } from "@/config/strings";

const defaultTrack = {
  title: "Blue Monday",
  artist: "New Order",
  service: "Spotify",
  url: "https://open.spotify.com/track/bluemonday",
};

export default function ListeningPage() {
  const [track, setTrack] = useState(defaultTrack);
  const [isActive, setIsActive] = useState(true);

  const statusLabel = useMemo(
    () => (isActive ? uiText.listening.statusListening : uiText.listening.statusStopped),
    [isActive],
  );

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-black/30">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{uiText.listening.label}</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{uiText.listening.title}</h1>
        <p className="mt-2 max-w-2xl text-slate-300">{uiText.listening.description}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">{uiText.listening.currentSessionTitle}</h2>
              <p className="text-sm text-slate-400">{uiText.listening.currentSessionDescription}</p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${
                isActive
                  ? "bg-emerald-500/20 text-emerald-100"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              {statusLabel}
            </span>
          </div>

          <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="grid gap-3 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-200">
                <span>{uiText.listening.form.title}</span>
                <input
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                  value={track.title}
                  onChange={(event) => setTrack((prev) => ({ ...prev, title: event.target.value }))}
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>{uiText.listening.form.artist}</span>
                <input
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                  value={track.artist}
                  onChange={(event) => setTrack((prev) => ({ ...prev, artist: event.target.value }))}
                />
              </label>
              <label className="space-y-2 text-sm text-slate-200">
                <span>{uiText.listening.form.service}</span>
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
                <span>{uiText.listening.form.url}</span>
                <input
                  className="w-full rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-indigo-500"
                  value={track.url}
                  onChange={(event) => setTrack((prev) => ({ ...prev, url: event.target.value }))}
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <button
                className="rounded-full bg-emerald-500 px-4 py-2 text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
                onClick={() => setIsActive(true)}
                type="button"
              >
                {uiText.listening.form.start}
              </button>
              <button
                className="rounded-full border border-slate-700 px-4 py-2 text-white hover:border-indigo-400"
                onClick={() => setIsActive(false)}
                type="button"
              >
                {uiText.listening.form.stop}
              </button>
              <p className="text-xs text-slate-400">{uiText.listening.form.hint}</p>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/30">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">{uiText.listening.previewTitle}</h3>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{uiText.common.listeningBadge}</span>
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
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{uiText.common.listeningBadge}</p>
                <p className="text-lg font-semibold text-white">{track.title}</p>
                <p className="text-sm text-slate-300">{track.artist}</p>
                <p className="text-xs text-slate-500">{track.service}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs">
                <span
                  className={`h-2 w-2 rounded-full ${isActive ? "bg-emerald-400" : "bg-slate-500"}`}
                />
                <span className={isActive ? "text-emerald-200" : "text-slate-400"}>{statusLabel}</span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-indigo-500/50 bg-indigo-500/10 p-5 text-sm text-indigo-50">
            <h4 className="text-base font-semibold text-white">{uiText.listening.checklistTitle}</h4>
            <ul className="mt-3 space-y-2 list-disc pl-5">
              {uiText.listening.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
