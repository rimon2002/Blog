const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: [
    {
      username: { type: String },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdBy: { type: String },  // Store the username of the creator (admin or writer)
});

module.exports = mongoose.model('Post', postSchema);
