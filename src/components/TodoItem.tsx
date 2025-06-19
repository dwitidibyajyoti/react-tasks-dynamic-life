
import React, { useState } from 'react';
import { Check, Trash2, Loader2, Circle } from 'lucide-react';
import { Todo } from './TodoApp';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onTogglePending: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onToggle, onTogglePending, onDelete }: TodoItemProps) => {
  const [isToggling, setIsToggling] = useState(false);
  const [isTogglingPending, setIsTogglingPending] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleToggle = async () => {
    setIsToggling(true);
    try {
      await onToggle(todo.id);
    } finally {
      setIsToggling(false);
    }
  };

  const handleTogglePending = async () => {
    setIsTogglingPending(true);
    try {
      await onTogglePending(todo.id);
    } finally {
      setIsTogglingPending(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = () => {
    if (todo.completed) return 'bg-green-50 border-green-200';
    if (todo.isPending) return 'bg-yellow-50 border-yellow-200';
    return 'bg-gray-50 border-gray-200 hover:border-purple-300';
  };

  const getTextColor = () => {
    if (todo.completed) return 'text-green-700 line-through';
    if (todo.isPending) return 'text-yellow-700';
    return 'text-gray-800';
  };

  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${getStatusColor()}`}>
      <button
        onClick={handleToggle}
        disabled={isToggling || isDeleting || isTogglingPending}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
        } ${(isToggling || isDeleting || isTogglingPending) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isToggling ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          todo.completed && <Check size={14} />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className={`text-lg transition-all duration-200 ${getTextColor()}`}>
            {todo.todo}
          </p>
          {todo.isPending && !todo.completed && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
              Pending
            </span>
          )}
          {todo.completed && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              Completed
            </span>
          )}
        </div>
        {todo.createdAt && (
          <p className="text-sm text-gray-500 mt-1">
            Created {formatDate(todo.createdAt)}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          User ID: {todo.userId}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {!todo.completed && (
          <button
            onClick={handleTogglePending}
            disabled={isToggling || isDeleting || isTogglingPending}
            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 ${
              todo.isPending 
                ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'
            } ${(isToggling || isDeleting || isTogglingPending) ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={todo.isPending ? 'Mark as not pending' : 'Mark as pending'}
          >
            {isTogglingPending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Circle size={18} />
            )}
          </button>
        )}

        <button
          onClick={handleDelete}
          disabled={isToggling || isDeleting || isTogglingPending}
          className={`flex-shrink-0 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100 ${
            (isToggling || isDeleting || isTogglingPending) ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isDeleting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
