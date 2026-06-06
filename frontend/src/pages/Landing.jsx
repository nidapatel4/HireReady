// import { Link } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { useNavigate } from 'react-router-dom'
// import './Landing.css'

// const Landing = () => {
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   return (
//     <div className='landing'>

//       {/* Hero Section */}
//       <section className='hero'>
//         <div className='hero-badge'>🚀 AI-Powered Resume Analysis</div>
//         <h1>Get Your Resume <span className='gradient-text'>Hire Ready</span></h1>
//         <p className='hero-subtitle'>
//           Upload your resume and get instant AI feedback, a score out of 100,
//           and actionable suggestions to land your dream job.
//         </p>
//         <div className='hero-buttons'>
//           {user ? (
//             <button onClick={() => navigate('/dashboard')} className='btn-primary'>
//               Go to Dashboard →
//             </button>
//           ) : (
//             <>
//               <Link to='/register' className='btn-primary'>
//                 Analyze My Resume →
//               </Link>
//               <Link to='/login' className='btn-secondary'>
//                 Login
//               </Link>
//             </>
//           )}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className='features'>
//         <h2>Everything you need to get hired</h2>
//         <div className='features-grid'>
//           <div className='feature-card'>
//             <div className='feature-icon'>🎯</div>
//             <h3>Resume Score</h3>
//             <p>Get an instant score out of 100 based on industry standards and best practices.</p>
//           </div>
//           <div className='feature-card'>
//             <div className='feature-icon'>💡</div>
//             <h3>AI Feedback</h3>
//             <p>Section-by-section feedback on experience, skills, education and formatting.</p>
//           </div>
//           <div className='feature-card'>
//             <div className='feature-icon'>📈</div>
//             <h3>Improvement Tips</h3>
//             <p>Get 5 specific, actionable suggestions to immediately improve your resume.</p>
//           </div>
//           <div className='feature-card'>
//             <div className='feature-icon'>📋</div>
//             <h3>Analysis History</h3>
//             <p>Track your progress over time and see how your resume improves.</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className='cta'>
//         <h2>Ready to get hired?</h2>
//         <p>Join thousands of job seekers who improved their resume with HireReady.</p>
//         <Link to='/register' className='btn-primary'>
//           Get Started Free →
//         </Link>
//       </section>

//     </div>
//   )
// }

// export default Landing
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FileText, Zap, TrendingUp, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import './Landing.css'

// Animation variants — reusable animation configs
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
}

const Landing = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const features = [
    {
      icon: <Zap size={24} />,
      title: 'Instant AI Score',
      desc: 'Get a score out of 100 based on industry standards in seconds.'
    },
    {
      icon: <FileText size={24} />,
      title: 'Deep Feedback',
      desc: 'Section-by-section analysis of experience, skills, and formatting.'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'Actionable Tips',
      desc: '5 specific improvements to immediately strengthen your resume.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Track Progress',
      desc: 'See how your resume score improves over multiple submissions.'
    }
  ]

  const stats = [
    { value: '98%', label: 'Accuracy Rate' },
    { value: '3s', label: 'Analysis Time' },
    { value: '10k+', label: 'Resumes Analyzed' },
  ]

  return (
    <div className='landing'>

      {/* Hero Section */}
      <motion.section
        className='hero'
        initial='hidden'
        animate='visible'
        variants={stagger}
      >
        <motion.div variants={fadeUp} className='hero-badge'>
          <Zap size={14} />
          AI-Powered Resume Analysis
        </motion.div>

        <motion.h1 variants={fadeUp}>
          Get Your Resume <br />
          <span className='gradient-text'>Hire Ready</span>
        </motion.h1>

        <motion.p variants={fadeUp} className='hero-subtitle'>
          Upload your resume and get instant AI feedback, a score out of 100,
          and actionable suggestions to land your dream internship or job.
        </motion.p>

        <motion.div variants={fadeUp} className='hero-buttons'>
          {user ? (
            <motion.button
              onClick={() => navigate('/dashboard')}
              className='btn-primary'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Dashboard <ArrowRight size={18} />
            </motion.button>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to='/register' className='btn-primary'>
                  Analyze My Resume <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to='/login' className='btn-secondary'>
                  Login
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Trust indicators */}
        <motion.div variants={fadeUp} className='hero-checks'>
          {['Free to use', 'No credit card', 'Instant results'].map((item) => (
            <span key={item} className='check-item'>
              <CheckCircle size={14} color='#22c55e' />
              {item}
            </span>
          ))}
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className='stats'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={stagger}
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} className='stat-item' variants={fadeUp}>
            <span className='stat-value'>{stat.value}</span>
            <span className='stat-label'>{stat.label}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* Features Section */}
      <motion.section
        className='features'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp}>Everything you need to get hired</motion.h2>
        <motion.p variants={fadeUp} className='features-subtitle'>
          HireReady uses advanced AI to give you the feedback that matters most
        </motion.p>

        <motion.div className='features-grid' variants={stagger}>
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className='feature-card'
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className='feature-icon'>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className='cta'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.h2 variants={fadeUp}>Ready to get hired?</motion.h2>
        <motion.p variants={fadeUp}>
          Join thousands of job seekers who improved their resume with HireReady.
        </motion.p>
        <motion.div variants={fadeUp} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to='/register' className='btn-primary'>
            Get Started Free <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.section>

    </div>
  )
}

export default Landing