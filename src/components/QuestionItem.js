import React from "react";

function QuestionItem({ question, onDeleteClick, onUpdateQuestion}) {
  const { id, prompt, answers, correctIndex} = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));



  function handleChange (e) {
      onUpdateQuestion(id, e.target.value)

  }
  function handleDeleteClick() {
    onDeleteClick(id);
  }


  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
