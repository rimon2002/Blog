// src/routes/auth.js
const express = require('express');
const router = express.Router();

// Hardcoded users (for simplicity in your case)
const users = [
  { username: 'Rimon', password: 'Rimon2002', role: 'admin' },
  { username: 'Mahfuz', password: 'Rimon2002', role: 'writer' }
];

// Login route (only admin and writer can create posts)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user in the hardcoded array
  const user = users.find(user => user.username === username);

  if (!user) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Respond with user data after successful login
  res.json({ username: user.username, role: user.role });
});

module.exports = router;
