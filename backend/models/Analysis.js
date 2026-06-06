// Analysis.js — Shape of a resume analysis in our database

const mongoose = require('mongoose')

const analysisSchema = new mongoose.Schema({
  // Which user does this analysis belong to
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to User document
    ref: 'User',                            // Links to User model
    required: true
  },
  // Original resume text extracted from PDF
  resumeText: {
    type: String,
    required: true
  },
  // AI generated score out of 100
  score: {
    type: Number,
    required: true
  },
  // Full AI feedback object
  feedback: {
    summary: String,        // Overall summary
    strengths: [String],    // Array of strengths
    weaknesses: [String],   // Array of weaknesses
    suggestions: [String],  // Array of improvement suggestions
    sections: {
      experience: String,
      skills: String,
      education: String,
      formatting: String
    }
  },
  // Original filename
  fileName: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Analysis', analysisSchema)