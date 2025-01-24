import React, { useState } from "react";
import { motion } from "framer-motion";
import { Image, Send } from "lucide-react";
import styles from "./PostForm.module.css";

interface PostFormProps {
  addPost: (caption: string, image: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ addPost }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string>("");
  const [isPosting, setIsPosting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Update image state with the preview
      };
      reader.readAsDataURL(file); // Reads the file and converts it to a data URL
    }
  };

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
            placeholder="Write a caption*..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={styles.textarea}
            rows={3}
          />
        </div>

        {/* Full Button Area for Image Selection */}
        <div className={styles.inputContainer} onClick={() => document.getElementById("imageInput")?.click()}>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }} // Hide the file input
          />
          <input
            type="text"
            placeholder="Select Image*"
            value={image ? "Image selected" : ""}
            readOnly
            className={styles.input}
          />
          <label
            className={styles.imageLabel}
          >
          </label>
        </div>

        {/* Image Preview */}
        {image && (
          <div style={{ textAlign: "center", marginBottom: "20px", marginTop: "20px" }}>
            <img
              src={image}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isPosting || !caption.trim() || !image.trim()}
          className={styles.button}
        >
          {isPosting ? (
            "Posting..."
          ) : (
            <>
              <Send style={{ width: "16px", height: "16px", marginRight: "8px" }} />
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
                  backgroundColor: "#6D2E46",
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
