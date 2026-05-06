import type { MusicProfile } from "@/lib/musicAnalysis";

export function PlaylistIdeas({ profile }: { profile: MusicProfile }) {
  return (
    <section className="glass rounded-[28px] p-5">
      <h2 className="mb-5 text-xl font-black">AI playlist ideas</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {profile.playlistIdeas.map(idea => (
          <article key={idea.title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
            <div className="mb-5 grid size-10 place-items-center rounded-2xl bg-[#1DB954]/15 text-[#1DB954]">
              <span aria-hidden="true">AI</span>
            </div>
            <h3 className="text-lg font-black">{idea.title}</h3>
            <p className="mt-3 text-sm leading-6 text-white/55">{idea.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
