````markdown
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
- 🔒 **Privacy First**: Your API key is secured on a backend proxy, and your entries never leave your device.
- 📱 **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight**: Built with Vite for lightning-fast performance
- 🎯 **No Account Required**: Start journaling immediately, no signup needed

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-------------|----------|
| Frontend | React 18.3 (Vite 5.4) | SPA framework with fast HMR and modern tooling |
| Backend | Node.js (Express) | Securely proxies API requests to Anthropic |
| Styling | TailwindCSS 3.4 | Utility-first styling with custom turquoise theme |
| Icons | Lucide React | Beautiful, consistent iconography |
| AI Backend | Anthropic Messages API via Secure Node.js Proxy | Secure, server-side insight generation |
| Storage | Browser Storage | Local, persistent, privacy-first data storage |

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js 18+** and npm installed
- **Anthropic API key** (required for AI insights feature)
- **Modern browser** (Chrome 141+, Firefox 132+, Safari 18+)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure your environment

Copy the example environment file:

```bash
cp .env.example .env
```

Then, edit the `.env` file to add your Anthropic API key:

```bash
ANTHROPIC_API_KEY=your_api_key_here
PORT=3000
```

**Get your API key:** Visit [Anthropic Console](https://console.anthropic.com/) to create an account and generate an API key.

### 4️⃣ Run the development server

```bash
npm run dev
```

Your app will be running at **[http://localhost:5173](http://localhost:5173)**.
The backend proxy will be running on **[http://localhost:3000](http://localhost:3000)**.

---

## 📁 Project Structure

```
micro-journal-ai/
├── src/                  # Frontend source code
├── server.js             # Backend proxy server
├── package.json          # Project dependencies and scripts
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── .env.example          # Example environment variables
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
├── package.json           # Dependencies and scripts
├── postcss.config.cjs      # PostCSS configuration for Tailwind
├── server.js              # Backend proxy server
├── tailwind.config.js     # Tailwind CSS configuration with custom colors
├── vite.config.js         # Vite build configuration
├── LICENSE                # MIT License
└── README.md              # This file
```

---

## 🔒 Privacy & Security

* **Secure Backend Proxy**: All requests to the Anthropic API are routed through a secure backend proxy (`server.js`). Your API key is never exposed to the browser.
* **Local Data Storage**: All journal entries are stored exclusively in your browser's local storage.
* **No Tracking**: The application does not use cookies or any tracking analytics.

### Data Storage

* **100% Local**: All journal entries stored exclusively in browser storage.
* **No Cloud Sync**: Your data never touches external servers.
* **No Tracking**: Zero analytics, cookies, or user tracking.
* **No Account**: No signup, login, or personal information required.

### AI Insights

* **Secure HTTPS**: All API requests are encrypted in transit.
* **Minimal Data**: Only the text of your recent entries is sent for analysis, with no personal metadata.
* **Environment Variables**: The API key is stored securely in a local `.env` file and is never committed to version control.

---

## 🧩 Configuration

### Environment Variables

| Variable            | Required | Default | Description                                     |
| ------------------- | -------- | ------- | ----------------------------------------------- |
| `ANTHROPIC_API_KEY` | Optional | None    | Your Anthropic API key for AI insights feature. |
| `PORT`              | Optional | 3000    | The port for the backend proxy server.          |

**Without an API Key**: The app works perfectly for journaling and mood tracking, but the AI Insights feature will show an error when attempting to generate insights.

---

## 🧠 How AI Insights Work

| Your Recent Entries                                                 | AI-Generated Insight                                                                                                                                                             |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Feeling anxious about tomorrow's presentation. Hope it goes well." | "It's natural to feel pressure before sharing your work. Try reframing it as an opportunity to express your ideas, not a test. Your preparation will shine through."             |
| "Had an amazing day at the park with friends. Felt so grateful."    | "Your entries show a beautiful appreciation for meaningful connections. These moments of joy and gratitude are essential pillars of wellbeing."                                  |
| "Another tough day at work. Feeling overwhelmed and stressed."      | "I notice you've been experiencing work-related stress. Remember that challenging periods are temporary, and it's okay to set boundaries. Consider what small steps might help." |

---

## 🧰 Build & Deployment

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

The Node.js server serves the frontend from the `dist` directory and handles API proxying.

**Recommended Platforms**: Vercel, Netlify, Render, or Railway.

---

## 🧑‍💻 Development Guide

```bash
npm run lint         # Check code with ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

Optional testing setup (Vitest + React Testing Library) is documented in the full README.

---

## 💡 Roadmap & Future Enhancements

### Phase 1 - Core (Q1 2026)

* [x] Core journaling
* [x] Mood detection
* [x] AI insights
* [ ] Export (Markdown, PDF, JSON)
* [ ] Search, edit, delete

### Phase 2 - UX (Q2 2026)

* [ ] Sentiment charts
* [ ] Tags, reminders, dark mode

### Phase 3 - Advanced (Q3 2026)

* [ ] Voice input, multi-language, rich text

### Phase 4 - Enterprise (Q4 2026)

* [ ] Cloud backup, mobile app, encryption

---

## 📜 License

MIT License © 2025 Darshil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software...

---

## 🌟 Acknowledgments

* [Anthropic](https://www.anthropic.com/)
* [Vite](https://vitejs.dev/)
* [React](https://react.dev/)
* [TailwindCSS](https://tailwindcss.com/)
* [Lucide Icons](https://lucide.dev/)

---

## 📞 Support

* 🐛 [Issues](https://github.com/darshil0/micro-journal-ai/issues)
* 💬 [Discussions](https://github.com/darshil0/micro-journal-ai/discussions)
* 📚 [Docs](https://docs.anthropic.com)

---

## ✨ Quick Start

```bash
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai
npm install
cp .env.example .env
npm run dev
```

Visit **[http://localhost:5173](http://localhost:5173)** to start journaling. 🌱
Your data stays private — always.

---

Made with ❤️ by [Darshil](https://github.com/darshil0)
