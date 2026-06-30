// controllers/commentController.js
// Handles creating and deleting comments on posts
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// POST /blog/:id/comments - add a comment to a post
exports.create = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      req.flash('error', 'Post not found');
      return res.redirect('/blog');
    }
    const { text } = req.body;
    if (!text || !text.trim()) {
      req.flash('error', 'Comment cannot be empty');
      return res.redirect(`/blog/${post._id}`);
    }
    await Comment.create({ text, post: post._id, author: req.session.userId });
    req.flash('success', 'Comment added');
    res.redirect(`/blog/${post._id}#comments`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not add comment');
    res.redirect('/blog');
  }
};

// DELETE /blog/:id/comments/:commentId - delete own comment
exports.destroy = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      req.flash('error', 'Comment not found');
      return res.redirect(`/blog/${req.params.id}`);
    }
    if (comment.author.toString() !== req.session.userId) {
      req.flash('error', 'Not authorized to delete this comment');
      return res.redirect(`/blog/${req.params.id}`);
    }
    await comment.deleteOne();
    req.flash('success', 'Comment deleted');
    res.redirect(`/blog/${req.params.id}#comments`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not delete comment');
    res.redirect(`/blog/${req.params.id}`);
  }
};
