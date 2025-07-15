import { PostFragmentType } from "@/app/(core)/blog/post";
import { RichText } from "basehub/react-rich-text";
import { CodeBlock } from "basehub/react-code-block";
import { BodyImage } from "./body-image";
import Image from "next/image";
import { format } from "date-fns";

export function Post({
  _title,
  author,
  date,
  coverImage,
  body,
}: PostFragmentType) {
  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-left text-balance font-bold leading-tigher tracking-tight text-7xl">
        {_title}
      </h1>
      <div className="flex gap-x-2 pb-12 pt-5">
        <div className="flex items-center gap-x-2">
          <Image
            className="rounded-full"
            src={author.avatar.url}
            alt={author._title}
            width={24}
            height={24}
          />
          <p className="text-md font-mono">{author._title}</p>
        </div>
        <span className="select-none">|</span>
        <div className="flex-1">
          <time className="text-md font-mono" dateTime={date}>
            {format(new Date(date), "LLLL	d, yyyy")}
          </time>
        </div>
      </div>

      {/* <div className="hidden md:block md:mb-6">
          {author && <Avatar title={author._title} url={author.avatar.url} />}
        </div> */}
      {/* <div className="hidden md:block md:mb-12 text-base dark:text-white/60 text-black/60">
          <Date dateString={date} />
        </div> */}

      {/* <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={_title} url={coverImage.url} />
        </div> */}

      <div className="mx-auto max-w-2xl">
        {/* <div className="mb-6 block md:hidden">
            {author && <Avatar title={author._title} url={author.avatar.url} />}
          </div>
          <div className="mb-12 text-base dark:text-white/60 text-black/60 block md:hidden">
            <Date dateString={date} />
          </div> */}
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="prose dark:prose-invert">
          <RichText
            components={{
              img: (props) => <BodyImage {...props} />,
              pre: ({ code, language }) => (
                <CodeBlock theme="poimandres" snippets={[{ code, language }]} />
              ),
            }}
          >
            {body.json.content}
          </RichText>
        </div>
      </div>
    </article>
  );
}
