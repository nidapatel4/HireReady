// api.js — Central place for all backend communication
// All axios requests go through here

import axios from 'axios'

// Base URL of our backend
// We'll change this to deployed URL later
const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

// Interceptor — runs before EVERY request automatically
// Adds the JWT token to every request header
// So we don't have to manually add it everywhere
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth routes
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)

// Resume routes
export const analyzeResume = (formData) => API.post('/resume/analyze', formData)
export const getHistory = () => API.get('/resume/history')