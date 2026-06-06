// authMiddleware.js — Runs before any protected route
// Checks if the request has a valid JWT token
// If valid → attaches user info to request and continues
// If invalid → immediately returns 401 Unauthorized

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = (req, res, next) => {
  try {
    // Token comes in the header like: Authorization: Bearer <token>
    const authHeader = req.headers.authorization

    // Check if header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' })
    }

    // Extract just the token part (remove "Bearer ")
    const token = authHeader.split(' ')[1]

    // Verify the token using our secret key
    // If token is expired or tampered → this throws an error
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach the decoded user info to request object
    // Now any route after this middleware can access req.user
    req.user = decoded

    // Call next() to pass control to the actual route handler
    next()

  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = authMiddleware