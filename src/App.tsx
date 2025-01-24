import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import Profile from "./pages/Profile.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { FaHome, FaUserCircle } from "react-icons/fa";

const App: React.FC = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar
          variant="regular"
          sx={{ backgroundColor: "#6D2E46", width: "100%" }}
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
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaUserCircle style={{ marginRight: "8px" }} /> Profile
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {/* Route Configuration */}
      <Routes>
        {/* Protected Routes */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />}
        />

        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
};

export default App;
