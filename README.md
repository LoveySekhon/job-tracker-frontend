# 🚀 Job Tracker SaaS Application

A full-stack cloud-deployed Job Application Tracking System built with React, Node.js, Express, and MySQL.

## 🌐 Live Demo
Frontend: https://job-tracker-frontend-weld.vercel.app  
Backend API: https://job-tracker-backend-gf6p.onrender.com  

---

## 🧠 Project Overview

This is a production-grade full-stack SaaS application that allows users to:

- Register and login securely (JWT authentication)
- Add, edit, and delete job applications
- Filter jobs by status
- Search jobs by company name
- Paginate results
- Maintain user-specific job isolation

Each user can only access their own data.

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- JWT Authentication
- Express Validator

### Database
- MySQL (Railway Cloud)
- Relational schema with foreign keys

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Railway

---

## 🔐 Authentication Flow

- Passwords are hashed using bcrypt
- JWT token issued on login
- Token stored in localStorage
- Protected routes via middleware
- CORS configured for production

---

## 📊 Features

- Full CRUD operations
- Server-side pagination
- Dynamic filtering & search
- Clean responsive UI
- Animated interactive components
- Production-ready cloud architecture

---

## ⚙️ Architecture Flow

Frontend (Vercel)  
⬇  
Express API (Render)  
⬇  
MySQL Database (Railway)

---

## 🎯 Key Learning Outcomes

- Full-stack architecture design
- JWT-based stateless authentication
- Production CORS configuration
- React state management & lifecycle
- RESTful API design
- Cloud deployment & environment handling

---

## 👨‍💻 Author

Lovepreet Singh  
Computer Science Graduate
