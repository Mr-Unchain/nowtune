"use client";

import { useMemo, useState } from "react";

import { uiText } from "@/config/strings";
import { TimelineFilter, TimelineItem } from "@/lib/domain/types";
import { timelineItems } from "@/lib/mock/timelineData";

const filters: { id: TimelineFilter; label: string }[] = [
  { id: "all", label: uiText.timeline.filters.all },
  { id: "post", label: uiText.timeline.filters.post },
  { id: "listening", label: uiText.timeline.filters.listening },
];

export default function Home() {
  const [filter, setFilter] = useState<TimelineFilter>("all");

  const visibleActivities = useMemo(() => {
    if (filter === "all") return timelineItems;
    return timelineItems.filter((item) => item.type === filter);
  }, [filter]);

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl shadow-black/30">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              {uiText.timeline.label}
            </p>
            <h1 className="text-3xl font-semibold text-white">{uiText.timeline.title}</h1>
            <p className="max-w-2xl text-slate-300">{uiText.timeline.description}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-200">
              {uiText.timeline.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full bg-indigo-500/15 px-3 py-1 text-indigo-200"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">MVPルート</p>
            <ul className="mt-2 space-y-1">
              <li>/ – タイムライン</li>
              <li>/post – 投稿作成</li>
              <li>/listening – リスニング開始/停止</li>
              <li>/profile/[id] – プロフィール</li>
            </ul>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/30">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-white">{uiText.timeline.activityTitle}</h2>
              <p className="text-sm text-slate-400">{uiText.timeline.activityDescription}</p>
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
            <h3 className="text-base font-semibold text-white">{uiText.timeline.quickActionsTitle}</h3>
            <p className="text-sm text-slate-400">{uiText.timeline.quickActionsDescription}</p>
            <div className="mt-4 space-y-3">
              {uiText.timeline.quickActions.map((action) => (
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
                      {uiText.common.soon}
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
                <p className="text-sm text-slate-300">プロトタイププロフィール</p>
                <p className="text-lg font-semibold text-white">{uiText.timeline.profileCardTitle}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-400">{uiText.timeline.profileCardDescription}</p>
            <div className="mt-4 flex gap-2 text-xs text-slate-300">
              <span className="rounded-full bg-slate-800 px-3 py-1">{`${uiText.timeline.following} 26`}</span>
              <span className="rounded-full bg-slate-800 px-3 py-1">{`${uiText.timeline.followers} 31`}</span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function ActivityCard({ activity }: { activity: TimelineItem }) {
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
              {isPost ? uiText.common.postBadge : uiText.common.listeningBadge}
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
            {uiText.common.openTrack}
          </a>
        </div>

        {isPost ? (
          <p className="mt-3 text-sm text-slate-300">{activity.comment}</p>
        ) : (
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {activity.status ?? uiText.common.listeningBadge}
          </div>
        )}
      </div>

      {isPost && activity.likes !== undefined ? (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-indigo-200">
              ♥
            </span>
            <span>いいね {activity.likes}件</span>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-slate-300">
            {uiText.common.commentReady}
          </span>
        </div>
      ) : null}
    </article>
  );
}
