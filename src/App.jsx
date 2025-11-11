import { useState, useEffect } from 'react';
import { Calendar, BookOpen, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

function App() {
  // State management
  const [view, setView] = useState('write'); // 'write' | 'history' | 'insights'
  const [entryText, setEntryText] = useState('');
  const [entries, setEntries] = useState([]);
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Load entries from storage on mount
  useEffect(() => {
    loadEntries();
  }, []);

  // Load entries from storage API
  const loadEntries = async () => {
    try {
      // Check if storage API is available
      if (!window.storage) {
        console.warn('Storage API not available. Entries will not persist.');
        setStorageAvailable(false);
        return;
      }

      const result = await window.storage.get('journal-entries');
      if (result && result.value) {
        const loadedEntries = JSON.parse(result.value);
        setEntries(loadedEntries);
      }
    } catch (err) {
      // Key doesn't exist yet - this is normal for first run
      if (err.message && err.message.includes('not found')) {
        console.log('No existing entries found. Starting fresh.');
      } else {
        console.error('Failed to load entries:', err);
        setStorageAvailable(false);
      }
    }
  };

  // Save entries to storage API
  const saveEntries = async (newEntries) => {
    try {
      // Check if storage API is available
      if (!window.storage) {
        console.warn('Storage API not available. Entries will not persist.');
        return false;
      }

      await window.storage.set('journal-entries', JSON.stringify(newEntries));
      return true;
    } catch (err) {
      console.error('Failed to save entries:', err);
      return false;
    }
  };

  // Detect mood based on keywords
  const detectMood = (text) => {
    const lowerText = text.toLowerCase();

    const positiveKeywords = [
      'happy',
      'excited',
      'grateful',
      'blessed',
      'thankful',
      'joyful',
      'amazing',
      'wonderful',
      'love',
      'great',
    ];

    const negativeKeywords = [
      'sad',
      'anxious',
      'worried',
      'stressed',
      'tired',
      'overwhelmed',
      'difficult',
      'tough',
      'hard',
      'frustrated',
    ];

    const hasPositive = positiveKeywords.some((word) => lowerText.includes(word));
    const hasNegative = negativeKeywords.some((word) => lowerText.includes(word));

    if (hasPositive && !hasNegative) return 'positive';
    if (hasNegative) return 'reflective';
    return 'neutral';
  };

  // Handle saving new entry
  const handleSaveEntry = async () => {
    setError('');
    setSuccess('');

    const trimmedText = entryText.trim();

    if (trimmedText.length < 10) {
      setError('Please write at least 10 characters for a meaningful entry.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      text: trimmedText,
      date: new Date().toISOString(),
      mood: detectMood(trimmedText),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    
    const saved = await saveEntries(updatedEntries);
    
    setEntryText('');
    
    if (saved || !storageAvailable) {
      setSuccess('Entry saved successfully! ✨');
    } else {
      setSuccess('Entry saved to session (storage unavailable)');
    }

    setTimeout(() => setSuccess(''), 3000);
  };

  // Generate AI insights
  const generateInsights = async () => {
    setError('');
    setLoading(true);
    setInsight('');

    if (entries.length < 3) {
      setError('Write at least 3 entries to generate insights.');
      setLoading(false);
      return;
    }

    try {
      // Get last 7 entries for analysis
      const recentEntries = entries.slice(0, 7);
      const entriesText = recentEntries
        .map((e, i) => `Entry ${i + 1} (${new Date(e.date).toLocaleDateString()}): ${e.text}`)
        .join('\n\n');

      const prompt = `You are a gentle, supportive journal companion. Analyze these recent journal entries and provide a warm, empathetic insight about patterns, themes, or growth you notice. Be encouraging and non-judgmental. Keep your response to 2-3 paragraphs.\n\n${entriesText}`;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API request failed: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const insightText = data.result?.content
        ?.filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n');

      if (insightText) {
        setInsight(insightText);
      } else {
        setError('Received an empty insight. Please try again.');
      }
    } catch (err) {
      console.error('Failed to generate insights:', err);
      setError(`Failed to generate insights: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle keyboard navigation for tabs
  const handleTabKeyDown = (e, targetView) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setView(targetView);
    }
  };

  // Mood color mapping
  const getMoodColor = (mood) => {
    switch (mood) {
      case 'positive':
        return 'border-green-500';
      case 'reflective':
        return 'border-blue-500';
      default:
        return 'border-gray-400';
    }
  };

  const getMoodBgColor = (mood) => {
    switch (mood) {
      case 'positive':
        return 'bg-green-100 text-green-800';
      case 'reflective':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">🧠 Micro Journal AI</h1>
          <p className="text-gray-600">
            Your private space for daily reflection and AI-powered insights
          </p>
          {!storageAvailable && (
            <p className="text-sm text-amber-600 mt-2">
              ⚠️ Storage unavailable - entries will only persist in this session
            </p>
          )}
        </header>

        {/* Navigation */}
        <nav
          className="flex gap-2 mb-6 bg-white rounded-xl p-2 shadow-md"
          role="tablist"
          aria-label="Journal sections"
        >
          <button
            onClick={() => setView('write')}
            onKeyDown={(e) => handleTabKeyDown(e, 'write')}
            role="tab"
            aria-selected={view === 'write'}
            aria-controls="write-panel"
            id="write-tab"
            tabIndex={view === 'write' ? 0 : -1}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              view === 'write'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Calendar size={20} aria-hidden="true" />
              Write
            </span>
          </button>
          <button
            onClick={() => setView('history')}
            onKeyDown={(e) => handleTabKeyDown(e, 'history')}
            role="tab"
            aria-selected={view === 'history'}
            aria-controls="history-panel"
            id="history-tab"
            tabIndex={view === 'history' ? 0 : -1}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              view === 'history'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <BookOpen size={20} aria-hidden="true" />
              History ({entries.length})
            </span>
          </button>
          <button
            onClick={() => setView('insights')}
            onKeyDown={(e) => handleTabKeyDown(e, 'insights')}
            role="tab"
            aria-selected={view === 'insights'}
            aria-controls="insights-panel"
            id="insights-tab"
            tabIndex={view === 'insights' ? 0 : -1}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              view === 'insights'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles size={20} aria-hidden="true" />
              Insights
            </span>
          </button>
        </nav>

        {/* Main Content */}
        <main className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Error Message */}
          {error && (
            <div
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
              role="alert"
              aria-live="assertive"
            >
              <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div
              className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
              role="status"
              aria-live="polite"
            >
              <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} aria-hidden="true" />
              <p className="text-green-700">{success}</p>
            </div>
          )}

          {/* Write View */}
          {view === 'write' && (
            <div
              role="tabpanel"
              id="write-panel"
              aria-labelledby="write-tab"
              tabIndex={0}
            >
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="text-teal-600" size={24} aria-hidden="true" />
                <h2 className="text-2xl font-bold text-gray-800">Today&apos;s Entry</h2>
              </div>
              <p className="text-gray-600 mb-4">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <label htmlFor="entry-textarea" className="sr-only">
                Journal entry text
              </label>
              <textarea
                id="entry-textarea"
                value={entryText}
                onChange={(e) => setEntryText(e.target.value)}
                placeholder="How are you feeling today? What's on your mind?"
                className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none resize-none"
                aria-describedby="char-count"
              />

              <div className="flex justify-between items-center mt-4">
                <span id="char-count" className="text-sm text-gray-500">
                  {entryText.length} characters
                </span>
                <button
                  onClick={handleSaveEntry}
                  disabled={entryText.trim().length < 10}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  aria-label={
                    entryText.trim().length < 10
                      ? 'Save entry (disabled, minimum 10 characters required)'
                      : 'Save entry'
                  }
                >
                  Save Entry
                </button>
              </div>
            </div>
          )}

          {/* History View */}
          {view === 'history' && (
            <div
              role="tabpanel"
              id="history-panel"
              aria-labelledby="history-tab"
              tabIndex={0}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Journal History</h2>

              {entries.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto text-gray-300 mb-4" size={64} aria-hidden="true" />
                  <p className="text-gray-500 mb-4">
                    No entries yet. Start writing to see your journey!
                  </p>
                  <button
                    onClick={() => setView('write')}
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                  >
                    Write First Entry
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {entries.map((entry) => (
                    <article
                      key={entry.id}
                      className={`border-l-4 ${getMoodColor(entry.mood)} bg-gray-50 p-4 rounded-r-lg shadow-sm`}
                      aria-label={`Journal entry from ${new Date(entry.date).toLocaleDateString()}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <time
                          className="text-sm text-gray-500"
                          dateTime={entry.date}
                        >
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getMoodBgColor(entry.mood)}`}
                          aria-label={`Mood: ${entry.mood}`}
                        >
                          {entry.mood.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">{entry.text}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Insights View */}
          {view === 'insights' && (
            <div
              role="tabpanel"
              id="insights-panel"
              aria-labelledby="insights-tab"
              tabIndex={0}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-teal-600" size={24} aria-hidden="true" />
                <h2 className="text-2xl font-bold text-gray-800">AI Insights</h2>
              </div>

              <p className="text-gray-600 mb-6">
                Get personalized reflections on your journaling patterns.
                {entries.length < 3 && ` You have ${entries.length} of 3 entries needed.`}
              </p>

              <button
                onClick={generateInsights}
                disabled={loading || entries.length < 3}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-xl font-medium hover:from-teal-700 hover:to-cyan-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md mb-6"
                aria-label={
                  entries.length < 3
                    ? `Generate new insight (disabled, ${3 - entries.length} more entries needed)`
                    : loading
                    ? 'Generating insights, please wait'
                    : 'Generate new insight'
                }
                aria-busy={loading}
              >
                {loading ? 'Generating Insights...' : 'Generate New Insight'}
              </button>

              {insight && (
                <div
                  className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border-2 border-teal-200"
                  role="region"
                  aria-label="AI generated insight"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-teal-600" size={20} aria-hidden="true" />
                    <h3 className="font-semibold text-teal-800">Your Insight</h3>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{insight}</p>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-8 text-gray-600 text-sm">
          <p>Made with ❤️ for mindful reflection • All data stored locally in your browser</p>
          <p className="mt-2">
            <a
              href="https://github.com/darshil0/micro-journal-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-600 hover:text-teal-700 underline"
            >
              View on GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
