import { Post } from "../types/posts.ts";

export const initialPosts: Post[] = [
  {
    id: 1,
    username: "john_doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    image: "https://picsum.photos/id/1018/1000/1000",
    caption: "Beautiful sunset at the beach! 🌅 #sunset #beach",
    likes: 120,
    comments: [
      {
        id: 1,
        username: "jane_smith",
        content: "Wow, that's gorgeous!",
        replies: [
          { id: 2, username: "john_doe", content: "Thanks Jane!", replies: [] },
        ],
      },
    ],
  },
  {
    id: 2,
    username: "travel_enthusiast",
    avatar: "https://i.pravatar.cc/150?img=2",
    image: "https://picsum.photos/id/1019/1000/1000",
    caption: "Exploring the mountains today 🏔️ #adventure #hiking",
    likes: 85,
    comments: [],
  },
];
