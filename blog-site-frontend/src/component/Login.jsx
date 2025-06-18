// src/component/Login.jsx
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For displaying error message on invalid login
  const [successMessage, setSuccessMessage] = useState(""); // For displaying success message after login

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username, password }
      );

      setUser({ username: response.data.username, role: response.data.role }); // Set user state after successful login

      setSuccessMessage("Successfully logged in!");
      setError(""); // Clear any error message
    } catch (err) {
      setError("Invalid username or password.");
      setSuccessMessage(""); // Clear success message if login fails
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {successMessage && (
        <Typography
          color="primary"
          style={{ marginBottom: "15px", fontWeight: "bold" }}
        >
          {successMessage}
        </Typography>
      )}

      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: "15px" }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "15px" }}
      />

      {error && (
        <Typography color="error" style={{ marginBottom: "15px" }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
