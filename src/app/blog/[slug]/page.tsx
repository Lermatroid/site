import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Post } from "@/components/mdx/post";
import { getAllPostSlugs, getPostBySlug, getPostMeta } from "@/lib/blog";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostMeta(slug);
  if (!post) notFound();

  return {
    title: `Post / ${post.title}`,
    description: post.excerpt,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="py-10">
      <section className="mx-auto px-5 pb-5">
        <div className="max-w-2xl w-full mx-auto font-mono flex gap-x-2 pb-16 text-md items-center justify-start">
          <Link href="/blog" className="hover:underline">
            {"<"} Blog
          </Link>
          <div className="flex justify-self-end ml-auto gap-x-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="select-none">|</span>
            <Link href="/stats" className="hover:underline">
              Stats
            </Link>
          </div>
        </div>
        <Post
          title={post.title}
          author={post.author}
          date={post.date}
          content={post.content}
        />
      </section>
      <div className="mt-10 bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/20 w-2xl max-w-[calc(100vw-2.5rem)] mx-auto text-sm p-8 text-card-foreground font-mono font-bold flex flex-col gap-y-2">
        <span className="text-muted-foreground pb-2">// END_OF_ARTICLE.md</span>
        <span>- Thanks for reading!</span>
        <span>
          - If you enjoyed, feel free to follow me on{" "}
          <Link
            href={"/links"}
            className="underline decoration-dotted underline-offset-2"
          >
            the Internet
          </Link>
          .
        </span>
        <span>
          - You can read more posts{" "}
          <Link
            href={"/blog"}
            className="underline decoration-dotted underline-offset-2"
          >
            here
          </Link>{" "}
          or explore the{" "}
          <Link
            href={"/"}
            className="underline decoration-dotted underline-offset-2"
          >
            rest of the site
          </Link>
          .
        </span>
        <span className="pt-2">Cheers! 🍻</span>
      </div>
    </main>
  );
}
