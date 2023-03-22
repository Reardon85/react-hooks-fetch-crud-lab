import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questions, setQuestions, onUpdateQuestion}) {

  function handleDeleteClick(questionId) {

    const newArray = questions.filter((question) => {
       return question.id !== questionId
    })

    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE"
    })
    .then((resp) => resp.json())
    .then((data) => {console.log(data)
    setQuestions(newArray)})
  }




  const questionArray = questions.map((question) =><QuestionItem key={question.id} question={question} onDeleteClick={handleDeleteClick} onUpdateQuestion={onUpdateQuestion} /> )
  

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {questionArray}
      </ul>
    </section>
  );
}

export default QuestionList;
