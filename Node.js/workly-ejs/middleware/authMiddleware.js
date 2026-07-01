const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.flash('error', 'Please login first.');
      return res.redirect('/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      res.clearCookie('token');
      return res.redirect('/login');
    }

    req.user = user;
    res.locals.currentUser = user;
    next();
  } catch (error) {
    res.clearCookie('token');
    return res.redirect('/login');
  }
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).render('partials/errorState', {
      title: 'Access denied',
      message: 'You do not have permission to access this page.'
    });
  }
  next();
};

const attachUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.locals.currentUser = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    req.user = user || null;
    res.locals.currentUser = user || null;
    next();
  } catch (error) {
    res.locals.currentUser = null;
    next();
  }
};

module.exports = { protect, authorizeRoles, attachUser };
