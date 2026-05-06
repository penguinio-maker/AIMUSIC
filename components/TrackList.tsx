import type { SpotifyTrack } from "@/lib/spotify";

type TrackListProps = {
  title: string;
  tracks: SpotifyTrack[];
};

export function TrackList({ title, tracks }: TrackListProps) {
  return (
    <section className="glass rounded-[28px] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black">{title}</h2>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/55">
          {tracks.length} tracks
        </span>
      </div>
      <div className="space-y-3">
        {tracks.map((track, index) => (
          <a
            key={`${track.id}-${index}`}
            href={track.external_urls?.spotify}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] p-3 transition hover:border-[#1DB954]/50 hover:bg-white/[0.08]"
          >
            <span className="w-6 text-center text-xs font-black text-white/35">{index + 1}</span>
            <img
              src={track.album.images[2]?.url ?? track.album.images[0]?.url ?? "/"}
              alt=""
              className="size-12 rounded-xl object-cover"
            />
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold text-white">{track.name}</span>
              <span className="block truncate text-xs text-white/50">
                {track.artists.map(artist => artist.name).join(", ")}
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
