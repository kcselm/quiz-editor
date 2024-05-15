import { useContext } from "react"
import { QuizContext } from "../contexts/QuizContext"

export const TakeQuiz = () => {
  const { takeQuiz } = useContext(QuizContext)

  return <>{takeQuiz ? <div className="takeQuiz"> Take Quiz </div> : null}</>
}
