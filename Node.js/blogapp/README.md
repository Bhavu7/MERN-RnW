# BlogApp — Login System with Blog (EJS + Tailwind + MongoDB)

A full-stack blog app with authentication, built using the MVC pattern.

## Features
- Register / Login / Logout (sessions, hashed passwords with bcrypt)
- Create, read, update, delete blog posts (only author can edit/delete)
- Comments on posts (only comment author can delete their own)
- Tailwind CSS UI with smooth fade/slide/scale animations
- Flash messages for success/error feedback
- MVC structure + custom middleware

## Project Structure
```
blogapp/
├── app.js                 # entry point
├── config/db.js           # MongoDB connection
├── models/                # User, Post, Comment (Mongoose schemas)
├── controllers/           # authController, postController, commentController
├── routes/                # authRoutes, postRoutes
├── middleware/            # auth.js (isLoggedIn/isLoggedOut/setLocals), checkOwnership.js
├── views/                 # EJS templates (partials, auth, blog)
└── public/                # css/js static assets
```

## Setup
1. Install dependencies:
   ```
   npm install
   ```
2. Configure `.env` (already included with defaults):
   ```
   MONGO_URI=mongodb://127.0.0.1:27017/blogapp
   SESSION_SECRET=change_this_secret_key
   PORT=3000
   ```
3. Make sure MongoDB is running locally (or update MONGO_URI to your Atlas connection string).
4. Start the app:
   ```
   npm start
   ```
   or for development with auto-reload:
   ```
   npm run dev
   ```
5. Visit `http://localhost:3000`

## Notes
- Passwords are hashed with bcryptjs before saving (see `models/User.js`).
- `middleware/auth.js` protects routes and exposes session user to all views.
- `middleware/checkOwnership.js` ensures only post authors can edit/delete their posts.
- Method-override enables PUT/DELETE from HTML forms.
