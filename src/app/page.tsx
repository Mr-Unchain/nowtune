export default function Home() {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl shadow-black/20">
      <div className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Timeline</p>
        <h1 className="text-3xl font-semibold text-white">NowTune Timeline (coming soon)</h1>
        <p className="text-slate-300">
          Welcome to NowTune. Sign in to see posts and listening updates from you and the
          people you follow. Timeline features will arrive in the next steps of the build.
        </p>
      </div>
    </section>
  );
}
