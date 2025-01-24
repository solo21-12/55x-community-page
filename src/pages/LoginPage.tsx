import React from "react";
import { supabase } from "../supabaseClient.ts";
import { User } from "lucide-react";
import styles from '../styles/LoginPage.module.css';

const LoginPage: React.FC = () => {

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error logging in with Google:", error.message);
    }
  };

  return (
    <div className={styles['login-container']}>
      <div className={styles['login-card']}>
        <h2 className={styles['login-heading']}>Welcome Back</h2>
        <div className={styles['divider-container']}>
          <div className={styles['divider']}></div>
        </div>

        <button onClick={handleLogin} className={styles['google-btn']}>
          <User className={styles['google-icon']} size={18} />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
