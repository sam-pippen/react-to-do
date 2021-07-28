import React, {Component} from 'react';

class InputTodo extends Component {
  state = {
    title: ""
  };

  onChange = (e) => {
    this.setState({                     //setState only updates the values that have been changed but keeps unchanged values intact
      [e.target.name]: e.target.value   //e holds some important information about the event allowing you to target the specific input field and grab the updated value.
    });                                 //e.target.name is the input's name prop and e.target.value is input's value prop
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.title.trim()) {
      this.props.addTodoProps(this.state.title);
      this.setState({
        title: ""
      });
    } else {
      alert("Please write item");
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <input
          type='text'
          className='input-text'
          placeholder='Add Todo...'
          value={this.state.title}
          name='title'
          onChange={this.onChange}
        />
        <button className='input-submit'>Submit</button>
      </form>
    )
  }
}

export default InputTodo
