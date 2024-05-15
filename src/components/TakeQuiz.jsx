import { useContext, useState } from "react"
import { QuizContext } from "../contexts/QuizContext"

export const TakeQuiz = () => {
  const { selectedQuiz, takeQuiz, setTakeQuiz } = useContext(QuizContext)
  const [score, setScore] = useState(0)

  return (
    <>
      <h3>{selectedQuiz.title}</h3>
      <p>{selectedQuiz.description}</p>
      {selectedQuiz.questions_answers &&
        selectedQuiz.questions_answers.map((question, questionIndex) => (
          <div key={questionIndex}>
            <div htmlFor={`questionText${questionIndex}`}>
              Question {questionIndex + 1}:
            </div>
            <div>{question.text}</div>

            {question.answers.map((answer, answerIndex) => (
              <>
                <button
                  className="answer"
                  key={answerIndex}
                  onClick={() => setScore(score + (answer.is_true ? 1 : 0))}
                >
                  {answer.text}
                </button>
                {answer.is_true ? answer.feedback_true : answer.feedback_false}
              </>
            ))}
          </div>
        ))}
      <div>Score: {score}</div>
      <button onClick={setTakeQuiz(() => false)}>Back</button>
    </>
  )
}
