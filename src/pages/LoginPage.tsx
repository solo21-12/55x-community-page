import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple username/password validation
    if (username === "admin" && password === "password") {
      localStorage.setItem("isLoggedIn", "true"); // Set login state
      navigate("/"); // Redirect to home page
    } else {
      alert("Invalid username or password!"); // Show error if invalid
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Log In
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            color="primary"
          >
            Log In
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
