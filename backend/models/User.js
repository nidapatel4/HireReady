// User.js — Defines the shape of a user in our database

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,    // Can't create user without name
    trim: true         // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,      // No two users can have same email
    lowercase: true    // Always store email in lowercase
  },
  password: {
    type: String,
    required: true     // Will store HASHED password, never plain text
  }
}, {
  timestamps: true     // Adds createdAt and updatedAt automatically
})

module.exports = mongoose.model('User', userSchema)