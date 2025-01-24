"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import styles from "../styles/CommentForm.module.css";

interface CommentFormProps {
  addComment: (content: string) => void;
  onFormClose?: () => void; // Optional callback to close the form
}

const CommentForm: React.FC<CommentFormProps> = ({ addComment, onFormClose }) => {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent("");
      if (onFormClose) {
        onFormClose();
      }
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.textareaWrapper}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={1}
        />
        <button
          type="submit"
          disabled={!content.trim()}
          className={`${styles.button} ${!content.trim() ? styles.disabledButton : ""}`}
        >
          <Send size={16} />
        </button>
      </div>
      <div className={styles.characterCount}>{content.length}/2200</div>
    </form>
  );
};

export default CommentForm;
