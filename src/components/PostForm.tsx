
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Send } from "lucide-react";
import  styles from "./PostForm.module.css";
interface PostFormProps {
  addPost: (caption: string, image: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (caption.trim() && image.trim()) {
      setIsPosting(true);
      // Simulate a network request
      for (let i = 0; i <= 100; i += 10) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
      addPost(caption, image);
      setCaption("");
      setImage("");
      setIsPosting(false);
      setProgress(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={styles.postForm}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            placeholder="Write a post*..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={styles.textarea}
            rows={3}
          />
        </div>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Image URL*"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={styles.input}
          />
          <Image
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#ccc",
              width: "16px",
              height: "16px",
            }}
          />
        </div>
        <button
          type="submit"
          disabled={isPosting || !caption.trim() || !image.trim()}
          className={styles.button}
        >
          {isPosting ? (
            "Posting..."
          ) : (
            <>
              <Send style={{ width: "16px", height: "16px", marginRight: "8px"}} />
              Post
            </>
          )}
        </button>
        {isPosting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ marginTop: "10px" }}
          >
            <div
              style={{
                width: "100%",
                height: "4px",
                backgroundColor: "#ddd",
                borderRadius: "2px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#4a90e2",
                  transition: "width 0.2s ease",
                }}
              />
            </div>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default PostForm;
