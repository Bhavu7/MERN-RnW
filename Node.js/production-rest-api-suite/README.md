# Production REST API Suite

A production-ready full-stack application with a secure Express + MongoDB REST API and a premium React admin client. The backend integrates with Fake Store API, syncs external products into MongoDB, and supports JWT authentication, authorization, CRUD, validation, filtering, sorting, pagination, logging, error handling, and rate limiting.

## Features
- JWT authentication with access and refresh tokens
- Role-based authorization
- Full CRUD for items
- Third-party API sync using Axios
- Search, filtering, sorting, and pagination
- Centralized error handling and consistent JSON responses
- Security middleware: Helmet, CORS, Compression, Cookies, Rate Limiting
- Premium frontend with React, Vite, Tailwind CSS, Framer Motion, React Query, React Hook Form, and Zod
- Postman collection and API docs included

## Project Structure
```bash
project/
├── src/
├── client/
├── server.js
├── package.json
├── .env.example
└── README.md
```

## Setup
1. Copy `.env.example` to `.env`.
2. Install backend dependencies: `npm install`
3. Install frontend dependencies: `cd client && npm install`
4. Start MongoDB locally or update `MONGODB_URI` to MongoDB Atlas.
5. Run backend: `npm run dev:server`
6. Run frontend: `npm run dev:client`
7. Or run both: `npm run dev`

## Key Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `POST /api/items/sync/external`
- `GET /api/items`
- `GET /api/items/:id`
- `POST /api/items`
- `PUT /api/items/:id`
- `DELETE /api/items/:id`

## Frontend
The frontend lives in `/client` and includes:
- Auth screens
- Dashboard
- Animated data table
- Custom modal/dialog patterns
- Search, filters, pagination
- Toast notifications
- Loading, empty, error, unauthorized, and 404 states

## Deployment
- Backend: Render, Railway, Fly.io, VPS, or Docker
- Frontend: Vercel or Netlify
- Set environment variables securely in deployment platform
- Enable secure cookies in production

## Environment Variables
See `.env.example` for all required variables.

## API Response Format
### Success
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {}
}
```

### Failure
```json
{
  "success": false,
  "message": "Validation Failed",
  "errors": []
}
```
