require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const Anthropic = require('@anthropic-ai/sdk');

// Environment validation
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY not found in environment variables');
  console.error('Please create a .env file with your API key');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
}));

// CORS configuration
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://your-production-domain.com'
    : process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parser with size limits
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Rate limiting for API endpoints
const apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10,
  message: {
    error: 'Too many AI requests from this IP, please try again later.',
    retryAfter: '15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Input validation middleware
const validateJournalEntry = (req, res, next) => {
  const { entry } = req.body;
  
  if (!entry || typeof entry !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid entry format. Entry must be a string.',
    });
  }
  
  const trimmedEntry = entry.trim();
  
  if (trimmedEntry.length === 0) {
    return res.status(400).json({ 
      error: 'Entry cannot be empty.',
    });
  }
  
  const maxLength = parseInt(process.env.MAX_ENTRY_LENGTH) || 10000;
  if (trimmedEntry.length > maxLength) {
    return res.status(400).json({ 
      error: `Entry too long. Maximum length is ${maxLength} characters.`,
    });
  }
  
  req.body.entry = trimmedEntry;
  next();
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

// AI Insights endpoint
app.post('/api/insights', apiLimiter, validateJournalEntry, async (req, res) => {
  try {
    const { entry } = req.body;
    
    console.log(`Processing journal entry (${entry.length} characters)`);
    
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `You are a compassionate journaling assistant. Analyze this journal entry and provide:
1. The primary mood/emotion (one word)
2. 3-4 brief, supportive insights
3. A gentle reflection or question

Journal entry: "${entry}"

Respond in JSON format:
{
  "mood": "emotion",
  "insights": ["insight1", "insight2", "insight3"],
  "reflection": "reflection text"
}`
      }],
    });
    
    // Extract the text content from Claude's response
    const responseText = message.content[0].text;
    
    // Parse the JSON response
    let aiResponse;
    try {
      // Remove any markdown code blocks if present
      const cleanedResponse = responseText.replace(/```json\n?|\n?```/g, '').trim();
      aiResponse = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Invalid AI response format');
    }
    
    // Validate the response structure
    if (!aiResponse.mood || !Array.isArray(aiResponse.insights) || !aiResponse.reflection) {
      throw new Error('Incomplete AI response');
    }
    
    res.json({
      success: true,
      data: aiResponse,
      timestamp: new Date().toISOString(),
    });
    
  } catch (error) {
    console.error('Error generating insights:', error);
    
    // Handle different types of errors
    if (error.status === 429) {
      return res.status(429).json({
        error: 'API rate limit exceeded. Please try again later.',
        retryAfter: error.headers?.['retry-after'] || '60 seconds',
      });
    }
    
    if (error.status === 401) {
      return res.status(500).json({
        error: 'API authentication failed. Please contact support.',
      });
    }
    
    if (error.message === 'Invalid AI response format' || error.message === 'Incomplete AI response') {
      return res.status(500).json({
        error: 'Unable to process AI response. Please try again.',
      });
    }
    
    res.status(500).json({
      error: 'Failed to generate insights. Please try again.',
      details: NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Serve static files in production
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // Handle client-side routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    path: req.path,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Micro Journal AI Server Running     ║
╠════════════════════════════════════════╣
║  Environment: ${NODE_ENV.padEnd(24)} ║
║  Port: ${PORT.toString().padEnd(31)} ║
║  Frontend: ${corsOptions.origin.padEnd(24)} ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received. Shutting down gracefully...');
  process.exit(0);
});
