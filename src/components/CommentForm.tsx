import type React from "react"
import { useState } from "react"
import { TextField, Button, Box } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

interface CommentFormProps {
  addComment: (content: string) => void
}

const CommentForm: React.FC<CommentFormProps> = ({ addComment }) => {
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      addComment(content)
      setContent("")
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", alignItems: "center", mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Add a comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{ mr: 1 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
      >
        Post
      </Button>
    </Box>
  )
}

export default CommentForm

