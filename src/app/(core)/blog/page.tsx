import Link from "next/link";
import { format } from "date-fns";
import type { Metadata } from "next";
import { getAllPosts, type PostMeta } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  const posts = getAllPosts();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-y-6 px-5">
      <div className="max-w-[600px] w-full flex flex-col items-start">
        <div>
          <h2 className="font-sans text-7xl font-black pb-10 text-left text-balance">
            Blog
          </h2>
        </div>
        <div className="flex flex-col gap-y-2 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-muted">
          {posts.map((post) => (
            <BlogPostItem key={post.slug} {...post} />
          ))}
        </div>
        <div className="h-32 bg-gradient-to-b from-transparent to-background"></div>
      </div>
    </main>
  );
}

function BlogPostItem({ title, date, slug }: PostMeta) {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="pt-2 pb-4">
        <h3 className="text-xl font-mono font-bold">{title}</h3>
        <time className="text-sm" dateTime={date}>
          {format(new Date(date), "LLLL	d, yyyy")}
        </time>
      </div>
    </Link>
  );
}
