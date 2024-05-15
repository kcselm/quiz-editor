import { useContext, useState } from "react"
import { QuizContext } from "../contexts/QuizContext"

import NewQuestion from "./NewQuestion"
import { getDateTime } from "../utils/getDate"
import { getRandomID } from "../utils/generateID"

export const AddNewQuiz = () => {
  const { quizzes, setQuizzes } = useContext(QuizContext)

  const [quizData, setQuizData] = useState({
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

  const handleChange = (e, questionIndex = null, answerIndex = null) => {
    const { name, value } = e.target
    if (questionIndex !== null && answerIndex === null) {
      const updatedQuestions = quizData.questions_answers.map((q, i) =>
        i === questionIndex ? { ...q, [name]: value } : q
      )
      setQuizData({ ...quizData, questions_answers: updatedQuestions })
    } else if (questionIndex !== null && answerIndex !== null) {
      const updatedQuestions = quizData.questions_answers.map((q, i) => {
        if (i === questionIndex) {
          const updatedAnswers = q.answers.map((a, j) =>
            j === answerIndex ? { ...a, [name]: value } : a
          )
          return { ...q, answers: updatedAnswers }
        }
        return q
      })
      setQuizData({ ...quizData, questions_answers: updatedQuestions })
    } else {
      setQuizData({
        ...quizData,
        [name]: value,
      })
    }
  }

  const handleCheckboxChange = (e, questionIndex, answerIndex) => {
    const { checked } = e.target
    const updatedQuestions = quizData.questions_answers.map((q, i) => {
      if (i === questionIndex) {
        const updatedAnswers = q.answers.map((a, j) => ({
          ...a,
          is_true: j === answerIndex ? checked : false,
        }))
        return { ...q, answers: updatedAnswers }
      }
      return q
    })
    setQuizData({ ...quizData, questions_answers: updatedQuestions })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const updatedQuestions = (quizData.questions_answers || []).map(
      (question) => {
        const updatedAnswers = (question.answers || []).map((answer) => ({
          ...answer,
          id: getRandomID(),
        }))

        const trueAnswer = updatedAnswers.find(
          (answer) => answer.is_true === true
        )

        return {
          ...question,
          id: question.id || getRandomID(),
          answer_id: trueAnswer ? trueAnswer.id : null,
          answers: updatedAnswers,
        }
      }
    )

    setQuizData({
      ...quizData,
      created: getDateTime(),
      modified: getDateTime(),
      id: getRandomID(),
      questions_answers: updatedQuestions,
    })

    setQuizzes(
      quizzes
        ? [
            ...quizzes,
            {
              ...quizData,
              created: getDateTime(),
              modified: getDateTime(),
              id: getRandomID(),
              questions_answers: updatedQuestions,
            },
          ]
        : {
            ...quizData,
            created: getDateTime(),
            modified: getDateTime(),
            id: getRandomID(),
            questions_answers: updatedQuestions,
          }
    )
    setQuizData({
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

    // console.log("QUIZZES", quizzes)

    // console.log("Quiz data:", {
    //   ...quizData,
    //   created: getDateTime(),
    //   modified: getDateTime(),
    //   id: getRandomID(),
    //   questions_answers: updatedQuestions,
    // })
  }

  return (
    <div className="grid-col ">
      <h5>Add New Quiz</h5>
      <>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={quizData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={quizData.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL:</label>
            <input
              type="url"
              id="url"
              name="url"
              value={quizData.url}
              onChange={handleChange}
            />
          </div>
          {quizData.questions_answers.map((question, questionIndex) => (
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
                        handleCheckboxChange(e, questionIndex, answerIndex)
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
          ))}
          <NewQuestion quizData={quizData} setQuizData={setQuizData} />
          <button type="submit">Submit</button>
        </form>
      </>
    </div>
  )
}
