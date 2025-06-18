// src/component/LogoutButton.jsx
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LogoutButton({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear user state
    navigate("/login"); // Redirect to Login page
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
}

export default LogoutButton;
