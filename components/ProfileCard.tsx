import type { MusicProfile } from "@/lib/musicAnalysis";

export function ProfileCard({ profile }: { profile: MusicProfile }) {
  return (
    <section className="glass relative overflow-hidden rounded-[32px] p-6">
      <div className="absolute -right-16 -top-16 size-56 rounded-full bg-[#1DB954]/20 blur-3xl" />
      <div className="relative">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-[#1DB954]">Music personality</p>
        <h1 className="mt-4 max-w-2xl text-4xl font-black leading-none text-white md:text-6xl">
          {profile.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-white/65">{profile.moodSummary}</p>
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {profile.listeningPatterns.map(pattern => (
            <div key={pattern} className="rounded-3xl border border-white/10 bg-black/20 p-4">
              <p className="text-sm leading-6 text-white/70">{pattern}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
