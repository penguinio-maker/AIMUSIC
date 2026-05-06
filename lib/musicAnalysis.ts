import type { SpotifyTasteData } from "@/lib/spotify";

export type MusicProfile = {
  title: string;
  moodSummary: string;
  genreBreakdown: Array<{ label: string; value: number }>;
  listeningPatterns: string[];
  playlistIdeas: Array<{ title: string; description: string }>;
};

function countGenres(data: SpotifyTasteData) {
  const counts = new Map<string, number>();

  for (const artist of data.topArtists) {
    for (const genre of artist.genres ?? []) {
      counts.set(genre, (counts.get(genre) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, count]) => ({ label, value: count }));
}

function inferEnergy(data: SpotifyTasteData) {
  const names = [...data.topTracks, ...data.recentlyPlayed].map(track => track.name.toLowerCase()).join(" ");
  const softWords = ["love", "night", "blue", "slow", "dream", "moon", "alone", "rain"];
  const highWords = ["dance", "fire", "party", "run", "rush", "club", "beat", "hot"];

  const softScore = softWords.filter(word => names.includes(word)).length;
  const highScore = highWords.filter(word => names.includes(word)).length;

  if (highScore > softScore) return "kinetic";
  if (softScore > highScore) return "nocturnal";
  return "balanced";
}

export function generateMusicProfile(data: SpotifyTasteData): MusicProfile {
  const genres = countGenres(data);
  const topGenre = genres[0]?.label ?? "genre-fluid";
  const secondGenre = genres[1]?.label ?? "melodic";
  const energy = inferEnergy(data);
  const topArtist = data.topArtists[0]?.name ?? "your repeat artists";

  const title =
    energy === "kinetic"
      ? "The Signal Chaser"
      : energy === "nocturnal"
        ? "The Velvet Archivist"
        : "The Mood Cartographer";

  return {
    title,
    moodSummary: `Your listening profile leans ${energy}, with a strong pull toward ${topGenre} and ${secondGenre}. ${topArtist} anchors the center of your taste, while your recent plays suggest you use music as both atmosphere and identity.`,
    genreBreakdown: genres.length
      ? genres
      : [
          { label: "emotional pop", value: 3 },
          { label: "alt r&b", value: 2 },
          { label: "electronic", value: 2 }
        ],
    listeningPatterns: [
      `You return to ${topArtist} as a taste anchor before branching into adjacent sounds.`,
      `Your top tracks suggest ${energy === "kinetic" ? "energy-seeking sessions" : energy === "nocturnal" ? "late-night emotional listening" : "mood-based switching"} rather than random playback.`,
      `Playlist names and saved artists point to a listener who organizes music by feeling first, genre second.`
    ],
    playlistIdeas: [
      {
        title: "Afterglow Algorithm",
        description: `A ${topGenre}-led playlist for tracks that feel intimate, expensive, and replayable.`
      },
      {
        title: "New Favorite Weather",
        description: `A discovery set built around ${secondGenre}, soft transitions, and songs that sound familiar by the second chorus.`
      },
      {
        title: "Private Radio Hour",
        description: "A 60-minute flow that starts with your comfort artists and slowly opens into stranger territory."
      }
    ]
  };
}
