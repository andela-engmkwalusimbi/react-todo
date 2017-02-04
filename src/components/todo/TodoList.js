import React, { PropTypes } from 'react';
import { TodoItem } from './TodoItem';

export const TodoList = (props) => {
    return (
        <div className="Todo-list">
            <ul>
                {props.todos.map(todo =>
                    <TodoItem
                        handleToggle={props.handleToggle}
                        handleRemove={props.handleRemove}
                        key={todo.id} {...todo} />
                )}
            </ul>
        </div>
    )
}

TodoList.propType = {
    todos: PropTypes.array.isRequired,
    handleToggle: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
}