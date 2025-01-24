import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import CommentList from "./CommentList.tsx";
import CommentForm from "./CommentForm.tsx";

interface PostProps {
  post: {
    id: number;
    username: string;
    avatar: string;
    image: string;
    caption: string;
    likes: number;
    comments: {
      id: number;
      username: string;
      content: string;
      replies: {
        id: number;
        username: string;
        content: string;
        replies: any[];
      }[];
    }[];
  };
  addComment: (postId: number, content: string, parentCommentId?: number) => void;
}

const Post: React.FC<PostProps> = ({ post, addComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card>
      <CardHeader avatar={<Avatar src={post.avatar} alt={post.username} />} title={post.username} />
      <CardMedia component="img" height="500" image={post.image} alt={post.caption} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <strong>{post.username}</strong> {post.caption}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" onClick={handleLike} color={liked ? "error" : "default"}>
          <FontAwesomeIcon icon={faHeart} />
        </IconButton>
        <IconButton aria-label="comment" onClick={() => setShowComments(!showComments)} >
          <FontAwesomeIcon icon={faComment} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
      </CardActions>
      <CardContent sx={{ display: "flex", gap: 2}}>
        <Typography variant="body2" color="text.secondary">
          {likes} {likes === 1 ? "like" : "likes"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}
        </Typography>
      </CardContent>
      {showComments && (
        <Box sx={{ px: 2, pb: 2 }}>
          <CommentList
            comments={post.comments}
            addComment={(content, parentId) => addComment(post.id, content, parentId)}
          />
          <CommentForm addComment={(content) => addComment(post.id, content)} />
        </Box>
      )}
    </Card>
  );
};

export default Post;
