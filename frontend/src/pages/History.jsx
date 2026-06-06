// import { useState, useEffect } from 'react'
// import { getHistory } from '../utils/api'
// import './History.css'

// const History = () => {
//   const [analyses, setAnalyses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await getHistory()
//         setAnalyses(res.data.analyses)
//       } catch (err) {
//         setError('Failed to load history')
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchHistory()
//   }, [])

//   const getScoreColor = (score) => {
//     if (score >= 75) return '#22c55e'
//     if (score >= 50) return '#f59e0b'
//     return '#ef4444'
//   }

//   if (loading) return (
//     <div className='history-loading'>
//       <div className='spinner-large'></div>
//       <p>Loading your history...</p>
//     </div>
//   )

//   return (
//     <div className='history'>
//       <div className='history-header'>
//         <h1>Analysis History</h1>
//         <p>Track how your resume improves over time</p>
//       </div>

//       {error && <div className='error-msg'>{error}</div>}

//       {analyses.length === 0 ? (
//         <div className='empty-state'>
//           <div className='empty-icon'>📄</div>
//           <h3>No analyses yet</h3>
//           <p>Upload your resume to get started</p>
//         </div>
//       ) : (
//         <div className='history-list'>
//           {analyses.map((analysis) => (
//             <div className='history-card' key={analysis._id}>
//               <div className='history-card-left'>
//                 <div
//                   className='history-score'
//                   style={{ color: getScoreColor(analysis.score) }}
//                 >
//                   {analysis.score}
//                   <span>/100</span>
//                 </div>
//                 <div className='history-info'>
//                   <p className='history-filename'>{analysis.fileName}</p>
//                   <p className='history-date'>
//                     {new Date(analysis.createdAt).toLocaleDateString('en-IN', {
//                       day: 'numeric',
//                       month: 'short',
//                       year: 'numeric'
//                     })}
//                   </p>
//                 </div>
//               </div>
//               <div className='history-summary'>
//                 <p>{analysis.feedback.summary}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default History

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getHistory } from '../utils/api'
import { FileText, Calendar, TrendingUp } from 'lucide-react'
import './History.css'

const History = () => {
  const [analyses, setAnalyses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory()
        setAnalyses(res.data.analyses)
      } catch (err) {
        setError('Failed to load history')
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const getScoreColor = (score) => {
    if (score >= 75) return '#22c55e'
    if (score >= 50) return '#f59e0b'
    return '#ef4444'
  }

  const getScoreBg = (score) => {
    if (score >= 75) return 'rgba(34, 197, 94, 0.1)'
    if (score >= 50) return 'rgba(245, 158, 11, 0.1)'
    return 'rgba(239, 68, 68, 0.1)'
  }

  if (loading) return (
    <div className='history-loading'>
      <motion.div
        className='spinner-large'
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
      />
      <p>Loading your history...</p>
    </div>
  )

  return (
    <div className='history'>
      <motion.div
        className='history-header'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Analysis History</h1>
        <p>Track how your resume improves over time</p>
      </motion.div>

      {error && <div className='error-msg'>{error}</div>}

      {analyses.length === 0 ? (
        <motion.div
          className='empty-state'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <FileText size={60} color='#334155' />
          <h3>No analyses yet</h3>
          <p>Upload your resume to get started</p>
        </motion.div>
      ) : (
        <motion.div
          className='history-list'
          initial='hidden'
          animate='visible'
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {analyses.map((analysis, i) => (
            <motion.div
              className='history-card'
              key={analysis._id}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
              }}
              whileHover={{ x: 6, transition: { duration: 0.2 } }}
            >
              <div
                className='history-score-badge'
                style={{
                  color: getScoreColor(analysis.score),
                  background: getScoreBg(analysis.score)
                }}
              >
                <TrendingUp size={16} />
                {analysis.score}/100
              </div>

              <div className='history-middle'>
                <div className='history-filename'>
                  <FileText size={16} color='#6366f1' />
                  {analysis.fileName}
                </div>
                <p className='history-summary'>{analysis.feedback.summary}</p>
              </div>

              <div className='history-date'>
                <Calendar size={14} color='#475569' />
                {new Date(analysis.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default History