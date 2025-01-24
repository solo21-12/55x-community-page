import React, { useState } from "react";
import { Star } from "lucide-react"; // Import the star icon or any other icon you prefer
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import styles from "./UserProfile.module.css";

interface UserInfo {
  name: string;
  profilePicture: string;
  email: string;
  bio: string;
}

interface UserProfileProps {
  initialUserInfo: UserInfo;
}

const UserProfile: React.FC<UserProfileProps> = ({ initialUserInfo }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would typically send the updated info to a server
    console.log("Updated user info:", userInfo);

    // Navigate back to the social post page after saving
    navigate("/"); // Replace "/social-post" with the actual path to your social post page
  };

  return (
    <div className={styles.userProfile}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePictureContainer}>
          <img
            src={userInfo.profilePicture || "/placeholder.svg?height=200&width=200"}
            alt={`${userInfo.name}'s profile`}
            className={styles.profilePicture}
          />
        </div>
        <h2 className={styles.userName}>
          {userInfo.name}
          <Star style={{ marginLeft: "8px", color: "#FFD700" }} /> {/* Add star icon */}
        </h2>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            placeholder="Name"
            className={styles.input}
          />
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
            className={styles.input}
          />
          <input
            type="text"
            name="profilePicture"
            value={userInfo.profilePicture}
            onChange={handleInputChange}
            placeholder="Profile Picture URL"
            className={styles.input}
          />
          <textarea
            name="bio"
            value={userInfo.bio}
            onChange={handleInputChange}
            placeholder="Bio"
            className={styles.textarea}
          />
          <button type="submit" className={`${styles.button} ${styles.saveButton}`}>
            Save
          </button>
        </form>
      ) : (
        <div className={styles.profileInfo}>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Bio:</strong> {userInfo.bio}
          </p>
          <button onClick={() => setIsEditing(true)} className={`${styles.button} ${styles.editButton}`}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
