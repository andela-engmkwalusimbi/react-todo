import React, { PropTypes } from 'react';

export const TodoForm = (props) => (
    <form onSubmit={props.handleSubmit}>
        <input type="text"
            onChange={props.handleInputChange}
            value={props.currentTodo} />
    </form>
);

TodoForm.propTypes = {
    currentTodo: PropTypes.string,
    handleInputChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}
