import { useContext } from "react"
import { QuizContext } from "../contexts/QuizContext"

export const QuizEdit = () => {
  const { selectedQuiz } = useContext(QuizContext)

  return (
    <>
      {selectedQuiz ? (
        <div className="grid-col">
          <>
            <h5>Edit</h5>

            <div>
              <label htmlFor="title">Title</label>
              <input value={selectedQuiz.title}></input>
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <input value={selectedQuiz.description}></input>
            </div>
            <br></br>
            <button>Save</button>
          </>
        </div>
      ) : null}
    </>
  )
}
