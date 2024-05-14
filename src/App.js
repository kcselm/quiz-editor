import "./App.css"

import { QuizEdit } from "./components/QuizEdit"
import { QuizList } from "./components/QuizList"
import QuizContextProvider from "./contexts/QuizContext"

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <h1>Quiz Creator</h1>
        <button>+ Add New Quiz</button>
        <div className="grid-container">
          <QuizContextProvider>
            <QuizList />
            <QuizEdit />
          </QuizContextProvider>
        </div>
      </main>
    </div>
  )
}

export default App
