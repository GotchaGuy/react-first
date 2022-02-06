import React, {useState} from 'react'
import PropTypes from 'prop-types'
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';

import useToggle from '../hooks/useToggle';


function TodoList(props) {

TodoList.propTypes = {
    todos: PropTypes.array.isRequired,
    todosFiltered: PropTypes.func.isRequired,
    // completeTodo: PropTypes.func.isRequired,
    remaining: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    completeAllTodos: PropTypes.func.isRequired,
};

const[filter, setFilter] = useState('all');
const[isFeaturesOneVisible, setFeaturesOneVisible] = useToggle();
const[isFeaturesTwoVisible, setFeaturesTwoVisible] = useToggle(false);


    return (
         <>
                <ul className="todo-list">
                    {props.todosFiltered(filter).map((todo, index) => (
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
                                        autoFocus
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

                <div className="toggles-container">
                    <button onClick={() => setFeaturesOneVisible()} className="button">Features One Toggle</button>
                    <button onClick={() => setFeaturesTwoVisible()} className="button">Features Two Toggle</button>
                </div>

             { isFeaturesOneVisible &&
             <div className="check-all-container">
                 <TodoCompleteAll completeAllTodos={props.completeAllTodos}/>

                 <TodoItemsRemaining
                     remaining={props.remaining}
                 />
             </div>
             }
             {isFeaturesTwoVisible &&
             <div className="other-buttons-container">
                 <TodoFilters
                     todosFiltered={props.todosFiltered}
                     filter={filter}
                     setFilter={setFilter}
                 />
                 <div>
                     <TodoClearCompleted
                         clearCompleted={props.clearCompleted}
                     />
                 </div>
             </div>
             }
                    </>
    )
}

export default TodoList;