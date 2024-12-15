import { dom } from './utils.js';
import { CLASSES } from './constants.js';

export class TodoView {
    static createTodoElement(todo) {
        const li = dom.create('li', `${CLASSES.TODO_ITEM} ${todo.completed ? CLASSES.COMPLETED : ''}`);
        li.dataset.id = todo.id;

        const checkbox = dom.create('input', CLASSES.TODO_CHECKBOX, {
            type: 'checkbox',
            checked: todo.completed
        });

        const text = dom.create('span', CLASSES.TODO_TEXT);
        text.textContent = todo.text;

        const deleteBtn = dom.create('button', CLASSES.DELETE_BTN, {
            'aria-label': 'Delete task'
        });
        deleteBtn.innerHTML = '×';

        li.append(checkbox, text, deleteBtn);
        return li;
    }

    static updateTasksCounter(element, count) {
        element.textContent = `${count} task${count !== 1 ? 's' : ''} remaining`;
    }

    static updateEmptyState(element, isEmpty) {
        element.style.display = isEmpty ? 'block' : 'none';
    }

    static updateFilterButtons(buttons, currentFilter) {
        buttons.forEach(btn => {
            btn.classList.toggle(CLASSES.ACTIVE, btn.dataset.filter === currentFilter);
        });
    }
}