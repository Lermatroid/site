import "server-only";

export interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
}

export interface SteamResponse {
  response: {
    total_count: number;
    games: SteamGame[];
  };
}

export async function getRecentGame(): Promise<SteamGame | null> {
  try {
    const response = await fetch(
      `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_DEV_KEY}&steamid=76561198219988321&count=1`
    );

    if (!response.ok) return null;

    const data: SteamResponse = await response.json();

    if (!data.response.games?.length) return null;

    return data.response.games[0];
  } catch (error) {
    console.error("Error fetching Steam data:", error);
    return null;
  }
}
