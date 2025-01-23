import React, { useState } from "react"
import { ListItem, ListItemText, Typography, Button, Box } from "@mui/material"
import { motion } from "framer-motion"
import CommentForm from "./CommentForm.tsx"

interface CommentProps {
  comment: {
    id: number
    username: string
    content: string
    replies: {
      id: number
      username: string
      content: string
      replies: any[]
    }[]
  }
  addComment: (content: string, parentId?: number) => void
}

const Comment: React.FC<CommentProps> = ({ comment, addComment }) => {
  const [showReplyForm, setShowReplyForm] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Typography component="span" variant="body2" color="text.primary">
              <strong>{comment.username}</strong>
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="text.primary">
                {comment.content}
              </Typography>
              <Button size="small" onClick={() => setShowReplyForm(!showReplyForm)}>
                Reply
              </Button>
              {showReplyForm && (
                <Box sx={{ mt: 1 }}>
                  <CommentForm addComment={(content) => addComment(content, comment.id)} />
                </Box>
              )}
            </React.Fragment>
          }
        />
      </ListItem>
      {comment.replies.length > 0 && (
        <Box sx={{ pl: 4 }}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} addComment={addComment} />
          ))}
        </Box>
      )}
    </motion.div>
  )
}

export default Comment

