# ⚓ Russell Marina Booking API

A backend API built with Node.js and Express.js to manage users, mooring catways, and reservations for a marina, featuring REST API development, Express.js routing and middleware, JWT-based authentication, MongoDB persistence with Mongoose, Swagger/OpenAPI documentation, and MVC-style server-side rendering with EJS.

## 🖥️ Tech Stack

**Backend:**
- **Express.js** — Node.js Web framework, REST API routing and middleware
- **JWT** — Authentication method
- **Mongoose** — ODM to manage easily MongoDB NoSQL database
- **Swagger/OpenAPI** — API documentation


**Frontend (Static Assets):**
- **EJS** — Server-side rendering for application views
- **Bootstrap 5.3.3** — Responsive UI framework 

**Utilies / Environment:**
- **Morgan** — HTTP request logger
- **CORS** — Cross-Origin Resource Sharing middleware
- **Cookie Parser** — Cookie parsing middleware
- **Nodemon** — Automatic server restart during development
- **Git / GitHub** — Version control and code hosting
- **env-cmd** — Environment variable management
- **MongoDB Atlas** — Cloud database hosting

<!--
## Features

- User creation, listing, update and deletion
- Catway management
- Reservation management per catway
- JWT authentication
- Cookie-based session handling
- Swagger API documentation
- Server-rendered pages for app interaction

## Project Structure

```text
.
├── app.js
├── bin/
│   └── www
├── config/
│   └── swagger.js
├── db/
│   └── mongo.js
├── middleware/
│   └── private.js
├── models/
│   ├── catway.js
│   ├── reservation.js
│   └── user.js
├── public/
├── routes/
│   ├── auth.js
│   ├── catways.js
│   ├── dashboard.js
│   ├── home.js
│   ├── index.js
│   ├── reservations.js
│   └── users.js
├── services/
├── views/
├── .gitignore
├── LICENSE
├── package.json
├── README.md
└── package-lock.json
```
-->

## 🔐 Authentication

This API uses JWT authentication.

### Flow

1. User logs in via `/login`
2. Server verifies credentials
3. A JWT is generated and stored in an HTTP-only cookie
4. Protected routes validate the token using `middleware/private.js`

Protected routes require a valid token in:
- `Authorization: Bearer <token>`
- or a cookie named `token`

## Environment Variables

Create the required environment file before running the project.

Example:

```env
URL_MONGO=mongodb://localhost:27017
SECRET_KEY=your_super_secret_key
PORT=3000
```

The project expects:
- `URL_MONGO` for MongoDB connection
- `SECRET_KEY` for signing JWT tokens
- `PORT` for the server port (defaults to `3000` if not set)

## 🚀 Setup

Clone the repository:

```bash
git clone https://github.com/loickcherimont/booking-api-russell-expressjs.git
cd booking-api-russell-expressjs
npm install
```

## ▶️ Usage

### Development mode

```bash
npm run dev
```

This uses `env-cmd -f ./env/.env.dev` and runs the app with nodemon.

### Production-like mode

```bash
npm run prod
```

This uses `env-cmd -f ./env/.env.prod` with nodemon.

### Default start script

```bash
npm start
```

This runs:

```bash
node ./bin/www
```

## 📄 API Documentation

Swagger UI is enabled and exposed at:

```text
http://localhost:3000/api-docs
```

The Swagger configuration is defined in:

```text
config/swagger.js
```

## 🔀 Main Routes

### Authentication
- `POST /login`
- `GET /logout`

### Users
- `POST /users`
- `GET /users`
- `GET /users/:email`
- `PUT /users/:email`
- `DELETE /users/:email`

### Catways
- `POST /catways`
- `GET /catways`
- `GET /catways/:catwayNumber`
- `PUT /catways/:catwayNumber`
- `DELETE /catways/:catwayNumber`

### Reservations
- `POST /catways/:catwayNumber/reservations`
- `GET /catways/:catwayNumber/reservations`
- `GET /catways/:catwayNumber/reservations/:id`
- `PUT /catways/:catwayNumber/reservations/:id`
- `DELETE /catways/:catwayNumber/reservations/:id`

> Note: Some routes also include `update` variants such as `POST /users/:email/update` or `POST /catways/:catwayNumber/update`, likely used by the app’s HTML forms.


### Example Login Request

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "YourPassword123"
  }'
```

If the credentials are valid, the server redirects the user and sets the JWT in a cookie.

## 🗄️ Database

The app connects to MongoDB through:

```text
db/mongo.js
```

and uses the database name:

```text
api-russell-marina
```

## 🔑 License

<div align="center">
Copyright © 2026 | Loick CHERIMONT | All Rights Reserved.
</div>