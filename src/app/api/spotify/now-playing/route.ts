import { getNowPlayingItem } from "@/lib/spotify-api";
import { NextResponse } from "next/server";

export async function GET() {
  const nowPlaying = await getNowPlayingItem();

  if (!nowPlaying) {
    return NextResponse.json({
      isPlaying: false,
      nextRefreshIn: 30, // Check again in 30 seconds if nothing is playing
    });
  }

  // Calculate remaining time in the song (in seconds)
  const remainingTime = Math.floor(
    (nowPlaying.duration - nowPlaying.progress) / 1000
  );

  return NextResponse.json({
    isPlaying: true,
    track: {
      title: nowPlaying.title,
      artist: nowPlaying.artist,
      albumImageUrl: nowPlaying.albumImageUrl,
      songUrl: nowPlaying.songUrl,
    },
    nextRefreshIn: remainingTime + 5, // Add 5 second buffer
  });
}
