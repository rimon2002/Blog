// src/About.jsx
import { Box, Typography } from "@mui/material";

function About() {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1">
        We are a blogging platform that allows users to share their thoughts,
        stories, and experiences. Our goal is to provide a space for creativity,
        learning, and communication.
      </Typography>
    </Box>
  );
}

export default About;
