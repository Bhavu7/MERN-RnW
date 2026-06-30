// app.js
// Main entry point: sets up Express app, middleware, routes, and DB connection
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const connectDB = require('./config/db');
const { setLocals } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'partials/layout');

// Body parsing & static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method')); // allows PUT/DELETE via forms

// Session & flash messages
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);
app.use(flash());

// Make user/session info available in all views
app.use(setLocals);

// Routes
app.get('/', (req, res) => res.redirect('/blog'));
app.use('/', authRoutes);
app.use('/blog', postRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: 'Not Found', layout: 'partials/layout' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong on the server.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
