import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from './List.js'
import {
  handleAddTodo,
  handleDeleteTodo,
  handleToggle
} from '../actions/todos.js';

class Todos extends Component {
  addItem = (e) => {
    e.preventDefault();

    this.props.dispatch(handleAddTodo(
      this.input.value,
      () => this.input.value = ''
    ))
  }
  removeItem = (todo) => {
    this.props.dispatch(handleDeleteTodo(todo.id));
  }
  toggleItem = (id) => {
    this.props.dispatch(handleToggle(id));
  }


  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <input
          type='text'
          placeholder='Add Todo'
          ref={(input) => this.input = input}
        />
        <button onClick={this.addItem}>Add Todo</button>
        <List
          toggle={this.toggleItem}
          items={this.props.todos}
          remove={this.removeItem}
        />
      </div>
    )
  }
}

export default connect((state) => ({
  todos: state.todos
}))(Todos);