import Image from "next/image";
import Link from "next/link";
import { Activity } from "./activity";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-y-6 px-5">
      <div className="max-w-[600px] flex flex-col">
        <h2 className="font-sans text-5xl font-black pb-4 text-left text-balance">
          Building Stuff on the Internet
        </h2>
        <h1 className="font-mono text-lg font-bold">
          Liam Murray - Software Engineer @ Google
        </h1>
      </div>
      <div className="max-w-[600px] flex flex-col text-md font-semibold text-left text-balance">
        <p>
          Hey there! My name's Liam. I'm a sofware engineer based out of
          Seattle. I work as a software engineer at Google, where I build
          systems that power millions of customer experiences each day. In my
          freetime I work on various side projects, play games, travel, and go
          on walks.
        </p>
      </div>
      <div className="flex items-start max-w-[600px] w-full">
        <p className="font-mono font-bold">
          Follow along on{" "}
          <Link href={"/links"} className="border-b-2 border-foreground">
            the Internet
          </Link>{" "}
          {":)"}
        </p>
      </div>
      <Activity />
    </main>
  );
}
