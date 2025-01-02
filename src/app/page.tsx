import Link from "next/link";
import Wave from "@/components/Wave";
import Image from "next/image";
import { Github, Linkedin, Instagram } from "lucide-react";
import GitHubCalendar from "react-github-calendar";
import SpotifyBubble from "@/components/spotify-bubble";
import { Suspense } from "react";

export const experimental_ppr = true;

export default async function Home() {
	return (
		<>
			<main className="relative min-h-screen font-gsans">
				<div className="fixed z-50 flex justify-around items-center font-gmono w-[325px] h-[50px] bg-black border-white border rounded-full top-5 left-5 px-5">
					<Link href="/#projects" className="cursor-pointer hover:underline">
						Projects
					</Link>
					<Link href="/#about" className="cursor-pointer hover:underline">
						About
					</Link>
					<Link href="/contact" className="cursor-pointer hover:underline">
						Contact
					</Link>
				</div>
				<div className="absolute flex flex-col justify-center gap-y-2 top-[50%] right-0 w-[40vw] h-[50vh]">
					<h1 className="text-6xl font-black font-gmono">Liam Murray</h1>
					<p className="font-gmono">Building Stuffs On The Internet</p>
				</div>
				<Wave />
			</main>
			<section
				className="min-h-[calc(100vh+16rem)] grid grid-cols-4 grid-rows-4 gap-4 w-screen p-10 pt-80"
				id="about"
			>
				<div className="col-span-2 row-span-2 rounded-2xl p-5 flex flex-col justify-center">
					<h1 className="font-black font-mono text-5xl">Hey there 👋</h1>
					<p className="font-mono font-bold text-md leading-normal pt-5">
						My name's Liam. I'm a sofware engineer based out of San Antonio. I'm
						currently studying Computer Science at the University of Texas at San
						Antonio while working on the side as a freelance software engineer. During
						my freetime I enjoy playing games, working on side projects, and walking.
					</p>
				</div>
				<div className="col-span-2 col-start-1 row-start-3 rounded-2xl bg-zinc-950 p-5 flex flex-col justify-between">
					<p className="font-mono font-bold text-md leading-normal">On The Internet @</p>
					<div className="flex gap-x-10 justify-center items-center px-5">
						<Link href="https://github.com/lermatroid" target="_blank">
							<Github
								size={50}
								color="white"
								className="hover:opacity-80 transition-opacity"
							/>
						</Link>
						<Link href="https://www.linkedin.com/in/liamrmurray/" target="_blank">
							<Linkedin
								size={50}
								color="white"
								className="hover:opacity-80 transition-opacity"
							/>
						</Link>
						<Link href="https://bsky.app/profile/liam.so" target="_blank">
							<Image
								className="invert hover:opacity-80 transition-opacity"
								src="/img/bsky.webp"
								alt="Bluesky"
								width={50}
								height={50}
								priority
							/>
						</Link>
						<Link href="https://instagram.com/lermatroid" target="_blank">
							<Instagram
								size={50}
								color="white"
								className="hover:opacity-80 transition-opacity"
							/>
						</Link>
					</div>
					<Link
						href="/links"
						className="font-mono font-bold text-md leading-normal self-end hover:underline"
					>
						Links &rArr;
					</Link>
				</div>
				<div className="col-start-3 row-start-1 rounded-2xl bg-zinc-950 p-5 flex flex-col items-center justify-center">
					<p className="font-mono font-bold text-2xl leading-normal text-center">
						{"Projects </>"}
					</p>
				</div>
				<div className="col-start-3 row-start-2 rounded-2xl bg-zinc-950 p-5 flex items-center justify-center">
					<Image
						alt="The HackKit Logo"
						src={"/img/projects/hackkit.png"}
						width={100}
						height={100}
					/>
				</div>
				<div className="col-start-4 row-start-2 rounded-2xl bg-zinc-950 p-5">5</div>
				<div className="col-span-2 col-start-3 row-start-3 rounded-2xl bg-zinc-950 p-5 scrollbar-none flex flex-col items-center justify-center">
					<GitHubCalendar
						hideTotalCount={true}
						colorScheme="dark"
						username="lermatroid"
						blockSize={9}
					/>
				</div>
				<div className="col-start-4 row-start-1 rounded-2xl bg-zinc-950 p-5 flex-col flex gap-y-4 items-center justify-center">
					<Image
						alt="The HackKit Logo"
						src={"/img/projects/hackkit.png"}
						width={100}
						height={100}
					/>
					<p className="font-mono font-bold text-lg leading-normal">HackKit</p>
				</div>
				<div className="col-span-2 col-start-3 row-start-4 rounded-2xl bg-zinc-950 p-5 flex flex-col justify-between">
					<p className="font-mono font-bold text-md leading-normal">Previously @</p>
					<div className="flex gap-x-2 justify-around items-center px-5">
						<Image
							src="/img/exp/googlecolor.png"
							alt="Google Icon"
							height={100}
							width={100}
						/>
						<Image
							src="/img/exp/karat.jpeg"
							alt="Karat Icon"
							height={100}
							width={100}
						/>
						<Image
							src="/img/exp/acm.png"
							className="object-contain"
							alt="ACM Icon"
							height={100}
							width={100}
						/>
						<Image src="/img/exp/utsa.png" alt="ACM Icon" height={100} width={100} />
					</div>
					<Link
						href="/resume"
						className="font-mono font-bold text-md leading-normal self-end hover:underline"
					>
						Resume &rArr;
					</Link>
				</div>
				<div className="col-start-1 row-start-4 rounded-2xl bg-zinc-950 p-5">10</div>
				<Suspense fallback={<div>Loading...</div>}>
					<SpotifyBubble />
				</Suspense>
			</section>
		</>
	);
}
