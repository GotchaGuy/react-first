import '../reset.css';
import '../App.css';
import {useState} from "react";

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'Learn about blockchain and react',
            isComplete: false,
            isEditing: false,
        },
        {
            id: 2,
            title: 'Clean room',
            isComplete: true,
            isEditing: false,
        },
        {
            id: 3,
            title: 'Have dinner',
            isComplete: false,
            isEditing: false,
        },

    ]);

    const [todoInput, setTodoInput] = useState('');
    const [idForTodo, setIdForTodo] = useState('4');

    function addTodo(event) {
        event.preventDefault();

        if (todoInput.trim().length === 0) {
            return;
        }

        setTodos([
            ...todos,
            {
                id: idForTodo,
                title: todoInput,
                isComplete: false,
                isEditing: false,
            }]);


        setTodoInput('');
        setIdForTodo((prevIdForToDo => prevIdForToDo + 1));
    }

    function deleteTodo(id) {
        // console.log('deleting todo id ' + id);
        setTodos([...todos].filter(todo => todo.id !== id));
    }

    function changeTodo(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function markAsEditing(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isEditing = true;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    function updateTodo(event, id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                if (event.target.value.trim().length === 0) {
                    todo.isEditing = false;
                    return todo;
                }

                todo.title = event.target.value;
                todo.isEditing = false;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }

    function cancelEdit(event, id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isEditing = false;
            }

            return todo;
        })

        setTodos(updatedTodos);
    }


    return (
        <div className="container">
            <div className="todo-app">
                <h1>
                    Todo App
                </h1>
                <form action="#" onSubmit={addTodo}>
                    <input type="text" className="todo-input"
                           placeholder="What do you need to do?"
                           value={todoInput}
                           onChange={handleInput}
                    />
                </form>
                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li key={todo.id} className="todo-item-container">
                            <div className="todo-item">
                                <input type="checkbox" onChange={() => changeTodo(todo.id)}
                                       checked={(todo.isComplete) ? true : false}/>
                                {!todo.isEditing ? (
                                    <span className={`todo-item-label ${(todo.isComplete) ? 'line-through' : ''}`}
                                          onDoubleClick={() => markAsEditing(todo.id)}>
                                    {todo.title}
                                </span>
                                ) : (
                                    <input
                                        autofocus
                                        onBlur={(event) => updateTodo(event, todo.id)}
                                        onKeyDown={(event) => {
                                            if (event.key == 'Enter') {
                                                updateTodo(event, todo.id)
                                            } else if (event.key == 'Escape') {
                                                cancelEdit(event, todo.id)
                                            }
                                        }}
                                        type="text"
                                        className="todo-item-input" defaultValue={todo.title}
                                    />
                                )}

                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
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


            </div>
        </div>
    );
}

export default App;