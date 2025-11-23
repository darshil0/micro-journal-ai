# Setup Guide for Micro Journal AI

This guide will help you set up the fixed version of Micro Journal AI with all the improvements and bug fixes.

## Quick Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Anthropic API key obtained
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Development servers running

## Step-by-Step Installation

### 1. Prerequisites Check

First, verify you have the required software:

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version (should be 8+)
npm --version
```

If you need to install/update Node.js, visit [nodejs.org](https://nodejs.org/)

### 2. Get Your Anthropic API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and save it securely

### 3. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai

# Install dependencies
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Required: Your Anthropic API key
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

# Optional: Server configuration (defaults shown)
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Optional: Rate limiting (defaults shown)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=10

# Optional: Other settings
MAX_ENTRY_LENGTH=10000
API_TIMEOUT_MS=30000
LOG_LEVEL=info
```

### 5. Start Development Servers

```bash
# Start both backend and frontend
npm run dev
```

This starts:
- Backend API: http://localhost:3000
- Frontend: http://localhost:5173

Open http://localhost:5173 in your browser.

## File Updates Required

### New Files to Create

1. **`.env.example`** - Example environment variables
2. **`nodemon.json`** - Nodemon configuration
3. **`src/utils/storageUtils.js`** - Storage management utilities
4. **`src/utils/apiUtils.js`** - API communication utilities
5. **`src/components/StorageWarning.jsx`** - Storage quota warning component
6. **`src/components/ErrorBoundary.jsx`** - Error boundary component
7. **`src/components/PrivacyNotice.jsx`** - Privacy information component
8. **`src/components/ExportImport.jsx`** - Data export/import component
9. **`tests/api.test.js`** - API tests
10. **`tests/storage.test.js`** - Storage tests

### Files to Replace

1. **`server.js`** - Updated with security, validation, and error handling
2. **`package.json`** - Updated with new dependencies and scripts
3. **`vite.config.js`** - Updated with proxy configuration
4. **`.gitignore`** - Updated to include .env files
5. **`README.md`** - Updated with comprehensive documentation

### Files to Update in Your App

You'll need to integrate the new components into your existing React app:

**`src/App.jsx`** or **`src/main.jsx`**:

```javascript
import ErrorBoundary from './components/ErrorBoundary';
import StorageWarning from './components/StorageWarning';
import PrivacyNotice from './components/PrivacyNotice';
import ExportImport from './components/ExportImport';

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <StorageWarning />
        <PrivacyNotice />
        
        {/* Your existing app components */}
        
        {/* Add export/import in settings or sidebar */}
        <ExportImport onImportComplete={() => {
          // Refresh your entries list
        }} />
      </div>
    </ErrorBoundary>
  );
}
```

## Integrating the Utility Functions

Replace your existing API calls with the new utilities:

**Before:**
```javascript
const response = await fetch('/api/insights', {
  method: 'POST',
  body: JSON.stringify({ entry: text })
});
```

**After:**
```javascript
import { getAIInsightsWithRetry, formatErrorMessage } from './utils/apiUtils';

try {
  const insights = await getAIInsightsWithRetry(text);
  // Use insights.mood, insights.insights, insights.reflection
} catch (error) {
  const message = formatErrorMessage(error);
  // Show error message to user
}
```

Replace localStorage calls:

**Before:**
```javascript
const entries = JSON.parse(localStorage.getItem('entries') || '[]');
localStorage.setItem('entries', JSON.stringify(entries));
```

**After:**
```javascript
import { getEntries, addEntry, updateEntry, deleteEntry } from './utils/storageUtils';

// Get all entries
const entries = getEntries();

// Add new entry
const newEntry = addEntry({ text: 'My journal entry', mood: 'happy' });

// Update entry
updateEntry(entryId, { text: 'Updated text' });

// Delete entry
deleteEntry(entryId);
```

## Testing Your Setup

### 1. Test Backend Health

```bash
curl http://localhost:3000/api/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2025-11-23T...",
  "environment": "development"
}
```

### 2. Test AI Insights

```bash
curl -X POST http://localhost:3000/api/insights \
  -H "Content-Type: application/json" \
  -d '{"entry": "Today was a wonderful day!"}'
```

### 3. Run Automated Tests

```bash
# Make sure server is running first
npm run dev

# In another terminal
npm test
```

## Production Deployment

### 1. Build the Application

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### 2. Set Production Environment

Update your `.env`:

```env
NODE_ENV=production
PORT=3000
FRONTEND_URL=https://your-domain.com
```

### 3. Start Production Server

```bash
npm start
```

### 4. Deployment Platforms

**Vercel/Netlify:**
- Set environment variables in dashboard
- Deploy from GitHub
- Configure build command: `npm run build`
- Configure start command: `npm start`

**Railway/Render:**
- Connect GitHub repository
- Set environment variables
- Auto-deploys on push

**Docker:**
Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Common Issues and Solutions

### Issue: "ANTHROPIC_API_KEY not found"
**Solution:** Make sure your `.env` file exists and contains the API key without quotes around the value.

### Issue: "Port 3000 already in use"
**Solution:** Change the PORT in `.env` or kill the process using port 3000:
```bash
# Find process
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Issue: CORS errors in browser
**Solution:** Make sure FRONTEND_URL in `.env` matches your frontend URL exactly, including the protocol (http/https).

### Issue: localStorage quota exceeded
**Solution:** Export your entries, clear old ones, or use the import feature to move to a fresh browser.

### Issue: Tests failing
**Solution:** 
1. Make sure server is running during tests
2. Check your API key is valid
3. Verify you're not hitting rate limits

## Security Checklist

Before deploying to production:

- [ ] `.env` file is in `.gitignore`
- [ ] API key is stored securely (not in code)
- [ ] FRONTEND_URL is set to your production domain
- [ ] Rate limiting is enabled
- [ ] Input validation is working
- [ ] HTTPS is enabled (for production)
- [ ] Security headers are configured (Helmet)

## Next Steps

1. Customize the UI to match your preferences
2. Add additional features (tags, search, themes)
3. Set up automatic backups
4. Configure monitoring and error tracking
5. Add authentication if needed

## Support

If you run into issues:

1. Check this guide first
2. Review the main README.md
3. Check the GitHub Issues
4. Create a new issue with:
   - Your Node.js version
   - Error messages
   - Steps to reproduce

---

**Happy journaling! 📝✨**
