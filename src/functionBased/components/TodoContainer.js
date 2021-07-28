//useState and useEffect allow state changes within function components
import React, { useState, useEffect } from "react"

//Route provides different routes (pages) to navigate to and Switch
//wraps all the <Route> elements, looks through them and then
//renders the first child whose path matches the current URL.
import { Route, Switch } from "react-router-dom"

//import routes
import About from "/Users/sampippen/react-to-do/src/pages/About"
import NotMatch from "/Users/sampippen/react-to-do/src/pages/NotMatch"

//import other components
import TodosList from "./TodosList"
import Header from "./Header"
import InputTodo from "./InputTodo"
import Navbar from "./Navbar"

//import library to generate unique id's for components
import { v4 as uuidv4 } from "uuid";

//function component rather than a class component
//reason: no more using "this" and this.setState
const TodoContainer = () => {
  //todos is local variable that represents the todos state variable
  //setTodos is the function returned by useState() that will allow
  //you to "set the state" of todos
  const [todos, setTodos] = useState(getInitialTodos());

  //this function replaced a useEffect() function
  function getInitialTodos() {
    //getting stored items
    const temp = localStorage.getItem("todos");
    const savedTodos = JSON.parse(temp)
    return savedTodos || [] //empty array because no dependencies are used
  }

  //no need to use prevState because useEffect() takes care of that
  //todos is modified, so it is listed as a dependency
  useEffect(() => {
    //storing todos item as JSON objects
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

  //do not use this.state because it may not be accurate
  const handleChange = (id) => {
    setTodos(prevState =>
      prevState.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    );
  };

  const delTodo = (id) => {
    setTodos([
        ...todos.filter(todo => {    //(…) allows us to grab the current todos item(s) at every point
          return todo.id !== id;     //filter works much like map in that it loops through all fields in array and returns new array
        }),
    ])
  }

  //start w/ console.log(title) to make sure the function is being executed then actually implement the function
  const addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    }
    setTodos([...todos, newTodo])    //...this.state.todos selects all todos. ,newTodo selects the todo to be added
  }

  const setUpdate = (updatedTitle, id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo
      })
    )
  }

    //React Fragment: used to render multiple JSX (<> and </>)
    //<Route path="/about" component={About} />
    return (
      <>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <div className="container">
              <div className="inner">
                <Header />
                <InputTodo addTodoProps={addTodoItem} />
                <TodosList
                  todos={todos}
                  handleChangeProps={handleChange}
                  deleteTodoProps={delTodo}
                  setUpdate={setUpdate}
                  />
              </div>
            </div>
          </Route>

          <Route path="/about">
            <About />
          </Route>

          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </>
    )
}

export default TodoContainer
