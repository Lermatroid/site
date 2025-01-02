import Link from "next/link";

export default function Page() {
	return (
		<>
			<main className="min-h-screen w-screen dotBg flex flex-col items-center justify-center text-black">
				<div className="aspect-video max-w-[600px] w-full bg-white border-black border-2 rounded-xl flex flex-col items-center justify-center">
					<h1 className="font-gmono font-bold text-3xl">Links</h1>
					<h2 className="pb-12 pt-2 text-sm font-semibold font-gmono">
						Other places I'm on the <span className="underline">internet</span>.
					</h2>
					<div className="flex items-center justify-center gap-y-2 gap-x-2 flex-wrap max-w-[300px]">
						<Link href={"https://github.com/lermatroid"}>
							<button className="bg-black text-white font-gmono text-md rounded py-2 px-2 font-bold">
								GitHub
							</button>
						</Link>
						<Link href={"https://linkedin.com/in/liamrmurray"}>
							<button className="bg-black text-white font-gmono text-md rounded py-2 px-2 font-bold">
								Linkedin
							</button>
						</Link>
						<Link href={"https://bsky.app/profile/liam.so"}>
							<button className="bg-black text-white font-gmono text-md rounded py-2 px-2 font-bold">
								BlueSky
							</button>
						</Link>
						<Link href={"https://instagram.com/lermatroid"}>
							<button className="bg-black text-white font-gmono text-md rounded py-2 px-2 font-bold">
								Instagram
							</button>
						</Link>
						<Link href={"https://twitter.com/lermatroid"}>
							<button className="bg-black text-white font-gmono text-md rounded py-2 px-2 font-bold">
								Twitter
							</button>
						</Link>
					</div>
				</div>
				<div className="text-black font-gmono flex items-start w-full max-w-[600px] pt-2">
					<Link href={"/"} className="underline cursor-pointer bg-white">
						Home
					</Link>
				</div>
			</main>
		</>
	);
}
