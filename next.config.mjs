/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/bsky",
				destination: "https://bsky.app/profile/liam.so",
				permanent: false,
			},
			{
				source: "/twitter",
				destination: "https://x.com/lermatroid",
				permanent: false,
			},
			{
				source: "/x",
				destination: "https://x.com/lermatroid",
				permanent: false,
			},
			{
				source: "/github",
				destination: "https://github.com/lermatroid",
				permanent: false,
			},
			{
				source: "/gh",
				destination: "https://github.com/lermatroid",
				permanent: false,
			},
			{
				source: "/instagram",
				destination: "https://www.instagram.com/lermatroid",
				permanent: false,
			},
			{
				source: "/ig",
				destination: "https://www.instagram.com/lermatroid",
				permanent: false,
			},
			{
				source: "/instagram",
				destination: "https://www.instagram.com/lermatroid",
				permanent: false,
			},
			{
				source: "/linkedin",
				destination: "https://linkedin.com/in/liamrmurray",
				permanent: false,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
				pathname: "/image/**",
			},
		],
	},
	experimental: {
		ppr: "incremental",
	},
};

export default nextConfig;
