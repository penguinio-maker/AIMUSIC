# Spotify Taste Profile

An MVP Next.js app that connects to Spotify with Authorization Code Flow, fetches listening data, and generates a local AI-style music profile.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` in the project root:

```bash
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/callback
```

## Spotify Redirect URI

In the Spotify Developer Dashboard:

1. Create or open your Spotify app.
2. Go to app settings.
3. Add this Redirect URI exactly:

```text
http://localhost:3000/api/callback
```

4. Save changes.

The value must match `SPOTIFY_REDIRECT_URI` exactly, including protocol, port, and path.

## Flow

- `/` shows the landing page.
- `/api/login` redirects to Spotify OAuth.
- `/api/callback` exchanges the authorization code for tokens and stores them in httpOnly cookies.
- `/dashboard` fetches recently played tracks, top tracks, top artists, playlists, and currently playing track.
- `generateMusicProfile(data)` in `lib/musicAnalysis.ts` creates the local music personality, mood summary, patterns, and playlist ideas.
