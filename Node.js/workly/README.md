# Workly - Task Management App - Practical Exam Project

A full-stack MERN task management application with JWT authentication using cookies, role-based access, multi-user task support, category/task populate, smooth React + Tailwind UI, toaster notifications, and MVC backend structure.

## Features
- JWT auth stored in HTTP-only cookies
- Register, login, logout
- Roles: admin and user
- Users manage their own tasks
- Admin can view and manage all users' tasks
- Categories linked to tasks with Mongoose populate
- Modern React frontend with Tailwind CSS, Heroicons, Framer Motion, React Hot Toast
- Protected routes and role-based route guards
- Proper error handling on frontend and backend

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Framer Motion, React Hot Toast, Heroicons
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, cookie-parser

## Run Instructions
### 1. Install dependencies
```bash
npm run install-all
```

### 2. Environment variables
Create `server/.env`
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/task_management_exam
JWT_SECRET=supersecretjwtkey
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 3. Start app
```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:5000

## Exam Coverage
This project covers:
- Project setup
- MongoDB models
- User model with roles
- Authentication with JWT + cookies
- Middleware + protected routing
- Multiuser task support
- CRUD for tasks and categories
- Navbar with role-based links
- Minimal modern UI
