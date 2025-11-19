// src/components/Navigation.jsx
import React from 'react';
import { Calendar, BookOpen, Sparkles } from 'lucide-react';

const Navigation = ({ view, setView }) => {
  const navItems = [
    { id: 'write', icon: Calendar, label: 'Write' },
    { id: 'history', icon: BookOpen, label: 'History' },
    { id: 'insights', icon: Sparkles, label: 'Insights' }
  ];

  return (
    <nav className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 mb-6">
      {navItems.map(tab => (
        <button
          key={tab.id}
          onClick={() => setView(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            view === tab.id
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <tab.icon size={18} />
          {tab.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
