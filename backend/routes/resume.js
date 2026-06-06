// resume.js — Routes for resume upload and history

const express = require('express')
const router = express.Router()
const multer = require('multer')
const authMiddleware = require('../middleware/authMiddleware')
const { analyzeResume, getHistory } = require('../controllers/resumeController')

// Multer config — store file in memory as buffer (not on disk)
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true)   // Accept file
    } else {
      cb(new Error('Only PDF files are allowed'), false)  // Reject file
    }
  }
})

// POST /api/resume/analyze
// authMiddleware runs first → checks token → then analyzeResume runs
router.post('/analyze', authMiddleware, upload.single('resume'), analyzeResume)

// GET /api/resume/history
// authMiddleware protects this route too
router.get('/history', authMiddleware, getHistory)

module.exports = router