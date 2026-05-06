import { exchangeCodeForToken } from "@/lib/spotify";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = request.cookies.get("spotify_auth_state")?.value;

  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(new URL("/?error=spotify_state_mismatch", request.url));
  }

  try {
    const token = await exchangeCodeForToken(code);
    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    response.cookies.delete("spotify_auth_state");
    response.cookies.set("spotify_access_token", token.access_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: token.expires_in,
      path: "/"
    });
    response.cookies.set("spotify_refresh_token", token.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30,
      path: "/"
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/?error=spotify_token_exchange_failed", request.url));
  }
}
