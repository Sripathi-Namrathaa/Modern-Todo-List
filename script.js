import { TodoManager } from './js/todoManager.js';

const todoManager = new TodoManager();

// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const tasksCounter = document.getElementById('tasks-counter');
const filterButtons = document.querySelectorAll('.filter-btn');

// Update tasks counter
function updateTasksCounter() {
    const remainingTasks = todoManager.getRemainingCount();
    tasksCounter.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
}

// Create todo element
function createTodoElement(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '×';
    deleteBtn.setAttribute('aria-label', 'Delete task');

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    return li;
}

// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    const filteredTodos = todoManager.getFilteredTodos();
    
    filteredTodos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
    });

    emptyState.style.display = todoManager.todos.length === 0 ? 'block' : 'none';
    updateTasksCounter();
}

// Event Listeners
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    
    if (text) {
        todoManager.addTodo(text);
        renderTodos();
        todoInput.value = '';
    }
});

todoList.addEventListener('click', (e) => {
    const todoItem = e.target.closest('.todo-item');
    if (!todoItem) return;

    const id = todoItem.dataset.id;

    if (e.target.classList.contains('todo-checkbox')) {
        todoManager.toggleTodo(id);
        renderTodos();
    }

    if (e.target.classList.contains('delete-btn')) {
        todoManager.deleteTodo(id);
        renderTodos();
    }
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        todoManager.currentFilter = button.dataset.filter;
        renderTodos();
    });
});

// Initial render
renderTodos();