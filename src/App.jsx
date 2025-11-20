// src/App.jsx
import React, { useState, useEffect } from 'react';
import { generateInsight } from './services/api';
import Header from './components/Header';
import Navigation from './components/Navigation';
import WriteView from './components/WriteView';
import HistoryView from './components/HistoryView';
import InsightsView from './components/InsightsView';
import { Zap, Save } from 'lucide-react';

// --- STYLES (Injected) ---
const customStyles = `
  /* Custom scrollbar styling - Indigo Theme */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f5f9; /* slate-100 */
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: #6366f1; /* indigo-500 */
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #4f46e5; /* indigo-600 */
  }
  /* Firefox scrollbar */
  * {
    scrollbar-width: thin;
    scrollbar-color: #6366f1 #f1f5f9;
  }
  body {
    background-color: #f8fafc;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }
`;

export default function App() {
  // -- State --
  const [view, setView] = useState('write'); // 'write' | 'history' | 'insights'
  const [entries, setEntries] = useState(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [insight, setInsight] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // -- Effects --

  // Inject custom styles
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Persist entries to localStorage
  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  // Setup Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript + ' ';
          }
        }
        if (finalTranscript) {
          setText(prev => prev + finalTranscript);
        }
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech error", event.error);
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  // -- Logic --

  const handleSave = () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const mood = detectMood(text);
      const newEntry = {
        id: Date.now(),
        text: text,
        mood: mood,
        date: new Date().toISOString(),
        source: isRecording ? 'voice' : 'text'
      };

      setEntries([newEntry, ...entries]);
      setText('');
      setSuccessMsg('Entry saved locally.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError("Failed to save entry.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const handleGenerateInsights = async () => {
    if (entries.length < 1) return;
    setAiLoading(true);
    setError('');

    try {
      const recentEntriesText = entries.slice(0, 10).map(e =>
        `[${new Date(e.date).toLocaleDateString()}]: ${e.text}`
      ).join('\n\n');

      const aiResponse = await generateInsight(recentEntriesText);
      setInsight(aiResponse);
    } catch (err) {
      setError("AI generation failed. Please try again in a moment.");
    } finally {
      setAiLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!recognition) {
      setError("Speech recognition not supported in this browser.");
      return;
    }
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  const detectMood = (txt) => {
    const lower = txt.toLowerCase();
    if (['sad', 'anxious', 'tired', 'hurt', 'bad', 'stress', 'difficult'].some(w => lower.includes(w))) return 'reflective';
    if (['happy', 'great', 'good', 'excited', 'love', 'joy', 'wonderful'].some(w => lower.includes(w))) return 'positive';
    return 'neutral';
  };

  // -- Render --
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div className="max-w-2xl mx-auto p-4 md:p-6">

        <Header />
        <Navigation view={view} setView={setView} />

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 flex items-center gap-2">
            <Zap size={16} /> <span className="font-semibold">Error:</span> {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl text-sm border border-green-200 flex items-center gap-2">
            <Save size={16} /> <span className="font-semibold">Success:</span> {successMsg}
          </div>
        )}

        {view === 'write' && (
          <WriteView
            text={text}
            setText={setText}
            handleSave={handleSave}
            loading={loading}
            isRecording={isRecording}
            toggleRecording={toggleRecording}
          />
        )}

        {view === 'history' && (
          <HistoryView
            entries={entries}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleDelete={handleDelete}
            setView={setView}
          />
        )}

        {view === 'insights' && (
          <InsightsView
            entries={entries}
            insight={insight}
            aiLoading={aiLoading}
            handleGenerateInsights={handleGenerateInsights}
          />
        )}
      </div>
    </div>
  );
}
