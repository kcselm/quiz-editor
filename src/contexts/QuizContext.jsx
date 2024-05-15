import React, { createContext, useState } from "react"
import exampleData from "../exampleData"

export const QuizContext = createContext({})

export default function QuizContextProvider({ children }) {
  const [quizzes, setQuizzes] = useState(exampleData)
  const [selectedQuiz, setSelectedQuiz] = useState({})
  const [takeQuiz, setTakeQuiz] = useState()
  const [score, setScore] = useState(0)

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        setQuizzes,
        selectedQuiz,
        setSelectedQuiz,
        takeQuiz,
        setTakeQuiz,
        score,
        setScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}
