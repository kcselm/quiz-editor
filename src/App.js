import "./App.css"
import { AppView } from "./components/AppView"

import QuizContextProvider from "./contexts/QuizContext"
// import { QuizEdit } from "./components/QuizEdit"
// import { QuizList } from "./components/QuizList"
// import { AddNewQuiz } from "./components/AddNewQuiz"
import { useState } from "react"

function App() {
  const [addNew, setAddNew] = useState(false)

  return (
    <div className="App">
      <main className="App-header">
        <h1>Quiz Creator</h1>
        <QuizContextProvider>
          <AppView />
        </QuizContextProvider>
      </main>
    </div>
  )
}

export default App
