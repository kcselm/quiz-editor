import React from "react"

const NewQuestion = ({ quizData, setQuizData }) => {
  const handleAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions_answers: [
        ...quizData.questions_answers,
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
    })
  }

  return (
    <button type="button" onClick={handleAddQuestion}>
      Add Question
    </button>
  )
}

export default NewQuestion
