// src/components/Header.jsx
import React from 'react';

const Header = () => (
  <header className="flex items-center justify-between mb-8">
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
        <span className="text-indigo-600">Micro</span>Journal
        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-semibold tracking-wide">AI</span>
      </h1>
      <p className="text-slate-500 text-sm mt-1">Capture thoughts. Discover patterns.</p>
    </div>
  </header>
);

export default Header;
