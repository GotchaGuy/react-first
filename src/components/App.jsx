import '../reset.css';
import '../App.css';
import {useState} from "react";

import NoTodos from './NoTodos';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

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

    const [idForTodo, setIdForTodo] = useState('4');

    function addTodo(title) {
        setTodos([
            ...todos,
            {
                id: idForTodo,
                title: title,
                isComplete: false,
                isEditing: false,
            }]);

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
                <TodoForm addTodo={addTodo}/>

                { todos.length > 0 ? (
                   <TodoList
                       todos={todos}
                       changeTodo={changeTodo}
                       markAsEditing={markAsEditing}
                       updateTodo={updateTodo}
                       cancelEdit={cancelEdit}
                       deleteTodo={deleteTodo}
                   />
                ) : (
                    <NoTodos/>
                    )}

            </div>
        </div>
    );
}

export default App;
