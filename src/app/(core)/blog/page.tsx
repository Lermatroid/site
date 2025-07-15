import { Pump } from "basehub/react-pump";
import { fragmentOn } from "basehub";
import Link from "next/link";
import { format } from "date-fns";

import { PostMetaFragment, type PostMetaFragmentType } from "./post";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-full gap-y-6 px-5">
      <div className="max-w-[600px] w-full flex flex-col items-start">
        <div>
          <h2 className="font-sans text-7xl font-black pb-10 text-left text-balance">
            Blog
          </h2>
        </div>
        <Pump
          queries={[
            {
              blog: {
                morePosts: true,
                posts: {
                  __args: { orderBy: "date__DESC" },
                  items: PostMetaFragment,
                },
              },
            },
          ]}
        >
          {async ([{ blog }]) => {
            "use server";

            return (
              <div className="flex flex-col gap-y-2 [&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-muted">
                {blog.posts.items.map((item) => (
                  <BlogPostItem key={item._id} {...item} />
                ))}
              </div>
            );
          }}
        </Pump>
        <div className="h-32 bg-gradient-to-b from-transparent to-background"></div>
      </div>
    </main>
  );
}

function BlogPostItem({
  _title,
  coverImage,
  date,
  excerpt,
  author,
  _slug,
}: PostMetaFragmentType) {
  return (
    <Link href={`/blog/${_slug}`}>
      <div className="pt-2 pb-4">
        <h3 className="text-xl font-mono font-bold">{_title}</h3>
        <time className="text-sm" dateTime={date}>
          {format(new Date(date), "LLLL	d, yyyy")}
        </time>
      </div>
    </Link>
  );
}
