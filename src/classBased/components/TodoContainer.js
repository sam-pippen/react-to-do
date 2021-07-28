import React from "react"
import TodosList from "./TodosList"
import Header from "./Header"
import InputTodo from "./InputTodo"
import { v4 as uuidv4 } from "uuid";

class TodoContainer extends React.Component {
  state = {
    todos: []
  };

  componentDidUpdate(prevState, prevProps) {
    if (prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos);
      localStorage.setItem("todos", temp);
    }
  }

  //Executed when the component gets rendered to the DOM
  componentDidMount() {
    const temp = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(temp);
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
    //makes a request to the URL which returns a promise containing an HTTP response then we resolve
    //the response to JSON format where we then receive the data in the format we can work with
    //fetches JSON data from inputted URL (limited to 10 JSON objects)
    // fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
    //   .then(response => response.json())
    //   .then(data => this.setState({ todos: data }));
  }

  //do not use this.state because it may not be accurate
  handleChange = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    }));
  };

  delTodo = (id) => {
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => {    //(…) allows us to grab the current todos item(s) at every point
          return todo.id !== id;                //filter works much like map in that it loops through all fields in array and returns new array
        })
      ]
    });
  }

  //start w/ console.log(title) to make sure the function is being executed then actually implement the function
  addTodoItem = (title) => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]   //...this.state.todos selects all todos. ,newTodo selects the todo to be added
    });
  }

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle;
        }
        return todo;
      })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
            todos={this.state.todos}
            handleChangeProps={this.handleChange}
            deleteTodoProps={this.delTodo}
            setUpdate={this.setUpdate}
            />
        </div>
      </div>
    );
  }
}

export default TodoContainer
