import { getNowPlayingItem } from "@/lib/spotify-api";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const CACHE_KEY = "spotify:now-playing";
const CACHE_TTL = 30; // 30 seconds

export async function GET() {
  try {
    // Try to get cached data first
    const cachedData = await redis.get(CACHE_KEY);

    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    // If no cache, fetch from Spotify
    const nowPlaying = await getNowPlayingItem();

    if (!nowPlaying) {
      const response = {
        isPlaying: false,
        nextRefreshIn: 30, // Check again in 30 seconds if nothing is playing
      };

      // Cache the "not playing" response for a shorter time
      await redis.setex(CACHE_KEY, 15, JSON.stringify(response));
      return NextResponse.json(response);
    }

    // Calculate remaining time in the song (in seconds)
    const remainingTime = Math.floor(
      (nowPlaying.duration - nowPlaying.progress) / 1000
    );

    const response = {
      isPlaying: true,
      track: {
        title: nowPlaying.title,
        artist: nowPlaying.artist,
        albumImageUrl: nowPlaying.albumImageUrl,
        songUrl: nowPlaying.songUrl,
      },
      nextRefreshIn: remainingTime + 5, // Add 5 second buffer
    };

    // Cache the response - use shorter of CACHE_TTL or remaining time
    const cacheTime = Math.min(CACHE_TTL, Math.max(5, remainingTime));
    await redis.setex(CACHE_KEY, cacheTime, JSON.stringify(response));

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in Spotify now-playing API:", error);
    return NextResponse.json(
      { error: "Failed to fetch now playing data" },
      { status: 500 }
    );
  }
}
