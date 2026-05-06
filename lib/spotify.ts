export type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  genres?: string[];
  images?: SpotifyImage[];
  external_urls?: { spotify?: string };
};

export type SpotifyTrack = {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    name: string;
    images: SpotifyImage[];
  };
  external_urls?: { spotify?: string };
  duration_ms?: number;
  popularity?: number;
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
  tracks: { total: number };
  images: SpotifyImage[];
  external_urls?: { spotify?: string };
};

export type SpotifyTasteData = {
  recentlyPlayed: SpotifyTrack[];
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  playlists: SpotifyPlaylist[];
  currentlyPlaying: SpotifyTrack | null;
};

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

export const spotifyScopes = [
  "user-read-recently-played",
  "user-top-read",
  "playlist-read-private",
  "user-read-currently-playing",
  "user-library-read"
];

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function createSpotifyLoginUrl(state: string) {
  const params = new URLSearchParams({
    client_id: requireEnv("SPOTIFY_CLIENT_ID"),
    response_type: "code",
    redirect_uri: requireEnv("SPOTIFY_REDIRECT_URI"),
    scope: spotifyScopes.join(" "),
    state,
    show_dialog: "true"
  });

  return `${SPOTIFY_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string) {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: requireEnv("SPOTIFY_REDIRECT_URI")
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify token exchange failed: ${response.status} ${errorText}`);
  }

  return response.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: "Bearer";
    scope: string;
  }>;
}

async function spotifyFetch<T>(path: string, accessToken: string): Promise<T> {
  const response = await fetch(`${SPOTIFY_API_URL}${path}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store"
  });

  if (response.status === 204) {
    return null as T;
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Spotify API request failed: ${path} ${response.status} ${errorText}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchSpotifyTasteData(accessToken: string): Promise<SpotifyTasteData> {
  const [recent, topTracks, topArtists, playlists, current] = await Promise.all([
    spotifyFetch<{ items: Array<{ track: SpotifyTrack }> }>("/me/player/recently-played?limit=12", accessToken),
    spotifyFetch<{ items: SpotifyTrack[] }>("/me/top/tracks?limit=10&time_range=medium_term", accessToken),
    spotifyFetch<{ items: SpotifyArtist[] }>("/me/top/artists?limit=10&time_range=medium_term", accessToken),
    spotifyFetch<{ items: SpotifyPlaylist[] }>("/me/playlists?limit=8", accessToken),
    spotifyFetch<{ item: SpotifyTrack | null; is_playing: boolean } | null>("/me/player/currently-playing", accessToken)
  ]);

  return {
    recentlyPlayed: recent.items.map(item => item.track).filter(Boolean),
    topTracks: topTracks.items,
    topArtists: topArtists.items,
    playlists: playlists.items,
    currentlyPlaying: current?.item ?? null
  };
}
