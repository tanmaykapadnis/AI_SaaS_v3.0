# 🚀 CraftMind AI — Full Stack AI SaaS Platform

CraftMind AI is a **production-style AI SaaS web application** that enables users to generate content, analyze documents, and perform AI-powered workflows through a secure dashboard.

This project simulates a real-world SaaS architecture with authentication, protected APIs, AI integration, and cloud-based media handling.

---

## ✨ Features

* 📝 **AI Article Generator** — Generate long-form content using LLM APIs
* 🏷️ **Blog Title Generator** — Create SEO-friendly titles instantly
* 🖼️ **AI Image Generation & Editing** — Generate and transform images
* 🔐 **Secure Authentication** — Clerk-based login & protected routes
* ☁️ **Cloud Storage Integration** — Media handled via Cloudinary
* 📊 **User Dashboard** — Tracks AI creations and usage
* ⚡ **REST API Architecture** — Scalable backend design

---

## 🧠 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Axios
* Clerk Authentication SDK

### Backend

* Node.js
* Express.js
* RESTful APIs
* Middleware-based architecture

### AI Integration

* OpenRouter API (LLM access)
* Prompt-engineered workflows

### Storage & Media

* Cloudinary (image hosting & transformations)
* Multer (file uploads)

### Database

* SQL-based creation tracking

---

## 🏗️ System Architecture

Client (React)
⬇
Express API Layer
⬇
Authentication Middleware (Clerk)
⬇
AI Request Orchestration (OpenRouter)
⬇
Cloudinary / Database Storage

---

## 🔐 Authentication Flow

* Users authenticate via **Clerk**
* JWT token is attached to API requests
* Express middleware validates access before AI usage
* Ensures protected SaaS-style environment

---

## 📦 Project Structure

```
client/
 ├── pages/
 ├── components/
 ├── layout/
 └── api integration

server/
 ├── routes/
 ├── controllers/
 ├── middleware/
 ├── config/
 └── server.js
```

---

## ⚙️ Environment Variables

Create a `.env` file inside `server/`:

```
OPENROUTER_API_KEY=your_openrouter_key
CLERK_SECRET_KEY=your_clerk_secret
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
PORT=3000
```

Create a `.env` file inside `client/`:

```
VITE_BASE_URL=http://localhost:3000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

---

## ▶️ Running Locally

### 1️⃣ Install Dependencies

```
cd server
npm install

cd ../client
npm install
```

---

### 2️⃣ Start Backend

```
cd server
npm start
```

Server runs at:

```
http://localhost:3000
```

---

### 3️⃣ Start Frontend

```
cd client
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📡 Example API Endpoint

### Generate Article

```
POST /api/ai/generate-article
Authorization: Bearer <token>
```

Body:

```
{
  "prompt": "Future of AI in healthcare",
  "length": 1200
}
```

---

## 🧪 Learning Outcomes

This project demonstrates:

* Building **real SaaS-style backend architecture**
* Integrating **LLMs into production workflows**
* Designing secure middleware-based APIs
* Managing async AI pipelines
* Handling file uploads & cloud processing
* Connecting frontend to scalable backend services

---

## 🚀 Future Improvements

* Usage metering & subscription billing
* Background job queue for AI tasks
* Model selection dashboard
* Vector search & RAG integration
* Deployment with Docker + CI/CD

---

## 👨‍💻 Author

**Tanmay Sachin Kapadnis**

B.E. Artificial Intelligence & Machine Learning
BMS Institute of Technology and Management

GitHub: https://github.com/tanmaykapadnis

---

## 📄 License

This project is built for educational and demonstration purposes.
