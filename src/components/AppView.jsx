import { useContext, useState } from "react"
import { QuizContext } from "../contexts/QuizContext"
import { QuizEdit } from "./QuizEdit"
import { QuizList } from "./QuizList"
import { TakeQuiz } from "./TakeQuiz"
import { AddNewQuiz } from "./AddNewQuiz"

export const AppView = () => {
  const {
    quizzes,
    setQuizzes,
    selectedQuiz,
    setSelectedQuiz,
    takeQuiz,
    setTakeQuiz,
  } = useContext(QuizContext)

  const [addNew, setAddNew] = useState(false)

  return (
    <>
      {takeQuiz || (
        <button onClick={() => setAddNew(!addNew)}>
          {addNew ? "Edit Quiz" : "+ Add New Quiz"}
        </button>
      )}
      <TakeQuiz />
      <div className="grid-container">
        {takeQuiz ? null : (
          <>
            <QuizList />
            {addNew ? <AddNewQuiz /> : <QuizEdit />}
          </>
        )}
      </div>
    </>
  )
}
