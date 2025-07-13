import { getRecentGame } from "@/lib/steam-api";
import { NextResponse } from "next/server";

export const runtime = "edge";
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const game = await getRecentGame();
    return NextResponse.json(game);
  } catch (error) {
    console.error("Error in Steam API route:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
