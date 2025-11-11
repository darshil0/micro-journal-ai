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

### 1️⃣ Clone the repository
```bash
git clone https://github.com/darshil0/micro-journal-ai.git
cd micro-journal-ai
```

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

### 4️⃣ Run the development server
```bash
npm run dev
```
The frontend will be available at **http://localhost:5173**, and the backend proxy will be running on **http://localhost:3000**.

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
```

---

## 🔒 Privacy & Security

- **Secure Backend Proxy**: All requests to the Anthropic API are routed through a secure backend proxy (`server.js`). Your API key is never exposed to the browser.
- **Local Data Storage**: All journal entries are stored exclusively in your browser's local storage.
- **No Tracking**: The application does not use cookies or any tracking analytics.

---

## 🧰 Build & Deployment

### Development
The `npm run dev` command starts both the frontend and backend servers concurrently.

### Production
1. **Build the frontend**:
   ```bash
   npm run build
   ```
2. **Start the production server**:
   ```bash
   npm start
   ```
The Node.js server will serve the static frontend files from the `dist` directory and handle API proxying.

### Deployment Platforms
Deploy this as a standard Node.js application on platforms like **Vercel, Netlify, or Render**.
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Environment Variables**: `ANTHROPIC_API_KEY`, `PORT`

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## 📜 License
This project is licensed under the MIT License.
