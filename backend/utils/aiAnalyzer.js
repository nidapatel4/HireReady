// // aiAnalyzer.js — Handles all Gemini AI communication
// // Takes resume text → returns structured feedback

// const { GoogleGenerativeAI } = require('@google/generative-ai')
// const dotenv = require('dotenv')
// dotenv.config()

// // Initialize Gemini with our API key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// const analyzeResumeWithAI = async (resumeText) => {
//   // Get the Gemini 2.5 Flash model — fast and free
//   // const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })
//   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

//   // This is prompt engineering — we tell AI exactly what we want
//   // and HOW we want it formatted
//   const prompt = `
//     You are an expert resume reviewer with 10+ years of experience 
//     in technical recruiting and hiring for top tech companies.
    
//     Analyze the following resume and respond with ONLY a JSON object.
//     No extra text, no markdown, no backticks. Just pure JSON.
    
//     Resume Text:
//     ${resumeText}
    
//     Respond with exactly this JSON structure:
//     {
//       "score": <number between 0-100>,
//       "summary": "<2-3 sentence overall assessment>",
//       "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
//       "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
//       "suggestions": [
//         "<specific improvement 1>",
//         "<specific improvement 2>",
//         "<specific improvement 3>",
//         "<specific improvement 4>",
//         "<specific improvement 5>"
//       ],
//       "sections": {
//         "experience": "<feedback on experience section>",
//         "skills": "<feedback on skills section>",
//         "education": "<feedback on education section>",
//         "formatting": "<feedback on overall formatting and structure>"
//       }
//     }
//   `

//   // Send prompt to Gemini and get response
//   const result = await model.generateContent(prompt)
//   const responseText = result.response.text()

//   // Parse the JSON response from AI
//   // We use try/catch because AI can sometimes return unexpected format
//   try {
//     const feedback = JSON.parse(responseText)
//     return feedback
//   } catch (parseError) {
//     // If JSON parsing fails, clean the response and try again
//     // Sometimes AI adds ```json ``` around the response
//     const cleaned = responseText
//       .replace(/```json/g, '')
//       .replace(/```/g, '')
//       .trim()
//     return JSON.parse(cleaned)
//   }
// }

// module.exports = { analyzeResumeWithAI }





const { GoogleGenerativeAI } = require('@google/generative-ai')
const dotenv = require('dotenv')
dotenv.config()

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const analyzeResumeWithAI = async (resumeText, retries = 3) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `
    You are an expert resume reviewer with 10+ years of experience 
    in technical recruiting and hiring for top tech companies.
    
    Analyze the following resume and respond with ONLY a JSON object.
    No extra text, no markdown, no backticks. Just pure JSON.
    
    Resume Text:
    ${resumeText}
    
    Respond with exactly this JSON structure:
    {
      "score": <number between 0-100>,
      "summary": "<2-3 sentence overall assessment>",
      "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
      "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
      "suggestions": [
        "<specific improvement 1>",
        "<specific improvement 2>",
        "<specific improvement 3>",
        "<specific improvement 4>",
        "<specific improvement 5>"
      ],
      "sections": {
        "experience": "<feedback on experience section>",
        "skills": "<feedback on skills section>",
        "education": "<feedback on education section>",
        "formatting": "<feedback on overall formatting and structure>"
      }
    }
  `

  try {
    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    try {
      return JSON.parse(responseText)
    } catch {
      const cleaned = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim()
      return JSON.parse(cleaned)
    }

  } catch (error) {
    if (retries > 0 && (error.message.includes('503') || error.message.includes('429'))) {
      console.log(`Gemini busy, retrying... (${retries} attempts left)`)
      await new Promise(resolve => setTimeout(resolve, 3000))
      return analyzeResumeWithAI(resumeText, retries - 1)
    }
    throw error
  }
}
module.exports = { analyzeResumeWithAI }