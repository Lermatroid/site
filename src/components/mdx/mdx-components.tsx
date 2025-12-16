import Image from "next/image";
import type { ComponentProps } from "react";

type MDXComponents = {
  [key: string]: React.ComponentType<ComponentProps<any>>;
};

function MdxImage({
  src,
  alt,
}: {
  src: string;
  alt?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt ?? "Image"}
      width={800}
      height={450}
      className="rounded-lg"
      priority
    />
  );
}

export const mdxComponents: MDXComponents = {
  img: (props: any) => (
    <MdxImage
      src={props.src as string}
      alt={props.alt}
    />
  ),
  pre: (props: any) => (
    <pre
      {...props}
      className="rounded-lg overflow-x-auto [&>code]:grid [&>code]:p-4"
    />
  ),
  code: (props: any) => <code {...props} />,
  a: (props: any) => (
    <a
      {...props}
      className="underline decoration-dotted underline-offset-2 hover:decoration-solid"
      target={props.href?.startsWith("http") ? "_blank" : undefined}
      rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
    />
  ),
};
