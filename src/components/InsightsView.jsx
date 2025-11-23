// src/components/InsightsView.jsx
import React from 'react';
import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const InsightsView = ({ entries, insight, aiLoading, handleGenerateInsights }) => (
  <div className="animate-in fade-in duration-300">
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-xl mb-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          <Sparkles className="text-yellow-300" size={24} />
        </div>
        <h2 className="text-xl font-bold">AI Companion</h2>
      </div>
      <p className="text-indigo-100 mb-6 leading-relaxed">
        I can analyze your last 10 entries to find patterns, offer comfort, and suggest small steps forward.
      </p>
      <button
        onClick={handleGenerateInsights}
        disabled={aiLoading || entries.length < 1}
        className="w-full bg-white text-indigo-600 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
      >
        {aiLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
            Analyzing...
          </>
        ) : (
          "Generate New Insights"
        )}
      </button>
    </div>

    {insight ? (
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
        <h3 className="font-bold text-lg text-slate-800 mb-4 pb-2 border-b border-slate-100">Your Personalized Analysis</h3>
        <div className="prose prose-slate max-w-none">
          <ReactMarkdown>{insight}</ReactMarkdown>
        </div>
      </div>
    ) : (
       entries.length > 0 && !aiLoading && (
        <div className="text-center text-slate-400 py-8">
           Tap the button above to reflect on your journey.
        </div>
       )
    )}

    {entries.length === 0 && (
       <div className="text-center text-slate-400 py-8">
         Write a few entries first to unlock AI insights.
       </div>
    )}
  </div>
);

export default InsightsView;
