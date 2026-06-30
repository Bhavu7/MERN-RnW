// models/Post.js
// Blog post schema, linked to its author (User) and comments (Comment)
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    image: { type: String, default: 'https://picsum.photos/seed/blog/800/400' },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
