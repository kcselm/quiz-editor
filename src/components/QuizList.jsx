import React from "react"
import { useContext } from "react"
import { QuizContext } from "../contexts/QuizContext"

export const QuizList = () => {
  const { quizzes, setSelectedQuiz } = useContext(QuizContext)

  return (
    <div className="grid-col">
      {quizzes &&
        quizzes.map((quiz) => (
          <p
            className="quiz"
            key={quiz.id}
            onClick={() => {
              setSelectedQuiz(quiz)
            }}
          >
            {quiz.title}
          </p>
        ))}
    </div>
  )
}
