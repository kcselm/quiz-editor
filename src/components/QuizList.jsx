import React from "react"
import { useContext } from "react"
import { QuizContext } from "../contexts/QuizContext"

export const QuizList = () => {
  const { quizzes, setSelectedQuiz, setTakeQuiz } = useContext(QuizContext)

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
            <button onClick={() => (setSelectedQuiz(quiz), setTakeQuiz(true))}>
              Take Quiz
            </button>
          </p>
        ))}
    </div>
  )
}
