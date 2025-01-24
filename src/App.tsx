import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { FaHome } from "react-icons/fa";
import { supabase } from "./supabaseClient.ts"; // Supabase client

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session); // Set login status based on session presence
      setLoading(false); // Stop showing loading spinner
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut(); // Sign out the user
    setIsLoggedIn(false); // Update login state
  };

  if (loading) {
    // Show a loading spinner while authentication is being checked
    return <div>Loading...</div>;
  }

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar
          variant="regular"
          sx={{ backgroundColor: "#6D2E46"}}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaHome style={{ marginRight: "8px" }} /> Social Media App
          </Link>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </Toolbar>
      </AppBar>

      {/* Route Configuration */}
      <Routes>
        {/* Protected Route */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />

        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
