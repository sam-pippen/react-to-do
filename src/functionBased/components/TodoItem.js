import React, { useState, useEffect } from "react"
import { FaTrash } from "react-icons/fa"
import styles from "./TodoItem.module.css"

const TodoItem = (props) => {
  const [editing, setEditing] = useState(false)

  //Anytime you return a function inside the useEffect Hook and then have
  //no dependency in the array, the effect will run just once and the return
  //function will be called when the component is about to unmount.
  useEffect(() => {
    return () => {
      console.log("Cleaning up...")
    }
  }, [])

  const handleEditing = () => {
    setEditing(true)
  }

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false)
    }
  }

  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  }

  //defines completed, id, and title as variables so that they don't have
  //to be referred to as props.todo.completed, props.todo.id, etc.
  const { completed, id, title } = props.todo
  let viewMode = {}
  let editMode = {}

  if (editing) {
    viewMode.display = "none"
  } else {
    editMode.display = "none"
  }

  return(
    <li className={styles.item}>
      <div onDoubleClick={handleEditing} style={viewMode}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={completed}
          onChange={() => props.handleChangeProps(id)}
        />
        <button onClick={() => props.deleteTodoProps(id)}>
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <span style={completed ? completedStyle : null}>{title}</span>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={title}
        onChange={e => {
          props.setUpdate(e.target.value, id)
        }}
        onKeyDown={handleUpdatedDone}
        />
    </li>
  );
}

export default TodoItem
