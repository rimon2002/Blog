// src/Contact.jsx
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message sent from: ${email}`);
  };

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Send Message
        </Button>
      </form>
    </Box>
  );
}

export default Contact;
