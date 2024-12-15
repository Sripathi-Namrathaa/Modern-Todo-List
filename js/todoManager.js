import { storage } from './utils.js';
import { FILTERS } from './constants.js';

export class TodoManager {
    constructor() {
        this.todos = storage.load('todos');
        this.currentFilter = FILTERS.ALL;
    }

    addTodo(text) {
        this.todos.push({
            id: Date.now().toString(),
            text,
            completed: false,
            createdAt: new Date()
        });
        this.save();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.save();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.save();
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case FILTERS.ACTIVE:
                return this.todos.filter(todo => !todo.completed);
            case FILTERS.COMPLETED:
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    save() {
        storage.save('todos', this.todos);
    }

    getRemainingCount() {
        return this.todos.filter(todo => !todo.completed).length;
    }
}