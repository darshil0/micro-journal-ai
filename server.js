/**
 * Backend Proxy Server for Micro Journal AI
 * 
 * This is a secure backend proxy to protect your Anthropic API key.
 * Deploy this separately from your frontend for production use.
 * 
 * Installation:
 * npm install express cors dotenv
 * 
 * Usage:
 * node server.js
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['POST'],
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting (basic implementation)
const requestCounts = new Map();
const RATE_LIMIT = 10; // requests per hour
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

const checkRateLimit = (ip) => {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Insights endpoint
app.post('/api/insights', async (req, res) => {
  try {
    // Get client IP for rate limiting
    const clientIp = req.ip || req.connection.remoteAddress;
    
    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ 
        error: 'Rate limit exceeded. Please try again later.' 
      });
    }

    // Validate request body
    const { entries } = req.body;
    
    if (!entries || !Array.isArray(entries) || entries.length < 3) {
      return res.status(400).json({ 
        error: 'Invalid request. At least 3 entries required.' 
      });
    }

    // Validate API key
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Server configuration error' 
      });
    }

    // Prepare entries text (limit to last 7)
    const recentEntries = entries.slice(0, 7);
    const entriesText = recentEntries
      .map((e, i) => `Entry ${i + 1} (${new Date(e.date).toLocaleDateString()}): ${e.text}`)
      .join('\n\n');

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a gentle, supportive journal companion. Analyze these recent journal entries and provide a warm, empathetic insight about patterns, themes, or growth you notice. Be encouraging and non-judgmental. Keep your response to 2-3 paragraphs.\n\n${entriesText}`
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Anthropic API error:', errorData);
      return res.status(response.status).json({ 
        error: 'Failed to generate insights. Please try again.' 
      });
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'An unexpected error occurred. Please try again later.' 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Micro Journal AI Backend Proxy running on port ${PORT}`);
  console.log(`🔗 Frontend should connect to: http://localhost:${PORT}`);
  console.log(`⚠️  Make sure ANTHROPIC_API_KEY is set in .env`);
});
