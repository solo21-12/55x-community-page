export interface Post {
  id: number;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  username: string;
  content: string;
  replies: Comment[];
}
