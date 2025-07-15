import { fragmentOn } from "basehub";

export const PostMetaFragment = fragmentOn("PostsItem", {
  _id: true,
  _slug: true,
  _title: true,
  author: {
    _title: true,
    avatar: {
      url: true,
      alt: true,
    },
  },
  coverImage: {
    url: true,
    alt: true,
  },
  date: true,
  excerpt: true,
});

export type PostMetaFragmentType = fragmentOn.infer<typeof PostMetaFragment>;

export const PostFragment = fragmentOn("PostsItem", {
  ...PostMetaFragment,
  body: { json: { content: true } },
});

export type PostFragmentType = fragmentOn.infer<typeof PostFragment>;
