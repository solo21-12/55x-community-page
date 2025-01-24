import React, { useState } from "react";
import { ListItem, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import CommentForm from "./CommentForm.tsx";

interface CommentProps {
  comment: {
    id: number;
    username: string;
    content: string;
    replies: {
      id: number;
      username: string;
      content: string;
      replies: any[];
    }[];
  };
  addComment: (content: string, parentId?: number) => void;
  depth: number; // Add a depth prop to track nesting level
}

const Comment: React.FC<CommentProps> = ({ comment, addComment, depth }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleAddComment = (content: string) => {
    addComment(content, comment.id);
    setShowReplyForm(false);
  };

  const handleReplyClick = () => {
    setShowReplyForm((prev) => !prev);
  };

  // Limit the nesting to 3 levels
  const shouldShowReplies = depth < 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ListItem alignItems="flex-start">
        <Box sx={{ width: '100%' }}>
          <Typography component="span" variant="body2" color="text.primary">
            <strong>{comment.username}</strong>
          </Typography>

          <Box component="div" sx={{ mt: 1 }}>
            <Typography component="span" variant="body2" color="text.primary">
              {comment.content}
            </Typography>
            {/* Render Reply button only if depth < 3 */}
            {depth < 3 && (
              <>
                <Button size="small" onClick={handleReplyClick}>
                  Reply
                </Button>
                {showReplyForm && (
                  <Box sx={{ mt: 1 }}>
                    <CommentForm addComment={handleAddComment} />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      </ListItem>

      {/* Render replies if shouldShowReplies is true */}
      {shouldShowReplies && comment.replies.length > 0 && (
        <Box sx={{ pl: 4 }}>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              addComment={addComment}
              depth={depth + 1}
            />
          ))}
        </Box>
      )}




    </motion.div>
  );
};

export default Comment;
