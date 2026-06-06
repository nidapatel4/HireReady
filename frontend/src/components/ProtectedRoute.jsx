// ProtectedRoute.jsx — Wraps routes that require login
// If user is not logged in → redirect to login page
// If user is logged in → show the page

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  // Still checking localStorage — don't redirect yet
  if (loading) return <div>Loading...</div>

  // Not logged in → redirect to login
  if (!user) return <Navigate to='/login' />

  // Logged in → render the actual page
  return children
}

export default ProtectedRoute