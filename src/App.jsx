import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export default function MicroJournal() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [aiInsight, setAiInsight] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('write');
  const [error, setError] = useState('');

  // Check for storage API availability
  const isStorageAvailable = () => {
    return typeof window !== 'undefined' && window.storage;
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    if (!isStorageAvailable()) {
      console.warn('Storage API not available. Running in demo mode.');
      setIsLoading(false);
      return;
    }

    try {
      const keys = await window.storage.list('entry:');
      if (keys && keys.keys) {
        const loadedEntries = [];
        for (const key of keys.keys) {
          try {
            const result = await window.storage.get(key);
            if (result && result.value) {
              loadedEntries.push(JSON.parse(result.value));
            }
          } catch (err) {
            console.error(`Error loading entry ${key}:`, err);
          }
        }
        loadedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
        setEntries(loadedEntries);
      }
    } catch (error) {
      console.log('No existing entries found or storage unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  const saveEntry = async () => {
    setError('');
    
    if (currentEntry.trim().length < 10) {
      setError('Please write at least 10 characters for your entry');
      return;
    }

    const entry = {
      id: Date.now(),
      text: currentEntry.trim(),
      date: new Date().toISOString(),
      mood: detectMood(currentEntry)
    };

    if (!isStorageAvailable()) {
      // Fallback: store in state only
      setEntries([entry, ...entries]);
      setCurrentEntry('');
      setError('');
      alert('Entry saved in session (Storage API not available) ✨');
      return;
    }

    try {
      await window.storage.set(`entry:${entry.id}`, JSON.stringify(entry));
      setEntries([entry, ...entries]);
      setCurrentEntry('');
      setError('');
      alert('Entry saved successfully! ✨');
    } catch (error) {
      console.error('Save error:', error);
      setError('Failed to save entry. Please try again.');
    }
  };

  const detectMood = (text) => {
    const positive = ['happy', 'great', 'wonderful', 'amazing', 'love', 'excited', 'joy', 'grateful', 'blessed', 'thankful'];
    const negative = ['sad', 'tired', 'worried', 'anxious', 'stress', 'difficult', 'hard', 'struggle', 'pain', 'hurt'];
    
    const lowerText = text.toLowerCase();
    const posCount = positive.filter(word => lowerText.includes(word)).length;
    const negCount = negative.filter(word => lowerText.includes(word)).length;
    
    if (posCount > negCount) return 'positive';
    if (negCount > posCount) return 'reflective';
    return 'neutral';
  };

  const generateInsight = async () => {
    if (entries.length < 3) {
      setError('Write at least 3 entries to get AI insights!');
      return;
    }

    setIsAnalyzing(true);
    setAiInsight('');
    setError('');

    try {
      const recentEntries = entries.slice(0, 7).map(e => e.text).join('\n\n');
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY || '',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a gentle, supportive journal companion. Review these recent journal entries and provide a brief, warm insight (2-3 sentences) about patterns, growth, or themes you notice. Be encouraging and non-judgmental:\n\n${recentEntries}`
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const insight = data.content?.find(c => c.type === 'text')?.text || 'Unable to generate insight';
      setAiInsight(insight);
    } catch (error) {
      console.error('AI Insight Error:', error);
      setError('Unable to connect to AI service. Please check your API key and try again.');
      setAiInsight('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMoodColor = (mood) => {
    switch(mood) {
      case 'positive': return 'bg-green-100 border-green-300';
      case 'reflective': return 'bg-blue-100 border-blue-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-gray-600 flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          <p>Loading your journal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="w-8 h-8 text-teal-600" />
            <h1 className="text-4xl font-bold text-gray-800">Micro Journal</h1>
          </div>
          <p className="text-gray-600">Reflect daily, grow gradually</p>
        </header>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          <button
            onClick={() => { setView('write'); setError(''); }}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              view === 'write' 
                ? 'bg-teal-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Write
          </button>
          <button
            onClick={() => { setView('history'); setError(''); }}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              view === 'history' 
                ? 'bg-teal-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            History ({entries.length})
          </button>
          <button
            onClick={() => { setView('insights'); setError(''); }}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              view === 'insights' 
                ? 'bg-teal-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Insights
          </button>
        </div>

        {/* Write View */}
        {view === 'write' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              placeholder="How are you feeling today? What's on your mind?"
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-teal-400 transition"
            />
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-gray-500">{currentEntry.length} characters</span>
              <button
                onClick={saveEntry}
                disabled={currentEntry.trim().length < 10}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
              >
                Save Entry
              </button>
            </div>
          </div>
        )}

        {/* History View */}
        {view === 'history' && (
          <div className="space-y-4">
            {entries.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No entries yet. Start writing to begin your journey!</p>
                <button
                  onClick={() => setView('write')}
                  className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  Write Your First Entry
                </button>
              </div>
            ) : (
              entries.map(entry => (
                <div key={entry.id} className={`bg-white rounded-xl shadow p-6 border-l-4 ${getMoodColor(entry.mood)}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm text-gray-500">{formatDate(entry.date)}</span>
                    <span className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600 capitalize">
                      {entry.mood}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.text}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* Insights View */}
        {view === 'insights' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-gray-800">AI Insights</h2>
            </div>
            
            {entries.length < 3 ? (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">
                  Write at least 3 entries to unlock AI insights about your journey!
                </p>
                <p className="text-sm text-gray-400">
                  You currently have {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={generateInsight}
                  disabled={isAnalyzing}
                  className="w-full mb-6 px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:from-teal-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  {isAnalyzing ? 'Analyzing your entries...' : 'Generate New Insight'}
                </button>

                {aiInsight && (
                  <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-6 border-2 border-teal-200">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700 leading-relaxed italic">{aiInsight}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 pb-8 text-sm text-gray-500">
          <p>Made with ❤️ and ☕ by Darshil for mindful reflection</p>
          <p className="mt-2 text-xs">
            Your entries are private and stored locally in your browser
          </p>
        </footer>
      </div>
    </div>
  );
}
```

---

## **9. .gitignore**
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production.local
.env.development.local
```

---

## **10. .env.example**
```
# Anthropic API Key for AI Insights
# Get your API key from: https://console.anthropic.com/
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

---

## **11. LICENSE**
```
MIT License

Copyright (c) 2024 Darshil

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
