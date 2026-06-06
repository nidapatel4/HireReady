// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import './Navbar.css'

// const Navbar = () => {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   return (
//     <nav className='navbar'>
//       <Link to='/' className='navbar-brand'>
//         HireReady 🚀
//       </Link>

//       <div className='navbar-links'>
//         {user ? (
//           <>
//             <span className='navbar-user'>Hi, {user.name} 👋</span>
//             <Link to='/dashboard'>Dashboard</Link>
//             <Link to='/history'>History</Link>
//             <button onClick={handleLogout} className='logout-btn'>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to='/login'>Login</Link>
//             <Link to='/register' className='register-btn'>
//               Get Started
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default Navbar

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { LogOut, LayoutDashboard, Clock, Zap } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      className='navbar'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link to='/' className='navbar-brand'>
        <Zap size={20} color='#6366f1' />
        HireReady
      </Link>

      <div className='navbar-links'>
        {user ? (
          <>
            <Link
              to='/dashboard'
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              <LayoutDashboard size={16} />
              Dashboard
            </Link>
            <Link
              to='/history'
              className={`nav-link ${isActive('/history') ? 'active' : ''}`}
            >
              <Clock size={16} />
              History
            </Link>
            <span className='navbar-user'>Hi, {user.name} 👋</span>
            <motion.button
              onClick={handleLogout}
              className='logout-btn'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={15} />
              Logout
            </motion.button>
          </>
        ) : (
          <>
            <Link to='/login' className='nav-link'>Login</Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to='/register' className='register-btn'>
                Get Started
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar