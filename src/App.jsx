import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, 
  BookOpen, 
  Sparkles, 
  Mic, 
  MicOff, 
  Search, 
  Trash2, 
  Save, 
  Zap,
  LogOut
} from 'lucide-react';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';

// --- CONFIGURATION & UTILS ---

// Gemini API Helper
const generateGeminiInsight = async (entriesText) => {
  const apiKey = ""; // Injected by environment
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const systemPrompt = `You are a compassionate, insightful therapy assistant. 
  Analyze the user's recent journal entries. 
  1. Identify the core emotional themes (e.g., "Anxiety about future", "Gratitude for small things").
  2. Spot patterns in their thinking (e.g., "You tend to catastrophicize when tired").
  3. Provide one actionable, gentle suggestion for the next week.
  4. Keep the tone warm, safe, and encouraging. 
  5. Format with bold headings and bullet points.`;

  const payload = {
    contents: [{ parts: [{ text: `Here are my recent journal entries:\n\n${entriesText}` }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error(`Gemini API Error: ${response.statusText}`);
    
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate an insight this time.";
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};

// --- MAIN COMPONENT ---

export default function MicroJournalAI() {
  // -- State --
  const [user, setUser] = useState(null);
  const [view, setView] = useState('write'); // 'write' | 'history' | 'insights'
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [insight, setInsight] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Firebase Refs
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'micro-journal-v2';

  // -- Initialization --
  useEffect(() => {
    // 1. Init Firebase
    const firebaseConfig = JSON.parse(__firebase_config);
    const app = initializeApp(firebaseConfig);
    const authInstance = getAuth(app);
    const dbInstance = getFirestore(app);
    
    setAuth(authInstance);
    setDb(dbInstance);

    // 2. Auth Listener
    const unsubscribeAuth = onAuthStateChanged(authInstance, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        // Auto-login anonymously if not logged in
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            signInWithCustomToken(authInstance, __initial_auth_token);
        } else {
            signInAnonymously(authInstance).catch(err => setError(err.message));
        }
      }
    });

    // 3. Setup Speech Recognition
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

    return () => unsubscribeAuth();
  }, []);

  // -- Firestore Sync --
  useEffect(() => {
    if (!user || !db) return;

    const q = query(
      collection(db, 'artifacts', appId, 'users', user.uid, 'journal_entries'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedEntries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Handle simple date formatting from Firestore timestamp
        date: doc.data().createdAt?.toDate() || new Date()
      }));
      setEntries(loadedEntries);
    }, (err) => {
      setError("Could not load entries: " + err.message);
    });

    return () => unsubscribe();
  }, [user, db]);

  // -- Logic --

  const handleSave = async () => {
    if (!text.trim()) return;
    setLoading(true);
    
    try {
      // Simple local mood detection for immediate UI feedback
      // (The AI Insight feature does the heavy lifting later)
      const mood = detectMood(text);
      
      await addDoc(collection(db, 'artifacts', appId, 'users', user.uid, 'journal_entries'), {
        text: text,
        mood: mood,
        createdAt: serverTimestamp(),
        source: isRecording ? 'voice' : 'text' // Track if it was spoken
      });
      
      setText('');
      setSuccessMsg('Entry saved securely to cloud.');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError("Failed to save: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this memory?')) return;
    try {
      await deleteDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'journal_entries', id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGenerateInsights = async () => {
    if (entries.length < 1) return;
    setAiLoading(true);
    setError('');
    
    try {
      // Take last 10 entries for context
      const recentEntriesText = entries.slice(0, 10).map(e => 
        `[${e.date.toLocaleDateString()}]: ${e.text}`
      ).join('\n\n');

      const aiResponse = await generateGeminiInsight(recentEntriesText);
      setInsight(aiResponse);
    } catch (err) {
      setError("AI generation failed. Please try again in a moment.");
    } finally {
      setAiLoading(false);
    }
  };

  const toggleRecording = () => {
    if (!recognition) {
      alert("Speech recognition not supported in this browser.");
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

  // Helper: Simple keyword mood detector (legacy support)
  const detectMood = (txt) => {
    const lower = txt.toLowerCase();
    if (['sad', 'anxious', 'tired', 'hurt', 'bad'].some(w => lower.includes(w))) return 'reflective';
    if (['happy', 'great', 'good', 'excited', 'love'].some(w => lower.includes(w))) return 'positive';
    return 'neutral';
  };

  const [successMsg, setSuccessMsg] = useState('');

  // Filtered entries for History view
  const filteredEntries = entries.filter(e => 
    e.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -- Render --
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <div className="max-w-2xl mx-auto p-4 md:p-6">
        
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span className="text-indigo-600">Micro</span>Journal
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-semibold tracking-wide">AI</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Capture thoughts. Discover patterns.</p>
          </div>
          
          {/* User Status / Auth */}
          <div className="text-xs text-right">
            {user ? (
              <span className="text-green-600 flex items-center gap-1 justify-end">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Cloud Sync Active
              </span>
            ) : (
              <span className="text-amber-600">Connecting...</span>
            )}
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 mb-6">
          {[
            { id: 'write', icon: Calendar, label: 'Write' },
            { id: 'history', icon: BookOpen, label: 'History' },
            { id: 'insights', icon: Sparkles, label: 'Insights' }
          ].map(tab => (
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

        {/* Error & Success Toasts */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-200 flex items-center gap-2">
            <Zap size={16} /> {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-xl text-sm border border-green-200 flex items-center gap-2">
            <Zap size={16} /> {successMsg}
          </div>
        )}

        {/* --- VIEW: WRITE --- */}
        {view === 'write' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
                <div className="flex gap-2">
                   <button
                    onClick={toggleRecording}
                    className={`p-2 rounded-full transition-colors ${
                      isRecording 
                        ? 'bg-red-100 text-red-600 animate-pulse' 
                        : 'bg-white text-slate-400 hover:text-indigo-600 border border-slate-200'
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
                placeholder={isRecording ? "Listening... speak your thoughts..." : "How are you feeling right now?"}
                className="w-full h-64 p-6 text-lg leading-relaxed resize-none focus:outline-none placeholder:text-slate-300 text-slate-700"
              />
              
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-400 font-mono">{text.length} chars</span>
                <button
                  onClick={handleSave}
                  disabled={!text.trim() || loading}
                  className={`px-6 py-2.5 rounded-xl font-semibold text-white shadow-sm flex items-center gap-2 transition-all ${
                    !text.trim() || loading
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {loading ? 'Saving...' : <><Save size={18} /> Save Entry</>}
                </button>
              </div>
            </div>

            {/* Prompt Suggestion */}
            {!text && (
              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm mb-2">Need inspiration?</p>
                <button 
                  onClick={() => setText("Today, I felt proud when...")}
                  className="text-indigo-500 hover:text-indigo-700 text-sm font-medium hover:underline"
                >
                  "Today, I felt proud when..."
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- VIEW: HISTORY --- */}
        {view === 'history' && (
          <div className="animate-in fade-in duration-300 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search your memories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>

            <div className="space-y-4">
              {entries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="text-slate-300" size={24} />
                  </div>
                  <p className="text-slate-500">Your journal is empty.</p>
                  <button onClick={() => setView('write')} className="text-indigo-600 font-medium mt-2 hover:underline">Write your first entry</button>
                </div>
              ) : filteredEntries.length === 0 ? (
                <p className="text-center text-slate-500 py-8">No matching entries found.</p>
              ) : (
                filteredEntries.map(entry => (
                  <div key={entry.id} className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-200 transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          {entry.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          entry.mood === 'positive' ? 'bg-emerald-100 text-emerald-700' :
                          entry.mood === 'reflective' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {entry.mood}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
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
        )}

        {/* --- VIEW: INSIGHTS --- */}
        {view === 'insights' && (
          <div className="animate-in fade-in duration-300">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg mb-6">
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
                disabled={aiLoading || entries.length === 0}
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
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h3 className="font-serif text-xl text-slate-800 mb-4 pb-2 border-b border-slate-100">Analysis Results</h3>
                <div className="prose prose-indigo prose-sm max-w-none text-slate-600">
                  {insight.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
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
        )}

      </div>
    </div>
  );
}
