import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await registerUser(formData)
      login(res.data.token, res.data.user)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <h2>Create Account 🚀</h2>
        <p className='auth-subtitle'>Start analyzing your resume today</p>

        {error && <div className='error-msg'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Full Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='John Doe'
              required
            />
          </div>

          <div className='form-group'>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              required
            />
          </div>

          <div className='form-group'>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Min 6 characters'
              required
            />
          </div>

          <button type='submit' className='auth-btn' disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className='auth-switch'>
          Already have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Register