
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
      >
        <Plus size={20} />
        Add Task
      </button>
    </form>
  );
};

export default AddTodo;
