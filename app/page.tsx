import { SpotifyButton } from "@/components/SpotifyButton";

export default function LandingPage() {
  return (
    <main className="aurora min-h-screen overflow-hidden">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 md:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl border border-white/15 bg-white/10 shadow-glass backdrop-blur">
              <svg viewBox="0 0 24 24" className="size-5 text-[#1DB954]" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <span className="text-sm font-black uppercase tracking-[0.28em] text-white/70">Taste Signal</span>
          </div>
          <a href="#preview" className="hidden text-sm font-bold text-white/55 transition hover:text-white md:block">
            View dashboard
          </a>
        </nav>

        <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-[#1DB954]/30 bg-[#1DB954]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#1DB954]">
              Spotify plus local AI-style analysis
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.92] text-white md:text-7xl">
              Turn your Spotify history into a music personality.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
              Connect Spotify and discover what your listening habits say about your mood, taste, and patterns.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <SpotifyButton />
              <a
                href="/dashboard?demo=1"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                View demo dashboard
              </a>
              <p className="text-sm text-white/45">Uses Spotify Authorization Code Flow. No OpenAI call yet.</p>
            </div>
          </div>

          <div id="preview" className="glass relative rounded-[36px] p-5">
            <div className="absolute -left-10 top-10 size-40 rounded-full bg-[#1DB954]/20 blur-3xl" />
            <div className="relative rounded-[28px] border border-white/10 bg-black/35 p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.24em] text-white/40">Live taste scan</span>
                <span className="rounded-full bg-[#1DB954] px-3 py-1 text-xs font-black text-black">MVP</span>
              </div>
              <div className="space-y-4">
                {["Recently played", "Top artists", "Mood profile", "Playlist ideas"].map((label, index) => (
                  <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.05] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <strong className="text-white">{label}</strong>
                      <span className="text-xs text-white/35">0{index + 1}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#1DB954] to-cyan-300"
                        style={{ width: `${82 - index * 13}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
