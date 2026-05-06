import { ArtistGrid } from "@/components/ArtistGrid";
import { GenreBreakdown } from "@/components/GenreBreakdown";
import { PlaylistIdeas } from "@/components/PlaylistIdeas";
import { ProfileCard } from "@/components/ProfileCard";
import { SpotifyButton } from "@/components/SpotifyButton";
import { StatCard } from "@/components/StatCard";
import { TrackList } from "@/components/TrackList";
import { generateMusicProfile } from "@/lib/musicAnalysis";
import { fetchSpotifyTasteData } from "@/lib/spotify";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  const accessToken = (await cookies()).get("spotify_access_token")?.value;

  if (!accessToken) {
    return (
      <main className="aurora grid min-h-screen place-items-center px-5">
        <section className="glass max-w-xl rounded-[32px] p-8 text-center">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#1DB954]">Spotify required</p>
          <h1 className="mt-4 text-4xl font-black">Connect your account first.</h1>
          <p className="mt-4 text-white/60">
            The dashboard needs a Spotify access token before it can build your music personality.
          </p>
          <div className="mt-7">
            <SpotifyButton />
          </div>
        </section>
      </main>
    );
  }

  const data = await fetchSpotifyTasteData(accessToken);
  const profile = generateMusicProfile(data);

  return (
    <main className="aurora min-h-screen">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-6 md:px-8">
        <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#1DB954]">Spotify taste profile</p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-5xl">Your listening signal</h1>
          </div>
          {data.currentlyPlaying ? (
            <a
              href={data.currentlyPlaying.external_urls?.spotify}
              target="_blank"
              rel="noreferrer"
              className="glass flex items-center gap-3 rounded-3xl p-3 transition hover:border-[#1DB954]/45"
            >
              <img
                src={data.currentlyPlaying.album.images[2]?.url ?? data.currentlyPlaying.album.images[0]?.url ?? "/"}
                alt=""
                className="size-12 rounded-2xl object-cover"
              />
              <span className="min-w-0">
                <span className="block text-xs font-black uppercase tracking-[0.2em] text-[#1DB954]">Now playing</span>
                <span className="block truncate text-sm font-bold text-white">{data.currentlyPlaying.name}</span>
              </span>
            </a>
          ) : (
            <div className="glass rounded-3xl px-5 py-4 text-sm font-bold text-white/55">Nothing playing right now</div>
          )}
        </header>

        <ProfileCard profile={profile} />

        <section className="grid gap-4 md:grid-cols-4">
          <StatCard label="Recent plays" value={String(data.recentlyPlayed.length)} detail="Latest tracks pulled from Spotify" />
          <StatCard label="Top tracks" value={String(data.topTracks.length)} detail="Medium-term listening favorites" />
          <StatCard label="Top artists" value={String(data.topArtists.length)} detail="Artists shaping the profile" />
          <StatCard label="Playlists" value={String(data.playlists.length)} detail="Private playlists available" />
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <TrackList title="Recently played" tracks={data.recentlyPlayed} />
          <TrackList title="Top tracks" tracks={data.topTracks} />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <ArtistGrid artists={data.topArtists} />
          <GenreBreakdown profile={profile} />
        </section>

        <PlaylistIdeas profile={profile} />
      </div>
    </main>
  );
}
