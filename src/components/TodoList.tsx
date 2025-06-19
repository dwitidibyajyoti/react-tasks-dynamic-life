
import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from './TodoApp';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onTogglePending: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onToggle, onTogglePending, onDelete }: TodoListProps) => {
  return (
    <div className="space-y-3">
      {todos.map((todo, index) => (
        <div
          key={todo.id}
          className="animate-in slide-in-from-top duration-300"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onTogglePending={onTogglePending}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TodoList;
