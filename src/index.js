import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"

//component file
import TodoContainer from "./functionBased/components/TodoContainer"

//stylesheet
import "./functionBased/App.css"

//wrap top-level app in <Router> so that you can navigate to other pages within app
//basename is the subdirectory name (which is the repository name) i.e. "react-to-do"
//this was specified in the homepage property in our package.json
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <TodoContainer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
