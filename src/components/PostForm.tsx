import React from "react"
import { useState } from "react"
import { Box, TextField, Button, LinearProgress } from "@mui/material"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

interface PostFormProps {
  addPost: (caption: string, image: string) => void
}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [caption, setCaption] = useState("")
  const [image, setImage] = useState("")
  const [isPosting, setIsPosting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (caption.trim() && image.trim()) {
      setIsPosting(true)
      // Simulate a network request
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }
      addPost(caption, image)
      setCaption("")
      setImage("")
      setIsPosting(false)
      setProgress(0)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <FontAwesomeIcon icon={faImage} style={{ marginRight: "8px" }} />,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isPosting}
          startIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          Post
        </Button>
        {isPosting && <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />}
      </Box>
    </motion.div>
  )
}

export default PostForm

