import React, { Component, PropTypes } from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoForm, TodoList, Footer } from './components/todo';
import { addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos } from './lib/todoHelpers';
import { pipe, partial } from './lib/utils';
import { loadTodos, createTodo, saveTodo, destroyTodo } from './lib/todoService';

class App extends Component {
    state = {
        todos: [],
        currentTodo: '',
    }

    static contextTypes = {
        route: PropTypes.string
    }

    handleRemove = (id, evt) => {
        evt.preventDefault();
        const updatedTodos = removeTodo(this.state.todos, id);
        this.setState({todos: updatedTodos});
        destroyTodo(id)
            .then(() => this.showTempmessage('Todo Deleted'))
    }

    handleToggle = (id) => {
        const getToggledTodo = pipe(findById, toggleTodo);
        const updated = getToggledTodo(id, this.state.todos);
        const getUpdatedTodos = partial(updateTodo, this.state.todos);
        const updatedTodos = getUpdatedTodos(updated);
        this.setState({
            todos: updatedTodos
        });
        saveTodo(updated)
            .then(() => this.showTempmessage('Todo Updated'))
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        const id = generateId();
        const newTodo = {id, name: this.state.currentTodo, isComplete: false};
        const updateTodos = addTodo(this.state.todos, newTodo);
        this.setState({
            todos: updateTodos,
            currentTodo: '',
            errorMessage: ''
        });
        createTodo(newTodo)
            .then(() => this.showTempmessage('Todo Added'))
    }

    handleEmptySubmit = (evt) => {
        evt.preventDefault();
        this.setState({
            errorMessage: 'Please supply a todo name'
        })
    }

    handleInputChange = (evt) => {
        this.setState({
            currentTodo: evt.target.value
        })
    }

    showTempmessage = (mes) => {
        this.setState({message: mes})
        setTimeout(() => this.setState({message: ''}), 1000)
    }

    componentDidMount() {
        loadTodos()
            .then(todos => this.setState({todos}))
    }

    render() {
        const submitHandler = this.state.currentTodo? this.handleSubmit: this.handleEmptySubmit;
        const displayTodos = filterTodos(this.state.todos, this.context.route)
        return (
            <div className='App'>
                <div className='App-header'>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <h2> React Todos </h2>
                </div>
                <div className='Todo-App'>
                    {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
                    {this.state.message && <span className='success'>{this.state.message}</span>}
                    <TodoForm
                        handleInputChange={this.handleInputChange}
                        handleSubmit={submitHandler}
                        currentTodo={this.state.currentTodo}/>
                    <TodoList
                        todos={displayTodos}
                        handleToggle={this.handleToggle}
                        handleRemove={this.handleRemove}/>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;
