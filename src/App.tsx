import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import Profile from "./pages/Profile.tsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function App() {
  return (
    <Router>
      <AppBar position="sticky">
        <Toolbar variant="regular" sx={{ backgroundColor: "#6D2E46", width: "100%" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white", flexGrow: 1 }}>
            Social Media App
          </Link>
          <Link to="/profile" style={{ textDecoration: "none", color: "white" }}>
            Profile
          </Link>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
