import React from "react"
import { useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { motion, AnimatePresence } from "framer-motion"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import PostList from "../src/components/PostList.tsx"
import PostForm from "../src/components/PostForm.tsx"

library.add(fas)

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#405DE6",
    },
    secondary: {
      main: "#E1306C",
    },
    background: {
      default: "#FAFAFA",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
})

interface Post {
  id: number
  username: string
  avatar: string
  image: string
  caption: string
  likes: number
  comments: Comment[]
}

interface Comment {
  id: number
  username: string
  content: string
  replies: Comment[]
}

const initialPosts: Post[] = [
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
        replies: [{ id: 2, username: "john_doe", content: "Thanks Jane!", replies: [] }],
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
]

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts)

  const addPost = (caption: string, image: string) => {
    const newPost: Post = {
      id: posts.length + 1,
      username: "current_user", // In a real app, this would be the logged-in user
      avatar: "https://i.pravatar.cc/150?img=3",
      image,
      caption,
      likes: 0,
      comments: [],
    }
    setPosts([newPost, ...posts])
  }

  const addComment = (postId: number, content: string, parentCommentId?: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = { id: Date.now(), username: "current_user", content, replies: [] }
          if (parentCommentId) {
            return {
              ...post,
              comments: addReply(post.comments, parentCommentId, newComment),
            }
          } else {
            return { ...post, comments: [...post.comments, newComment] }
          }
        }
        return post
      }),
    )
  }

  const addReply = (comments: Comment[], parentId: number, newReply: Comment): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, newReply] }
      } else if (comment.replies.length > 0) {
        return { ...comment, replies: addReply(comment.replies, parentId, newReply) }
      }
      return comment
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            InstaClone
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PostForm addPost={addPost} />
              <PostList posts={posts} addComment={addComment} />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default App

