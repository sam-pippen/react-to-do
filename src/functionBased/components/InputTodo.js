import React, { useState } from "react"
import { FaPlusCircle } from "react-icons/fa"

const InputTodo = (props) => {
  const [inputText, setInputText] = useState({
    title: "",
  })

  const onChange = e => {
    setInputText({
      ...inputText,
      [e.target.name]: e.target.value,      //e contains valuable info
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (inputText.title.trim()) {           //trim is used to remove whitespace
      props.addTodoProps(inputText.title);
      setInputText({
        title: ""
      })
    } else { alert("Please write item") }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={inputText.title}
        name="title"
        onChange={onChange}
      />
      <button className="input-submit">
        <FaPlusCircle
          style={{ color: "darkcyan", fontSize: "20px", marginTop: "2px" }}
        />
      </button>
    </form>
  )
}

export default InputTodo
