import React from "react"
import { useState } from "react"
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
} from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComment, faPaperPlane, faBookmark } from "@fortawesome/free-solid-svg-icons"
import CommentList from "./CommentList.tsx"
import CommentForm from "./CommentForm.tsx"

interface PostProps {
  post: {
    id: number
    username: string
    avatar: string
    image: string
    caption: string
    likes: number
    comments: {
      id: number
      username: string
      content: string
      replies: {
        id: number
        username: string
        content: string
        replies: any[]
      }[]
    }[]
  }
  addComment: (postId: number, content: string, parentCommentId?: number) => void
}

const Post: React.FC<PostProps> = ({ post, addComment }) => {
  const [showComments, setShowComments] = useState(false)

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
        <IconButton aria-label="like">
          <FontAwesomeIcon icon={faHeart} />
        </IconButton>
        <IconButton aria-label="comment" onClick={() => setShowComments(!showComments)}>
          <FontAwesomeIcon icon={faComment} />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.likes} likes
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
  )
}

export default Post

