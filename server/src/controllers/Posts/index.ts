import { Request, Response } from "express";

type Post = { username: string; title: string };
const posts: Post[] = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

const getPosts = (req: Request, res: Response) => {
  const filteredPosts = posts.filter((post) => post.username === req.userId);
  return res.json(filteredPosts);
};

export const Posts = { getPosts };
