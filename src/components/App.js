import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const controler = new AbortController()

    fetch('http://localhost:4000/questions')
    .then((resp) => resp.json())
    .then((data) => {console.log(data)
      setQuestions(data)
    })

    return () => controler.abort()
  }, [])

  
  function delQuestion(questionId) {

    const newArray = questions.filter((question) => {
       return question.id !== questionId
    })

    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE"
    })
    .then((resp) => resp.json())
    .then((data) => console.log(data))
    setQuestions(newArray)
  }

  function updateQuestion(questionId, newIndex){

    const newArray = questions.map((question) => {
       if (question.id === questionId){
        return {...question, correctIndex: newIndex}
       }
       return question
   })

    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
      correctIndex: newIndex
      })
    })
    .then((resp) => resp.json())
    .then((data) => setQuestions(newArray))

  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
    {page === "Form" ? <QuestionForm onSetQuestions={setQuestions} /> : <QuestionList questions={questions} setQuestions={setQuestions} onUpdateQuestion={updateQuestion}/>}
    </main>
  );
}

export default App;
