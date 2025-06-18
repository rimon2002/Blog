// src/component/Navbar.jsx
import MenuIcon from "@mui/icons-material/Menu"; // Material UI Menu icon
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => setOpen(!open);

  const handleLogout = () => {
    setUser(null); // Clear the user state to log out
    window.location.href = "/login"; // Redirect to the Login page
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(90deg, #00d4ff, #090979)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Blog Site
        </Typography>

        {/* Display hamburger menu on small screens */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <IconButton edge="end" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          <Button color="inherit" component={Link} to="/posts">
            Posts
          </Button>

          {/* Show Logout Button if user is logged in */}
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer (Hamburger Menu) */}
      <Drawer anchor="right" open={open} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            Contact
          </Button>
          <Button color="inherit" component={Link} to="/posts">
            Posts
          </Button>
          {/* Show Logout Button if user is logged in */}
          {user && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
          {/* Show Login Button if user is NOT logged in */}
          {!user && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
