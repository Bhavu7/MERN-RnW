# MERN Admin Panel

Full-stack admin dashboard built with MongoDB, Express, React, Node.js — MVC architecture, JWT auth middleware, Tailwind CSS, Framer Motion animations, and react-icons.

## Features
- MVC structure (models / controllers / routes)
- JWT auth middleware + admin-only route protection
- Full CRUD for users (create, read, update, delete, search, pagination)
- Admin can reset any user's password from the Users page (Edit → optional new password)
- Logged-in admin can change their own password from Settings (current password required)
- Public self-registration (`/register`) — always created as standard "user" role
- Modern responsive UI with dark mode, sidebar, modals, toasts
- Smooth animations (Framer Motion)
- Dashboard with stat cards + charts (growth area chart, role bar chart, status pie chart)

## Setup

### Backend
```
cd backend
# .env already configured with your MongoDB Atlas URI — edit JWT_SECRET before deploying
npm install
npm run create-admin -- "Admin Name" admin@yourcompany.com yourSecurePassword
npm run dev
```
`create-admin` writes directly to your MongoDB database (no destructive seeding) — it creates the admin if missing, or promotes/updates an existing user with that email to admin. Re-run anytime to reset that admin's password:
```
npm run create-admin -- "Admin Name" admin@yourcompany.com newPassword456
```

### Frontend
```
cd frontend
cp .env.example .env
npm install
npm run dev
```

Visit http://localhost:5173 and log in with the seeded admin account.

## Stack
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- Frontend: React (Vite), Tailwind CSS, Framer Motion, react-icons, axios, react-router-dom, react-hot-toast
