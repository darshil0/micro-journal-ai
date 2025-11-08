# 🧠 Micro Journal AI

> A minimalist AI-powered journaling web app built with React + Vite.  
> Reflect, record, and receive personalized insights — privately and securely.

![Vite](https://img.shields.io/badge/Vite-4.0+-yellow?logo=vite)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan?logo=tailwindcss)
![Anthropic](https://img.shields.io/badge/Anthropic-API-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 📖 Overview

**Micro Journal AI** is a beautiful, minimalist journaling web app that helps you capture daily reflections and discover patterns through AI-powered insights. Built with modern web technologies and designed with privacy as the top priority, it uses Anthropic's Claude model to provide gentle, context-aware reflections on your journal entries.

**Key Features**
- 🗒️ **Daily Micro-Entries**: Write short, focused journal entries with a clean interface
- 🎨 **Beautiful Design**: Calming turquoise gradient theme with smooth animations
- 🎭 **Automatic Mood Detection**: Classifies entries as positive, reflective, or neutral
- 🤖 **AI-Powered Insights**: Get thoughtful reflections on your journaling patterns (requires 3+ entries)
- 💾 **Persistent Storage**: All entries saved locally across sessions using browser Storage API
- 📚 **Entry History**: Browse all your past entries with beautiful visual cards and date filtering
- 🔒 **Privacy First**: Zero external data storage — your entries never leave your device
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight**: Built with Vite for lightning-fast performance
- 🎯 **No Account Required**: Start journaling immediately, no signup needed

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | React 18 (Vite) | SPA framework with fast HMR and modern tooling |
| Styling | TailwindCSS 3 | Utility-first styling with custom turquoise theme |
| Icons | Lucide React | Beautiful, consistent iconography |
| AI Backend | Anthropic Messages API | Insight generation using Claude Sonnet 4 |
| Storage | Browser Storage API | Local, persistent, privacy-first data storage |
| Build Tool | Vite 4+ | Ultra-fast dev server and optimized production builds |

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 16+ and npm installed
- Modern browser (Chrome 140+)
- Anthropic API key (optional, for AI insights feature)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/micro-journal-ai.git
cd micro-journal-ai
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment (Optional)

Create a `.env` file in the project root if you want to enable AI insights:

```bash
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

**Important Security Note:** The current implementation uses direct API calls from the browser. For production deployment, we strongly recommend implementing a backend proxy server to secure your API key and prevent unauthorized usage.

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
│   └── favicon.ico
│
├── src/
│   ├── App.jsx            # Main application component with all logic
│   ├── main.jsx           # React app entry point
│   └── index.css          # Tailwind base styles
│
├── .env                   # Environment variables (gitignored)
├── .gitignore             # Git ignore rules
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration for Tailwind
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite build configuration
├── LICENSE                # MIT License
└── README.md              # This file
```

---

## 🎨 Features in Detail

### ✍️ Write View
- **Clean Writing Interface**: Distraction-free textarea with elegant rounded corners
- **Live Character Counter**: Track your entry length in real-time
- **Date Display**: Automatic date stamp with calendar icon
- **Smart Validation**: Requires minimum 10 characters to ensure meaningful entries
- **Mood Detection**: Automatically analyzes sentiment using keyword matching
- **Instant Feedback**: Success notification when entry is saved
- **Responsive Design**: Optimized for all screen sizes

### 📚 History View
- **Chronological Sorting**: Newest entries appear first
- **Visual Mood Indicators**: Color-coded left borders for quick mood identification
  - 🟢 **Green**: Positive mood (happy, excited, grateful)
  - 🔵 **Blue**: Reflective mood (thoughtful, contemplative)
  - ⚪ **Gray**: Neutral mood
- **Beautiful Cards**: Each entry displayed in a clean, readable card layout
- **Date Formatting**: Human-readable dates (e.g., "Nov 8, 2024")
- **Mood Badges**: Small pill-shaped badges showing mood classification
- **Empty State**: Friendly message when no entries exist yet
- **Smooth Scrolling**: Navigate through your journal history effortlessly

### 🤖 AI Insights View
- **Intelligent Analysis**: Uses Claude API to analyze patterns across entries
- **Minimum Threshold**: Requires at least 3 entries for meaningful insights
- **Recent Focus**: Analyzes your 7 most recent entries
- **Warm Tone**: AI provides gentle, encouraging, non-judgmental feedback
- **Pattern Recognition**: Identifies themes, growth areas, and emotional trends
- **Loading States**: Clear visual feedback while generating insights
- **Beautiful Presentation**: Insights displayed in gradient-styled card
- **On-Demand**: Generate new insights whenever you want fresh perspective

---

## 🔒 Privacy & Security

### Data Storage
- **100% Local**: All journal entries stored exclusively in browser Storage API
- **No Cloud Sync**: Your data never touches external servers (except AI API)
- **No Tracking**: Zero analytics, cookies, or user tracking
- **No Account**: No signup, login, or personal information required

### AI Insights
- **Secure HTTPS**: All API requests encrypted in transit
- **Minimal Data**: Only entry text sent for analysis, no metadata
- **Temporary**: Anthropic doesn't store API request data per their policy
- **Optional Feature**: App fully functional without AI insights

### Best Practices
- For sensitive journals, consider using browser private/incognito mode
- Storage API data persists until manually cleared (browser settings)
- Suitable for regulated environments (HIPAA, GDPR) with proper deployment
- Consider implementing backend proxy for production API key security

---

## 🧩 Configuration

### Environment Variables

| Variable                 | Required | Default | Description |
| ------------------------ | -------- | ------- | ----------- |
| `VITE_ANTHROPIC_API_KEY` | Optional | None    | Your Anthropic API key for AI insights feature |

**Without API Key**: The app works perfectly for journaling, but the AI Insights feature will not function.

### Tailwind Configuration

The app uses a custom turquoise/teal color scheme. To modify colors, edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add custom colors here
      }
    }
  }
}
```

---

## 🧠 How AI Insights Work

### Example Interactions

| Your Recent Entries | AI-Generated Insight |
| ------------------- | -------------------- |
| "Feeling anxious about tomorrow's presentation. Hope it goes well." | "It's natural to feel pressure before sharing your work. Try reframing it as an opportunity to express your ideas, not a test. Your preparation will shine through." |
| "Had an amazing day at the park with friends. Felt so grateful." | "Your entries show a beautiful appreciation for meaningful connections. These moments of joy and gratitude are essential pillars of wellbeing." |
| "Another tough day at work. Feeling overwhelmed and stressed." | "I notice you've been experiencing work-related stress. Remember that challenging periods are temporary, and it's okay to set boundaries. Consider what small steps might help." |

### Technical Details
- **Model**: Claude Sonnet 4 (claude-sonnet-4-20250514)
- **Max Tokens**: 1000 per request
- **Context Window**: Last 7 entries (to stay within limits)
- **Tone**: Configured for empathetic, supportive responses
- **Response Time**: Typically 2-5 seconds

---

## 🧰 Build & Deployment

### Development Build
```bash
npm run dev          # Start dev server with hot reload
npm run preview      # Preview production build locally
```

### Production Build
```bash
npm run build        # Creates optimized bundle in /dist
```

The `dist/` folder contains production-ready static files that can be deployed anywhere.

### Deployment Options

#### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
```bash
npm run build
# Push dist/ folder to gh-pages branch
```

#### Other Options
- **Cloudflare Pages**: Fast global CDN
- **Railway**: Simple deployment platform
- **AWS S3 + CloudFront**: Enterprise-grade hosting
- **Docker**: Containerized deployment

### Environment Variables in Production

Most platforms support environment variables via dashboard:
1. Add `VITE_ANTHROPIC_API_KEY` in platform settings
2. Rebuild/redeploy the application
3. Variables will be bundled during build time

---

## 🧑‍💻 Development Guide

### Available Scripts

```bash
npm run dev        # Start development server (port 5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint (if configured)
npm run format     # Run Prettier (if configured)
```

### Code Quality Tools (Optional)

Install ESLint and Prettier for better code quality:

```bash
npm install --save-dev eslint prettier eslint-config-prettier
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### Testing Setup (Optional)

Add Vitest for component testing:

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event jsdom
```

Example test file (`src/App.test.jsx`):
```javascript
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders journal title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Micro Journal/i);
  expect(titleElement).toBeInTheDocument();
});
```

---

## 🎯 Usage Tips

1. **Daily Practice**: Set aside 5-10 minutes each day for reflection — consistency builds valuable patterns
2. **Write Authentically**: Be honest and genuine — the AI insights work best with authentic entries
3. **Minimum Length**: Aim for thoughtful entries of at least 50-100 characters for best results
4. **Wait for Insights**: Write at least 3 entries before requesting AI insights for meaningful analysis
5. **Review History**: Periodically browse your history to see your emotional journey over time
6. **Privacy Reminder**: Your data stays in your browser — clear storage to permanently delete entries
7. **Backup Strategy**: Periodically export/screenshot important entries (future feature coming)

---

## 🐛 Known Issues & Limitations

- **Browser Storage Limits**: Storage API typically allows 5-10MB per domain (thousands of entries)
- **Browser Compatibility**: Requires modern browser with Storage API support (Chrome 80+, Firefox 77+, Safari 14+)
- **API Token Limits**: Very long entries (5000+ characters) may exceed Claude's token limits
- **No Sync**: Entries don't sync across devices (by design for privacy)
- **API Key Security**: Direct browser API calls expose key in network requests (use backend proxy for production)
- **Internet Required**: AI insights feature requires active internet connection

---

## 💡 Roadmap & Future Enhancements

### Phase 1 (Q1 2026)
- [ ] Export entries to Markdown format
- [ ] Export entries to PDF with beautiful formatting
- [ ] Search functionality across all entries
- [ ] Filter entries by date range

### Phase 2 (Q2 2026)
- [ ] Sentiment analysis graph/chart over time
- [ ] Custom mood categories (user-defined)
- [ ] Tag system for organizing entries
- [ ] Streak tracking and daily reminders

### Phase 3 (Q3 2026)
- [ ] Dark mode toggle with system preference detection
- [ ] Multi-language support (i18n)
- [ ] Rich text editor with formatting options
- [ ] Image attachments for entries

### Phase 4 (Q4 2025)
- [ ] Encrypted IndexedDB storage (healthcare-grade)
- [ ] Optional cloud backup with E2E encryption
- [ ] Mobile app version (React Native)
- [ ] Browser extension for quick journaling
- [ ] Voice-to-text entry option

---

## 🤝 Contributing

Contributions are warmly welcomed! Whether it's bug fixes, new features, or documentation improvements, your help makes this project better.

### How to Contribute

1. **Fork** the repository
2. **Clone** your fork locally
   ```bash
   git clone https://github.com/<your-username>/micro-journal-ai.git
   ```
3. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
4. **Make** your changes and commit
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
5. **Push** to your branch
   ```bash
   git push origin feature/AmazingFeature
   ```
6. **Open** a Pull Request on GitHub

### Contribution Guidelines

- Write clear, descriptive commit messages
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Keep PRs focused on a single feature/fix

---

## 📜 License

MIT License © 2025

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

---

## 🌟 Acknowledgments

Built with love using these amazing technologies:

- **[Anthropic](https://www.anthropic.com/)** — Claude API for thoughtful AI insights
- **[Vite](https://vitejs.dev/)** — Lightning-fast build tooling and dev server
- **[React](https://react.dev/)** — Powerful, declarative UI component framework
- **[TailwindCSS](https://tailwindcss.com/)** — Beautiful, utility-first styling system
- **[Lucide Icons](https://lucide.dev/)** — Elegant, consistent icon library

Special thanks to the open-source community for making projects like this possible.

---

## 📞 Support & Community

### Get Help
- **GitHub Issues**: [Report bugs or request features](https://github.com/<your-username>/micro-journal-ai/issues)
- **Discussions**: Share ideas and ask questions in GitHub Discussions
- **Documentation**: Check [Anthropic API Docs](https://docs.anthropic.com) for API-related questions

### Stay Updated
- ⭐ Star this repo to show support and stay notified
- 👀 Watch for updates on new features
- 🍴 Fork to create your own customized version

---

## ✨ Quick Start Summary

Get up and running in 3 minutes:

```bash
# Clone and setup
git clone https://github.com/<your-username>/micro-journal-ai.git
cd micro-journal-ai
npm install

# Optional: Add API key for AI insights
echo "VITE_ANTHROPIC_API_KEY=your_api_key_here" > .env

# Start developing
npm run dev
```

Your private, AI-powered journal will be live at:
👉 **[http://localhost:5173](http://localhost:5173)**

Start writing, reflecting, and growing today! 🌱

---

## 📸 Screenshots

### Write View
*Beautiful, distraction-free writing interface with turquoise theme*

### History View
*Browse your journal entries with color-coded mood indicators*

### AI Insights View
*Get personalized reflections on your journaling patterns*

---

**Made with ❤️ and ☕ by Darshil for mindful reflection**

*Remember: Your mental health journey is unique and valuable. This tool is here to support your self-reflection, not replace professional mental health care.*
