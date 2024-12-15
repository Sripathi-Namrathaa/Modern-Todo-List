// Utility functions
export const storage = {
    save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
    load: (key) => JSON.parse(localStorage.getItem(key) || '[]')
};

export const dom = {
    create: (tag, className, attributes = {}) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        return element;
    },
    
    getElement: (selector) => document.querySelector(selector),
    getAllElements: (selector) => document.querySelectorAll(selector)
};