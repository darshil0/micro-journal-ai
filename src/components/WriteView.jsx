// src/components/WriteView.jsx
import React from 'react';
import { Save, Mic, MicOff } from 'lucide-react';

const WriteView = ({ text, setText, handleSave, loading, isRecording, toggleRecording }) => (
  <div className="animate-in fade-in duration-300">
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
        <span className="text-sm font-medium text-slate-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
        <div className="flex gap-2">
          <button
            onClick={toggleRecording}
            className={`p-2 rounded-full transition-colors shadow-md ${
              isRecording
                ? 'bg-red-500 text-white ring-4 ring-red-500/30 animate-pulse'
                : 'bg-white text-slate-400 hover:text-indigo-600 border border-slate-200 hover:border-indigo-300'
            }`}
            title="Voice Input"
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={isRecording ? "Listening... speak your thoughts..." : "How are you feeling right now? What happened today? Be honest."}
        className="w-full h-64 p-6 text-lg leading-relaxed resize-none focus:outline-none placeholder:text-slate-300 text-slate-700"
      />

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs text-slate-400 font-mono">{text.length} chars</span>
        <button
          onClick={handleSave}
          disabled={!text.trim() || loading}
          className={`px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg flex items-center gap-2 transition-all duration-300 ${
            !text.trim() || loading
              ? 'bg-slate-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.01]'
          }`}
        >
          {loading ? 'Saving...' : <><Save size={18} /> Save Entry</>}
        </button>
      </div>
    </div>

    {!text && (
      <div className="mt-6 text-center">
        <p className="text-slate-400 text-sm mb-2">Need inspiration?</p>
        <div className="flex justify-center flex-wrap gap-2">
            <button
                onClick={() => setText("Today, I felt proud when...")}
                className="text-indigo-500 hover:text-indigo-700 text-sm font-medium hover:underline p-1"
            >
                "Today, I felt proud when..."
            </button>
            <span className="text-slate-300">•</span>
            <button
                onClick={() => setText("A challenging moment I faced was...")}
                className="text-indigo-500 hover:text-indigo-700 text-sm font-medium hover:underline p-1"
            >
                "A challenging moment I faced was..."
            </button>
        </div>
      </div>
    )}
  </div>
);

export default WriteView;
