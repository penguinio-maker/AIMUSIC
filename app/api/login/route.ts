import { createSpotifyLoginUrl } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  const state = crypto.randomUUID();
  const response = NextResponse.redirect(createSpotifyLoginUrl(state));

  response.cookies.set("spotify_auth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
    path: "/"
  });

  return response;
}
