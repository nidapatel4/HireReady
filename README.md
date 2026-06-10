<div align="center">

#  HireReady

### AI-Powered Resume Analyzer

**Get instant AI feedback, a score out of 100, and actionable suggestions to land your dream job.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_App-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://hire-ready-vert.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nidapatel4/HireReady)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=black)

</div>

---

## 📖 Overview

**HireReady** is a full stack AI-powered resume analyzer that helps job seekers and students improve their resumes instantly. Upload a PDF resume and receive a detailed score, section-wise feedback, strengths, weaknesses, and actionable improvement suggestions — all powered by Google Gemini AI.

Built with the **MERN stack** (MongoDB, Express, React, Node.js) and integrated with **Google Gemini 2.5 Flash** for intelligent resume analysis.

---

##  Live Demo

> **[https://hire-ready-vert.vercel.app/](https://hire-ready-vert.vercel.app/)**

---

##  Features

-  **User Authentication** — Secure register/login with JWT and bcrypt password hashing
-  **PDF Resume Upload** — Drag & drop or click to upload PDF resumes
-  **AI-Powered Analysis** — Google Gemini AI analyzes resume and returns structured feedback
-  **Resume Score** — Get a score out of 100 based on industry standards
-  **Strengths & Weaknesses** — Detailed breakdown of what's working and what's not
-  **Actionable Suggestions** — 5 specific improvements to immediately strengthen your resume
-  **Section-wise Feedback** — Feedback on Experience, Skills, Education, and Formatting
-  **Analysis History** — Track your resume improvements over time
-  **Modern UI** — Smooth animations with Framer Motion, clean dark theme

---

##  Tech Stack

### Frontend
- **React** — Component-based UI
- **React Router** — Client-side routing with protected routes
- **Axios** — HTTP requests with interceptors for automatic JWT injection
- **Framer Motion** — Smooth animations and transitions
- **Lucide React** — Modern icon library
- **Context API** — Global auth state management

### Backend
- **Node.js + Express** — REST API server
- **MongoDB + Mongoose** — Database and ODM
- **JWT** — Stateless authentication
- **bcryptjs** — Password hashing
- **Multer** — File upload handling
- **pdf-parse** — PDF text extraction
- **Google Gemini AI** — Resume analysis

### Deployment
- **Vercel** — Frontend deployment
- **Render** — Backend deployment
- **MongoDB Atlas** — Cloud database

---

## 📂 Project Structure

```
HireReady/
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Register & login logic
│   │   └── resumeController.js    # File upload & AI analysis
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT verification
│   ├── models/
│   │   ├── User.js                # User schema
│   │   └── Analysis.js            # Analysis schema
│   ├── routes/
│   │   ├── auth.js                # Auth endpoints
│   │   └── resume.js              # Resume endpoints
│   ├── utils/
│   │   └── aiAnalyzer.js          # Gemini AI integration
│   └── index.js                   # Server entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        ├── context/
        │   └── AuthContext.jsx
        ├── pages/
        │   ├── Landing.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   └── History.jsx
        └── utils/
            └── api.js
```

---

##  API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user, returns JWT |

### Resume Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/resume/analyze` | Upload PDF and get AI analysis | ✅ |
| GET | `/api/resume/history` | Get all past analyses for user | ✅ |

---

##  How It Works

```
1. User uploads PDF resume
2. Multer receives the file as buffer in memory
3. pdf-parse extracts raw text from PDF
4. Text is sent to Google Gemini AI with a structured prompt
5. Gemini returns JSON with score, feedback, suggestions
6. Analysis is saved to MongoDB with user reference
7. Frontend renders animated results with score counter
```

---

##  Running Locally

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Gemini API key

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

##  Key Concepts Implemented

- **JWT Authentication** — Stateless auth with token expiry
- **Protected Routes** — Frontend route guards using React Router
- **Axios Interceptors** — Automatic token injection on every request
- **FormData** — Multipart file upload to backend
- **Prompt Engineering** — Structured prompts for consistent AI JSON output
- **MVC Architecture** — Separation of routes, controllers, and models
- **Context API** — Global state without prop drilling

---

##  Upcoming Features

- [ ] Job Description matching — see how well your resume matches a JD
- [ ] Download analysis report as PDF
- [ ] LinkedIn share integration
- [ ] Resume improvement suggestions with rewrite option

---

##  Author

Built by **Nida Patel** as part of a full stack + AI learning journey.

[![GitHub](https://img.shields.io/badge/GitHub-nidapatel4-181717?style=flat&logo=github)](https://github.com/nidapatel4)

---

<div align="center">
  <p>If you found this useful, give it a ⭐ on GitHub!</p>
  <a href="https://hire-ready-vert.vercel.app/">🚀 Try HireReady Live</a>
</div>
