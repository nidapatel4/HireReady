// const dotenv = require('dotenv')
// dotenv.config()

// const Analysis = require('../models/Analysis')
// // const pdfParse = require('pdf-parse')
// // CORRECT
// // const pdfParse = require('pdf-parse/lib/pdf-parse.js')
// const pdfParse = require('@cyber2024/pdf-parse-fixed')

// // UPLOAD AND ANALYZE RESUME
// const analyzeResume = async (req, res) => {
//   try {
//     // Check if file was uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' })
//     }

//     // req.file.buffer contains the raw PDF data in memory
//     // pdf-parse extracts the text from that buffer
//     const pdfData = await pdfParse(req.file.buffer)
//     const resumeText = pdfData.text

//     // ADD THIS TEMPORARILY
// console.log('Extracted text length:', resumeText.length)
// console.log('First 200 chars:', resumeText.substring(0, 200))

//     // Check if PDF had any readable text
//     if (!resumeText || resumeText.trim().length === 0) {
//       return res.status(400).json({ message: 'Could not extract text from PDF' })
//     }

//     // For now just return the extracted text
//     // Tomorrow we'll send this to Gemini API for analysis
//     res.status(200).json({
//       message: 'Resume uploaded and text extracted successfully',
//       textLength: resumeText.length,
//       preview: resumeText.substring(0, 500) // First 500 chars as preview
//     })

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message })
//   }
// }

// // GET ANALYSIS HISTORY FOR LOGGED IN USER
// const getHistory = async (req, res) => {
//   try {
//     // req.user.userId comes from our authMiddleware
//     const analyses = await Analysis.find({ userId: req.user.userId })
//       .sort({ createdAt: -1 }) // newest first
//       .select('-resumeText')    // don't send full resume text, too large

//     res.status(200).json({ analyses })

//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message })
//   }
// }

// module.exports = { analyzeResume, getHistory }

const dotenv = require('dotenv')
dotenv.config()

const Analysis = require('../models/Analysis')
const pdf = require('@cyber2024/pdf-parse-fixed')
const { analyzeResumeWithAI } = require('../utils/aiAnalyzer')

// UPLOAD AND ANALYZE RESUME
const analyzeResume = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    // Extract text from PDF
    const pdfData = await pdf(req.file.buffer)
    const resumeText = pdfData.text

    // Check if PDF had readable text
    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ message: 'Could not extract text from PDF' })
    }

    // Send to Gemini for analysis
    // This is the AI magic happening here
    const feedback = await analyzeResumeWithAI(resumeText)

    // Save analysis to MongoDB
    const analysis = await Analysis.create({
      userId: req.user.userId,    // from authMiddleware
      resumeText,
      score: feedback.score,
      feedback: {
        summary: feedback.summary,
        strengths: feedback.strengths,
        weaknesses: feedback.weaknesses,
        suggestions: feedback.suggestions,
        sections: feedback.sections
      },
      fileName: req.file.originalname
    })

    // Send back the full analysis to frontend
    res.status(200).json({
      message: 'Resume analyzed successfully',
      analysisId: analysis._id,
      score: feedback.score,
      feedback
    })

  } catch (error) {
    console.log('Analysis error:', error.message)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET ANALYSIS HISTORY FOR LOGGED IN USER
const getHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({ userId: req.user.userId })
      .sort({ createdAt: -1 })
      .select('-resumeText')  // exclude full text — too large

    res.status(200).json({ analyses })

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { analyzeResume, getHistory }