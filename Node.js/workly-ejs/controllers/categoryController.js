const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.render('categories/index', { title: 'Categories', categories });
};

exports.createCategory = async (req, res) => {
  try {
    await Category.create({ name: req.body.name, description: req.body.description });
    res.flash('success', 'Category created successfully.');
  } catch (error) {
    res.flash('error', 'Category creation failed.');
  }
  res.redirect('/categories');
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.flash('success', 'Category removed.');
  } catch (error) {
    res.flash('error', 'Failed to delete category.');
  }
  res.redirect('/categories');
};
