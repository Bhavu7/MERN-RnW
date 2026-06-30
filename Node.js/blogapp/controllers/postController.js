// controllers/postController.js
// Handles CRUD operations for blog posts
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// GET /blog - list all posts (newest first)
exports.index = async (req, res) => {
  const posts = await Post.find().populate('author', 'name avatar').sort({ createdAt: -1 });
  res.render('blog/index', { title: 'Blog', posts });
};

// GET /blog/new - show create post form
exports.newForm = (req, res) => {
  res.render('blog/new', { title: 'New Post' });
};

// POST /blog - create a post
exports.create = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    if (!title || !content) {
      req.flash('error', 'Title and content are required');
      return res.redirect('/blog/new');
    }
    const postData = { title, content, author: req.session.userId };
    if (image) postData.image = image;

    await Post.create(postData);
    req.flash('success', 'Post published!');
    res.redirect('/blog');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not create post');
    res.redirect('/blog/new');
  }
};

// GET /blog/:id - show single post + comments
exports.show = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'name avatar');
  if (!post) {
    req.flash('error', 'Post not found');
    return res.redirect('/blog');
  }
  const comments = await Comment.find({ post: post._id })
    .populate('author', 'name avatar')
    .sort({ createdAt: 1 });
  res.render('blog/show', { title: post.title, post, comments });
};

// GET /blog/:id/edit - show edit form (req.post set by checkOwnership middleware)
exports.editForm = (req, res) => {
  res.render('blog/edit', { title: 'Edit Post', post: req.post });
};

// PUT /blog/:id - update a post
exports.update = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    req.post.title = title;
    req.post.content = content;
    if (image) req.post.image = image;
    await req.post.save();
    req.flash('success', 'Post updated');
    res.redirect(`/blog/${req.post._id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Could not update post');
    res.redirect(`/blog/${req.params.id}/edit`);
  }
};

// DELETE /blog/:id - delete a post and its comments
exports.destroy = async (req, res) => {
  await Comment.deleteMany({ post: req.post._id });
  await req.post.deleteOne();
  req.flash('success', 'Post deleted');
  res.redirect('/blog');
};
