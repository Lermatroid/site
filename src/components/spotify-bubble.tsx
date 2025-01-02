import { getNowPlayingItem } from "@/lib/spotify-api";
import { Unplug } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createCache } from "@/lib/cache";

const getCachedNowPlaying = createCache(async () => getNowPlayingItem(), {
	key: "now-playing",
	revalidate: 30,
});

export default async function SpotifyBubble() {
	const nowPlaying = await getCachedNowPlaying();

	if (!nowPlaying) {
		return (
			<div className="col-start-2 row-start-4 rounded-2xl bg-zinc-950 p-5 flex flex-col justify-center items-center gap relative">
				<p className="font-mono font-bold text-md leading-normal absolute left-0 top-0 pt-5 pl-5">
					Now Playing
				</p>

				<div className="h-[40px] w-full absolute bottom-0 left-0 pl-5 pb-5 flex items-center gap-x-1">
					<p className="leading-[20px] font-mono text-sm">Offline </p>{" "}
					<Unplug size={15} />
				</div>
				<Image
					src="/img/other/spotify.png"
					alt="Spotify Icon"
					className="absolute bottom-0 right-0 pr-5 pb-5 invert z-50"
					width={40}
					height={40}
				/>
			</div>
		);
	}
	return (
		<div className="col-start-2 row-start-4 rounded-2xl bg-zinc-950 p-5 flex flex-col justify-start gap relative">
			<p className="font-mono font-bold text-md leading-normal absolute right-0 top-0 pt-5 pr-5">
				Now Playing{" "}
				<span className="inline-flex gap-1">
					<span className="w-1 h-3 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite] [animation-delay:-0.3s]"></span>
					<span className="w-1 h-3 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite] [animation-delay:-0.15s]"></span>
					<span className="w-1 h-3 bg-white origin-bottom animate-[soundwave_0.7s_ease-in-out_infinite]"></span>
				</span>
			</p>

			<Image src={nowPlaying.albumImageUrl} alt="Album Art" width={100} height={100} />
			<div className="pt-2">
				<p className="font-bold">{nowPlaying.title}</p>
				<p className="text-sm">{nowPlaying.artist}</p>
			</div>

			<Link href={nowPlaying.songUrl} target="_blank">
				<Image
					src="/img/other/spotify.png"
					alt="Spotify Icon"
					className="absolute bottom-0 right-0 pr-5 pb-5 invert z-50"
					width={40}
					height={40}
				/>
			</Link>
		</div>
	);
}
