
import React from 'react';
import { FilterType } from './TodoApp';

interface FilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const Filter = ({ currentFilter, onFilterChange }: FilterProps) => {
  const filters: { key: FilterType; label: string; icon: string }[] = [
    { key: 'all', label: 'All Tasks', icon: '📋' },
    { key: 'pending', label: 'Pending', icon: '⏳' },
    { key: 'completed', label: 'Completed', icon: '✅' }
  ];

  return (
    <div className="flex gap-3 flex-wrap">
      {filters.map(({ key, label, icon }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
            currentFilter === key
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 border border-gray-200'
          }`}
        >
          <span className="text-lg">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default Filter;
