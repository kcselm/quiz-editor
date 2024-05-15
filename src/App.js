import "./App.css"

import QuizContextProvider from "./contexts/QuizContext"
import { QuizEdit } from "./components/QuizEdit"
import { QuizList } from "./components/QuizList"
import { AddNewQuiz } from "./components/AddNewQuiz"
import { useState } from "react"

function App() {
  const [addNew, setAddNew] = useState(false)

  return (
    <div className="App">
      <main className="App-header">
        <h1>Quiz Creator</h1>
        <button onClick={() => setAddNew(!addNew)}>
          {addNew ? "Edit Quiz" : "+ Add New Quiz"}
        </button>
        <div className="grid-container">
          <QuizContextProvider>
            <QuizList />
            {addNew ? <AddNewQuiz /> : <QuizEdit />}
          </QuizContextProvider>
        </div>
      </main>
    </div>
  )
}

export default App
