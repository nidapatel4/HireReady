// import { useState } from 'react'
// import { analyzeResume } from '../utils/api'
// import './Dashboard.css'

// const Dashboard = () => {
//   const [file, setFile] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [result, setResult] = useState(null)
//   const [error, setError] = useState('')
//   const [dragOver, setDragOver] = useState(false)

//   const handleFileChange = (e) => {
//     const selected = e.target.files[0]
//     if (selected && selected.type === 'application/pdf') {
//       setFile(selected)
//       setError('')
//     } else {
//       setError('Please upload a PDF file only')
//     }
//   }

//   const handleDrop = (e) => {
//     e.preventDefault()
//     setDragOver(false)
//     const dropped = e.dataTransfer.files[0]
//     if (dropped && dropped.type === 'application/pdf') {
//       setFile(dropped)
//       setError('')
//     } else {
//       setError('Please upload a PDF file only')
//     }
//   }

//   const handleAnalyze = async () => {
//     if (!file) return setError('Please select a file first')

//     setLoading(true)
//     setError('')
//     setResult(null)

//     try {
//       // FormData is how we send files via HTTP
//       const formData = new FormData()
//       formData.append('resume', file)

//       const res = await analyzeResume(formData)
//       setResult(res.data)
//     } catch (err) {
//       setError(err.response?.data?.message || 'Analysis failed. Try again.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Score color based on value
//   const getScoreColor = (score) => {
//     if (score >= 75) return '#22c55e'
//     if (score >= 50) return '#f59e0b'
//     return '#ef4444'
//   }

//   const getScoreLabel = (score) => {
//     if (score >= 75) return 'Strong Resume 💪'
//     if (score >= 50) return 'Needs Improvement 📈'
//     return 'Needs Major Work 🔧'
//   }

//   return (
//     <div className='dashboard'>
//       <div className='dashboard-header'>
//         <h1>Analyze Your Resume</h1>
//         <p>Upload your resume and get instant AI-powered feedback</p>
//       </div>

//       {/* Upload Section */}
//       {!result && (
//         <div className='upload-section'>
//           <div
//             className={`upload-box ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
//             onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
//             onDragLeave={() => setDragOver(false)}
//             onDrop={handleDrop}
//             onClick={() => document.getElementById('fileInput').click()}
//           >
//             <input
//               id='fileInput'
//               type='file'
//               accept='.pdf'
//               onChange={handleFileChange}
//               style={{ display: 'none' }}
//             />

//             {file ? (
//               <>
//                 <div className='file-icon'>📄</div>
//                 <p className='file-name'>{file.name}</p>
//                 <p className='file-size'>{(file.size / 1024).toFixed(1)} KB</p>
//                 <p className='change-file'>Click to change file</p>
//               </>
//             ) : (
//               <>
//                 <div className='upload-icon'>☁️</div>
//                 <p className='upload-text'>Drag & drop your resume here</p>
//                 <p className='upload-subtext'>or click to browse</p>
//                 <p className='upload-hint'>PDF files only, max 5MB</p>
//               </>
//             )}
//           </div>

//           {error && <div className='error-msg'>{error}</div>}

//           <button
//             className='analyze-btn'
//             onClick={handleAnalyze}
//             disabled={!file || loading}
//           >
//             {loading ? (
//               <span className='loading-text'>
//                 <span className='spinner'></span>
//                 Analyzing with AI...
//               </span>
//             ) : (
//               '🔍 Analyze My Resume'
//             )}
//           </button>
//         </div>
//       )}

//       {/* Results Section */}
//       {result && (
//         <div className='results'>

//           {/* Score Card */}
//           <div className='score-card'>
//             <div
//               className='score-circle'
//               style={{ borderColor: getScoreColor(result.score) }}
//             >
//               <span
//                 className='score-number'
//                 style={{ color: getScoreColor(result.score) }}
//               >
//                 {result.score}
//               </span>
//               <span className='score-label-small'>/ 100</span>
//             </div>
//             <div className='score-info'>
//               <h2 style={{ color: getScoreColor(result.score) }}>
//                 {getScoreLabel(result.score)}
//               </h2>
//               <p>{result.feedback.summary}</p>
//             </div>
//           </div>

//           {/* Strengths and Weaknesses */}
//           <div className='sw-grid'>
//             <div className='strengths-card'>
//               <h3>✅ Strengths</h3>
//               <ul>
//                 {result.feedback.strengths.map((s, i) => (
//                   <li key={i}>{s}</li>
//                 ))}
//               </ul>
//             </div>
//             <div className='weaknesses-card'>
//               <h3>⚠️ Weaknesses</h3>
//               <ul>
//                 {result.feedback.weaknesses.map((w, i) => (
//                   <li key={i}>{w}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Suggestions */}
//           <div className='suggestions-card'>
//             <h3>💡 Top Suggestions to Improve</h3>
//             <ol>
//               {result.feedback.suggestions.map((s, i) => (
//                 <li key={i}>{s}</li>
//               ))}
//             </ol>
//           </div>

//           {/* Section Feedback */}
//           <div className='sections-card'>
//             <h3>📋 Section-wise Feedback</h3>
//             <div className='sections-grid'>
//               {Object.entries(result.feedback.sections).map(([key, value]) => (
//                 <div className='section-item' key={key}>
//                   <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
//                   <p>{value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Analyze Another */}
//           <button
//             className='analyze-btn'
//             onClick={() => { setResult(null); setFile(null) }}
//           >
//             📄 Analyze Another Resume
//           </button>

//         </div>
//       )}
//     </div>
//   )
// }

// export default Dashboard



import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { analyzeResume } from '../utils/api'
import { Upload, FileText, CheckCircle, AlertCircle, Lightbulb, BookOpen, X } from 'lucide-react'
import './Dashboard.css'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
}

// Animated score counter component
const ScoreCounter = ({ target }) => {
  const [count, setCount] = useState(0)

  useState(() => {
    let start = 0
    const duration = 1500
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  })

  return <span>{count}</span>
}

const Dashboard = () => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.type === 'application/pdf') {
      setFile(selected)
      setError('')
    } else {
      setError('Please upload a PDF file only')
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type === 'application/pdf') {
      setFile(dropped)
      setError('')
    } else {
      setError('Please upload a PDF file only')
    }
  }

  const handleAnalyze = async () => {
    if (!file) return setError('Please select a file first')
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      const res = await analyzeResume(formData)
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 75) return '#22c55e'
    if (score >= 50) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreLabel = (score) => {
    if (score >= 75) return 'Strong Resume 💪'
    if (score >= 50) return 'Needs Improvement 📈'
    return 'Needs Major Work 🔧'
  }

  return (
    <div className='dashboard'>
      <motion.div
        className='dashboard-header'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Analyze Your Resume</h1>
        <p>Upload your resume and get instant AI-powered feedback</p>
      </motion.div>

      {/* Upload Section */}
      <AnimatePresence>
        {!result && (
          <motion.div
            className='upload-section'
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`upload-box ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('fileInput').click()}
              whileHover={{ borderColor: '#6366f1' }}
              animate={dragOver ? { scale: 1.02 } : { scale: 1 }}
            >
              <input
                id='fileInput'
                type='file'
                accept='.pdf'
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />

              {file ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className='file-selected'
                >
                  <div className='file-icon-wrapper'>
                    <FileText size={40} color='#6366f1' />
                  </div>
                  <p className='file-name'>{file.name}</p>
                  <p className='file-size'>{(file.size / 1024).toFixed(1)} KB</p>
                  <p className='change-file'>Click to change file</p>
                </motion.div>
              ) : (
                <motion.div className='upload-prompt'>
                  <motion.div
                    className='upload-icon-wrapper'
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  >
                    <Upload size={40} color='#6366f1' />
                  </motion.div>
                  <p className='upload-text'>Drag & drop your resume here</p>
                  <p className='upload-subtext'>or click to browse</p>
                  <p className='upload-hint'>PDF files only · Max 5MB</p>
                </motion.div>
              )}
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  className='error-msg'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <AlertCircle size={16} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              className='analyze-btn'
              onClick={handleAnalyze}
              disabled={!file || loading}
              whileHover={!loading && file ? { scale: 1.05 } : {}}
              whileTap={!loading && file ? { scale: 0.95 } : {}}
            >
              {loading ? (
                <span className='loading-text'>
                  <motion.span
                    className='spinner'
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                  />
                  Analyzing with AI...
                </span>
              ) : (
                <span className='btn-content'>
                  <FileText size={18} />
                  Analyze My Resume
                </span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <AnimatePresence>
        {result && (
          <motion.div
            className='results'
            initial='hidden'
            animate='visible'
            variants={stagger}
          >
            {/* Score Card */}
            <motion.div className='score-card' variants={fadeUp}>
              <div className='score-left'>
                <motion.div
                  className='score-circle'
                  style={{ borderColor: getScoreColor(result.score) }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', duration: 0.8 }}
                >
                  <span
                    className='score-number'
                    style={{ color: getScoreColor(result.score) }}
                  >
                    <ScoreCounter target={result.score} />
                  </span>
                  <span className='score-out-of'>/100</span>
                </motion.div>
              </div>
              <div className='score-right'>
                <h2 style={{ color: getScoreColor(result.score) }}>
                  {getScoreLabel(result.score)}
                </h2>
                <p className='score-summary'>{result.feedback.summary}</p>
              </div>
            </motion.div>

            {/* Strengths and Weaknesses */}
            <motion.div className='sw-grid' variants={fadeUp}>
              <div className='strengths-card'>
                <h3><CheckCircle size={18} color='#22c55e' /> Strengths</h3>
                <ul>
                  {result.feedback.strengths.map((s, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className='weaknesses-card'>
                <h3><AlertCircle size={18} color='#f59e0b' /> Weaknesses</h3>
                <ul>
                  {result.feedback.weaknesses.map((w, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {w}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Suggestions */}
            <motion.div className='suggestions-card' variants={fadeUp}>
              <h3><Lightbulb size={18} color='#6366f1' /> Top Suggestions</h3>
              <ol>
                {result.feedback.suggestions.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {s}
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            {/* Section Feedback */}
            <motion.div className='sections-card' variants={fadeUp}>
              <h3><BookOpen size={18} color='#6366f1' /> Section-wise Feedback</h3>
              <div className='sections-grid'>
                {Object.entries(result.feedback.sections).map(([key, value], i) => (
                  <motion.div
                    className='section-item'
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <h4>{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
                    <p>{value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Analyze Another */}
            <motion.button
              className='analyze-btn'
              onClick={() => { setResult(null); setFile(null) }}
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className='btn-content'>
                <X size={18} />
                Analyze Another Resume
              </span>
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dashboard