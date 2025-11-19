// src/components/HistoryView.jsx
import React from 'react';
import { Search, BookOpen, Trash2, Mic } from 'lucide-react';

const HistoryView = ({ entries, searchTerm, setSearchTerm, handleDelete, setView }) => {
  const filteredEntries = entries.filter(e =>
    e.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in fade-in duration-300 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          placeholder="Search your memories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
        />
      </div>

      <div className="space-y-4">
        {entries.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <BookOpen className="text-slate-300" size={24} />
            </div>
            <p className="text-slate-500">Your journal is empty.</p>
            <button onClick={() => setView('write')} className="text-indigo-600 font-medium mt-2 hover:underline">Write your first entry</button>
          </div>
        ) : filteredEntries.length === 0 ? (
          <p className="text-center text-slate-500 py-8">No matching entries found for "{searchTerm}".</p>
        ) : (
          filteredEntries.map(entry => (
            <div key={entry.id} className="group bg-white p-5 rounded-2xl shadow-md border border-slate-200 hover:border-indigo-400 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shadow-inner ${
                    entry.mood === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                    entry.mood === 'reflective' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {entry.mood}
                  </span>
                  {entry.source === 'voice' && (
                      <span className="text-xs text-indigo-500 flex items-center gap-1">
                          <Mic size={12}/> Voice
                      </span>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1 -mt-1 -mr-1"
                  title="Delete Entry"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{entry.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;
