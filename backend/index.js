// index.js — Entry point of our backend server

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

// Load environment variables from .env file
dotenv.config()
// console.log('JWT Secret loaded:', process.env.JWT_SECRET)
const app = express()

// Middleware — runs on every request
// app.use(cors())                  // Allow frontend to talk to backend
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://hire-ready-vert.vercel.app'
  ],
  credentials: true
}))
app.use(express.json())          // Parse incoming JSON requests

// Routes — we'll connect these soon
const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

// Add this line after the auth routes line
const resumeRoutes = require('./routes/resume')
app.use('/api/resume', resumeRoutes)

// Test route — to check server is running
app.get('/', (req, res) => {
  res.json({ message: 'HireReady backend is running!' })
})

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('MongoDB connection failed:', error.message)
  })