import { TodoManager } from './todoManager.js';
import { TodoView } from './todoView.js';
import { dom } from './utils.js';
import { SELECTORS } from './constants.js';

class TodoApp {
    constructor() {
        this.todoManager = new TodoManager();
        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        this.form = dom.getElement(SELECTORS.FORM);
        this.input = dom.getElement(SELECTORS.INPUT);
        this.list = dom.getElement(SELECTORS.LIST);
        this.emptyState = dom.getElement(SELECTORS.EMPTY_STATE);
        this.tasksCounter = dom.getElement(SELECTORS.TASKS_COUNTER);
        this.filterButtons = dom.getAllElements(SELECTORS.FILTER_BUTTONS);
    }

    bindEvents() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.list.addEventListener('click', this.handleListClick.bind(this));
        this.filterButtons.forEach(button => {
            button.addEventListener('click', this.handleFilter.bind(this, button));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const text = this.input.value.trim();
        
        if (text) {
            this.todoManager.addTodo(text);
            this.input.value = '';
            this.render();
        }
    }

    handleListClick(e) {
        const todoItem = e.target.closest('.todo-item');
        if (!todoItem) return;

        const id = todoItem.dataset.id;

        if (e.target.classList.contains('todo-checkbox')) {
            this.todoManager.toggleTodo(id);
            this.render();
        }

        if (e.target.classList.contains('delete-btn')) {
            this.todoManager.deleteTodo(id);
            this.render();
        }
    }

    handleFilter(button) {
        this.todoManager.currentFilter = button.dataset.filter;
        TodoView.updateFilterButtons(this.filterButtons, this.todoManager.currentFilter);
        this.render();
    }

    render() {
        const todos = this.todoManager.getFilteredTodos();
        this.list.innerHTML = '';
        todos.forEach(todo => {
            this.list.appendChild(TodoView.createTodoElement(todo));
        });

        TodoView.updateEmptyState(this.emptyState, this.todoManager.todos.length === 0);
        TodoView.updateTasksCounter(this.tasksCounter, this.todoManager.getRemainingCount());
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});