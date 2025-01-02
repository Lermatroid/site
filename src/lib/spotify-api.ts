import "server-only";

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

const client_id = process.env.SPOTIFY_CLIENT_ID as string;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN as string;

const getAccessToken = async () => {
	const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token,
		}).toString(),
		cache: "no-store",
	});

	return response.json();
};

export const getNowPlaying = async () => {
	const { access_token } = await getAccessToken();
	return fetch(NOW_PLAYING_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
		cache: "no-store",
	});
};

export async function getNowPlayingItem() {
	const response = await getNowPlaying();
	if (response.status === 204 || response.status > 400) {
		return false;
	}
	const song = await response.json();
	const albumImageUrl = song.item.album.images[0].url;
	const artist = song.item.artists.map((_artist: any) => _artist.name).join(", ");
	const isPlaying = song.is_playing;
	const songUrl = song.item.external_urls.spotify;
	const title = song.item.name;

	return {
		albumImageUrl,
		artist,
		isPlaying,
		songUrl,
		title,
	};
}
