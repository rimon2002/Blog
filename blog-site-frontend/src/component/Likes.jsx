// src/component/Likes.jsx
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";

function Likes({ post, user }) {
  const [likeCount, setLikeCount] = useState(post.likes || 0); // Default to 0 if no likes exist
  const [comment, setComment] = useState(""); // Stores the comment input
  const [comments, setComments] = useState(post.comments || []); // Default to empty if no comments exist
  const [error, setError] = useState(null);

  // Handle like button click
  const handleLike = () => {
    axios
      .put(`http://localhost:5000/api/posts/like/${post._id}`)
      .then((response) => {
        setLikeCount(likeCount + 1); // Increment like count in frontend
      })
      .catch((err) => {
        setError("Failed to like the post.");
        console.error("Error liking post:", err);
      });
  };

  // Handle comment submit
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    axios
      .post(`http://localhost:5000/api/posts/comment/${post._id}`, {
        username: user.username, // Get the current logged-in username
        comment: comment,
      })
      .then((response) => {
        setComments([...comments, response.data.comment]); // Add new comment to state
        setComment(""); // Clear comment input field
        setError(null); // Clear error
      })
      .catch((err) => {
        setError("Failed to add comment.");
        console.error("Error commenting:", err);
      });
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {/* Like Button */}
      <Button variant="contained" color="primary" onClick={handleLike}>
        Like {likeCount}
      </Button>

      {/* Comment Section */}
      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6">Comments:</Typography>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Typography key={index} variant="body2" sx={{ marginBottom: 1 }}>
              {comment}
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
          onChange={handleCommentChange}
          style={{ marginTop: "10px" }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          style={{ marginTop: "10px" }}
        >
          Add Comment
        </Button>

        {error && <Typography color="error">{error}</Typography>}
      </div>
    </div>
  );
}

export default Likes;
