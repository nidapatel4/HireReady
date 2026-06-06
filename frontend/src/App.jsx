// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import ProtectedRoute from './components/ProtectedRoute'
// import Navbar from './components/Navbar'
// import Login from './pages/Login'
// import Register from './pages/Register'

// // Placeholder pages — we build these in Day 5
// const Dashboard = () => <div style={{padding: '2rem'}}>Dashboard Coming Soon</div>
// const History = () => <div style={{padding: '2rem'}}>History Coming Soon</div>
// const Landing = () => <div style={{padding: '2rem'}}>Landing Coming Soon</div>

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path='/' element={<Landing />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/dashboard' element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } />
//           <Route path='/history' element={
//             <ProtectedRoute>
//               <History />
//             </ProtectedRoute>
//           } />
//           <Route path='*' element={<Navigate to='/' />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   )
// }

// export default App
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import History from './pages/History'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/history' element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App