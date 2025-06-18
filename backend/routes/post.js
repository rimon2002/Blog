const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Hardcoded users (admin and writer) for simplicity
const users = [
  { username: 'Rimon', password: 'Rimon2002', role: 'admin' },
  { username: 'Mahfuz', password: 'Rimon2002', role: 'writer' }
];

// Helper function to authenticate user
const authenticateUser = (username, password) => {
  const user = users.find((user) => user.username === username);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
};

// Create Post route (Only admin and writer can create posts)
router.post('/create', (req, res) => {
  const { username, password, title, content } = req.body;

  // Validate if required fields are provided
  if (!username || !password || !title || !content) {
    return res.status(400).json({ message: 'All fields are required (username, password, title, content)' });
  }

  // Authenticate user
  const user = authenticateUser(username, password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Ensure that only admin and writer can create posts
  if (user.role !== 'admin' && user.role !== 'writer') {
    return res.status(403).json({ message: 'You are not authorized to create posts' });
  }

  // Create and save the post
  const newPost = new Post({ title, content, createdBy: username, likes: 0, comments: [] });
  newPost.save()
    .then((post) => res.json(post))  // Return the created post
    .catch((err) => res.status(500).json({ message: 'Error creating post', error: err }));
});

// Get all posts route (for viewing by all users)
router.get('/', (req, res) => {
  Post.find()
    .then((posts) => res.json(posts))  // Return all posts
    .catch((err) => res.status(500).json({ message: 'Error fetching posts', error: err }));
});

// Like Post route (Anyone can like posts)
router.put('/like/:postId', (req, res) => {
  const { postId } = req.params;

  Post.findById(postId)
    .then((post) => {
      if (!post) return res.status(404).json({ message: 'Post not found' });

      post.likes += 1; // Increment like count
      post.save()
        .then(() => res.json({ message: 'Post liked', likes: post.likes }))
        .catch((err) => res.status(500).json({ message: 'Error liking post', error: err }));
    })
    .catch((err) => res.status(500).json({ message: 'Error liking post', error: err }));
});

// Comment on Post route (Anyone can comment)
router.post('/comment/:postId', (req, res) => {
  const { postId } = req.params;
  const { username, comment } = req.body;

  if (!comment || !username) {
    return res.status(400).json({ message: 'Username and comment are required' });
  }

  Post.findById(postId)
    .then((post) => {
      if (!post) return res.status(404).json({ message: 'Post not found' });

      post.comments.push({ username, comment });
      post.save()
        .then(() => res.json({ message: 'Comment added', comments: post.comments }))
        .catch((err) => res.status(500).json({ message: 'Error commenting on post', error: err }));
    })
    .catch((err) => res.status(500).json({ message: 'Error', error: err }));
});

// Delete Post route (Only admin and writer can delete posts)
router.delete('/delete/:postId', (req, res) => {
  const { postId } = req.params;
  const { username, password } = req.body;

  // Authenticate user
  const user = authenticateUser(username, password);
  if (!user) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  // Ensure that only admin and writer can delete posts
  if (user.role !== 'admin' && user.role !== 'writer') {
    return res.status(403).json({ message: 'You are not authorized to delete posts' });
  }

  // Find the post by ID and delete
  Post.findByIdAndDelete(postId)
    .then(() => res.json({ message: 'Post deleted successfully' }))
    .catch((err) => res.status(500).json({ message: 'Error deleting post', error: err }));
});

module.exports = router;
