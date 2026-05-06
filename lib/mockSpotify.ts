import type { SpotifyTasteData } from "@/lib/spotify";

const image = (id: string) => [
  {
    url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=300&q=80`,
    height: 300,
    width: 300
  }
];

export const mockSpotifyData: SpotifyTasteData = {
  recentlyPlayed: [
    {
      id: "mock-1",
      name: "No Ordinary Love",
      artists: [{ id: "sade", name: "Sade" }],
      album: { name: "Love Deluxe", images: image("photo-1493225457124-a3eb161ffa5f") },
      external_urls: { spotify: "https://open.spotify.com" }
    },
    {
      id: "mock-2",
      name: "Girl",
      artists: [{ id: "internet", name: "The Internet" }],
      album: { name: "Ego Death", images: image("photo-1516280440614-37939bbacd81") },
      external_urls: { spotify: "https://open.spotify.com" }
    },
    {
      id: "mock-3",
      name: "Girl",
      artists: [{ id: "kaytranada", name: "KAYTRANADA" }],
      album: { name: "99.9%", images: image("photo-1511671782779-c97d3d27a1d4") },
      external_urls: { spotify: "https://open.spotify.com" }
    }
  ],
  topTracks: [
    {
      id: "top-1",
      name: "Delilah",
      artists: [{ id: "fred", name: "Fred again.." }],
      album: { name: "Actual Life 3", images: image("photo-1500530855697-b586d89ba3ee") },
      external_urls: { spotify: "https://open.spotify.com" }
    },
    {
      id: "top-2",
      name: "10%",
      artists: [{ id: "kaytranada", name: "KAYTRANADA" }],
      album: { name: "BUBBA", images: image("photo-1494232410401-ad00d5433cfa") },
      external_urls: { spotify: "https://open.spotify.com" }
    },
    {
      id: "top-3",
      name: "Come Over",
      artists: [{ id: "jorja", name: "Jorja Smith" }],
      album: { name: "Be Right Back", images: image("photo-1506157786151-b8491531f063") },
      external_urls: { spotify: "https://open.spotify.com" }
    }
  ],
  topArtists: [
    {
      id: "artist-1",
      name: "Sade",
      genres: ["quiet storm", "soul", "sophisti-pop"],
      images: image("photo-1508700115892-45ecd05ae2ad"),
      external_urls: { spotify: "https://open.spotify.com" }
    },
    {
      id: "artist-2",
      name: "KAYTRANADA",
      genres: ["alternative r&b", "escape room", "electronic"],
      images: image("photo-1511379938547-c1f69419868d"),
      external_urls: { spotify: "https://open.spotify.com" }
    },
    {
      id: "artist-3",
      name: "The Internet",
      genres: ["alternative r&b", "neo soul", "indie soul"],
      images: image("photo-1514525253161-7a46d19cd819"),
      external_urls: { spotify: "https://open.spotify.com" }
    },
    {
      id: "artist-4",
      name: "Fred again..",
      genres: ["uk dance", "house", "electronica"],
      images: image("photo-1459749411175-04bf5292ceea"),
      external_urls: { spotify: "https://open.spotify.com" }
    }
  ],
  playlists: [
    {
      id: "playlist-1",
      name: "Late night signal",
      tracks: { total: 42 },
      images: image("photo-1500530855697-b586d89ba3ee"),
      external_urls: { spotify: "https://open.spotify.com" }
    }
  ],
  currentlyPlaying: {
    id: "current-1",
    name: "Sweet Life",
    artists: [{ id: "frank", name: "Frank Ocean" }],
    album: { name: "channel ORANGE", images: image("photo-1500530855697-b586d89ba3ee") },
    external_urls: { spotify: "https://open.spotify.com" }
  }
};
