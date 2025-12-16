import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
// @ts-expect-error - no types available
import rehypeFigure from "@microflash/rehype-figure";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx/mdx-components";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage?: string;
}

export interface Post extends PostMeta {
  content: React.ReactElement;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostMeta(slug))
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);

  return {
    title: data.title,
    slug,
    date: data.date,
    excerpt: data.excerpt,
    author: {
      name: data.author?.name ?? "Liam Murray",
      avatar: data.author?.avatar ?? "/img/avatar.jpg",
    },
    coverImage: data.coverImage,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [
          rehypeFigure,
          [
            rehypePrettyCode,
            {
              theme: "poimandres",
              keepBackground: true,
            },
          ],
        ],
      },
    },
  });

  return {
    title: data.title,
    slug,
    date: data.date,
    excerpt: data.excerpt,
    author: {
      name: data.author?.name ?? "Liam Murray",
      avatar: data.author?.avatar ?? "/img/avatar.jpg",
    },
    coverImage: data.coverImage,
    content: mdxContent,
  };
}
