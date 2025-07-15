"use client";

import { MapPinned, Gamepad2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

interface SpotifyResponse {
  isPlaying: boolean;
  track?: {
    title: string;
    artist: string;
    albumImageUrl: string;
    songUrl: string;
  };
  nextRefreshIn: number;
}

interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
}

export function Activity() {
  // Fetch Spotify now-playing data
  const { data: spotifyData, isLoading: spotifyLoading } =
    useQuery<SpotifyResponse>({
      queryKey: ["spotify-now-playing"],
      queryFn: async () => {
        console.log("[ACTIVITY] Fetching Spotify data");
        const response = await fetch("/api/spotify/now-playing");
        if (!response.ok) throw new Error("Failed to fetch Spotify data");
        return response.json();
      },
      refetchInterval: (query) => {
        // Use the nextRefreshIn value from the API response for dynamic polling
        const data = query.state.data as SpotifyResponse | undefined;
        return data?.nextRefreshIn ? data.nextRefreshIn * 1000 : 30000; // Convert to milliseconds, default to 30s
      },
      staleTime: 0, // Always refetch when the interval triggers
    });

  // Fetch Steam recent game data
  const { data: steamData, isLoading: steamLoading } =
    useQuery<SteamGame | null>({
      queryKey: ["steam-recent"],
      queryFn: async () => {
        console.log("[ACTIVITY] Fetching Steam data");
        const response = await fetch("/api/steam/recent");
        if (!response.ok) throw new Error("Failed to fetch Steam data");
        return response.json();
      },
      staleTime: Infinity, // Data never becomes stale
      refetchOnWindowFocus: false, // Do not refetch on window focus
      refetchOnReconnect: false, // Do not refetch on reconnect
      refetchInterval: false, // No polling
    });

  return (
    <div className="flex flex-col gap-y-2 font-mono justify-start max-w-[600px] w-full pt-6">
      <p className="flex items-center gap-x-2 text-sm font-bold">
        <MapPinned size={16} /> Seattle
      </p>

      {/* Steam Section */}
      <div className="flex items-center gap-x-2 text-sm font-bold">
        <Image
          src="/img/icons/steam.png"
          alt="Steam Icon"
          height={16}
          width={16}
        />
        {steamLoading ? (
          <span className="text-gray-500">Loading...</span>
        ) : steamData ? (
          <Link
            href={`https://store.steampowered.com/app/${steamData.appid}`}
            target="_blank"
          >
            <span title={"Last seen playing"}>{steamData.name}</span>
          </Link>
        ) : (
          <span className="text-gray-500">No recent games</span>
        )}
      </div>

      {/* Spotify Section */}
      <div className="flex items-center gap-x-2 text-sm font-bold">
        <Image
          src="/img/icons/spotify.png"
          alt="Spotify Icon"
          height={16}
          width={16}
          className="invert"
        />
        {spotifyLoading ? (
          <span className="text-gray-500">Loading...</span>
        ) : spotifyData?.isPlaying && spotifyData.track ? (
          <span className="">
            <Link href={spotifyData.track.songUrl} target="_blank">
              {spotifyData.track.title.length > 35
                ? spotifyData.track.title.slice(0, 35) + "…"
                : spotifyData.track.title}{" "}
              - {spotifyData.track.artist}
            </Link>{" "}
            <span
              className="inline-flex gap-1 w-4 justify-center"
              title="Now Playing"
            >
              <span className="w-[2px] h-2 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite] [animation-delay:-0.3s]"></span>
              <span className="w-[2px] h-2 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite] [animation-delay:-0.15s]"></span>
              <span className="w-[2px] h-2 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite]"></span>
            </span>
          </span>
        ) : (
          <span className="text-gray-500">Offline</span>
        )}
      </div>
    </div>
  );
}
