// AuthContext.jsx — Global state for authentication
// Any component in the app can access user info and auth functions
// Without passing props through every component

import { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const AuthContext = createContext()

// Provider component — wraps entire app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On app load — check if user was already logged in
  // (token exists in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (token && userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  // Login — save token and user to localStorage and state
  const login = (token, userData) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  // Logout — clear everything
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — makes using context cleaner
// Instead of importing useContext + AuthContext everywhere
// Just import useAuth
export const useAuth = () => useContext(AuthContext)