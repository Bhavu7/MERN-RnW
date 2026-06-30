// controllers/authController.js
// Handles registration, login, logout logic
const User = require('../models/User');

// GET /register - show register form
exports.getRegister = (req, res) => {
  res.render('auth/register', { title: 'Register' });
};

// POST /register - create new user
exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password) {
      req.flash('error', 'All fields are required');
      return res.redirect('/register');
    }
    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match');
      return res.redirect('/register');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already registered');
      return res.redirect('/register');
    }

    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;
    const user = await User.create({ name, email, password, avatar });

    // auto-login after register
    req.session.userId = user._id;
    req.session.userName = user.name;

    req.flash('success', `Welcome, ${user.name}!`);
    res.redirect('/blog');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/register');
  }
};

// GET /login - show login form
exports.getLogin = (req, res) => {
  res.render('auth/login', { title: 'Login' });
};

// POST /login - authenticate user
exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
    }

    req.session.userId = user._id;
    req.session.userName = user.name;

    req.flash('success', `Welcome back, ${user.name}!`);
    res.redirect('/blog');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/login');
  }
};

// POST /logout - destroy session
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
