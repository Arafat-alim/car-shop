# Car Listing Backend

A scalable, secure Node.js + Express + MongoDB backend for a used car listing application.

## Features

- Full CRUD APIs for cars (`GET /api/cars`, `GET /api/cars/:id`, `POST /api/cars`, `PUT /api/cars/:id`, `DELETE /api/cars/:id`).
- Role-based authentication (admin-only for create, update, delete).
- JWT for secure authentication.
- Zod for input validation.
- Winston for logging.
- Mongoose for MongoDB schema management.
- ER diagram in `docs/er-diagram.md`.

## Setup

1. Clone the repo: `git clone <repo-url>`.
2. Install dependencies: `npm install`.
3. Create `.env` file based on `.env.sample`.
4. Seed database: `npm run seed`.
5. Start server: `npm start` or `npm run dev` (with nodemon).
6. Test APIs using Postman:
   - `POST /api/auth/login` (use `admin@example.com`, `admin123`).
   - `GET /api/cars`, `GET /api/cars/:id`, `POST /api/cars`, `PUT /api/cars/:id`, `DELETE /api/cars/:id`.

## Deployment

- Deployed on `Vercel`.
- Use MongoDB Atlas for the database.
- Set `.env` variables in the deployment platform.

## ER Diagram

See `docs/er-diagram.md` for the textual ER diagram. Generate a visual diagram using [eraser.io](https://www.eraser.io/) and save as `docs/er-diagram.png`.

## Folder Structure

```md
backend/
├── docs/ # Documentation (ER diagram)
├── src/
│ ├── controllers/ # API logic
│ ├── db/ # Database connection
│ ├── middlewares/ # Auth, role, error handling
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express routes
│ ├── services/ # Business logic
│ ├── utils/ # Helpers (ApiError, ApiResponse, logger, etc.)
├── .env # Environment variables
├── app.log # Logs
├── package.json
```

---
