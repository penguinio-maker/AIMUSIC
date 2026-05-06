import type { SpotifyArtist } from "@/lib/spotify";

export function ArtistGrid({ artists }: { artists: SpotifyArtist[] }) {
  return (
    <section className="glass rounded-[28px] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black">Top artists</h2>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/55">
          medium term
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {artists.map(artist => (
          <a
            key={artist.id}
            href={artist.external_urls?.spotify}
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-white/8 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:border-[#1DB954]/50 hover:bg-white/[0.08]"
          >
            <img
              src={artist.images?.[1]?.url ?? artist.images?.[0]?.url ?? "/"}
              alt=""
              className="mb-4 aspect-square w-full rounded-2xl object-cover"
            />
            <h3 className="truncate text-base font-black">{artist.name}</h3>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/50">
              {(artist.genres ?? []).slice(0, 3).join(" · ") || "genre-fluid"}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
