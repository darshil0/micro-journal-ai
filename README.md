# 🧠 Micro Journal AI

> A minimalist AI-powered journaling web app built with React + Vite.  
> Reflect, record, and receive personalized insights — privately and securely.

![Vite](https://img.shields.io/badge/Vite-5.4+-yellow?logo=vite)
![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan?logo=tailwindcss)
![Anthropic](https://img.shields.io/badge/Anthropic-Claude_Sonnet_4-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

**Micro Journal AI** is a beautiful, minimalist journaling web app that helps you capture daily reflections and discover patterns through AI-powered insights. Built with modern web technologies and designed with privacy as the top priority, it uses Anthropic's Claude Sonnet 4 model to provide gentle, context-aware reflections on your journal entries.

**Key Features**
- 🗒️ **Daily Micro-Entries**: Write short, focused journal entries with a clean interface
- 🎨 **Beautiful Design**: Calming turquoise gradient theme with smooth animations
- 🎭 **Automatic Mood Detection**: Classifies entries as positive, reflective, or neutral
- 🤖 **AI-Powered Insights**: Get thoughtful reflections on your journaling patterns (requires 3+ entries)
- 💾 **Persistent Storage**: All entries saved locally in browser storage (when available)
- 📚 **Entry History**: Browse all your past entries with beautiful visual cards and entry counter
- 🔒 **Privacy First**: Zero external data storage — your entries never leave your device
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight**: Built with Vite for lightning-fast performance
- 🎯 **No Account Required**: Start journaling immediately, no signup needed
- 🛡️ **Robust Error Handling**: Graceful fallbacks with clear error messages
- 🔄 **Storage Fallback**: Works in session-only mode if persistent storage is unavailable

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | React 18.3 (Vite 5.4) | SPA framework with fast HMR and modern tooling |
| Styling | TailwindCSS 3.4 | Utility-first styling with custom turquoise theme |
| Icons | Lucide React | Beautiful, consistent iconography |
| AI Backend | Anthropic Messages API | Insight generation using Claude Sonnet 4 |
| Storage | Browser Storage | Local, persistent, privacy-first data storage |
| Build Tool | Vite 5.4+ | Ultra-fast dev server and optimized production builds |

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js 16+** and npm installed
- **Modern browser** (Chrome 141+, Firefox 132+, Safari 18+)
- **Anthropic API key** (optional, required only for AI insights feature)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment (Optional but recommended)

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Then edit `.env` and add your API key:

```bash
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

**Get your API key:** Visit [Anthropic Console](https://console.anthropic.com/) to create an account and generate an API key.

**⚠️ IMPORTANT SECURITY NOTE:** The current implementation uses direct API calls from the browser, which exposes your API key in network requests. This is suitable for personal use and development only. For production deployment, you MUST implement a backend proxy server to secure your API key and prevent unauthorized usage. See the Security section below for implementation details.

### 4️⃣ Run the development server

```bash
npm run dev
```

Your app will be running at: **[http://localhost:5173](http://localhost:5173)**

---

## 📁 Project Structure

```
micro-journal-ai/
│
├── public/                # Static assets
│   └── vite.svg          # Vite logo
│
├── src/
│   ├── App.jsx            # Main application component with all logic
│   ├── main.jsx           # React app entry point
│   └── index.css          # Tailwind base styles + custom scrollbar
│
├── .editorconfig          # Editor configuration
├── .env                   # Environment variables (gitignored)
├── .env.example           # Example environment variables template
├── .eslintrc.json         # ESLint configuration
├── .gitignore             # Git ignore rules
├── .prettierrc            # Prettier configuration
├── index.html             # HTML entry point
├── nodemon.json           # Nodemon configuration for backend
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration for Tailwind
├── server.js              # Backend proxy server (for production)
├── tailwind.config.js     # Tailwind CSS configuration with custom colors
├── vite.config.js         # Vite build configuration
├── LICENSE                # MIT License
└── README.md              # This file
```

---

## 🎨 Features in Detail

### ✏️ Write View
- **Clean Writing Interface**: Distraction-free textarea with elegant rounded corners and focus states
- **Live Character Counter**: Track your entry length in real-time
- **Date Display**: Automatic date stamp with calendar icon showing full date
- **Smart Validation**: Requires minimum 10 characters and trims whitespace to ensure meaningful entries
- **Mood Detection**: Automatically analyzes sentiment using enhanced keyword matching (10 positive + 10 negative keywords)
- **Instant Feedback**: Success notification when entry is saved with storage status
- **Responsive Design**: Optimized for all screen sizes with proper padding
- **Error Handling**: Clear error messages displayed in red alert banner
- **Storage Status**: Shows whether entries are persisted or session-only

### 📚 History View
- **Entry Counter**: Live count of total entries displayed in navigation tab
- **Chronological Sorting**: Newest entries appear first with accurate date sorting
- **Visual Mood Indicators**: Color-coded left borders for quick mood identification
  - 🟢 **Green**: Positive mood (happy, excited, grateful, blessed, thankful)
  - 🔵 **Blue**: Reflective mood (thoughtful, contemplative, worried, anxious)
  - ⚪ **Gray**: Neutral mood
- **Beautiful Cards**: Each entry displayed in a clean, readable card layout with proper shadows
- **Date Formatting**: Human-readable dates (e.g., "Nov 8, 2024")
- **Mood Badges**: Small capitalized pill-shaped badges showing mood classification
- **Empty State**: Friendly message with call-to-action button when no entries exist
- **Smooth Scrolling**: Navigate through your journal history effortlessly with custom scrollbar
- **Text Preservation**: Maintains line breaks and formatting in displayed entries

### 🤖 AI Insights View
- **Intelligent Analysis**: Uses Claude Sonnet 4 API to analyze patterns across entries
- **Minimum Threshold**: Requires at least 3 entries for meaningful insights with progress indicator
- **Recent Focus**: Analyzes your 7 most recent entries to stay within token limits
- **Warm Tone**: AI provides gentle, encouraging, non-judgmental feedback
- **Pattern Recognition**: Identifies themes, growth areas, and emotional trends
- **Loading States**: Clear visual feedback with disabled button state while generating insights
- **Beautiful Presentation**: Insights displayed in gradient-styled card with sparkle icon
- **On-Demand**: Generate new insights whenever you want fresh perspective
- **Enhanced Error Handling**: Detailed error messages with specific API failure reasons
- **Proper API Integration**: Uses correct headers including `x-api-key` and `anthropic-version`

---

## 🔒 Privacy & Security

### Data Storage
- **100% Local**: All journal entries stored exclusively in browser storage
- **No Cloud Sync**: Your data never touches external servers (except AI API calls)
- **No Tracking**: Zero analytics, cookies, or user tracking
- **No Account**: No signup, login, or personal information required
- **Storage Detection**: App automatically detects storage availability and notifies users
- **Fallback Mode**: If persistent storage is unavailable, entries are kept in session memory
- **User Notification**: Clear warnings when storage is unavailable

### AI Insights
- **Secure HTTPS**: All API requests encrypted in transit
- **Minimal Data**: Only entry text sent for analysis, no metadata or personal information
- **Temporary**: Anthropic doesn't store API request data per their privacy policy
- **Optional Feature**: App is fully functional for journaling without AI insights
- **Environment Variables**: API key stored securely in .env file (not committed to git)

### Security Best Practices

**⚠️ CRITICAL: Production Security Requirements**

The current implementation exposes your Anthropic API key in browser network requests. This is acceptable for:
- Personal use on your own computer
- Development and testing
- Trusted local environments

For production deployment, you MUST implement a backend proxy. A secure backend proxy server (`server.js`) is included in this repository.

#### Backend Proxy Setup

1. **Create backend directory**:
```bash
mkdir backend
cp server.js backend/
cd backend
```

2. **Install dependencies**:
```bash
npm install express cors dotenv
```

3. **Create .env file**:
```bash
ANTHROPIC_API_KEY=your_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

4. **Start the proxy server**:
```bash
node server.js
```

5. **Update frontend to use proxy**: Modify the API call in `src/App.jsx`:
```javascript
// Change from direct API call to proxy
const response = await fetch('http://localhost:3001/api/insights', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ entries: recentEntries })
});
```

### Additional Security Recommendations
- For sensitive journals, use browser private/incognito mode
- Browser storage data persists until manually cleared (browser settings → Clear browsing data)
- Suitable for regulated environments (HIPAA, GDPR) with proper deployment configuration
- Regular backups recommended (export feature coming soon)
- Never commit `.env` file to version control
- Use rate limiting on backend proxy to prevent abuse
- Implement request validation and sanitization

---

## 🧩 Configuration

### Environment Variables

| Variable                 | Required | Default | Description |
| ------------------------ | -------- | ------- | ----------- |
| `VITE_ANTHROPIC_API_KEY` | Optional | None    | Your Anthropic API key for AI insights feature |

**Without API Key**: The app works perfectly for journaling and mood tracking, but the AI Insights feature will show an error when attempting to generate insights.

**Setting up your API Key:**
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Copy `.env.example` to `.env`
6. Add your API key to the `.env` file

### Tailwind Configuration

The app uses a custom turquoise/teal color scheme defined in `tailwind.config.js`. To modify colors:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'teal': {
          // Custom teal shades
          600: '#0d9488', // Primary buttons
          700: '#0f766e', // Hover states
        },
        'cyan': {
          // Custom cyan shades for gradients
        }
      }
    }
  }
}
```

### Custom Scrollbar

The app includes a custom-styled scrollbar (see `src/index.css`) matching the teal theme. Works in WebKit-based browsers (Chrome, Safari, Edge) and Firefox.

---

## 🧠 How AI Insights Work

### Example Interactions

| Your Recent Entries | AI-Generated Insight |
| ------------------- | -------------------- |
| "Feeling anxious about tomorrow's presentation. Hope it goes well." | "It's natural to feel pressure before sharing your work. Try reframing it as an opportunity to express your ideas, not a test. Your preparation will shine through." |
| "Had an amazing day at the park with friends. Felt so grateful." | "Your entries show a beautiful appreciation for meaningful connections. These moments of joy and gratitude are essential pillars of wellbeing." |
| "Another tough day at work. Feeling overwhelmed and stressed." | "I notice you've been experiencing work-related stress. Remember that challenging periods are temporary, and it's okay to set boundaries. Consider what small steps might help." |

### Technical Details
- **Model**: Claude Sonnet 4 (`claude-sonnet-4-20250514`)
- **Max Tokens**: 1000 per request
- **Context Window**: Last 7 entries (to stay within API limits)
- **Tone**: Configured for empathetic, supportive, non-judgmental responses
- **Response Time**: Typically 2-5 seconds depending on entry length
- **API Version**: Uses Anthropic API version `2023-06-01`
- **Error Handling**: Graceful fallback with user-friendly, detailed error messages

---

## 🧰 Build & Deployment

### Development Commands
```bash
npm run dev          # Start dev server with hot reload (port 5173)
npm run preview      # Preview production build locally
npm run build        # Creates optimized bundle in /dist
npm run lint         # Run ESLint checks
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Production Build
```bash
npm run build
```

The `dist/` folder contains production-ready static files that can be deployed anywhere. The build is optimized with:
- Minified JavaScript and CSS
- Tree-shaking for smaller bundle size
- Optimized assets and images
- Source maps for debugging (configurable)

### Deployment Options

#### ⚡ Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add `VITE_ANTHROPIC_API_KEY` with your API key
3. Redeploy

#### 🌐 Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

Configure in `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

#### 📄 GitHub Pages
```bash
npm run build
# Configure GitHub Pages to serve from /dist or use gh-pages package
```

#### ☁️ Other Platforms
- **Cloudflare Pages**: Fast global CDN with automatic deployments
- **Railway**: Simple deployment with built-in environment variables
- **Render**: Free tier available with automatic HTTPS
- **AWS S3 + CloudFront**: Enterprise-grade hosting with CDN
- **Docker**: Containerized deployment for self-hosting

### Environment Variables in Production

Most platforms support environment variables via their dashboard:
1. Add `VITE_ANTHROPIC_API_KEY` in platform settings
2. Rebuild/redeploy the application
3. Variables will be bundled at build time (Vite requirement)

**Important**: Vite environment variables are embedded during build time, not runtime. Always rebuild after changing environment variables.

---

## 🧑‍💻 Development Guide

### Available Scripts

```bash
npm run dev          # Start development server (port 5173, auto-opens browser)
npm run build        # Build for production (outputs to /dist)
npm run preview      # Preview production build locally
npm run lint         # Check code with ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changing files
```

### Code Quality

The project includes ESLint and Prettier for code quality:

- **ESLint**: Checks for code errors and enforces best practices
- **Prettier**: Auto-formats code for consistency
- **EditorConfig**: Consistent coding styles across different editors
- Configuration files: `.eslintrc.json`, `.prettierrc`, `.editorconfig`

### Testing Setup (Optional)

Add Vitest for component testing:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event jsdom
```

Example test file (`src/App.test.jsx`):
```javascript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('MicroJournal', () => {
  it('renders journal title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Micro Journal/i);
    expect(titleElement).toBeInTheDocument();
  });

  it('shows write view by default', () => {
    render(<App />);
    const textarea = screen.getByPlaceholderText(/How are you feeling/i);
    expect(textarea).toBeInTheDocument();
  });
});
```

---

## 🎯 Usage Tips

1. **Daily Practice**: Set aside 5-10 minutes each day for reflection
2. **Write Authentically**: Be honest and genuine for best AI insights
3. **Minimum Length**: Aim for 50-100 characters per entry
4. **Wait for Insights**: Write at least 3 entries before requesting AI insights
5. **Review History**: Periodically browse your history to see patterns
6. **Privacy Reminder**: Your data stays in your browser
7. **Backup Strategy**: Take screenshots of important entries or use export feature (coming soon)
8. **Consistent Timing**: Journal at the same time daily for best results
9. **Stream of Consciousness**: Write freely without overthinking
10. **Mood Tracking**: Use automatic detection to identify emotional patterns

---

## 🐛 Known Issues & Limitations

### Current Limitations
- **Browser Storage Limits**: Typical limit is 5-10MB per domain
- **Browser Compatibility**: Requires modern browser with storage support
- **API Token Limits**: Very long entries (5000+ characters) may exceed limits
- **No Sync**: Entries don't sync across devices (by design for privacy)
- **API Key Security**: Direct browser API calls expose key (use backend proxy for production)
- **Internet Required**: AI insights require active internet connection
- **No Export**: Currently no export feature (coming soon)
- **Single Device**: Data only exists on the device/browser where created

### Workarounds
- **Storage Full**: Clear old entries or browser storage
- **API Errors**: Verify API key is correct and has sufficient credits
- **No Storage Available**: App works in session memory with warning notification
- **Long Entries**: Keep entries under 2000 characters for best results

---

## 💡 Roadmap & Future Enhancements

### Phase 1 - Essential Features (Q1 2026)
- [x] Core journaling functionality
- [x] Mood detection
- [x] AI insights integration
- [x] Responsive design
- [x] Storage availability detection
- [x] Error handling improvements
- [x] Entry counter in navigation
- [ ] Export entries (Markdown, PDF, JSON)
- [ ] Search functionality
- [ ] Entry editing
- [ ] Entry deletion

### Phase 2 - Enhanced UX (Q2 2026)
- [ ] Sentiment analysis charts
- [ ] Custom mood categories
- [ ] Tag system
- [ ] Streak tracking
- [ ] Daily reminders
- [ ] Keyboard shortcuts
- [ ] Dark mode

### Phase 3 - Advanced Features (Q3 2026)
- [ ] Multi-language support
- [ ] Rich text editor
- [ ] Image attachments
- [ ] Voice-to-text
- [ ] Weekly/monthly summaries
- [ ] Data encryption

### Phase 4 - Enterprise & Mobile (Q4 2026)
- [ ] Optional cloud backup
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Collaborative journaling
- [ ] Advanced analytics

---

## 🤝 Contributing

Contributions are warmly welcomed! Whether it's bug fixes, new features, documentation improvements, or design enhancements, your help makes this project better.

### How to Contribute

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
4. **Make** your changes and test thoroughly
5. **Commit** with clear messages (`git commit -m 'Add some AmazingFeature'`)
6. **Push** to your branch (`git push origin feature/AmazingFeature`)
7. **Open** a Pull Request with detailed description

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow existing code style (use Prettier/ESLint)
- Add comments for complex logic
- Test across different browsers
- Update documentation if needed
- Keep PRs focused on single features
- Be respectful in discussions

---

## 📝 Changelog

### v1.0.1 (Latest)
- **Fixed**: Storage API availability detection
- **Fixed**: Error handling for non-existent keys on first load
- **Added**: Storage status warnings for users
- **Added**: Entry counter in History tab navigation
- **Improved**: Error messages for AI insights with detailed failure reasons
- **Improved**: Save confirmation feedback with storage status

### v1.0.0
- Initial release
- Core journaling functionality
- Mood detection
- AI-powered insights
- Responsive design

---

## 📜 License

MIT License © 2025 Darshil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🌟 Acknowledgments

Built with love using these amazing technologies:

- **[Anthropic](https://www.anthropic.com/)** — Claude Sonnet 4 API for AI insights
- **[Vite](https://vitejs.dev/)** — Lightning-fast build tooling
- **[React](https://react.dev/)** — Powerful UI framework
- **[TailwindCSS](https://tailwindcss.com/)** — Beautiful styling system
- **[Lucide Icons](https://lucide.dev/)** — Elegant icon library

Special thanks to the open-source community and mental health advocates who inspire mindful technology.

---

## 📞 Support & Community

### Get Help
- **🐛 GitHub Issues**: [Report bugs or request features](https://github.com/darshil0/micro-journal-ai/issues)
- **💬 Discussions**: [Share ideas and ask questions](https://github.com/darshil0/micro-journal-ai/discussions)
- **📚 Documentation**: Check [Anthropic API Docs](https://docs.anthropic.com)

### Stay Updated
- ⭐ **Star** this repo to show support
- 👀 **Watch** for notifications
- 🍴 **Fork** to create your own version
- 🦋 **Share** on social media

---

## ✨ Quick Start Summary

Get up and running in under 3 minutes:

```bash
# 1. Clone and navigate
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai

# 2. Install dependencies
npm install

# 3. (Optional) Configure API key for AI insights
cp .env.example .env
# Edit .env and add: VITE_ANTHROPIC_API_KEY=your_api_key_here

# 4. Start developing
npm run dev
```

Your private, AI-powered journal will be live at **http://localhost:5173**

Start writing, reflecting, and growing today! 🌱

---

Made with ❤️ and ☕ by [Darshil](https://github.com/darshil0) for mindful reflection

*Remember: Your mental health journey is unique and valuable. This tool supports self-reflection, not professional mental health care.*
