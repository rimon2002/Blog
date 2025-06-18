// src/Footer.jsx
import { Box, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        padding: 3,
        textAlign: "center",
        backgroundColor: "#f4f4f4",
        marginTop: "auto",
      }}
    >
      <Typography variant="body2">© 2025 My Blog Site</Typography>
      <Typography variant="body2">
        <Link href="/about" sx={{ marginRight: 2 }}>
          About Us
        </Link>
        <Link href="/contact">Contact</Link>
      </Typography>
    </Box>
  );
}

export default Footer;
