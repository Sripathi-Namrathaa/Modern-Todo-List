import React, { useState, useEffect } from 'react';
import { ClipboardList } from 'lucide-react';
import { TodoItem } from './components/TodoItem';
import { TodoInput } from './components/TodoInput';
import { Todo } from './types/todo';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date()
      }
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <ClipboardList className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">My Todo List</h1>
          </div>
          
          <TodoInput onAdd={addTodo} />
          
          <div className="mt-4 text-sm text-gray-600">
            {activeTodos} task{activeTodos !== 1 ? 's' : ''} remaining
          </div>
        </div>

        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
          
          {todos.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No tasks yet. Add one above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;