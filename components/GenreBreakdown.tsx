import type { MusicProfile } from "@/lib/musicAnalysis";

export function GenreBreakdown({ profile }: { profile: MusicProfile }) {
  const max = Math.max(...profile.genreBreakdown.map(item => item.value), 1);

  return (
    <section className="glass rounded-[28px] p-5">
      <h2 className="mb-5 text-xl font-black">Genre / vibe breakdown</h2>
      <div className="space-y-4">
        {profile.genreBreakdown.map(item => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-bold capitalize text-white/80">{item.label}</span>
              <span className="text-white/40">{item.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1DB954] to-cyan-300"
                style={{ width: `${Math.max(18, (item.value / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
