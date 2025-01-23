import React from "react"
import { Box } from "@mui/material"
import { motion } from "framer-motion"
import Post from "./Post.tsx"

interface PostListProps {
  posts: {
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
  }[]
  addComment: (postId: number, content: string, parentCommentId?: number) => void
}

const PostList: React.FC<PostListProps> = ({ posts, addComment }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Post post={post} addComment={addComment} />
        </motion.div>
      ))}
    </Box>
  )
}

export default PostList

