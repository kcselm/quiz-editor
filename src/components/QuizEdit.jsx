import { useContext, useState } from "react"
import { QuizContext } from "../contexts/QuizContext"
import NewQuestion from "./NewQuestion"
import { getDateTime } from "../utils/getDate"
import { getRandomID } from "../utils/generateID"

export const QuizEdit = () => {
  const { quizzes, setQuizzes, selectedQuiz, setSelectedQuiz } =
    useContext(QuizContext)
  console.log("SELECTEDQUIZ", selectedQuiz)

  const handleChange = (e, questionIndex = null, answerIndex = null) => {
    const { name, value } = e.target

    if (questionIndex !== null) {
      setSelectedQuiz((prevQuiz) => {
        const updatedQuestions = [...prevQuiz.questions_answers]
        if (answerIndex !== null) {
          updatedQuestions[questionIndex].answers[answerIndex] = {
            ...updatedQuestions[questionIndex].answers[answerIndex],
            [name]: value,
          }
        } else {
          updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            [name]: value,
          }
        }
        return { ...prevQuiz, questions_answers: updatedQuestions }
      })
    } else {
      setSelectedQuiz((prevQuiz) => ({
        ...prevQuiz,
        [name]: value,
      }))
    }
  }

  const handleCheckboxChange = (e, questionIndex, answerIndex) => {
    const { checked } = e.target
    const updatedQuestions = selectedQuiz.questions_answers.map((q, i) => {
      if (i === questionIndex) {
        const updatedAnswers = q.answers.map((a, j) => ({
          ...a,
          is_true: j === answerIndex ? checked : false,
        }))
        return { ...q, answers: updatedAnswers }
      }
      return q
    })
    setSelectedQuiz({ ...selectedQuiz, questions_answers: updatedQuestions })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Update the modified field
    const updatedQuiz = {
      ...selectedQuiz,
      modified: getDateTime(),
    }

    const quizIndex = quizzes.findIndex((quiz) => quiz.id === selectedQuiz.id)

    if (quizIndex !== -1) {
      const updatedQuizzes = [...quizzes]
      updatedQuizzes[quizIndex] = updatedQuiz
      setQuizzes(updatedQuizzes)
    }

    setSelectedQuiz({
      created: "",
      description: "",
      id: null,
      modified: "",
      questions_answers: [
        {
          answer_id: null,
          answers: [
            { id: null, is_true: false, text: "" },
            { id: null, is_true: false, text: "" },
            { id: null, is_true: false, text: "" },
            { id: null, is_true: false, text: "" },
          ],
          feedback_false: "",
          feedback_true: "",
          id: null,
          text: "",
        },
      ],
      score: null,
      title: "",
      url: "",
    })
  }

  // console.log("QUIZZES", quizzes)

  return (
    <>
      {selectedQuiz ? (
        <div className="grid-col">
          <>
            <h5>Edit</h5>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={selectedQuiz.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={selectedQuiz.description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="url">URL:</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={selectedQuiz.url}
                  onChange={handleChange}
                />
              </div>
              {selectedQuiz.questions_answers &&
                selectedQuiz.questions_answers.map(
                  (question, questionIndex) => (
                    <div key={questionIndex} className="form-group">
                      <label htmlFor={`questionText${questionIndex}`}>
                        Question {questionIndex + 1}:
                      </label>
                      <input
                        type="text"
                        id={`questionText${questionIndex}`}
                        name="text"
                        value={question.text}
                        onChange={(e) => handleChange(e, questionIndex)}
                      />
                      {question.answers.map((answer, answerIndex) => (
                        <div key={answerIndex} className="form-group">
                          <input
                            type="text"
                            name="text"
                            value={answer.text}
                            placeholder={`Answer ${answerIndex + 1}`}
                            onChange={(e) =>
                              handleChange(e, questionIndex, answerIndex)
                            }
                          />
                          <label>
                            <input
                              type="checkbox"
                              name="is_true"
                              checked={answer.is_true}
                              onChange={(e) =>
                                handleCheckboxChange(
                                  e,
                                  questionIndex,
                                  answerIndex
                                )
                              }
                            />
                            Is True
                          </label>
                        </div>
                      ))}
                      <div className="form-group">
                        <label htmlFor={`feedbackTrue${questionIndex}`}>
                          Feedback True:
                        </label>
                        <input
                          type="text"
                          id={`feedbackTrue${questionIndex}`}
                          name="feedback_true"
                          value={question.feedback_true}
                          onChange={(e) => handleChange(e, questionIndex)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`feedbackFalse${questionIndex}`}>
                          Feedback False:
                        </label>
                        <input
                          type="text"
                          id={`feedbackFalse${questionIndex}`}
                          name="feedback_false"
                          value={question.feedback_false}
                          onChange={(e) => handleChange(e, questionIndex)}
                        />
                      </div>
                    </div>
                  )
                )}
              <NewQuestion
                quizData={selectedQuiz}
                setQuizData={setSelectedQuiz}
              />
              <button type="submit">Submit</button>
            </form>
          </>
        </div>
      ) : null}
    </>
  )
}
