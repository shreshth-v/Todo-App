# 📝 Todo List Application (MERN Stack)

A full-featured Todo List Application that allows users to manage tasks efficiently with secure authentication, CRUD operations, and a responsive UI with light/dark themes.

## 🚀 Live Demo

[Click here to view the live app](#)

---

## ✨ Features

### 🔐 User Authentication

- Sign up, log in, and log out securely
- JWT-based authentication with cookie support

### ✅ Task Management

- Create, read, update, and delete tasks
- Each task includes title, description, due date, and status (`pending`, `in progress`, `completed`)
- Real-time status update from dashboard

### 🌗 Responsive Design

- Fully responsive UI for desktop and mobile
- Clean layout with light and dark mode toggle
- Accessible and intuitive UX

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Tailwind CSS
- React Router
- Redux Toolkit (for state management)
- Axios
- React Toastify

### Backend

- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Cookie-parser & bcryptjs

---

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. Backend Setup:

Navigate to the backend folder:

```bash
cd todo-backend
npm install
```

Create a .env file:

PORT=5000

NODE_ENV=development

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup:

Navigate to the frontend folder:

```bash
cd todo-frontend
npm install
```

Create a .env file:

VITE_BACKEND_URL=http://localhost:5000

Start the frontend:

```bash
npm run dev
```
