/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { createTodo } from './fetch-utils.js';

/* Get DOM Elements */
const addTodoForm = document.getElementById('add-item-form');
const todoList = document.getElementById('todo-list');

/* State */
let todos = [];
let error = null;

/* Events */

addTodoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addTodoForm);
    const newTodo = {
        description: formData.get('description'),
    };

    const response = await createTodo(newTodo);
    error = response.error;
    const todo = response.data;

    if (error) {
        displayError();
    } else {
        todos.push(todo);
        displayTodos();
        addTodoForm.reset();
    }
});
/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayTodos() {
    todoList.innerHTML = '';

    for (const todo of todos) {
        const todoEl = renderTodo(todo);
        todoList.append(todoEl);

        todoEl.addEventListener('click', async () => {
            const response = await completeTodo(todo.id);
            error = response.error;
            const updatedTodo = response.data;

            if (error) {
                displayError();
            } else {
                const index = todos.indexOf(todo);
                todos[index] = updatedTodo;
                displayTodos();
            }
        });
    }
}
