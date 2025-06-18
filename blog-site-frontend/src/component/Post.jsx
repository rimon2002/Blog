// src/component/Post.jsx
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Post({ user }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // Success message for post creation
  const navigate = useNavigate();

  // Fetch posts when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts.");
        setLoading(false);
      });
  }, []);

  // Create a new post
  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      setError("Both title and content are required.");
      return;
    }

    if (!user) {
      setError("You need to be logged in to create a post.");
      return;
    }

    setLoading(true);
    setSuccessMessage(""); // Clear any previous success message

    axios
      .post("http://localhost:5000/api/posts/create", {
        username: user.username,
        password: "Rimon2002", // Using hardcoded password (consider using a secure way)
        title: newPost.title,
        content: newPost.content,
      })
      .then((response) => {
        setLoading(false);
        setSuccessMessage("Post created successfully!");
        setError(null); // Clear any error
        setPosts([...posts, response.data]); // Update posts list with the new post
      })
      .catch((err) => {
        setLoading(false);
        setError("Failed to create post.");
        console.error("Error creating post:", err);
      });
  };

  // Delete post functionality (only for admin and writer)
  const handleDeletePost = (postId) => {
    if (!user) {
      setError("You need to be logged in to delete a post.");
      return;
    }

    axios
      .delete(`http://localhost:5000/api/posts/delete/${postId}`, {
        data: { username: user.username, password: "Rimon2002" }, // Hardcoded password (secure it better)
      })
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId)); // Remove deleted post from the list
        setSuccessMessage("Post deleted successfully!");
      })
      .catch((err) => {
        setError("Failed to delete post.");
        console.error("Error deleting post:", err);
      });
  };

  // Handle like functionality
  const handleLike = (postId) => {
    axios
      .put(`http://localhost:5000/api/posts/like/${postId}`)
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post._id === postId ? { ...post, likes: post.likes + 1 } : post
          )
        );
      })
      .catch((err) => console.error("Error liking post:", err));
  };

  // Handle comment submit
  const handleCommentSubmit = (postId) => {
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    if (!user) {
      setError("You need to be logged in to comment.");
      return;
    }

    axios
      .post(`http://localhost:5000/api/posts/comment/${postId}`, {
        username: user.username,
        comment,
      })
      .then((response) => {
        setPosts(
          posts.map((post) =>
            post._id === postId
              ? { ...post, comments: [...post.comments, response.data.comment] }
              : post
          )
        );
        setComment(""); // Clear the comment input field
        setError(null); // Clear error
      })
      .catch((err) => {
        setError("Failed to add comment.");
        console.error("Error commenting:", err);
      });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {/* Success message */}
      {successMessage && (
        <Typography color="primary">{successMessage}</Typography>
      )}

      {/* Error message */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Create Post for Admin/Writer */}
      {(user?.role === "admin" || user?.role === "writer") && (
        <div>
          <Typography variant="h6">Create Post</Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            style={{ marginBottom: "15px" }}
          />
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newPost.content}
            onChange={(e) =>
              setNewPost({ ...newPost, content: e.target.value })
            }
            style={{ marginBottom: "15px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePost}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Create Post"}
          </Button>
        </div>
      )}

      {/* Display Posts */}
      {posts.map((post) => (
        <div key={post._id} style={{ marginBottom: "20px" }}>
          <Typography variant="h6">{post.title}</Typography>
          <Typography>{post.content}</Typography>

          {/* Like Button */}
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleLike(post._id)}
          >
            Like {post.likes}
          </Button>

          {/* Comments Section */}
          <div style={{ marginTop: "20px" }}>
            <Typography variant="h6">Comments:</Typography>
            {post.comments.length > 0 ? (
              post.comments.map((comment, index) => (
                <Typography key={index} variant="body2">
                  {comment.username}: {comment.comment}
                </Typography>
              ))
            ) : (
              <Typography>No comments yet.</Typography>
            )}
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ marginTop: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCommentSubmit(post._id)}
              style={{ marginTop: "10px" }}
            >
              Add Comment
            </Button>
          </div>

          {/* Delete button only for admin and writer */}
          {(user?.role === "admin" || user?.role === "writer") && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeletePost(post._id)}
              style={{ marginTop: "10px" }}
            >
              Delete Post
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Post;
