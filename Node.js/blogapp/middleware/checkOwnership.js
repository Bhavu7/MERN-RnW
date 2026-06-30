// middleware/checkOwnership.js
// Ensures only the author of a post can edit/delete it
const Post = require('../models/Post');

module.exports = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      req.flash('error', 'Post not found');
      return res.redirect('/blog');
    }
    if (post.author.toString() !== req.session.userId) {
      req.flash('error', 'You are not authorized to do that');
      return res.redirect('/blog');
    }
    req.post = post; // pass post along to next handler
    next();
  } catch (err) {
    next(err);
  }
};
