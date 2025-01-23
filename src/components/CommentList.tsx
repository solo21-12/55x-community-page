import React from "react"
import { List } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import Comment from "./Comment.tsx"

interface CommentListProps {
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
  addComment: (content: string, parentId?: number) => void
}

const CommentList: React.FC<CommentListProps> = ({ comments, addComment }) => {
  return (
    <List>
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Comment comment={comment} addComment={addComment} />
          </motion.div>
        ))}
      </AnimatePresence>
    </List>
  )
}

export default CommentList

