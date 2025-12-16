import Image from "next/image";
import { format } from "date-fns";

interface PostProps {
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: React.ReactElement;
}

export function Post({ title, author, date, content }: PostProps) {
  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-left text-balance font-bold leading-tigher tracking-tight text-7xl">
        {title}
      </h1>
      <div className="flex gap-x-2 pb-12 pt-5">
        <div className="flex items-center gap-x-2">
          <Image
            className="rounded-full"
            src={author.avatar}
            alt={author.name}
            width={24}
            height={24}
          />
          <p className="text-md font-mono">{author.name}</p>
        </div>
        <span className="select-none">|</span>
        <div className="flex-1">
          <time className="text-md font-mono" dateTime={date}>
            {format(new Date(date), "LLLL	d, yyyy")}
          </time>
        </div>
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="prose dark:prose-invert">{content}</div>
      </div>
    </article>
  );
}

