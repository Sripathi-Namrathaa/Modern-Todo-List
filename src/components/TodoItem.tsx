import React from 'react';
import { Check, Trash2, Square } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className={`flex items-center p-4 bg-white rounded-lg shadow-sm border-l-4 ${
      todo.completed ? 'border-green-500' : 'border-blue-500'
    } hover:shadow-md transition-shadow duration-200`}>
      <button
        onClick={() => onToggle(todo.id)}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
      >
        {todo.completed ? (
          <Check className="w-5 h-5 text-green-500" />
        ) : (
          <Square className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      <span className={`flex-1 px-4 ${
        todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
      }`}>
        {todo.text}
      </span>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200"
      >
        <Trash2 className="w-5 h-5 text-red-500" />
      </button>
    </div>
  );
}