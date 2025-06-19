
import React, { useState, useEffect } from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Filter from './Filter';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  isPending: boolean;
  userId: number;
  createdAt: Date;
}

export type FilterType = 'all' | 'completed' | 'pending';

const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const itemsPerPage = 10;

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = async (text: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Simple ID generation
      todo: text.trim(),
      completed: false,
      isPending: true, // New todos start as pending
      userId: 1,
      createdAt: new Date()
    };

    setTodos(prev => [newTodo, ...prev]);
    toast({
      title: "Todo added",
      description: "Your new task has been added successfully.",
    });
  };

  const toggleTodo = async (id: number) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed, isPending: false } : t
      )
    );
    
    const todo = todos.find(t => t.id === id);
    toast({
      title: todo?.completed ? "Todo marked as incomplete" : "Todo completed",
      description: todo?.completed ? "Task has been marked as incomplete." : "Great job! Task completed.",
    });
  };

  const togglePending = async (id: number) => {
    setTodos(prev =>
      prev.map(t =>
        t.id === id ? { ...t, isPending: !t.isPending } : t
      )
    );
    
    const todo = todos.find(t => t.id === id);
    toast({
      title: todo?.isPending ? "Todo marked as not pending" : "Todo marked as pending",
      description: todo?.isPending ? "Task is no longer pending." : "Task marked as pending.",
    });
  };

  const deleteTodo = async (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast({
      title: "Todo deleted",
      description: "Task has been removed successfully.",
    });
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => todo.isPending && !todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  const paginatedTodos = filteredTodos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My Tasks
          </h1>
          <p className="text-gray-600">
            Stay organized and get things done
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <AddTodo onAdd={addTodo} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-6 text-sm">
              <span className="text-gray-600">
                Total: <span className="font-semibold text-gray-800">{filteredTodos.length}</span>
              </span>
              {totalPages > 1 && (
                <span className="text-gray-600">
                  Page: <span className="font-semibold text-gray-800">{currentPage} of {totalPages}</span>
                </span>
              )}
            </div>
          </div>

          <Filter currentFilter={filter} onFilterChange={setFilter} />
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="text-2xl mb-4">⏳</div>
              <p className="text-gray-500">Loading todos...</p>
            </div>
          ) : paginatedTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {filter === 'completed' ? 'No completed tasks yet' :
                 filter === 'pending' ? 'No pending tasks' :
                 'No tasks yet'}
              </h3>
              <p className="text-gray-500">
                {filter === 'all' && 'Add your first task to get started!'}
                {filter === 'completed' && 'Complete some tasks to see them here.'}
                {filter === 'pending' && 'No pending tasks at the moment.'}
              </p>
            </div>
          ) : (
            <TodoList
              todos={paginatedTodos}
              onToggle={toggleTodo}
              onTogglePending={togglePending}
              onDelete={deleteTodo}
            />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={currentPage === pageNumber}
                        className="cursor-pointer"
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
