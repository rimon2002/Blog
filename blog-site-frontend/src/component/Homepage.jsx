// src/component/HomePage.jsx
import { Box, Typography } from "@mui/material";

function HomePage() {
  return (
    <Box
      sx={{
        backgroundImage: "url(/src/assets/humanity.png)", // Path to the image in the public/assets folder
        backgroundSize: "cover", // Ensure the background image covers the whole page
        backgroundPosition: "center", // Center the image
        height: "100vh", // Full height of the viewport
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: { xs: 2, sm: 4 }, // Responsive padding (small padding on mobile, larger padding on desktop)
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "white",
          fontSize: { xs: "2rem", sm: "3rem" }, // Font size adjusts for mobile and desktop
        }}
      ></Typography>
      <Typography
        variant="h6"
        paragraph
        sx={{
          color: "white",
          fontSize: { xs: "1rem", sm: "1.25rem" }, // Font size adjusts for mobile and desktop
        }}
      ></Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{
          color: "white",
          fontSize: { xs: "0.875rem", sm: "1rem" }, // Font size adjusts for mobile and desktop
        }}
      ></Typography>
    </Box>
  );
}

export default HomePage;
