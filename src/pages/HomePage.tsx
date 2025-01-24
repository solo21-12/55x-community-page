import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import PostList from "../components/PostList.tsx";
import PostForm from "../components/PostForm.tsx";
import { Comment, Post } from "../types/posts.ts";
import { initialPosts } from "../data/posts.ts";
import { supabase } from "../supabaseClient.ts";

library.add(fas);

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
});

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [user, setUser] = useState<any>(null);

  // Fetch user information from Supabase on component mount
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user); // Set user data if logged in
      }

      // Listen for authentication state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null); // Update user data when auth state changes
      });

      return () => {
        subscription.unsubscribe();
      };
    };

    fetchUser();
  }, []);

  const addPost = (caption: string, image: string) => {
    if (!user) {
      return; // Prevent adding post if user is not logged in
    }


    const newPost: Post = {
      id: posts.length + 1,
      username: user?.user_metadata?.full_name || "Anonymous", // Use logged-in user's email or a default value
      avatar: user?.user_metadata?.avatar_url || "https://i.pravatar.cc/150?img=3", // Use user avatar if available
      image,
      caption,
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
  };

  const addComment = (postId: number, content: string, parentCommentId?: number) => {
    if (!user) {
      return; // Prevent adding comment if user is not logged in
    }

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment: Comment = {
            id: Date.now(),
            username: user?.user_metadata?.full_name || "Anonymous", // Use logged-in user's email or a default value
            content,
            replies: [],
          };
          if (parentCommentId) {
            return {
              ...post,
              comments: addReply(post.comments, parentCommentId, newComment),
            };
          } else {
            return { ...post, comments: [...post.comments, newComment] };
          }
        }
        return post;
      })
    );
  };

  const addReply = (comments: Comment[], parentId: number, newReply: Comment): Comment[] => {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, newReply] };
      } else if (comment.replies.length > 0) {
        return { ...comment, replies: addReply(comment.replies, parentId, newReply) };
      }
      return comment;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
  );
};

export default App;
