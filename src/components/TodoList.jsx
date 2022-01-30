import React from 'react'
import PropTypes from 'prop-types'

function TodoList(props) {


TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    completeTodo: PropTypes.func.isRequired,

};

    return (
         <>
                <ul className="todo-list">
                    {props.todos.map((todo, index) => (
                        <li key={todo.id} className="todo-item-container">
                            <div className="todo-item">
                                <input type="checkbox" onChange={() => props.changeTodo(todo.id)}
                                       checked={(todo.isComplete) ? true : false}/>
                                {!todo.isEditing ? (
                                    <span className={`todo-item-label ${(todo.isComplete) ? 'line-through' : ''}`}
                                          onDoubleClick={() => props.markAsEditing(todo.id)}>
                                    {todo.title}
                                </span>
                                ) : (
                                    <input
                                        autofocus
                                        onBlur={(event) => props.updateTodo(event, todo.id)}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                props.updateTodo(event, todo.id)
                                            } else if (event.key === 'Escape') {
                                                props.cancelEdit(event, todo.id)
                                            }
                                        }}
                                        type="text"
                                        className="todo-item-input" defaultValue={todo.title}
                                    />
                                )}

                            </div>
                            <button
                                onClick={() => props.deleteTodo(todo.id)}
                                className="x-button"
                            >
                                <svg
                                    className="x-button-icon"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="check-all-container">
                    <div>
                        <div className="button">Check All</div>
                    </div>

                    <span>3 items remaining</span>
                </div>
                <div className="other-buttons-container">
                    <div>
                        <div className="button filter-button filter-button-active">All</div>
                        <div className="button filter-button ">Completed</div>
                        <div className="button filter-button ">Active</div>
                    </div>
                    <div>
                        <div className="button">Clear completed</div>
                    </div>
                </div>
                    </>
    )
}

export default TodoList;